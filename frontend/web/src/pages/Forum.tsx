import React, { useState, useEffect } from 'react';
import '../../styles/Forum.css';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  category: string;
  upvotes: number;
  comments: number;
  tags: string[];
  upvoters?: string[];
  comment_list?: { author: string; content: string; date: string }[];
}

interface NewPostData {
  title: string;
  content: string;
  category: string;
  tags: string;
}

interface ForumProps {
  isMobile?: boolean;
}

const Forum: React.FC<ForumProps> = ({ isMobile }) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPost, setNewPost] = useState<NewPostData>({
    title: '',
    content: '',
    category: 'General',
    tags: ''
  });
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const [commentLoading, setCommentLoading] = useState<{ [key: number]: boolean }>({});

  const categories = ['All', 'General', 'Technology', 'Education', 'Storage', 'Discussion', 'Market', 'Health'];

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/forum/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load posts');
        setLoading(false);
      });
  }, []);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user && user.email ? user.email : null;

  const handleUpvote = async (postId: number) => {
    if (!userId) {
      setError('Sign in to upvote');
      return;
    }
    const post = posts.find(p => p.id === postId);
    const alreadyUpvoted = post?.upvoters?.includes(userId);
    try {
      const res = await fetch(`http://localhost:5000/forum/posts/${postId}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, remove: alreadyUpvoted })
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || 'Failed to upvote');
        return;
      }
      const updated = await res.json();
      setPosts(posts => posts.map(post =>
        post.id === postId ? { ...post, upvotes: updated.upvotes, upvoters: updated.upvoters } : post
      ));
    } catch (err) {
      setError('Failed to upvote');
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPost.title,
          author: 'You',
          content: newPost.content,
          category: newPost.category,
          tags: newPost.tags
        })
      });
      const data = await res.json();
      setPosts([data.post, ...posts]);
      setNewPost({
        title: '',
        content: '',
        category: 'General',
        tags: ''
      });
      setShowNewPostForm(false);
    } catch (err) {
      setError('Failed to create post');
    }
    setLoading(false);
  };

  const handleSubmitComment = async (postId: number) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.name) {
      setError('Sign in to comment');
      return;
    }
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;
    setCommentLoading(l => ({ ...l, [postId]: true }));
    try {
      const res = await fetch(`http://localhost:5000/forum/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: user.name, content: comment })
      });
      if (!res.ok) {
        setError('Failed to comment');
        setCommentLoading(l => ({ ...l, [postId]: false }));
        return;
      }
      const updated = await res.json();
      setPosts(posts => posts.map(post =>
        post.id === postId ? { ...post, comments: updated.comments, comment_list: updated.comment_list } : post
      ));
      setCommentInputs(inputs => ({ ...inputs, [postId]: '' }));
    } catch (err) {
      setError('Failed to comment');
    }
    setCommentLoading(l => ({ ...l, [postId]: false }));
  };

  const handleCommentChange = (postId: number, value: string) => {
    setCommentInputs(inputs => ({ ...inputs, [postId]: value }));
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Technology': '#4f46e5',
      'Education': '#10b981',
      'Storage': '#f59e0b',
      'Discussion': '#ef4444',
      'Market': '#8b5cf6',
      'Health': '#ec4899',
      'General': '#6b7280'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className={isMobile ? "forum-page mobile" : "forum-page"}>
      <main className={isMobile ? "forum-main mobile" : "forum-main"}>
        {/* Header */}
        <div className={isMobile ? "forum-header mobile" : "forum-header"}>
          <div className="forum-title-section">
            <h1>Durian Community Forum</h1>
            <p className="forum-subtitle">Connect, share, and learn with durian enthusiasts worldwide</p>
          </div>
          
          <div className="forum-stats">
            <div className="stat">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">Total Posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{posts.reduce((acc, post) => acc + post.comments, 0)}</span>
              <span className="stat-label">Comments</span>
            </div>
            <div className="stat">
              <span className="stat-number">{posts.reduce((acc, post) => acc + post.upvotes, 0)}</span>
              <span className="stat-label">Upvotes</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="forum-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>

          <button 
            className="create-post-button"
            onClick={() => setShowNewPostForm(true)}
          >
            + Create New Post
          </button>
        </div>

        {/* Categories */}
        <div className="forum-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              style={activeCategory === category ? { 
                backgroundColor: getCategoryColor(category),
                borderColor: getCategoryColor(category)
              } : {}}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div className="forum-loading">
            <div className="loading-spinner"></div>
            <p>Loading community posts...</p>
          </div>
        )}
        
        {error && (
          <div className="forum-error">
            <p>⚠️ {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {/* New Post Form */}
        {showNewPostForm && (
          <div className="new-post-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Create New Post</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowNewPostForm(false)}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmitPost}>
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter a descriptive title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  >
                    {categories.filter(c => c !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="content">Content *</label>
                  <textarea
                    id="content"
                    placeholder="Share your thoughts, questions, or insights..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows={6}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tags">Tags (comma separated)</label>
                  <input
                    id="tags"
                    type="text"
                    placeholder="e.g., quality, farming, storage"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setShowNewPostForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
          <>
            {filteredPosts.length === 0 ? (
              <div className="forum-empty">
                <div className="empty-icon">🍈</div>
                <h3>No posts found</h3>
                <p>Try a different search term or create the first post in this category!</p>
                <button 
                  className="create-post-button"
                  onClick={() => setShowNewPostForm(true)}
                >
                  Create First Post
                </button>
              </div>
            ) : (
              <div className="forum-posts">
                {filteredPosts.map(post => (
                  <div className="forum-post" key={post.id}>
                    <div className="post-votes">
                      <button 
                        className={`upvote-button${post.upvoters && userId && post.upvoters.includes(userId) ? ' upvoted' : ''}`}
                        onClick={() => handleUpvote(post.id)}
                      >
                        ↑
                      </button>
                      <span className="upvote-count">{post.upvotes}</span>
                    </div>

                    <div className="post-content">
                      <div className="post-header">
                        <span 
                          className="post-category"
                          style={{ backgroundColor: getCategoryColor(post.category) }}
                        >
                          {post.category}
                        </span>
                        <h2 className="post-title">{post.title}</h2>
                      </div>

                      <p className="post-excerpt">{post.content}</p>

                      <div className="post-tags">
                        {(post.tags || []).map(tag => (
                          <span key={tag} className="post-tag">#{tag}</span>
                        ))}
                      </div>

                      <div className="post-footer">
                        <div className="post-meta">
                          <span className="post-author">👤 {post.author}</span>
                          <span className="post-date">📅 {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}</span>
                        </div>
                        
                        <div className="post-stats">
                          <span className="post-comments">💬 {post.comments} comments</span>
                        </div>
                      </div>

                      <div className="post-comments-section">
                        <div className="comments-list">
                          {(post.comment_list || []).map((c, idx) => (
                            <div key={idx} className="comment-item">
                              <span className="comment-author">{c.author}</span>
                              <span className="comment-date">{new Date(c.date).toLocaleDateString()}</span>
                              <div className="comment-content">{c.content}</div>
                            </div>
                          ))}
                        </div>
                        <div className="comment-form">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentInputs[post.id] || ''}
                            onChange={e => handleCommentChange(post.id, e.target.value)}
                            disabled={commentLoading[post.id]}
                            className="comment-input"
                          />
                          <button
                            onClick={() => handleSubmitComment(post.id)}
                            disabled={commentLoading[post.id] || !(commentInputs[post.id] || '').trim()}
                            className="comment-submit"
                          >
                            {commentLoading[post.id] ? 'Posting...' : 'Post'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Featured Topics */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="featured-topics">
            <h2>🔥 Trending Topics</h2>
            <div className="topics-grid">
              {posts
                .sort((a, b) => b.upvotes - a.upvotes)
                .slice(0, 3)
                .map(post => (
                  <div key={post.id} className="topic-card">
                    <span 
                      className="topic-category"
                      style={{ backgroundColor: getCategoryColor(post.category) }}
                    >
                      {post.category}
                    </span>
                    <h3>{post.title}</h3>
                    <div className="topic-meta">
                      <span>{post.upvotes} upvotes</span>
                      <span>•</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Forum;
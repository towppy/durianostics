import React, { useState, useEffect } from 'react';
import '../../styles/Forum.css';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
}

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/forum/posts'); // Replace with your API
        if (!res.ok) throw new Error('Failed to fetch forum posts');
        const data: ForumPost[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="forum-page">
     

      <main className="forum-main">
        <h1>Forum</h1>

        {loading && <p className="forum-loading">Loading posts...</p>}
        {error && <p className="forum-error">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="forum-empty">No posts yet. Be the first to create one!</p>
        )}

        <div className="forum-posts">
          {posts.map(post => (
            <div className="forum-post" key={post.id}>
              <h2 className="post-title">{post.title}</h2>
              <div className="post-meta">
                <span className="post-author">{post.author}</span> |{' '}
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <p className="post-content">{post.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Forum;

from flask import Blueprint, jsonify, request
from pymongo import MongoClient
import os
from datetime import datetime

forum_bp = Blueprint('forum', __name__)

# MongoDB setup
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["durianostics"]
posts_collection = db["forum_posts"]

@forum_bp.route('/posts', methods=['GET'])
def get_posts():
    posts = []
    for post in posts_collection.find():
        post['_id'] = str(post['_id'])
        posts.append(post)
    return jsonify(posts)

@forum_bp.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    post = {
        'id': int(datetime.utcnow().timestamp()),
        'title': data.get('title'),
        'author': data.get('author'),
        'date': datetime.utcnow().isoformat(),
        'content': data.get('content')
    }
    result = posts_collection.insert_one(post)
    post['_id'] = str(result.inserted_id)
    return jsonify({'msg': 'Post created', 'post': post}), 201

@forum_bp.route('/posts/<int:post_id>/upvote', methods=['POST'])
def upvote_post(post_id):
    data = request.get_json()
    user_id = data.get('user_id')
    remove = data.get('remove', False)
    if not user_id:
        return jsonify({'error': 'User ID required'}), 400
    post = posts_collection.find_one({'id': post_id})
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    upvoters = post.get('upvoters', [])
    upvotes = post.get('upvotes', 0)
    if remove:
        if user_id in upvoters:
            upvoters.remove(user_id)
            upvotes = max(0, upvotes - 1)
    else:
        if user_id in upvoters:
            return jsonify({'error': 'Already upvoted', 'upvotes': upvotes, 'upvoters': upvoters}), 403
        upvoters.append(user_id)
        upvotes += 1
    posts_collection.update_one({'id': post_id}, {'$set': {'upvotes': upvotes, 'upvoters': upvoters}})
    return jsonify({'msg': 'Upvote updated', 'upvotes': upvotes, 'upvoters': upvoters})

@forum_bp.route('/posts/<int:post_id>/comment', methods=['POST'])
def comment_post(post_id):
    data = request.get_json()
    author = data.get('author')
    content = data.get('content')
    if not author or not content:
        return jsonify({'error': 'Author and content required'}), 400
    post = posts_collection.find_one({'id': post_id})
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    comment = {
        'author': author,
        'content': content,
        'date': datetime.utcnow().isoformat()
    }
    comment_list = post.get('comment_list', [])
    comment_list.append(comment)
    comments = post.get('comments', 0) + 1
    posts_collection.update_one({'id': post_id}, {'$set': {'comment_list': comment_list, 'comments': comments}})
    return jsonify({'msg': 'Comment added', 'comments': comments, 'comment_list': comment_list})

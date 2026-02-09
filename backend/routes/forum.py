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

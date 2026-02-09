from flask import Blueprint, request, jsonify, current_app, url_for
from pymongo import MongoClient
from passlib.hash import argon2
from jose import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from flask_mail import Mail
import cloudinary.uploader
from .email_utils import send_verification_email

load_dotenv()

auth_bp = Blueprint('auth', __name__)
mail = Mail()

MONGO_URI = os.getenv("MONGO_URI")
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", 24))

client = MongoClient(MONGO_URI)
db = client["durianostics"]
users_collection = db["users"]

# Cloudinary config
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Flask-Mail config
def init_mail(app):
    app.config['MAIL_SERVER'] = os.getenv('MAIL_HOST')
    app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_DEFAULT_SENDER'] = (os.getenv('MAIL_FROM_NAME'), os.getenv('MAIL_FROM_ADDRESS'))
    mail.init_app(app)


@auth_bp.route('/signup', methods=['POST'])
def signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    image = request.files.get('image')
    if not name or not email or not password or not image:
        return jsonify({'error': 'All fields required'}), 400
    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 400
    # Upload image to Cloudinary
    upload_result = cloudinary.uploader.upload(image)
    image_url = upload_result.get('secure_url')
    # Hash password
    hashed_password = argon2.hash(password)
    # Save user (unverified)
    user = {
        'name': name,
        'email': email,
        'hashed_password': hashed_password,
        'image_url': image_url,
        'is_verified': False
    }
    users_collection.insert_one(user)
    # Send verification email
    send_verification_email(mail, user, JWT_SECRET, JWT_ALGORITHM)
    return jsonify({'msg': 'User created. Please check your email to verify.'}), 201

@auth_bp.route('/verify-email/<token>', methods=['GET'])
def verify_email(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload['email']
        user = users_collection.find_one({'email': email})
        if not user:
            return 'Invalid verification link.', 400
        if user.get('is_verified'):
            return 'Email already verified.'
        users_collection.update_one({'email': email}, {'$set': {'is_verified': True}})
        return 'Email verified successfully!'
    except Exception as e:
        return f'Invalid or expired token: {str(e)}', 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('username')
    password = data.get('password')
    user = users_collection.find_one({'email': email})
    if not user or not argon2.verify(password, user['hashed_password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    if not user.get('is_verified'):
        return jsonify({'error': 'Please verify your email before logging in.'}), 401
    payload = {
        'sub': email,
        'exp': datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS),
        'user': {
            'name': user.get('name'),
            'email': user.get('email'),
            'image_url': user.get('image_url')
        }
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return jsonify({'access_token': token, 'user': payload['user'], 'token_type': 'bearer'})

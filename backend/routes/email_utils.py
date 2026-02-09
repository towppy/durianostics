from flask_mail import Message
from flask import url_for, current_app
from jose import jwt
from datetime import datetime, timedelta
import os

def send_verification_email(mail, user, jwt_secret, jwt_algorithm):
    token = jwt.encode({
        'email': user['email'],
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, jwt_secret, algorithm=jwt_algorithm)
    verify_url = url_for('auth.verify_email', token=token, _external=True)
    msg = Message('Verify your email', recipients=[user['email']])
    msg.body = f"Hi {user['name']}, click the link to verify your email: {verify_url}"
    msg.html = f'''
    <html>
      <head>
        <style>
          .verify-btn {{
            background: #4f8cff;
            color: #fff;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            margin-top: 16px;
          }}
          .verify-container {{
            max-width: 420px;
            margin: 40px auto;
            padding: 32px 24px;
            background: #f9f9f9;
            border-radius: 12px;
            font-family: Arial, sans-serif;
            text-align: center;
            box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          }}
        </style>
      </head>
      <body>
        <div class="verify-container">
          <h2>Welcome to Durianostics, {user['name']}!</h2>
          <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
          <a href="{verify_url}" class="verify-btn">Verify Email</a>
          <p style="margin-top:24px;color:#888;font-size:13px;">If you did not sign up, you can ignore this email.</p>
        </div>
      </body>
    </html>
    '''
    mail.send(msg)

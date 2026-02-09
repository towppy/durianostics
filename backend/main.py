from flask import Flask
from routes.auth import auth_bp, init_mail

from flask_cors import CORS



app = Flask(__name__)
CORS(app)
init_mail(app)
app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == "__main__":
	app.run(debug=True)

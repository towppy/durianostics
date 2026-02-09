
from dotenv import load_dotenv
load_dotenv(dotenv_path='.env')
from flask import Flask
from routes.auth import auth_bp, init_mail
from routes.chatbot import chatbot_bp
from flask_cors import CORS, cross_origin




from flask import request


app = Flask(__name__)
# Maximum permissive CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, allow_headers=["Content-Type", "Authorization"], expose_headers=["Content-Type", "Authorization"], methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"])
init_mail(app)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(chatbot_bp, url_prefix='/api')

# Ensure all OPTIONS requests get a valid response
@app.route('/<path:path>', methods=['OPTIONS'])
def options_handler(path):
	from flask import make_response
	response = make_response()
	response.headers['Access-Control-Allow-Origin'] = '*'
	response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
	response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
	response.headers['Access-Control-Allow-Credentials'] = 'true'
	return response

# Log all incoming requests for debugging
@app.before_request
def log_request_info():
	print(f"Request: {request.method} {request.path}")
	print(f"Headers: {dict(request.headers)}")
	print(f"Body: {request.get_data()}")

if __name__ == "__main__":
	app.run(debug=True)

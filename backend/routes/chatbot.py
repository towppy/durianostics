from flask import Blueprint, request, jsonify
import requests
import os

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/chatbot/ask', methods=['POST'])
def ask_groq():
    try:
        data = request.json
        user_messages = data.get('messages', [])
        
        # Get Groq API key from environment
        api_key = os.getenv('GROQ_API_KEY')
        if not api_key:
            return jsonify({
                'success': False,
                'error': 'GROQ_API_KEY not configured'
            }), 500

        # System prompt for durian diagnostics
        system_prompt = {
            'role': 'system',
            'content': (
                "You are a Durian Diagnostics Assistant. "
                "Answer user questions about durians including types, ripeness, quality, "
                "handling, storage, and consumption. "
                "Provide clear, accurate, and friendly guidance. "
                "If unsure, explain what information is missing or how to check."
            )
        }

        # Prepend the system message to the user's conversation
        messages = [system_prompt] + user_messages

        # Call Groq API
        response = requests.post(
            'https://api.groq.com/openai/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'llama-3.1-8b-instant',
                'messages': messages,
                'max_tokens': 1000,
                'temperature': 0.7
            },
            timeout=30
        )

        if response.status_code == 200:
            result = response.json()
            return jsonify({
                'success': True,
                'message': result['choices'][0]['message']['content']
            })
        else:
            # Print Groq API error response for debugging
            print(f"[GROQ ERROR] Status: {response.status_code}")
            print(f"[GROQ ERROR] Body: {response.text}")
            return jsonify({
                'success': False,
                'error': f'Groq API error: {response.status_code}',
                'groq_error': response.text
            }), response.status_code

    except Exception as e:
        print(f'[ERROR] Chat error: {str(e)}')
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

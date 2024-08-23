from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv

# Załaduj zmienne z pliku .env, jeśli istnieje
load_dotenv()

app = Flask(__name__)

# Pobierz klucz API z pliku .env lub zmiennych środowiskowych
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    
    # Generowanie odpowiedzi z GPT-3.5
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"User: {user_input}\nAI:",
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7,
    )
    
    ai_response = response.choices[0].text.strip()
    
    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

CORRECT_USERNAME = 'admin'
CORRECT_PASSWORD = '7860sErtk12'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data:
        return jsonify({'success': False, 'message': 'Неверный формат данных'}), 400
    
    username = data.get('username', '').strip()
    password = data.get('password', '')
    
    if username == CORRECT_USERNAME and password == CORRECT_PASSWORD:
        return jsonify({
            'success': True,
            'message': 'Успешная авторизация!',
            'flag': 'FLAG{you_found_the_meta_credentials}',
            'timestamp': datetime.now().isoformat()
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Неправильное имя пользователя или пароль'
        }), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)

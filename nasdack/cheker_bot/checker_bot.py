from flask import Flask, request, jsonify
import requests
from concurrent.futures import ThreadPoolExecutor
import logging
from logging.handlers import RotatingFileHandler
from telegram import Bot

app = Flask(__name__)
executor = ThreadPoolExecutor(max_workers=10)

BOT_TOKEN = '7219512957:AAFkQkjaLx4WkZSJkwZ2R_gyqS3C0UCrj4I'
ADMIN_CHAT_ID = 'ADMIN_CHAT_ID'  # Telegram ID администратора
TELEGRAM_BOT = Bot(token=BOT_TOKEN)

# Настройка логирования
handler = RotatingFileHandler('checker_bot.log', maxBytes=10000000, backupCount=5)
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
handler.setFormatter(formatter)
app.logger.addHandler(handler)
app.logger.setLevel(logging.INFO)

def send_admin_notification(message):
    try:
        TELEGRAM_BOT.send_message(chat_id=ADMIN_CHAT_ID, text=message)
    except Exception as e:
        app.logger.error(f"Failed to send admin notification: {e}")

def check_subscription(channel, user_id):
    try:
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/getChatMember"
        params = {
            'chat_id': channel,
            'user_id': user_id
        }
        response = requests.get(url, params=params)
        data = response.json()
        app.logger.info(f"Check subscription response: {data}")

        if data['ok']:
            status = data['result']['status']
            return status in ['member', 'administrator', 'creator']
        return False
    except Exception as e:
        app.logger.error(f"Error checking subscription: {e}")
        send_admin_notification(f"Error checking subscription for user {user_id} in channel {channel}: {e}")
        return False

@app.route('/check-subscription', methods=['POST'])
def handle_check_subscription():
    try:
        data = request.get_json()
        app.logger.info(f"Received data: {data}")
        channel = data.get('channel')
        user_id = data.get('user_id')
        if not channel or not user_id:
            app.logger.warning("Channel or user_id missing in request")
            return jsonify({'error': 'Channel and user_id are required'}), 400

        future = executor.submit(check_subscription, channel, user_id)
        is_subscribed = future.result()
        app.logger.info(f"User {user_id} subscription status in channel {channel}: {is_subscribed}")

        return jsonify({'subscribed': is_subscribed})
    except Exception as e:
        app.logger.error(f"Error in handle_check_subscription: {e}")
        send_admin_notification(f"Error in handle_check_subscription: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(500)
def handle_500_error(exception):
    app.logger.error(f"Server error: {exception}")
    send_admin_notification(f"Server error: {exception}")
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(404)
def handle_404_error(exception):
    app.logger.warning(f"Page not found: {request.url}")
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

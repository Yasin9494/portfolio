import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, CallbackContext
import sqlite3

def init_db():
    conn = sqlite3.connect('bot_users.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE,
            username TEXT,
            first_name TEXT,
            last_name TEXT
        )
    ''')
    conn.commit()
    conn.close()

def add_user(user_id, username, first_name, last_name):
    conn = sqlite3.connect('bot_users.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR IGNORE INTO users (user_id, username, first_name, last_name)
        VALUES (?, ?, ?, ?)
    ''', (user_id, username, first_name, last_name))
    conn.commit()
    conn.close()

async def start(update: Update, context: CallbackContext) -> None:
    user = update.effective_user
    add_user(user.id, user.username, user.first_name, user.last_name)
    keyboard = [
        [InlineKeyboardButton("Перейти к веб-аппу", web_app=WebAppInfo(url="https://app.nasduck.net"))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(f'Привет, {user.first_name}! Нажмите кнопку чтобы перейти к веб-аппу:', reply_markup=reply_markup)

def main() -> None:
    application = Application.builder().token("7262773857:AAHMgdQiUT4Z5eWuMpQLTm1ow94DZrrAzlQ").build()
    application.add_handler(CommandHandler("start", start))
    application.run_polling()

if __name__ == '__main__':
    init_db()
    main()

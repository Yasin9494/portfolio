<?php
// Файл config.php

// Настройки подключения к базе данных
define('DB_HOST', 'localhost'); // Хост базы данных
define('DB_NAME', 'default_db'); // Имя базы данных
define('DB_USER', 'gen_user');   // Имя пользователя базы данных
define('DB_PASS', '290lCx8|3_2:nu'); // Пароль пользователя

// Подключение к базе данных PostgreSQL с использованием PDO
try {
    $pdo = new PDO("pgsql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    // Настройка PDO на выброс исключений при ошибках
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // В случае ошибки подключения вывести сообщение
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}

<?php

require_once __DIR__ . '/../config.php';

try {
    $pdo = new PDO("pgsql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    // Настройка PDO на выброс исключений при ошибках
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // В случае ошибки подключения выводим сообщение и завершаем скрипт
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}
?>

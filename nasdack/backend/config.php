<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'usbd');
define('DB_USER', 'usbd');
define('DB_PASS', '*Ufzu_l!f0TDS!Hd');
define('JWT_SECRET', 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxODkxNjM2NywiaWF0IjoxNzE4OTE2MzY3fQ.NGWDHuHmc1q_YI-WSB0tJq_t6B7OPcxPRYhgziSbRZI'); 
define('LOG_FILE', __DIR__ . '/logs/app.log');

function getDatabaseConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_PERSISTENT => true
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        logError("Database connection failed: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit();
    }
}

function logError($message) {
    error_log($message, 3, LOG_FILE);
}

function logInfo($message) {
    error_log($message, 3, LOG_FILE);
}
?>

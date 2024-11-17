<?php
require_once __DIR__ . '/../models/Database.php';
require_once __DIR__ . '/../vendor/autoload.php';

use \Firebase\JWT\JWT;

class AuthController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function registerUser($data) {
        try {
            $stmt = $this->db->prepare("INSERT INTO users (telegram_id, username, first_name, last_name, photo_url, balance, registration_time, last_login, total_play_time) VALUES (:telegram_id, :username, :first_name, :last_name, :photo_url, 0.00, CURRENT_TIMESTAMP, NULL, 0)");
            $stmt->execute([
                'telegram_id' => $data['id'],
                'username' => $data['username'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'photo_url' => $data['photo_url']
            ]);
        } catch (PDOException $e) {
            logError("Failed to register user: " . $e->getMessage());
            throw new Exception("Failed to register user");
        }
    }

    public function loginUser($data) {
        $payload = [
            'iss' => 'https://tg.nasduck.net/', // Issuer
            'aud' => 'https://tg.nasduck.net/', // Audience
            'iat' => time(), // Issued at
            'nbf' => time(), // Not before
            'exp' => time() + (60 * 60), // Expiration time
            'data' => [
                'telegram_id' => $data['id'],
                'username' => $data['username']
            ]
        ];

        $jwt = JWT::encode($payload, JWT_SECRET, 'HS256');
        return $jwt;
    }

    public function checkSubscription($channel, $userId) {
        $url = 'http://localhost:5000/check-subscription';
        $data = json_encode(['channel' => $channel, 'user_id' => $userId]);

        $options = [
            'http' => [
                'header'  => "Content-type: application/json\r\n",
                'method'  => 'POST',
                'content' => $data,
                'timeout' => 5
            ],
        ];
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        if ($result === FALSE) {
            logError("Failed to check subscription for user {$userId} in channel {$channel}");
            return false;
        }
        $response = json_decode($result, true);
        return $response['subscribed'];
    }

    public function verifyToken($token) {
        try {
            $decoded = JWT::decode($token, JWT_SECRET, array('HS256'));
            return (array) $decoded->data;
        } catch (Exception $e) {
            logError("Token verification failed: " . $e->getMessage());
            return false;
        }
    }
}
?>

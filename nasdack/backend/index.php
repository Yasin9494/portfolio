<?php
header('Content-Type: application/json');
require 'config.php';
require 'controllers/AuthController.php';

$authController = new AuthController();

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

try {
    switch ($requestUri) {
        case '/auth':
            if ($requestMethod === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                $authController->registerUser($data);
                logInfo("User registered: " . json_encode($data));
                echo json_encode(['message' => 'User registered successfully']);
            } else {
                http_response_code(405);
                echo json_encode(['message' => 'Method not allowed']);
            }
            break;

        case '/check-subscription':
            if ($requestMethod === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                $channel = '@pronfti';  // channel name
                $isSubscribed = $authController->checkSubscription($channel, $data['userId']);
                logInfo("Subscription check for user {$data['userId']} in channel {$channel}: " . ($isSubscribed ? 'subscribed' : 'not subscribed'));
                echo json_encode(['subscribed' => $isSubscribed]);
            } else {
                http_response_code(405);
                echo json_encode(['message' => 'Method not allowed']);
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['message' => 'Not Found']);
            break;
    }
} catch (Exception $e) {
    logError("An error occurred: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An internal server error occurred']);
}
?>

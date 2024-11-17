<?php
require_once 'db.php';

// Логируем начало выполнения
error_log("Starting update_balance.php...");

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['user_id'], $data['amount'], $data['action']) && is_numeric($data['amount'])) {
    $userId = (int)$data['user_id'];
    $amount = (int)$data['amount'];
    $action = $data['action'];

    error_log("Received data: user_id = $userId, amount = $amount, action = $action");

    if ($amount <= 0) {
        echo json_encode(['success' => false, 'message' => 'Сумма должна быть положительной.']);
        exit;
    }

    if ($action === 'add') {
        $stmt = $pdo->prepare("UPDATE main SET wallet = wallet + :amount WHERE user_id = :user_id");
        $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
            error_log("Balance added successfully.");
        } else {
            echo json_encode(['success' => false, 'message' => 'Ошибка при добавлении баланса.']);
            error_log("Error adding balance.");
        }
    } elseif ($action === 'subtract') {
        $stmt = $pdo->prepare("SELECT wallet FROM main WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        $currentBalance = $stmt->fetchColumn();

        if ($currentBalance < $amount) {
            echo json_encode(['success' => false, 'message' => 'Недостаточно средств на балансе.']);
            error_log("Insufficient balance.");
        } else {
            $stmt = $pdo->prepare("UPDATE main SET wallet = wallet - :amount WHERE user_id = :user_id");
            $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
                error_log("Balance subtracted successfully.");
            } else {
                echo json_encode(['success' => false, 'message' => 'Ошибка при отнятии баланса.']);
                error_log("Error subtracting balance.");
            }
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Неизвестное действие.']);
        error_log("Unknown action.");
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неверные данные.']);
    error_log("Invalid data received.");
}
?>

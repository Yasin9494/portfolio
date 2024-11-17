<?php
// login.php

session_start();
require_once 'inc/db.php'; // Подключаем базу данных

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Проверка в базе данных
    $stmt = $pdo->prepare('SELECT * FROM admin_users WHERE username = :username');
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Если пользователь найден и пароль совпадает
    if ($user && password_verify($password, $user['password'])) {
        // Сохраняем информацию о входе
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['username'] = $user['username'];

        // Перенаправляем на дашборд
        header('Location: index.php');
        exit;
    } else {
        $error = 'Неверный логин или пароль.';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Suntap Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="col-md-4">
            <h2 class="text-center mb-4">Admin Login</h2>
            <form action="login.php" method="POST">
                <?php if ($error): ?>
                    <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
                <?php endif; ?>
                <div class="mb-3">
                    <label for="username" class="form-label">Логин</label>
                    <input type="text" class="form-control" id="username" name="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Пароль</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Войти</button>
            </form>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

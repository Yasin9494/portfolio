<?php
// users.php

require_once 'inc/header.php';
require_once 'inc/db.php';

// Параметры пагинации
$limit = 20;
$page = isset($_GET['page']) && is_numeric($_GET['page']) ? $_GET['page'] : 1;
$offset = ($page - 1) * $limit;

// Фильтрация по ID или username
$filter = isset($_GET['filter']) ? $_GET['filter'] : '';
$filterQuery = '';
if (!empty($filter)) {
    $filterQuery = "WHERE telegram_username ILIKE :filter OR user_id::text ILIKE :filter";
}

// Получаем пользователей с учетом фильтрации и пагинации
$query = "SELECT user_id, telegram_username, wallet, is_premium, registration_date 
          FROM main $filterQuery 
          ORDER BY registration_date DESC 
          LIMIT :limit OFFSET :offset";

$stmt = $pdo->prepare($query);

if (!empty($filter)) {
    $stmt->bindValue(':filter', '%' . $filter . '%', PDO::PARAM_STR);
}
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Получаем общее количество пользователей для пагинации
$countQuery = "SELECT COUNT(*) FROM main $filterQuery";
$countStmt = $pdo->prepare($countQuery);

if (!empty($filter)) {
    $countStmt->bindValue(':filter', '%' . $filter . '%', PDO::PARAM_STR);
}
$countStmt->execute();
$totalUsers = $countStmt->fetchColumn();
$totalPages = ceil($totalUsers / $limit);
?>

<h2>Пользователи</h2>

<!-- Уведомления -->
<div id="alert-container" class="mb-4"></div>

<!-- Фильтр -->
<form method="GET" class="mb-4">
    <div class="input-group">
        <input type="text" name="filter" class="form-control" placeholder="Поиск по ID или Логину" value="<?= htmlspecialchars($filter); ?>">
        <button class="btn btn-primary" type="submit">Искать</button>
    </div>
</form>

<!-- Таблица пользователей -->
<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Логин в Telegram</th>
            <th>Баланс (монеты)</th>
            <th>Премиум статус</th>
            <th>Дата регистрации</th>
            <th>Действия</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($users as $user): ?>
        <tr>
            <td><?= htmlspecialchars($user['user_id']); ?></td>
            <td><?= htmlspecialchars($user['telegram_username'] ?: 'Не указано'); ?></td>
            <td><?= htmlspecialchars($user['wallet']); ?></td>
            <td><?= $user['is_premium'] ? 'Да' : 'Нет'; ?></td>
            <td><?= htmlspecialchars($user['registration_date']); ?></td>
            <td>
                <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#addBalanceModal" data-userid="<?= $user['user_id']; ?>">Добавить баланс</button>
                <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#subtractBalanceModal" data-userid="<?= $user['user_id']; ?>">Отнять баланс</button>
            </td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<!-- Пагинация -->
<nav>
    <ul class="pagination">
        <?php for ($i = 1; $i <= $totalPages; $i++): ?>
            <li class="page-item <?= ($i == $page) ? 'active' : ''; ?>">
                <a class="page-link" href="?page=<?= $i ?>&filter=<?= htmlspecialchars($filter); ?>"><?= $i ?></a>
            </li>
        <?php endfor; ?>
    </ul>
</nav>

<!-- Модальные окна -->
<!-- Модальное окно добавления баланса -->
<div class="modal fade" id="addBalanceModal" tabindex="-1" aria-labelledby="addBalanceModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addBalanceModalLabel">Добавить баланс</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="addBalanceForm">
                    <input type="hidden" name="user_id" id="addUserId">
                    <div class="mb-3">
                        <label for="addAmount" class="form-label">Сумма</label>
                        <input type="number" class="form-control" id="addAmount" name="amount" required>
                    </div>
                    <button type="submit" class="btn btn-success">Добавить</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Модальное окно отнятия баланса -->
<div class="modal fade" id="subtractBalanceModal" tabindex="-1" aria-labelledby="subtractBalanceModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="subtractBalanceModalLabel">Отнять баланс</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="subtractBalanceForm">
                    <input type="hidden" name="user_id" id="subtractUserId">
                    <div class="mb-3">
                        <label for="subtractAmount" class="form-label">Сумма</label>
                        <input type="number" class="form-control" id="subtractAmount" name="amount" required>
                    </div>
                    <button type="submit" class="btn btn-danger">Отнять</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
// Передача user_id в модальные окна
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(function(element) {
    element.addEventListener('click', function() {
        const userId = this.getAttribute('data-userid');
        if (this.getAttribute('data-bs-target') === '#addBalanceModal') {
            document.getElementById('addUserId').value = userId;
        } else if (this.getAttribute('data-bs-target') === '#subtractBalanceModal') {
            document.getElementById('subtractUserId').value = userId;
        }
    });
});

// Функция для отображения уведомления
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alert);
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('hide');
    }, 3000);
}

// Добавление баланса
document.getElementById('addBalanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('addUserId').value;
    const amount = document.getElementById('addAmount').value;

    fetch('inc/update_balance.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, amount: amount, action: 'add' })
    }).then(response => response.json()).then(data => {
        if (data.success) {
            showAlert('Баланс успешно добавлен.', 'success');
            setTimeout(() => location.reload(), 1500);
        } else {
            showAlert(data.message || 'Ошибка при добавлении баланса', 'danger');
        }
    });
});

// Отнятие баланса
document.getElementById('subtractBalanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('subtractUserId').value;
    const amount = document.getElementById('subtractAmount').value;

    fetch('inc/update_balance.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, amount: amount, action: 'subtract' })
    }).then(response => response.json()).then(data => {
        if (data.success) {
            showAlert('Баланс успешно отнят.', 'success');
            setTimeout(() => location.reload(), 1500);
        } else {
            showAlert(data.message || 'Ошибка при отнятии баланса', 'danger');
        }
    });
});
</script>

<?php require_once 'inc/footer.php'; ?>

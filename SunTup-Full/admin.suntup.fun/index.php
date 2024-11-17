<?php
// index.php (Dashboard)

require_once 'inc/header.php'; // Подключаем шапку
require_once 'inc/db.php'; // Подключаем базу данных

// Получаем количество пользователей
$userCountQuery = $pdo->query("SELECT COUNT(*) FROM main");
$userCount = $userCountQuery->fetchColumn();

// Получаем количество выполненных заданий
$completedTasksQuery = $pdo->query("SELECT COUNT(*) FROM user_tasks WHERE completed = true");
$completedTasks = $completedTasksQuery->fetchColumn();

// Получаем количество регистраций за каждый день (за последнюю неделю)
$dailyRegistrationsQuery = $pdo->query("
    SELECT to_char(registration_date, 'YYYY-MM-DD') AS reg_date, COUNT(*) AS total 
    FROM main 
    WHERE registration_date >= NOW() - INTERVAL '7 days'
    GROUP BY reg_date
    ORDER BY reg_date
");
$dailyRegistrations = $dailyRegistrationsQuery->fetchAll(PDO::FETCH_ASSOC);

$days = [];
$dailyCounts = [];
foreach ($dailyRegistrations as $day) {
    $days[] = $day['reg_date'];
    $dailyCounts[] = $day['total'];
}

// Получаем количество регистраций по неделям (за последний месяц)
$weeklyRegistrationsQuery = $pdo->query("
    SELECT to_char(registration_date, 'IYYY-IW') AS week, COUNT(*) AS total 
    FROM main 
    WHERE registration_date >= NOW() - INTERVAL '1 month'
    GROUP BY week
    ORDER BY week
");
$weeklyRegistrations = $weeklyRegistrationsQuery->fetchAll(PDO::FETCH_ASSOC);

$weeks = [];
$weeklyCounts = [];
foreach ($weeklyRegistrations as $week) {
    $weeks[] = $week['week'];
    $weeklyCounts[] = $week['total'];
}

// Получаем количество активных пользователей
$activeUsersQuery = $pdo->query("SELECT COUNT(DISTINCT user_id) FROM user_tasks WHERE completed = true");
$activeUsers = $activeUsersQuery->fetchColumn();

// Получаем количество премиум-пользователей
$premiumUsersQuery = $pdo->query("SELECT COUNT(*) FROM main WHERE is_premium = true");
$premiumUsers = $premiumUsersQuery->fetchColumn();

// Получаем последние выполненные задачи
$completedTasksListQuery = $pdo->query("
    SELECT u.telegram_username, t.description, ut.completed 
    FROM user_tasks ut
    JOIN main u ON ut.user_id = u.user_id
    JOIN tasks t ON ut.task_id = t.id
    WHERE ut.completed = true
    ORDER BY ut.task_id DESC
    LIMIT 10
");
$completedTasksList = $completedTasksListQuery->fetchAll(PDO::FETCH_ASSOC);

?>

<h2>Дашборд</h2>
<div class="row mt-4">
    <div class="col-md-4">
        <div class="card text-white bg-primary mb-3">
            <div class="card-header">Пользователи</div>
            <div class="card-body">
                <h5 class="card-title"><?= $userCount ?></h5>
                <p class="card-text">Всего зарегистрированных пользователей.</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card text-white bg-success mb-3">
            <div class="card-header">Задания</div>
            <div class="card-body">
                <h5 class="card-title"><?= $completedTasks ?></h5>
                <p class="card-text">Всего выполненных заданий.</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card text-white bg-warning mb-3">
            <div class="card-header">Активные пользователи</div>
            <div class="card-body">
                <h5 class="card-title"><?= $activeUsers ?></h5>
                <p class="card-text">Пользователи, выполнившие хотя бы одно задание.</p>
            </div>
        </div>
    </div>
</div>

<!-- График регистраций по дням -->
<div class="row mt-4">
    <div class="col-md-6">
        <h3>Регистрации по дням (последняя неделя)</h3>
        <canvas id="dailyChart"></canvas>
    </div>
    <div class="col-md-6">
        <h3>Регистрации по неделям (последний месяц)</h3>
        <canvas id="weeklyChart"></canvas>
    </div>
</div>

<!-- Графики пользователей -->
<div class="row mt-4">
    <div class="col-md-6">
        <h3>Премиум-пользователи</h3>
        <canvas id="premiumChart"></canvas>
    </div>
    <div class="col-md-6">
        <h3>Активные пользователи</h3>
        <canvas id="activeChart"></canvas>
    </div>
</div>

<!-- Список выполненных заданий -->
<div class="row mt-4">
    <h3>Последние задания пользователей</h3>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Логин</th>
                <th>Задание</th>
                <th>Статус</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($completedTasksList as $task): ?>
                <tr>
                    <td><?= htmlspecialchars($task['telegram_username']) ?: 'Аноним' ?></td>
                    <td><?= htmlspecialchars($task['description']) ?></td>
                    <td><?= htmlspecialchars($task['status']) ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
// Данные для графика по дням
const dailyCtx = document.getElementById('dailyChart').getContext('2d');
const dailyChart = new Chart(dailyCtx, {
    type: 'line',
    data: {
        labels: <?= json_encode($days) ?>, 
        datasets: [{
            label: 'Регистрации',
            data: <?= json_encode($dailyCounts) ?>,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Дата' } },
            y: { title: { display: true, text: 'Количество' } }
        }
    }
});

// Данные для графика по неделям
const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
const weeklyChart = new Chart(weeklyCtx, {
    type: 'bar',
    data: {
        labels: <?= json_encode($weeks) ?>,
        datasets: [{
            label: 'Регистрации',
            data: <?= json_encode($weeklyCounts) ?>,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Неделя' } },
            y: { title: { display: true, text: 'Количество' } }
        }
    }
});

// График премиум-пользователей
const premiumCtx = document.getElementById('premiumChart').getContext('2d');
const premiumChart = new Chart(premiumCtx, {
    type: 'pie',
    data: {
        labels: ['Премиум', 'Обычные'],
        datasets: [{
            data: [<?= $premiumUsers ?>, <?= $userCount - $premiumUsers ?>],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});

// График активных пользователей
const activeCtx = document.getElementById('activeChart').getContext('2d');
const activeChart = new Chart(activeCtx, {
    type: 'doughnut',
    data: {
        labels: ['Активные', 'Неактивные'],
        datasets: [{
            data: [<?= $activeUsers ?>, <?= $userCount - $activeUsers ?>],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});
</script>

<?php require_once 'inc/footer.php'; ?>

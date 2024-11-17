<?php
// tasks.php

require_once 'inc/header.php'; // Подключаем шапку
require_once 'inc/db.php'; // Подключаем базу данных

// Обработка добавления задачи
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'add') {
        // Добавляем задачу
        $description = $_POST['description'];
        $link = $_POST['link'];
        $reward = $_POST['reward'];
        $icon_url = $_POST['icon_url'];

        $stmt = $pdo->prepare("INSERT INTO tasks (description, link, reward, icon_url) VALUES (:description, :link, :reward, :icon_url)");
        $stmt->execute([
            ':description' => $description,
            ':link' => $link,
            ':reward' => $reward,
            ':icon_url' => $icon_url
        ]);
    }

    if ($_POST['action'] === 'delete') {
        // Удаляем задачу
        $taskId = $_POST['task_id'];
        $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = :id");
        $stmt->execute([':id' => $taskId]);
    }

    // Перезагрузка страницы после добавления или удаления задачи
    header('Location: tasks.php');
    exit;
}

// Получаем все задания
$tasksQuery = $pdo->query("SELECT id, description, link, reward, icon_url FROM tasks");
$tasks = $tasksQuery->fetchAll(PDO::FETCH_ASSOC);

?>

<h2>Задания</h2>

<!-- Кнопка для добавления задания -->
<button class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#addTaskModal">Добавить задание</button>

<table class="table table-bordered mt-4">
    <thead>
        <tr>
            <th>ID</th>
            <th>Иконка</th>
            <th>Описание</th>
            <th>Ссылка</th>
            <th>Награда</th>
            <th>Действия</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($tasks as $task): ?>
        <tr>
            <td><?= htmlspecialchars($task['id']); ?></td>
            <td><img src="<?= htmlspecialchars($task['icon_url']); ?>" alt="Icon" width="40" height="40"></td>
            <td><?= htmlspecialchars($task['description']); ?></td>
            <td><a href="<?= htmlspecialchars($task['link']); ?>" target="_blank">Перейти</a></td>
            <td><?= htmlspecialchars($task['reward']); ?> монет</td>
            <td>
                <!-- Кнопка для удаления задания -->
                <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteTaskModal" data-taskid="<?= $task['id']; ?>">Удалить</button>
            </td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<!-- Модальное окно для добавления задания -->
<div class="modal fade" id="addTaskModal" tabindex="-1" aria-labelledby="addTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addTaskModalLabel">Добавить задание</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="tasks.php" method="POST">
                    <input type="hidden" name="action" value="add">
                    <div class="mb-3">
                        <label for="description" class="form-label">Описание</label>
                        <input type="text" class="form-control" id="description" name="description" required>
                    </div>
                    <div class="mb-3">
                        <label for="link" class="form-label">Ссылка</label>
                        <input type="url" class="form-control" id="link" name="link" required>
                    </div>
                    <div class="mb-3">
                        <label for="reward" class="form-label">Награда (монеты)</label>
                        <input type="number" class="form-control" id="reward" name="reward" required>
                    </div>
                    <div class="mb-3">
                        <label for="icon_url" class="form-label">Ссылка на иконку</label>
                        <input type="text" class="form-control" id="icon_url" name="icon_url" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Добавить</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Модальное окно для удаления задания -->
<div class="modal fade" id="deleteTaskModal" tabindex="-1" aria-labelledby="deleteTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteTaskModalLabel">Удалить задание</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Вы уверены, что хотите удалить это задание?
                <form action="tasks.php" method="POST">
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="task_id" id="deleteTaskId">
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                        <button type="submit" class="btn btn-danger">Удалить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
// Передача task_id в модальное окно удаления
document.querySelectorAll('[data-bs-target="#deleteTaskModal"]').forEach(button => {
    button.addEventListener('click', function() {
        const taskId = this.getAttribute('data-taskid');
        document.getElementById('deleteTaskId').value = taskId;
    });
});
</script>

<?php require_once 'inc/footer.php'; ?>

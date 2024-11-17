<?php
// logout.php
session_start();
session_unset();
session_destroy();

// Перенаправляем на страницу входа
header('Location: login.php');
exit;

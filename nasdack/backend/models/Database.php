<?php
require_once __DIR__ . '/../config.php';

class Database {
    private $conn;

    public function __construct() {
        $this->conn = getDatabaseConnection();
    }

    public function getConnection() {
        return $this->conn;
    }
}
?>

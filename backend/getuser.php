<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "db.php";

if (!isset($_GET["id"])) {
    echo json_encode(["success" => false, "message" => "User ID required"]);
    exit();
}

$id = intval($_GET["id"]);

// Use prepared statement to avoid SQL injection
$stmt = $conn->prepare("SELECT id, first_name, last_name, email FROM users WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$stmt->close();
$conn->close();

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data['id'] ?? 0);
$email = trim($data['email'] ?? '');

if (!$id || !$email) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "ID and email are required."]);
    exit();
}

// Check if user exists
$checkStmt = $conn->prepare("SELECT id FROM users WHERE id = ? AND email = ?");
$checkStmt->bind_param("is", $id, $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "User not found."]);
    $checkStmt->close();
    exit();
}
$checkStmt->close();

// Delete the user
$deleteStmt = $conn->prepare("DELETE FROM users WHERE id = ? AND email = ?");
$deleteStmt->bind_param("is", $id, $email);

if ($deleteStmt->execute()) {
    echo json_encode(["success" => true, "message" => "User deleted successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to delete user."]);
}

$deleteStmt->close();
$conn->close();
?>

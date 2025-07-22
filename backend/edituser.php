<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Only POST requests are allowed."]);
    exit();
}

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

// Collect and validate input
$id = isset($data["id"]) ? intval($data["id"]) : null;
$firstName = trim($data["first_name"] ?? "");
$lastName = trim($data["last_name"] ?? "");
$email = trim($data["email"] ?? "");

if (!$id || !$firstName || !$lastName || !$email) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit();
}

// Prepared statement
$stmt = $conn->prepare("UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?");
$stmt->bind_param("sssi", $firstName, $lastName, $email, $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "User updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "No changes made or user not found."]);
    }
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to update user.", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();

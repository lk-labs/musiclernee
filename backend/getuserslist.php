<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "db.php";

$result = $conn->query("SELECT id, email FROM users");

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch users."
    ]);
    $conn->close();
    exit();
}

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode([
    "success" => true,
    "users" => $users
]);

$conn->close();
?>

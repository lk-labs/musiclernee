<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include "db.php";

$sql = "SELECT id, first_name, last_name, email FROM users ORDER BY id ASC";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Database query failed: " . $conn->error,
    ]);
    exit();
}

$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode([
    "success" => true,
    "users" => $users,
]);

$conn->close();
exit();
?>

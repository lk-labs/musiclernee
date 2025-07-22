<?php
// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include("db.php"); // Make sure this file sets $conn

// Read the raw JSON input
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id) &&
    isset($data->first_name) &&
    isset($data->last_name) &&
    isset($data->email)
) {
    $id = intval($data->id);
    $first_name = $data->first_name;
    $last_name = $data->last_name;
    $email = $data->email;

    // Prepare and bind update query
    $stmt = $conn->prepare("UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?");
    if (!$stmt) {
        echo json_encode([
            "status" => "error",
            "message" => "Prepare failed: " . $conn->error
        ]);
        exit;
    }

    $stmt->bind_param("sssi", $first_name, $last_name, $email, $id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Profile updated successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Execute failed: " . $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required data"
    ]);
}

$conn->close();

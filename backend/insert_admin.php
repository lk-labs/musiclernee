<?php
require_once "db.php"; // adjust path to your db connection file

$email = "admin@example.com";
$plainPassword = "admin123";
$hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO admin (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $hashedPassword);

if ($stmt->execute()) {
    echo "Admin inserted successfully.";
} else {
    echo "Error inserting admin: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>

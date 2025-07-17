<?php
// Allow requests from frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include("db.php");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    // First, check in admin table
    $stmtAdmin = $conn->prepare("SELECT * FROM admin WHERE email = ?");
    $stmtAdmin->bind_param("s", $email);
    $stmtAdmin->execute();
    $resultAdmin = $stmtAdmin->get_result();

    if ($resultAdmin->num_rows === 1) {
        $admin = $resultAdmin->fetch_assoc();
        if (password_verify($password, $admin['password'])) {
            unset($admin['password']);
            echo json_encode([
                "status" => "success",
                "user" => [
                    "email" => $admin['email'],
                    "userType" => "admin"
                ]
            ]);
            $stmtAdmin->close();
            $conn->close();
            exit;
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Incorrect password"
            ]);
            $stmtAdmin->close();
            $conn->close();
            exit;
        }
    }
    $stmtAdmin->close();

    // If not admin, check in users table
    $stmtUser = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmtUser->bind_param("s", $email);
    $stmtUser->execute();
    $resultUser = $stmtUser->get_result();

    if ($resultUser->num_rows === 1) {
        $user = $resultUser->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            unset($user['password']);
            echo json_encode([
                "status" => "success",
                "user" => [
                    "email" => $user['email'],
                    "userType" => "user"
                ]
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Incorrect password"
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "User not found"
        ]);
    }

    $stmtUser->close();
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Missing email or password"
    ]);
}

$conn->close();

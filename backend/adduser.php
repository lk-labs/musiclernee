<?php
// ✅ CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// ✅ Exit early for preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No content
    exit();
}

// ✅ Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Only POST requests are allowed."]);
    exit();
}

// ✅ Include database connection
require_once "db.php";

// ✅ Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Extract and sanitize input
$firstName = trim($data["firstName"] ?? '');
$lastName  = trim($data["lastName"] ?? '');
$email     = trim($data["email"] ?? '');
$password  = $data["password"] ?? '';

// ✅ Validate input presence
if (!$firstName || !$lastName || !$email || !$password) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit();
}

// ✅ Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit();
}

// ✅ Validate password strength
$uppercase    = preg_match('@[A-Z]@', $password);
$lowercase    = preg_match('@[a-z]@', $password);
$number       = preg_match('@[0-9]@', $password);
$specialChars = preg_match('@[^\w]@', $password);

if (!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    ]);
    exit();
}

// ✅ Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email already exists."]);
    $stmt->close();
    exit();
}
$stmt->close();

// ✅ Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// ✅ Insert into database
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "User registered successfully.",
        "user" => [
            "firstName" => $firstName,
            "lastName"  => $lastName,
            "email"     => $email
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Something went wrong. Try again later."
    ]);
}

$stmt->close();
$conn->close();
?>

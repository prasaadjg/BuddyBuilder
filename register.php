<?php
// Config for DB Login
$host = 'localhost';
$db_name = 'COP4331';
$db_user = 'TheBeast';
$db_pass = 'WeLoveCOP4331';

// Connect to DB
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMEssage()]);
    exit;
}

// Function to handle JSON responses
function respond($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Parse the request
header("Content-Type: application/json");
$request = json_decode(file_get_contents("php://input"), true);

if (!$request || !isset($request['FirstName'], $request['LastName'], $request['Login'], $request['Password'])) {
    respond(400, ['error' => 'FirstName, LastName, Login, and Password are required']);
}

// Extract the user data
$firstName = $request['FirstName'];
$lastName = $request['LastName'];
$username = $request['Login'];
$password = $request['Password'];

// Check if Username exists
$stmt = $pdo->prepare("SELECT 1 FROM Users WHERE Login = :username");
$stmt->execute(['username' => $username]);
if ($stmt->rowCount() > 0) {
    respond(409, ['error' => 'Username already exists']);
}

// Insert user into database
$stmt = $pdo->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (:firstName, :lastName, :username, :password)");
if ($stmt->execute([
    'firstName' => $firstName,
    'lastName' => $lastName,
    'username' => $username,
    'password' => $password 
])) {
    respond(201, ['message' => 'User registered successfully.']);
} else {
    respond(500, ['error' => 'Failed to register user.']);
}
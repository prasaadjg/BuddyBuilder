<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "TheBeast";
$password = "WeLoveCOP4331"; 
$database = "COP4331"; 

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->ID)) {
    echo json_encode(array("error" => "Contact ID is required."));
    exit();
}

$contactID = $conn->real_escape_string($data->ID);

// Prepare SQL statement
$sql = "DELETE FROM Contacts WHERE ID = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $contactID);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(array("message" => "Contact deleted successfully."));
    } else {
        echo json_encode(array("error" => "No contact found with the given ID."));
    }
} else {
    echo json_encode(array("error" => "Failed to delete contact."));
}

$stmt->close();
$conn->close();
?>
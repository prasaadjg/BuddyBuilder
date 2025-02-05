<?php
  $host = 'localhost';
  $db_name = 'COP4331';
  $db_user = 'TheBeast';
  $db_pass = 'WeLoveCOP4331';

  try {
    $pdo = new PDO("mysql:host=$host; dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
  }

  function respond($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
  }

  header("Content-Type: application/json");

  $request = json_decode(file_get_contents("php://input"), true);

  if(!$request || !isset($request['search'], $request['userId'])) {
    respond(400, ['error' => 'Missing search term or userId']);
  }

  var_dump($request);
  exit;

  if(!isset($request['search'], $request['userId'])) {
    respond(400, ['error' => 'Missing search term or userId']);
  }

  $search = "%" . $request['search'] . "%";
  $userId = $request['userId'];

  $stmt = $pdo->prepare("SELECT ID, FirstName, LastName, Phone, Email FROM Contacts WHERE (FirstName LIKE :search OR LastName LIKE :search) AND UserID = :userId");
  $stmt->execute(['search' => $search, 'userId' => $userId]);

  $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if(empty($contacts)) {
    respond(404, ['error' => 'No records found;']);
  }
  else {
    respond(200, ['results' => $contacts, 'error' => '']);
  }
?>
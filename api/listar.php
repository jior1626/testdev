<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");


error_reporting(E_ALL);
ini_set('display_errors', 1);


// $host = "localhost";
// $db_name = "testdev";
// $username = "root";
// $password = "GlobalHitss2024*";     

// try {
    
//     $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// } catch (PDOException $e) {
    
//     echo json_encode(["error" => "Error de conexión a la base de datos: " . $e->getMessage()]);
//     exit;
// }
include 'config.php';


if ($_SERVER['REQUEST_METHOD'] === "GET" && isset($pdo)) {
    try {
        
        $stmt = $pdo->query("SELECT id, nombre, email, edad FROM personas");

        
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        
        if (count($result) > 0) {
            echo json_encode($result);
        } else {
            echo json_encode(["mensaje" => "No hay datos disponibles"]);
        }
    } catch (PDOException $e) {
        
        echo json_encode(["error" => "Error al obtener los datos: " . $e->getMessage()]);
    }
} else {
    
    echo json_encode(["error" => "Método no permitido, usa GET"]);
}
?>

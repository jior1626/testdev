<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


error_reporting(E_ALL);
ini_set('display_errors', 1);


include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $nombre = $_POST['nombre'] ?? null;
    $email = $_POST['email'] ?? null;
    $edad = $_POST['edad'] ?? null;

    
    if (!empty($nombre) && !empty($email) && !empty($edad)) {
        try {
            
            $stmt = $pdo->prepare("INSERT INTO personas (nombre, email, edad) VALUES (:nombre, :email, :edad)");
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':edad', $edad);

            
            $stmt->execute();

            
            echo json_encode(["mensaje" => "Datos insertados correctamente"]);
        } catch (PDOException $e) {
            
            echo json_encode(["error" => "Error al insertar datos: " . $e->getMessage()]);
        }
    } else {
        
        echo json_encode(["error" => "Datos incompletos o inválidos"]);
    }
} else {
    
    echo json_encode(["error" => "Método no permitido, usa POST"]);
}
?>

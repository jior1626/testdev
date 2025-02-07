<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");


error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
    
    $data = json_decode(file_get_contents("php://input"));

    
    if (isset($data->id) && !empty($data->id)) {
        
        $id = $data->id;

        try {
            
            $stmt = $pdo->prepare("DELETE FROM personas WHERE id = :id");

            
            $stmt->bindParam(":id", $id);
            $stmt->execute();

            
            if ($stmt->rowCount() > 0) {
                echo json_encode(["mensaje" => "Persona eliminada con éxito"]);
            } else {
                echo json_encode(["error" => "No se encontró la persona con el ID proporcionado"]);
            }
        } catch (PDOException $e) {
            
            echo json_encode(["error" => "Error al eliminar el registro: " . $e->getMessage()]);
        }
    } else {
        
        echo json_encode(["error" => "ID de la persona no proporcionado"]);
    }
} else {
    
    echo json_encode(["error" => "Método no permitido, usa DELETE"]);
}
?>

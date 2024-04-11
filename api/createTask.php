<?php 
include "./partials/Connection.php";

if ( $_SERVER["REQUEST_METHOD"] == "POST") {

  $title = $_POST['title'];
  $description = $_POST['description'];
  $userID = $_POST['userID'];

  if ( !empty($title) && !empty($description) && !empty($userID) ) {

    $sql = "INSERT INTO tasks (title, description, userID) VALUES ('$title', '$description', '$userID')";

    if ( $conexion->query($sql) === TRUE ) {
      header("Location: ../index.html");
      exit();
    } else {
      echo "Error al crear la tarea: ". $conexion->error;
    }

  } else {
    echo "Por favor, complete los campos";
  }

}
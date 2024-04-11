<?php

$host = "localhost";
$usuario = "root";
$contraseña = "0112358srsn..";
$base_datos = "tasklist";

$conexion = new mysqli($host, $usuario, $contraseña, $base_datos);

if ($conexion->connect_error) {
  die("Error al conectar con la base de datos: " . $conexion->connect_error);
}


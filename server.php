<?php
//тк. мы отправляем JSON-файлик, а php не умеет работать нативно с JSON. То надо немного модифицировать
//наш виртуальный сервер.
$_POST = json_decode(file_get_contents("php://input"), true);
//это к вопросу "А как на php получить json-файлик и с ним поработать"


//логика такая берём данные которые пришли с клиента $_POST превращается в строку var_dump
//и показывает нам echo
//по сути это тот response который будет приходить от сервера
echo var_dump($_POST);

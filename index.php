<?php
require_once 'autoloader.php';
setcookie('WrongLoginCount', isset($_COOKIE['WrongLoginCount']) ? $_COOKIE['WrongLoginCount'] : 0,time()+3600);
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>gsdfs</title>
    <style>
        * {
            font-family: monospace;
        }

        body {
            background: url("img/footer_lodyas.png");
            background-size: cover;
        }
    </style>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="main-container">
    <?php
    if ($_COOKIE['WrongLoginCount'] == 2) {
        require_once 'ban.php';
        die();
    }
    if (!isset($_POST['email']) and !isset($_POST['password'])) {
        require_once 'login.php';
    }
    ?>
</div>


<script src="js/ajax_login.js"></script>
</body>
</html>

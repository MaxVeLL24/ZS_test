<?php
require_once 'autoloader.php';
setcookie('IncorrectLoginCount', isset($_COOKIE['IncorrectLoginCount']) ? ++$_COOKIE['IncorrectLoginCount'] : 0);
$visitCount = $_COOKIE['IncorrectLoginCount'];
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
    if (!isset($_POST['email']) and !isset($_POST['password'])) {
        require_once 'login.php';
    } else {
        $db = new DB();
        $Validation = $db->login("SELECT * FROM `users` WHERE `email`='{$_POST['email']}' AND `password`='{$_POST['password']}'")->fetch_assoc();
        if (!empty($Validation)) {
            $lastVisitInfo = $db->login("SELECT `id`,`last_visit` FROM `users` WHERE `email`='{$_POST['email']}' AND `password`='{$_POST['password']}'")->fetch_assoc();
            $loginTimeUpdate = $db->login("UPDATE `users` SET `last_visit`=CURRENT_TIMESTAMP");
            require_once 'success_login.php';
        } else {
            $n=1;
            require_once 'ban.php';
        }
    }
    ?>
</div>
</body>
</html>

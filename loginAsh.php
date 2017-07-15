<?php
require_once 'autoloader.php';

$is_valid = loginOperations::validate($_POST['email'], $_POST['password']);
if (!empty($is_valid)) {
    $db = new DB();
    $db->login("UPDATE `users` SET `last_visit`=CURRENT_TIMESTAMP");
    echo "<h1>Hello, your last visit was in " . $is_valid['last_visit'] . "</h1>";
    echo "<h1>Your id-number is - " . $is_valid['id'] . "</h1>";
} else {
    return false;
}
//foreach ($is_valid as $val=>$key) {
//    var_dump($key);
//}
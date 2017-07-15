<?php

class loginOperations
{
    static function validate($login, $password)
    {
        $db = new DB();
        return $valid = $db->login("SELECT * FROM `users` WHERE `email`='$login' AND `password`='$password'")->fetch_assoc();
    }
}
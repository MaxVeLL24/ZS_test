$(document).ready(function () {
    $('button.submit').click(function (e) {
        e.preventDefault();
        geth();
    });

    function geth(email, password) {
        email = $('input[name=email]').val();
        password = $('input[name=password]').val();
        $.ajax({
            url: "loginAsh.php",
            type: "post",
            data: {'email': email, 'password': password},
            success: function (response) {
                if (response) {
                    $('div.login-register').children().remove();
                    $('div.login-register').append(response);

                }
                if (!response) {
                    $('div.login-register').children().remove();
                    $('div.login-register').append('<h1>login data is wrong</h1>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
});
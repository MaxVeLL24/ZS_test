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
                    document.cookie = "WrongLoginCount=0";

                }
                if (!response) {
                    function updateCookie() {
                        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)WrongLoginCount\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                        var cookieVal = parseInt(cookieValue) + 1;
                        document.cookie = "WrongLoginCount=" + cookieVal;
                        if (cookieVal == 2) {
                            expires = ";expire=3600";
                            cookied = ("WrongLoginCount="+cookieVal) + expires;
                            document.cookie = cookied;
                        }
                    }

                    updateCookie();

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
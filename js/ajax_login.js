$(document).ready(function () {
    var autoEmail = document.cookie.replace(/(?:(?:^|.*;\s*)autoLogEmail\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var autoPassword = document.cookie.replace(/(?:(?:^|.*;\s*)autoLogPassword\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (autoEmail !== '' && autoPassword !== '') {
        $.ajax({
            url: "loginAsh.php",
            type: "post",
            data: {'email': autoEmail, 'password': autoPassword},
            success: function (response) {
                $('div.login-register').children().remove();
                $('div.login-register').append(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
    $('button.submit').click(function (e) {
        e.preventDefault();
        geth();
    });

    function geth(email, password) {
        email = $('input[name=email]').val();
        password = $('input[name=password]').val();
        var autologin = $('input[name=autologin]').prop('checked');
        $.ajax({
            url: "loginAsh.php",
            type: "post",
            data: {'email': email, 'password': password},
            success: function (response) {
                if (response) {
                    $('div.login-register').children().remove();
                    $('div.login-register').append(response);
                    document.cookie = "WrongLoginCount=0";
                    console.dir($('input[name=autpogin]'));
                    if (autologin === true) {
                        document.cookie = "autoLogEmail=" + email;
                        document.cookie = "autoLogPassword=" + password;
                    }
                }
                if (!response) {
                    function updateCookie() {
                        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)WrongLoginCount\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                        if (cookieValue === "") {
                            cookieValue = 0;
                        }
                        var cookieVal = parseInt(cookieValue) + 1;
                        document.cookie = "WrongLoginCount=" + cookieVal;
                        if (cookieVal !== 2) {
                            $('div.login-register h1').text('Login data is wrong');
                            $('div.login-register h1').addClass('error');
                            $('div.login-register h1').css({'text-decoration': 'underline'});
                        }
                        if (cookieVal == 2) {
                            var now = new Date();
                            var time = now.getTime();
                            time += (180 * 1000);
                            now.setTime(time);
                            document.cookie =
                                'WrongLoginCount=' + cookieVal +
                                '; expires=' + now.toUTCString();
                            $('div.login-register').children().remove();
                            $('div.login-register').append('<h1>Sorry, but you was banned for a 3 minutes..</h1><h1>relax and try to remember you login data</h1>');
                        }

                    }

                    updateCookie();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
});
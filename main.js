$(function () {

    // Smoothly scroll to section.
    $('nav a').click(function () {
        // Scroll to the target element.
        var $target = $(this.hash);
        var targetOffset = $target.offset().top;

        // TODO: uncomment to scoll smoothly.
        //$('html, body').animate({ scrollTop: targetOffset }, 1000);
        return false;
    });

    // Load Facebook API
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
        FB.init({
            appId: '', // TODO: enter appId here.
            version: 'v2.5'
        });

        function displayLikes() {
            FB.api('/me', { fields: 'likes' }, function (response) {
                console.log(response);
                if (response.likes && response.likes.data) {
                    var list = $('.likes ul');

                    for (var like of response.likes.data) {
                        list.append('<li>' + like.name + '</li>');
                    }
                }
            });
        }

        $('#loginButton').click(function () {
            FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Successfully logged in.');
                    $('#loginButton').hide();
                    displayLikes();
                }
                else {
                    console.log('User cancelled login or did not fully authorize.')
                }
            }, { scope: 'user_likes' });
        });
    });
});

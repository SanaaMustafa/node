function showRegisterForm() {
    $('.loginBox').fadeOut('fast', function () {
        $('.social').fadeIn('fast');
        $('.division').fadeIn('fast');
        $('.modal-footer').fadeIn('fast');
        $('.uploadBox').fadeOut('fast');
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast', function () {
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    });
    $('.error').removeClass('alert alert-danger').html('');

}
function showLoginForm() {
    $('#loginModal .registerBox').fadeOut('fast', function () {
        $('.social').fadeIn('fast');
        $('.division').fadeIn('fast');
        $('.modal-footer').fadeIn('fast');
        $('.uploadBox').fadeOut('fast');
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast', function () {
            $('.login-footer').fadeIn('fast');
        });
        $('.modal-title').html('Login with');
    });
    $('.error').removeClass('alert alert-danger').html('');
}
function showUploadForm() {
    $('#loginModal .loginBox').fadeOut('fast', function () {
        $('.registerBox').fadeOut('fast');
        $('.social').fadeOut('fast');
        $('.division').fadeOut('fast');
        $('.modal-footer').fadeOut('fast');
        $('.uploadBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast', function () {
            $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Upload');
    });
    $('.error').removeClass('alert alert-danger').html('');
}
function openLoginModal() {
    showLoginForm();
    setTimeout(function () {
        $('#loginModal').modal('show');
    }, 230);

}
function openRegisterModal() {
    showRegisterForm();
    setTimeout(function () {
        $('#loginModal').modal('show');
    }, 230);

}


function openUploadModal() {
    showUploadForm();
    setTimeout(function () {
        $('#loginModal').modal('show');
    }, 230);

}
/*function loginAjax() {
    //  Remove this comments when moving to server
    $.post( "/register", function( data ) {
            if(data == 1){
                window.location.replace("/register1");            
            } else {
                 shakeModal(); 
            }
        });
    

    /*   Simulate error message from the server   */
    //shakeModal();
//}

function shakeModal() {
    $('#loginModal .modal-dialog').addClass('shake');
    $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
    $('input[type="password"]').val('');
    setTimeout(function () {
        $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000);
}


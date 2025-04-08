// interactions for the login page:
// - improve language for SSO login
// - catch SSO errors & make them more informative
// see also: html/OpacLoginInstructions.html
$(() => {
    let ssoLoginButton = '<div id="sso-login-js"><p><a class="btn btn-success btn-lg" href="https://sso.cca.edu/cas/login?service=https%3A%2F%2Flibrary.cca.edu%2Fcgi-bin%2Fkoha%2Fopac-user.pl">Login with your CCA account</a></p><p>Current students, faculty, and staff</p></div>'
    // only run if the "NoLoginInstructions" HTML is present on the page
    if ($('#OpacLoginInstructions').length) {
        // remove existing SSO login button & add a new one up top
        $('.sso-login').remove()
        $('#opac-auth').prepend(ssoLoginButton)

        // Remove redundant or misleading text ("CAS" is meaningless to our users)
        $('h1:contains("Log in to your account")').remove()
        $('.cas_title').remove()
        $('.cas_url').parent().remove()
        $('p:contains("If you do not have a CAS account")').text('Alumni and external researchers')
        $('h2:contains("Local login")').text("Alumni Login")

        // CAS login failed, example:
        // https://library.cca.edu/cgi-bin/koha/opac-user.pl?ticket=faketicket
        $('.cas_invalid').parent().removeClass('alert-info').addClass('alert-danger')
        $('.cas_invalid').before('<h2>Login Failed</h2>')
        $('.cas_invalid').html(`The most common reason for this is that you are not a current CCA student or employee. If you are a CCA student or employee, please <a href="https://libraries.cca.edu/about-us/about-us/ask-a-librarian/">contact us</a>. If you are an alumnus, you might have a local account specific to the library catalog, which uses the form below.`)
    }
})

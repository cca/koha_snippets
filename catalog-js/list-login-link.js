// the login link under "Lists" pops up a modal that's only useful for people
// with internal accounts, it has no CAS login. Replace it with a CAS login
// link instead. Only want to run this if we're not logged in already.
if ($('.loggedinusername').length > 0) {
    $('.dropdown a.loginModal-trigger').off('click')
        .attr('href', 'https://sso.cca.edu/cas/login?service=https%3A%2F%2Flibrary.cca.edu%2Fcgi-bin%2Fkoha%2Fopac-user.pl')
}

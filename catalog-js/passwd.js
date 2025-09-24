// "change your password" page, currently only Alumni have access
let passwdMsg = `<br>This page only changes your library catalog password. Some alumni sign in with their CCA password; to reset that password instead, see <a href="https://accounts.cca.edu/reset_password/">Accounts</a>.`
if (location.pathname.match('/cgi-bin/koha/opac-passwd.pl')) {
    $('#mainform .alert-info').eq(0).append(passwdMsg)
}
// password recovery page, now linked off of login page
if (location.pathname.match('/cgi-bin/koha/opac-password-recovery.pl')) {
    $('#password-recovery p').eq(0).append(passwdMsg)
}

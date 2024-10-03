// "change your password" page, currently only Alumni have access
if (location.pathname.match('/cgi-bin/koha/opac-passwd.pl')) {
    let msg = `<br>Note that this page only changes your Library Catalog password.
        Some Alumni may sign in with their CCA password; this page does not reset that
        password, instead see <a href="https://accounts.cca.edu/reset_password/">
        the CCA accounts website</a>.`
    $('#mainform .alert-info').append(msg)
}

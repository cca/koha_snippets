// see Koha bug #16818 - Plack broke CAS login link
// https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=16818
$('#opac-auth a[href*="sso.cca.edu"]').attr('href', function(pos, val) {
    return val.replace('library.cca.edu%2Fopac', 'library.cca.edu%2Fcgi-bin%2Fkoha')
});

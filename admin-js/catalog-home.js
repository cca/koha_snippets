// hide "new from z39.50/SRU" while it's broken
// https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=37947
if (location.pathname.match('/cgi-bin/koha/cataloguing/cataloging-home.pl')) {
    $('#z3950search').parent().hide()
}

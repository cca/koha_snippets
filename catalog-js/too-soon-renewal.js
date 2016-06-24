// patch a bug in opac-user.tt wherein "too_soon" renewal error
// message is not printed, see Bugzilla & my template patch:
// https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=16806
if (location.pathname.match('/cgi-bin/koha/opac-user.pl')
    && location.search.match(/renew_error.*too_soon/)) {
    var $msg = $('.dialog.alert span')
    var txt = $msg.text()
    txt += 'It is too soon after the checkout date for this item to be renewed.'
    $msg.text(txt)
}

if (location.pathname.match('/cgi-bin/koha/opac-reserve.pl')) {
    // changes per Paul's request on 2022-09-07
    // https://ccaweb.slack.com/archives/C01V8JTGRD2/p1662570492099079

    // remove the "not needed by" form input, it's more confusing than helpful
    $('input[name^="expiration_date"]').parent().hide()

    // Toggle hold options to collapsed, not present on initial page load so we
    // have to wait & monitor. Hide only if there's just 1 holdable item.
    if ($('tr.holdable').length === 1) {
        let int = setInterval(() => {
            if ($('.toggle-hold-options').length) {
                $('.toggle-hold-options').eq(0).click()
                // select only holdable item (bug with DisplayMultiItemHolds & forced item-level holds)
                // https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=38054
                $('.itemstable input[type="checkbox"]').eq(0).click()
                clearInterval(int)
            }
        }, 500)
    }
}

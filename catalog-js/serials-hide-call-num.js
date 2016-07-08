// hide unused "Call Number" column on a type=serials detail page
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    // only for mat type "cont. resource"
    if ($('.results_summary.type').text().match('Continuing resource')) {
        $('.call_no').css('display' , 'none')
    }
}

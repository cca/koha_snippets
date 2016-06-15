// edit (On hold) text in the "Renew" column on patron's summary page
// to indicate a recall & make more prominent
(function() { // wrap in IIFE

var path = location.pathname
if (path.match('/cgi-bin/koha/opac-user.pl')) {
    $('.renew .renewals:contains("(On hold)")')
        .css('font-weight', 'bold').text('Item recalled - please return')
        .parent('td').addClass('overdue').css('background-color', '#f8e86c')
}

})()

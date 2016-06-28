// modify the links listed in the main menu of the Serials module
// on all pages beginning with path /cgi-bin/koha/serials/
if (location.pathname.match('/cgi-bin/koha/serials/')) {
    // no convenient style hooks here
    var menu_list = $('#bd > .yui-b ul')
    var links = [
        ['EBSCONET',
        'https://ebsconet.com']
        , ['Serials Solutions',
        'https://clientcenter.serialssolutions.com/CC/Login/Default.aspx']
        , ['SF Late for Claiming',
        '/cgi-bin/koha/reports/guided_reports.pl?reports=64&phase=Show%20SQL']
        , ['OAK Late for Claiming',
        '/cgi-bin/koha/reports/guided_reports.pl?reports=63&phase=Show%20SQL']
        , ['SF at bindery',
        '/cgi-bin/koha/reports/guided_reports.pl?reports=68&phase=Show%20SQL']
        , ['OAK at bindery',
        '/cgi-bin/koha/reports/guided_reports.pl?reports=69']
    ]
    var len = links.length
    for (var i = 0; i < len; i++) {
        var html = '<li><a href="' + links[i][1]
            + '" target="_blank">' + links[i][0]
            + '</a></li>'
        menu_list.prepend(html)
    }
}

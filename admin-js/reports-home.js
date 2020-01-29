// add links to the reports home page
if (path.match('/cgi-bin/koha/reports/reports-home.pl')) {
    $(() => {
        // not easy to select the "Top lists" list
        $('.yui-u').last().find('ul').first().append('<li><a href="/cgi-bin/koha/reports/guided_reports.pl?reports=218&phase=Run%20this%20report">New Books Shelf</a></li>')
    })
}

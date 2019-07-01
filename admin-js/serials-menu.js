// modify the links listed in the main menu of the Serials module
// on all pages beginning with path /cgi-bin/koha/serials/
if (location.pathname.match('/cgi-bin/koha/serials/')) {
    // execute once document has loaded
    $(() => {
        // no good style hooks, 18.11 update broke this selector
        var menu_list = $('.main aside ul').eq(0)
        // format is: [ link text, URL ]
        var links = [
            ['OAK at bindery',
            '/cgi-bin/koha/reports/guided_reports.pl?reports=69&phase=Run%20this%20report']
            , ['SF at bindery',
            '/cgi-bin/koha/reports/guided_reports.pl?reports=68&phase=Run%20this%20report']
            , ['Item Search for Bindery Items',
            '/cgi-bin/koha/catalogue/itemsearch.pl']
            , ['OAK Late for Claiming',
            '/cgi-bin/koha/reports/guided_reports.pl?reports=63&phase=Run%20this%20report']
            , ['SF Late for Claiming',
            '/cgi-bin/koha/reports/guided_reports.pl?reports=64&phase=Run%20this%20report']
            , ['Serials Solutions',
            'https://clientcenter.serialssolutions.com/CC/Login/Default.aspx']
            , ['EBSCONET',
            'https://ebsconet.com']
            , ['OAK Serials Fund',
            '/cgi-bin/koha/acqui/ordered.pl?fund=3&fund_code=SER-OAK']
            , ['SF Serials Fund',
            '/cgi-bin/koha/acqui/ordered.pl?fund=2&fund_code=SER-SF']
        ]

        var html = links.reduce((html, link) => {
            return html + `<li><a href="${link[1]}" target="_blank">${link[0]}</a></li>`
        }, '')

        menu_list.prepend(html + '<br>')
    })
}

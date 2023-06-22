// modify the links listed in the main menu of the Serials module
// on all pages beginning with path /cgi-bin/koha/serials/
if (path.match('/cgi-bin/koha/serials/')) {
    // execute once document has loaded
    $(() => {
        var menu_list = $('#navmenulist ul').eq(0)
        // format is: [ link text, URL ]
        var links = [
            ['SF at bindery',
            '/cgi-bin/koha/reports/guided_reports.pl?reports=68&phase=Run%20this%20report']
            , ['Item Search for Bindery Items',
            '/cgi-bin/koha/catalogue/itemsearch.pl']
            , ['SF Late for Claiming',
            '/cgi-bin/koha/reports/guided_reports.pl?reports=64&phase=Run%20this%20report']
            , ['Serials Solutions',
            'https://clientcenter.serialssolutions.com/CC/Login/Default.aspx']
            , ['EBSCONET',
            'https://ebsconet.com']
            , ['SF Serials Fund',
            '/cgi-bin/koha/acqui/ordered.pl?fund=2&fund_code=SER-SF']
        ]

        var html = links.reduce((html, link) => {
            return html + `<li><a href="${link[1]}" target="_blank">${link[0]}</a></li>`
        }, '')

        menu_list.prepend(html + '<br>')
    })
}

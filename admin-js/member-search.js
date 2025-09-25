// auto-click the first patron search result if there is only 1
if (location.pathname.match('/cgi-bin/koha/members/member.pl')) {
    const interval = setInterval(() => {
        let rows = $('#memberresultst tbody tr')
        if (rows.length && rows.eq(0).text().trim() !== 'No data available in table') {
            // eq(0) below would go to member checkout, eq(1) goes to member details
            const href = $('#memberresultst a.patron_name').eq(1).attr('href')
            if (rows.length === 1 && href) window.location = href
            clearInterval(interval)
        }
    }, 500)
}

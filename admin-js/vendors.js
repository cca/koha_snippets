// auto-click the first vendor search result if there is only 1
// code based on admin-js/member-search.js
// /acquisition/vendors/${ID} also matches this route so check for query string
if (location.pathname.match('/cgi-bin/koha/acquisition/vendors') && location.search) {
    const interval = setInterval(() => {
        let rows = $('#vendors_list .datatable').eq(0).find('tbody tr')
        if (rows.length && rows.eq(0).text().trim() !== 'Loading...') {
            const href = $('#vendors_list td:first-child a').attr('href')
            if (rows.length === 1 && href) window.location = href
            clearInterval(interval)
        }
    }, 500)
}

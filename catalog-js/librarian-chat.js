// libraryh3lp chat pop-up window, see https://libraryh3lp.com/dashboard/services
let paths = [
    '/cgi-bin/koha/opac-search.pl',
    '/cgi-bin/koha/opac-user.pl',
    '/cgi-bin/koha/opac-account.pl',
    '/cgi-bin/koha/opac-memberentry.pl',
    '/cgi-bin/koha/opac-search-history.pl',
    '/cgi-bin/koha/opac-readingrecord.pl',
    '/cgi-bin/koha/opac-privacy.pl',
    '/cgi-bin/koha/opac-suggestions.pl',
    '/cgi-bin/koha/opac-messaging.pl',
    '/cgi-bin/koha/opac-shelves.pl?op=list&category=1'
]
if (paths.some(page => path.match(page))) {
    // use libraryh3lp Presence API https://dev.libraryh3lp.com/presence.html
    fetch('https://libraryh3lp.com/presence/jid/cca-libraries-queue/chat.libraryh3lp.com/text')
        .then(resp => resp.text())
        .then(status => {
            if (status == 'available' || status == 'chat') {
                $('body').append('<div class="needs-js">')
                var x = document.createElement("script"); x.type = "text/javascript"; x.async = true;
                x.src = (document.location.protocol === "https:" ? "https://" : "http://") + "libraryh3lp.com/js/libraryh3lp.js?13843";
                var y = document.getElementsByTagName("script")[0]; y.parentNode.insertBefore(x, y);
            }
        })
}

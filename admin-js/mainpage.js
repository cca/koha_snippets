// modifications to the "main page" — page staff see right after logging in
if (location.pathname.match('/cgi-bin/koha/mainpage.pl')) {
    $(function(){
        var article_requests = $('#article_requests_pending a')
        var suggestions_pending = $('#suggestions_pending a')

        // make article requests link go to _all_ libraries
        article_requests.attr('href', function(i, href){
            return href + '?branchcode='
        })

        // same with acquisitions requests, make them show all libraries
        suggestions_pending.attr('href', function(i, href){
            return href.replace('#ASKED',
                '?displayby=STATUS&branchcode=__ANY__#ASKED')
        })

        // add new module buttons for pending article/purchase requests
        var html = ''
        if (article_requests.length) {
            html += '<li><a class="icon_general icon_serials" href="'
            html += article_requests.attr('href') + '">'
            html += article_requests.text() + '</a></li>'
        }
        if (suggestions_pending.length) {
            html += '<li><a class="icon_general icon_acquisitions" href="'
            html += suggestions_pending.attr('href') + '">'
            html += suggestions_pending.text() + '</a></li>'
        }
        $('#area-list-right .biglinks-list').append(html)
    })
}

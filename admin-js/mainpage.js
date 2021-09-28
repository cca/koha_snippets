// modifications to the "main page" — page staff see right after logging in
if (path.match('/cgi-bin/koha/mainpage.pl')) {
    $(()=>{
        // make article requests link go to _all_ libraries
        $('#article_requests_pending a').attr('href', (i, href) => {
            return href + '?branchcode='
        })

        // add new module buttons for pending article/purchase requests
        let $menu = $('.biglinks-list')
        $menu.eq(0).append(`<li>
                <a class="icon_general icon_serials"
                    href="/cgi-bin/koha/circ/article-requests.pl?branchcode=">
                    <i class="fa fa-newspaper-o"></i>
                        Article requests
                </a>
            </li>`)
        $menu.eq(1).append(`<li>
            <a class="icon_general icon_acquisitions"
                href="${$('#all_pendingsuggestions').parent().attr('href')}">
                <i class="fa fa-gift"></i>
                Purchase Suggestions
            </a>
        </li>`)
    })
}

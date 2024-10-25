// modifications to the "main page" — page staff see right after logging in
if (location.pathname.match('/cgi-bin/koha/mainpage.pl')) {
    $(()=>{
        // add new module buttons for pending article/purchase requests
        let $menu = $('.biglinks-list')
        $menu.eq(1)
            .append('<li><a class="icon_general icon_serials" href="/cgi-bin/koha/circ/article-requests.pl?branchcode="><i class="fa fa-fw fa-newspaper"></i>Article requests</a></li>')
            .append('<li><a class="icon_general icon_acquisitions" href="/cgi-bin/koha/suggestion/suggestion.pl?branchcode=__ANY__#ACCEPTED"><i class="fa fa-fw fa-gift"></i>Purchase Suggestions</a></li>')
    })
}

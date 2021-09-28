// better home page column layout

// run only on home pg (could be at domain root or its own path)
if (path.match('cgi-bin/koha/opac-main.pl') || path === '/') {
    // there are 3 columns on the home page:
    // - span2 with #opacnavbottom (hours)
    // - span7 with #opacmainuserblock (coverflow)
    // - span3 that's empty if not logged in & #user_summary if logged in
    // when not logged in we want the 1st to be larger & to remove the last
    var $row = $('#notloggedin .row-fluid')
    $row.find('> .span3').remove()
    $row.find('> .span2').removeClass('span2').addClass('span3')
}

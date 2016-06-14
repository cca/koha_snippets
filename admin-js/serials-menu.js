// modify the links listed in the main menu of the Serials module
// at path /cgi-bin/koha/serials/serials-home.pl
if (location.pathname.match('/cgi-bin/koha/serials/serials-home.pl')) {
    // no convenient style hooks here
    var menu_list = $('#bd > .yui-b ul')
    var links = [
        ['text', 'url']
        , ['text 2', 'url 2']
        , ['text 3', 'url 3']
    ]
    var len = links.length
    var html = ''
    for (var i = 0; i < len; i++) {
        html += '<li><a href="' + links[i][1]
            + '" target="_blank">' + links[i][0]
            + '</a></li>'
    }
    menu_list.html(html)
}

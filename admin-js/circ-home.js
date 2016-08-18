// add links to custom circ reports on circ home page
if (location.pathname.match('/cgi-bin/koha/circ/circulation-home.pl')) {
    $(function(){
        // build list HTML
        var html = '<h3>CCA Circulation Reports</h3>'
        html += '<ul><li>'
        html += '<a href="/cgi-bin/koha/reports/guided_reports.pl?reports=124&phase=Run%20this%20report"><em>Improved</em> Holds to Pull</a>'
        html += '</li></ul><br>'

        // few good selector hooks on the page, there's three columns like
        // div.yui-u.first, div.yui-u, div.yui-u
        // which are Circulation, Circulation Reports, & Offline circulation respectively

        // add our custom reports before the Circulation Reports
        $('.yui-u').eq(1).prepend(html)
        // fix spacing on the Offline circulation, may want to just hide this entirely
        $('.yui-u').eq(2).addClass('first').prepend('<br>')
    })
}

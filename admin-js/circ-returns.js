// run only on the checkin page
if (path.match('/cgi-bin/koha/circ/returns.pl')) {
    // run on document load
    $(function(){
        // loop over each row in the checkin table
        $('#checkedintable tr').each(function(){
            var row = $(this)
            var home = row.find('td.ci-homelibrary')
            var holding = row.find('td.ci-holdinglibrary')
            // compare home branch to branch where the item's being checked in
            if (home.text() !== holding.text()) {
                // if they differ, show an alert with on-hover helper text
                holding.addClass('error alert-error')
                    .css({'cursor': 'help', 'font-weight': 'bold'})
                    .attr('title', 'this item needs to be returned to its home library')
            }
        })
    })
}

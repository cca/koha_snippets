// run only on the checkin page
if (location.pathname.match('/cgi-bin/koha/circ/returns.pl')) {
    // run on document load
    $(function(){
        // loop over each row in the checkin table
        $('#checkedintable tr').each(function(){
            let row = $(this)

            // 1 misleading warning when item that wasn't checked out is checked in
            let duedate = row.find('td.ci-duedate')
            if (duedate.find('.problem').text().toLowerCase().trim() === 'item was not checked in' &&
                duedate.find('span').eq(1).text().toLowerCase().trim() === 'not checked out') {
                duedate.find('.problem').hide()
            }

            // 2 extra warning for books that need to be returned to their home library
            let home = row.find('td.ci-homelibrary')
            let holding = row.find('td.ci-holdinglibrary')
            if (home.text().trim() !== holding.text().trim()) {
                // if they differ, show an alert with on-hover helper text
                holding.addClass('error alert-error')
                    .css({'cursor': 'help', 'font-weight': 'bold'})
                    .attr('title', 'this item needs to be returned to its home library')
            }
        })
    })
}

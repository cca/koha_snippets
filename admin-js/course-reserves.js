// If you delete a course reserve without first removing all items from it
// the item fields get all messed up, this stops us from doing that.
if (path.match('/cgi-bin/koha/course_reserves/course-details.pl')) {
    let num_items = $('#course_reserves_table tbody tr').length
    if (num_items > 0) {
        // disable Delete Course button
        let msg = 'Remove all items from the course before deleting it.'
        $('#delete_course')
            .attr('disabled', true).attr('title', msg)
            .off('click').on('click', () => {
                alert(msg)
                return false
            })
    }
}

// If you delete a course reserve without first removing all items from it
// the item fields get all messed up, this stops us from doing that.
if (location.pathname.match('/cgi-bin/koha/course_reserves/course-details.pl')) {
    let num_items = $('#course_reserves_table tbody tr').length
    if (num_items > 0) {
        // disable Delete Course button
        $('#delete_course_button')
            .addClass('disabled')
            .off('click')
        $('#toolbar').append('<p style="margin:0;position:relative;left: 400px;">Remove all reserves from the course before deleting.</p>')
    }
}

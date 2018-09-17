// If you delete a course reserve without first removing all items from it
// the item fields get all messed up, this stops us from doing that.
if (location.pathname.match('/cgi-bin/koha/course_reserves/course-details.pl')) {
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

if (location.pathname.match('/cgi-bin/koha/course_reserves/course.pl')) {
    // fix bug with barcodes that have CSS special characters in them
    // they are passed un-sanitized as a jQuery selector so special chars break
    // we'll just redo this functionality from scratch since other approaches
    // (editing the barcode value, redefining RemoveInstructor()) didn't work
    $('#instructors div').each((idx, instructor) => {
        instructor.id = instructor.id.replace(/([$.:\[\],=@])/g, "\\$1")
    })
    $(document).on('click', '.removeInstructor', (ev) => {
        $(ev.target).parent().remove()
        if (!$('#instructors').html()) {
            $('#course_instructors').hide(800);
        }
    })
}

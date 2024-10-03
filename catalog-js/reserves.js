if (location.pathname.match('/cgi-bin/koha/opac-course-reserves.pl')) {
    let html = '<p><b>Instructors</b>: add to your reserves list by filling out our <a href="https://docs.google.com/forms/d/e/1FAIpQLScq7SDjDi6bzu7OcHdI-4ec3CdKvmWLpcv8oxdwr7IksUYiKw/viewform">Course Reserves Request Form</a>.</p>'
    $('h1').after(html)
}

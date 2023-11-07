// treat search filter on Course Reserves like every other form input
if (path.match('/cgi-bin/koha/opac-course-reserves.pl')) {
    $('#course_reserves_table_wrapper input[type=search]').addClass('form-control')
}

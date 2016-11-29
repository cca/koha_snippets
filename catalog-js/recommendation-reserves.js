// add link to reserves page on purchase recommendation form
// need to escape question mark in href here
if (location.href.match('cgi-bin/koha/opac-suggestions.pl\\?op=add')) {
    var html = '<p>If this purchase recommendation is meant for course reserves, remember to <a href="https://libraries.cca.edu/content/course-reserves-request">fill out the Course Reserves Request</a> form, too.'
    $('#usersuggestions form').before(html)
}

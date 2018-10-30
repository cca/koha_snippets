// add link to reserves page on purchase recommendation form
// need to escape question mark in href here
if (location.href.match('cgi-bin/koha/opac-suggestions.pl\\?op=add')) {
    let p1 = 'Please use this form to make a purchase suggestion. The more information you provide, the easier it is for our librarians to find the title you are requesting. We recommend using the "notes" field to provide additional information; for example, if the title will be used in a specific class or if it is for a specific research project.'
    let p2 = 'We prioritize titles used in the curriculum and may need to limit the number of requests accepted due to budget constraints. You will receive an email when we determine whether to acquire your suggestion. If this purchase recommendation is meant for course reserves, remember to <a href="https://libraries.cca.edu/content/course-reserves-request">fill out the Course Reserves Request</a> form, too.'
    $('#usersuggestions p').eq(0).html(p1)
    $('#usersuggestions p').eq(1).html(p2)
    // required field label tooltip
    $('label.required').attr('title', 'This field is required.')
}

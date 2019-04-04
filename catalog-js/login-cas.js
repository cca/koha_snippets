// interactions for the login page:
// - detect failed CAS login
// - button to show more information
// runs on document load
$(() => {
    var login = $('#cca-login')
    // only run if the "NoLoginInstructions" HTML is present on the page
    if (!!login.length) {
        var uncomment = (id) => {
            $(id).html($(id).html().replace('<!--', '').replace('-->', ''))
        }

        // wipe out everything _except alerts_, swap in our custom HTML
        login.remove()
        var alerts = $('#opac-auth .alert')
        $('#opac-auth').html('')
            .append('<br>').append(alerts).append(login)

        // hide everything except elements with class=show-initially
        var noshow = login.children(':not(.show-initially)')
        noshow.hide()
        // when js-open btn is clicked, reveal hidden elements
        $('.js-open').click(function() {
            noshow.show('slow')
            uncomment('#uncomment')
        })
    }
})

// interactions for the login page:
// - detect failed CAS login
// - button to show more information
// runs on document load
$(() => {
    var login = $('#cca-login')
    // only run if the "NoLoginInstructions" HTML is present on the page
    if (login.length) {
        var uncomment = (id) => {
            $(id).html($(id).html().replace('<!--', '').replace('-->', ''))
        }

        // wipe out everything _except alerts_, swap in our custom HTML
        login.remove()
        // for some reason this warning no longer is an alert...
        var failedCAS = $('p:contains("Sorry, the CAS login failed")')
        failedCAS.addClass('alert').html(`Sorry, your CCA login failed. It's likely
        that you don't have a library account yet or have one under a different
        username. Please <a href="https://libraries.cca.edu/contact">contact us</a>
        for assistance.`)
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

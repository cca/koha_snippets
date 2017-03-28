// interactions for the login page:
// - detect failed CAS login
// - button to show more information
// runs on document load
$(function() {
    var login = $('#cca-login')
    // only run if the "NoLoginInstructions" HTML is present on the page
    if (!!login.length) {
        var uncomment = function ($el) {
            var html = $el.html()
            html = html.replace('<!--', '').replace('-->', '')
            $el.html(html)
        }

        // see Koha bug #16818 - Plack broke CAS login link
        // https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=16818
        login.find('a[href*="sso.cca.edu"]').attr('href', function(pos, val) {
            return val.replace('library.cca.edu%2Fopac', 'library.cca.edu%2Fcgi-bin%2Fkoha')
        });

        // noAccount tests if it looks like an unsuccessful CAS login
        // have to do this _before_ emptying out #opac-auth HTML
        var noAccount = !!location.search.match('ticket=') && !!$('#opac-auth').find('p:contains("Sorry, the CAS login failed.")').length
        // wipe out everything, swapping in our custom HTML
        login.remove()
        $('#opac-auth').html('').append(login)

        // shows error message if they signed in without a Koha account
        if (!noAccount) {
            login.find('.no-account').remove()
        }

        // hide everything except elements with class=show-initially
        var noshow = login.children(':not(.show-initially)')
        noshow.hide()
        // when js-open btn is clicked, reveal hidden elements
        $('.js-open').click(function() {
            noshow.show('slow')
            uncomment($('#uncomment'))
        })
    }
})

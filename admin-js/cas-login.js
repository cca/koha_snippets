// better look for the CAS login link for staff
if ($('#main_auth').length && $('#login').length) {
    let heading = $('h4:contains("Cas login")')
    heading.before('<hr>')
    let link = heading.next().find('a')
    link.addClass('button btn')
    link.css({
        'display': 'block',
        'font-size': '1.4em'
    })
    link.text('Login with CCA Account')
}

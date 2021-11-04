// on specific searches for the Artists' Books collection, show a link to the
// previews in VAULT
if (path.match('/cgi-bin/koha/opac-search.pl')) {
    let qs = new URLSearchParams(location.search)
    let q = qs.get('q') && qs.get('q').toLowerCase()
    let limit = qs.get('limit')

    // @TODO un-comment this section when VAULT is back up
    // tease artists' books in VAULT for relevant queries & list
    // let abHtml = '<div class="alert alert-error">View previews of the Artists\' Books Collection <a href="https://vault.cca.edu/logon.do?.page=/hierarchy.do?topic=a7b976d5-5316-44da-b06e-7374cd100075">in VAULT</a> (signin required).</div>'
    // if (q && q.match(/artists?'? book/) || limit && limit.match('ARTIST')) {
    //     $('#numresults').before(abHtml)
    // } else if (path.match('opac-shelves.pl') && qs.get('op') == 'view' && qs.get('shelfnumber') == '481') {
    //     $('#usershelves').before(abHtml)
    // }

    // hide the "sorry no suggestions" warning from recommendation service
    // recommendations are loaded async so we repeatedly check for them
    // you can test this by running a nonsense search that yields 0 results
    let id = setInterval(() => {
        let ns = $('.nosuggestions')
        if (ns.length || $('.searchsuggestion').length) {
            ns.parent('#didyoumean').remove()
            clearInterval(id)
        }
    }, 400)

    // customize Materials Library results
    $('.results_summary.availability .available:contains("Materials Library")').each((idx, el) => {
        let item = $(el).parentsUntil('.bibliocol')
        let mattype = item.find('.results_material_type')
        // label material type as "material sample" with our custom icon
        mattype.html(mattype.html().replace(/visual material/ig, 'Material sample'))
        mattype.find('img').attr('src', 'https://storage.googleapis.com/libraries-lib-production/images/material-40.original.png')
        // remove the empty "type of visual" span
        item.find('.results_typeofvisual').remove()
    })
}

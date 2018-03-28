// on specific searches for the Artists' Books collection, show a link to the
// previews in VAULT
if (location.pathname.match('/cgi-bin/koha/opac-search.pl')) {
    let qs = new URLSearchParams(location.search)
    let q = qs.get('q').toLowerCase()

    // we have direct links that match these queries
    if (q && q.match(/artists?'? book/)) {
        // insert an alert about the artists' books in VAULT
        let html = '<div class="alert alert-error">View previews of the Artists\' Books Collection <a href="https://vault.cca.edu/logon.do?.page=/hierarchy.do?topic=a7b976d5-5316-44da-b06e-7374cd100075">in VAULT</a> (signin required).</div>'
        $('#numresults').before(html)
    }

    // hide the "sorry no suggestions" warning from recommendation service
    // recommendations are loaded async so we just keep checking if they're present
    let id = setInterval(() => {
        let ns = $('.nosuggestions')
        if (ns.length || $('.searchsuggestion').length) {
            ns.parent('#didyoumean').remove()
            clearInterval(id)
        }
    }, 400)

    // no "article request" link for non-periodical item types
    $('.bibliocol').each((idx, el) => {
        let type = $(el).find('.results_material_type img').attr('title')
        if (type !== 'serial') {
            $(el).find('.article_request').parent().remove()
        }
    })

    // customize Materials Library results
    $('.results_summary.availability .available:contains("Materials Library")').each((idx, el) => {
        let item = $(el).parent().parent('.bibliocol')
        let mattype = item.find('.results_material_type')
        // label material type as "material sample" with our custom icon
        mattype.html(mattype.html().replace(/visual material/ig, 'Material sample'))
        mattype.find('img').attr('src', 'https://libraries.cca.edu/media/images/material-40.original.png')
        // remove the empty "type of visual" span
        item.find('.results_typeofvisual').remove()
        // no need to offer article request action
        item.find('.article_request').parent('.actions').remove()
    })
}

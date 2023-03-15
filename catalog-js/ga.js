// load google tags analytics library
let d = document
    , s = d.createElement('script')
    , ga = d.getElementsByTagName('script')[0];
s.async = 1
s.src = 'https://www.googletagmanager.com/gtag/js?id=G-SCTY0C2C98'
ga.parentNode.insertBefore(s, ga)
window.dataLayer = window.dataLayer || []
function gtag(){ dataLayer.push(arguments) }
gtag('js', new Date())
gtag('config', 'G-SCTY0C2C98', { 'anonymize_ip': true, 'forceSSL': true, 'transport': 'beacon' })

function trackEvent (category, label, value) {
    gtag('event', category, {
        // under gtag must configure these as custom dimensions
        // https://support.google.com/analytics/answer/10075209
        'cca_label': label,
        'cca_value': value
    })
}

// our custom event tracking

// search facet usage
$('#search-facets .menu-collapse a').click(function (ev) {
    let $target = $(ev.target)
    // go up a couple lists to facet-level list item with ID like "au_id"
    let id = $target.parents('li[id]').attr('id')
    // get the _topic_ of the facet like au, location, su-geo
    let facet = id.replace('_id', '').replace('_facet', '')
    // actual facet being used, e.g. a name, location, place
    let value = $target.text()
    trackEvent('Search Facet', facet, value)
})

// right-side actions menu on bib detail pages
$('#action').on('click', 'a', function (ev) {
    // classes/IDs of <a>s are slightly more generic than their text
    // so we prefer ID for category but take 1st class otherwise
    let action = ev.target.id || ev.target.classList[0]
    // text of action is also informative
    let label = ev.target.textContent.trim()
    trackEvent('Action', action, label)
})

// social sharing icons beneath actions
// if people don't use these we should remove them
$('#social_networks div').click(function (ev) {
    let item = $(this).children().first()[0]
    let network = item.id
    let label = item.title
    trackEvent('Social Media Share', network, label)
})

// interactions with the "toolbar" above search results, below pagination
$('#toolbar a').click(function (ev) {
    let el = ev.target
    let action = el.id || el.className || (el.parentElement ? el.parentElement.id : 'unidentified anchor')
    let value = el.textContent || el.value
    trackEvent('Toolbar', action, value)
})
$('#toolbar select').change(function (ev) {
    let action = ev.target.id || ev.target.className || 'unidentified select'
    let value = $(this).find('option:selected').val() || 'unknown value'
    trackEvent('Toolbar', action, value)
})

// clicking on "did you mean" search suggestions, they load async
let interval = setInterval(()=>{
    // do we have suggestions or has the DYM element been removed already?
    // we remove it if there are no suggestions in catalog-js/opac-search.js
    if ($('.dym-loaded').length || !$('#didyoumean').length) {
        clearInterval(interval)
        $('.searchsuggestion a').click(function (ev) {
            let term = $(this).text().trim()
            let term_link = this.href
            trackEvent('Suggestion', term, term_link)
        })
    }
}, 500)

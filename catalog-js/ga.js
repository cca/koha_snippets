// analytics boilerplate with our tracking code
/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
/* jshint ignore:end */
ga('create', 'UA-18459158-7', 'auto')
ga('send', 'pageview')

function trackEvent (category, action, label) {
    ga('send', 'event', {
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      transport: 'beacon'
    })
}

// our custom event tracking
// outbound links, see https://developers.google.com/analytics/devguides/collection/analyticsjs/events#outbound_link_and_form_tracking
// track only on HTTP... links
$('a[href^=http]').click(function (ev) {
    trackEvent('Outbound Link', ev.target.textContent, ev.target.href)
})

// search facet usage
$('#search-facets .menu-collapse a').click(function (ev) {
    let $target = $(ev.target)
    // go up a couple lists to facet-level list item with ID like "au_id"
    let id = $target.parents('li[id]').attr('id')
    // get the _topic_ of the facet like au, location, su-geo
    let category = id.replace('_id', '').replace('_facet', '')
    // actual facet being used, e.g. a name, location, place
    let value = $target.text()
    trackEvent('Search Facet', category, value)
})

// right-side actions menu on bib detail pages
$('#action a').click(function (ev) {
    // classes/IDs of <a>s are slightly more generic than their text
    // so we prefer ID for category but take 1st class otherwise
    let category = ev.target.id || ev.target.classList[0]
    // text of action is also informative
    let value = ev.target.textContent
    trackEvent('Action', category, value)
})

// social sharing icons beneath actions
// if people don't use these we should remove them
$('#social_networks div').click(function (ev) {
    let item = $(this).children().first()[0]
    let category = item.id
    let value = item.title
    trackEvent('Social Network', category, value)
})

// interactions with the "toolbar" above search results, below pagination
$('#selections-toolbar a, #selections-toolbar input').click(function (ev) {
    let category = ev.target.id || ev.target.className || (ev.parentElement ? ev.parentElement.id : 'none')
    let value = ev.textContent || ev.value
    trackEvent('Toolbar', category, value)
})

// clicking on "did you mean" search suggestions, they load async
let interval = setInterval(()=>{
    // do we have suggestions or has the DYM element been removed already?
    // we remove it if there are no suggestions in catalog-js/opac-search.js
    if ($('.dym-loaded').length || !$('#didyoumean').length) {
        clearInterval(interval)
        $('.searchsuggestion a').click(function (ev) {
            let category = $(this).text().trim()
            let value = $(this).href
            trackEvent('Suggestion', category, value)
        })
    }
}, 500)

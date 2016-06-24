// analytics boilerplate with our tracking code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-18459158-7', 'auto');
ga('send', 'pageview');

// our custom event tracking
(function() {
    // outbound links, see https://developers.google.com/analytics/devguides/collection/analyticsjs/events#outbound_link_and_form_tracking
    // track only on HTTP... links
    $('a[href^=http]').click(function (ev) {
        ga('send', 'event', {
          eventCategory: 'Outbound Link',
          eventAction: ev.target.textContent,
          eventLabel: ev.target.href,
          transport: 'beacon'
        });
    })

    // search facet usage
    $('#search-facets .menu-collapse a').click(function (ev) {
        var $target = $(ev.target)
        // go up a couple lists to facet-level list item with ID like "au_id"
        var id = $target.parents('li[id]').attr('id')
        // get the _topic_ of the facet like au, location, su-geo
        var category = id.replace('_id', '').replace('_facet', '')
        // actual facet being used, e.g. a name, location, place
        var value = $target.text()
        ga('send', 'event', {
          eventCategory: 'TEST Search Facet',
          eventAction: category,
          eventLabel: value,
          transport: 'beacon'
        });
    })
})()

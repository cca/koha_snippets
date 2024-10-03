// set notforloan = "ordered" for new orders
// NOTE: the pattern below matches multiple paths
// e.g. acqui/neworderempty.pl, acqui/neworderbiblio.pl, acqui/newordersuggestion.pl
if (location.pathname.match('/cgi-bin/koha/acqui/neworder')) {
    $(() => {
        function set_defaults () {
            let select = $('#subfield7 select')
            // highlight field, @TODO remove this once we know it's working
            select.css('box-shadow', '0 0 4px 5px #f5f55f')
            // default to "ordered" value (-1)
            if (!select.val()) select.val(-1)
        }

        // run a moment after DOM load, item form is added by JS
        setTimeout(set_defaults, 500)
        // whenever an item is added/cleared, set defaults for the fresh form
        $(document).click('.addItemControl', set_defaults)
    })
}

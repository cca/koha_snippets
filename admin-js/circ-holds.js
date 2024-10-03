// "place a hold" page, accessible from multiple places
if (location.pathname.match('/cgi-bin/koha/reserve/request.pl')) {
    $(()=>{
        // uncheck "hold next avail. item" on holds page
        // we don't want people placing bib-level holds by accident
        $('#requestany').prop('checked', false)

        // LUO items do not auto-select the SF pickup branch in the "allowed
        // pickup locations" menu
        let locations = $('.pickup_locations')
        if ($('#requestspecific').length && locations.length) {
            // wait for select2 menu to be initialized & check that there are
            // no options already
            let int = setInterval(()=>{
                if (locations.hasClass('select2-hidden-accessible')) {
                    if (!locations.find('option').length) {
                        locations.append('<option value="SF" selected="selected">San Francisco</option>')
                    }
                    clearInterval(int)
                }
            }, 500)
        }
    })
}

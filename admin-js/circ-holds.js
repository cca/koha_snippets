// "place a hold" page, accessible from multiple places
if (path.match('/cgi-bin/koha/reserve/request.pl')) {
    $(()=>{
        // uncheck "hold next avail. item" on holds page
        // we don't want people placing bib-level holds by accident
        $('#requestany').prop('checked', false)
        // watch changes to pickup location & make allowed pickup locations match
        // NOTE: we will definitely have to revist this on next upgrade
        let update_location = () => {
            let branch = $('#pickup').val()
            let locations = $('.pickup_locations')
            // first, unselect everything, then select the matching branch
            locations.find('option').prop("selected", false)
            let opt = locations.find(`option[value="${branch}"]`).prop("selected", true)
            if (!opt.length) {
                // pickup branch was not in the list so we add it
                locations.append(`<option value="${branch}" selected="selected">${branch}</option>`)
            }
        }
        if ($('#requestspecific').length && $('.pickup_locations').length) {
            // hide pickup location columns as we'll auto update them
            $('#requestspecific').find('th:last-child, td:last-child').hide()
            update_location()
            $('#pickup').on('change', (ev) => update_location())
        }
    })
}

// "place a hold" page, accessible from multiple places
if (path.match('/cgi-bin/koha/reserve/request.pl')) {
    $(()=>{
        // uncheck "hold next avail. item" on holds page
        // we don't want people placing bib-level holds by accident
        $('#requestany').prop('checked', false)
        // watch for changes to pickup location
        // & update allowed pickup locations to match
        if ($('#requestspecific').length && $('.pickup_locations').length) {
            // hide pickup location columns as we'll auto update them
            $('#requestspecific').find('th:last-child, td:last-child').hide()
            $('#pickup').on('change', (ev) => {
                let branch = $('#pickup').val()
                $('.pickup_locations').each(function(ev){
                    let opt = $(this).find(`option[value="${branch}"]`).prop("selected", true)
                    if (!opt.length) {
                        // pickup branch is not in the list so we add it
                        $(this).append(`<option value="${branch}" selected="selected">${branch}</option>`)
                    }
                })
            })
        }
    })
}

// add a filter to large holdings tables so users can find the issue/volume
// they want more easily, very useful for serials with large numbers of items
// ex: https://library.cca.edu/cgi-bin/koha/opac-detail.pl?biblionumber=55280&viewallitems=1

// we're on a details page & there are more than 4 rows of holdings (not counting header row)
if (location.pathname === '/cgi-bin/koha/opac-detail.pl' && $('#holdingst tr').length > 5) {
    // Rolling our own search input is easier than trying to destory and rebuild the datatable
    // to change its config and add one, which has some kind of race condition that can break
    // the table entirely.
    let holdings = $('#holdingst')
    let searchInput = $('<input style="max-width:30em;" type="text" class="form-control mb-3" placeholder="Search items...">')
    holdings.before(searchInput)

    // Attach an event listener to the search input
    searchInput.on('keyup', function () {
        holdings.DataTable().search(this.value).draw()
    })
}

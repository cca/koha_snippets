// add a filter to large holdings tables so users can find the issue/volume
// they want more easily, very useful for serials with large numbers of items
// ex: https://library.cca.edu/cgi-bin/koha/opac-detail.pl?biblionumber=2806

// we're on a details page & there are more than 4 rows of holdings (not counting header row)
if (path === '/cgi-bin/koha/opac-detail.pl' && $('#holdingst tr').length > 5) {
    // run on document load
    $(() => {
        // "aoColumns" passage copied from details page source
        $("#holdingst").dataTable($.extend(true, {}, dataTablesDefaults, {
            // dataTables throws an error if you overwrite an existing table
            // "destroy" tells it to delete & recreate table
            "destroy": true,
            // the magic sauce: "f" tells DT to write the filter onto the DOM
            "sDom": "ft"
        }));
        // customize filter appearance a bit
        $('.dataTables_filter').find('label').wrap('<div class="form-inline" style="margin-bottom:16px;"></div>').css('font-weight', 'bold')
            .find('input').css({
                'margin-left': '1em',
                'width': '20em'
            })
            .attr('placeholder', 'for a particular volume or issue…')
            .addClass('form-control')
    })
}

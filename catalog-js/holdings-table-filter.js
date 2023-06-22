// add a filter to large holdings tables so users can find the issue/volume
// they want more easily, very useful for serials with large numbers of items
// ex: https://library.cca.edu/cgi-bin/koha/opac-detail.pl?biblionumber=2806

// we're on a details page & there are more than 4 rows of holdings (not counting header row)
if (path === '/cgi-bin/koha/opac-detail.pl' && $('#holdingst tr').length > 5) {
    // run on document load
    $(() => {
        // see the definition of the KohaTable fn & source of opac-details for details
        // https://github.com/Koha-Community/Koha/blob/v22.11.06/koha-tmpl/opac-tmpl/bootstrap/en/modules/opac-detail.tt#L1739
        var columns_settings = [{ "columnname": "item_cover", "is_hidden": 0, "cannot_be_toggled": 0, "cannot_be_modified": 0 }, { "cannot_be_modified": 0, "cannot_be_toggled": 0, "is_hidden": 0, "columnname": "item_itemtype" }, { "is_hidden": 0, "cannot_be_modified": 0, "cannot_be_toggled": 0, "columnname": "item_current_location" }, { "is_hidden": 0, "cannot_be_toggled": 0, "cannot_be_modified": 0, "columnname": "item_home_location" }, { "is_hidden": 1, "cannot_be_toggled": 0, "cannot_be_modified": 0, "columnname": "item_shelving_location" }, { "is_hidden": 0, "cannot_be_modified": 0, "cannot_be_toggled": 0, "columnname": "item_ccode" }, { "is_hidden": 0, "cannot_be_modified": 0, "cannot_be_toggled": 0, "columnname": "item_callnumber" }, { "columnname": "item_materials", "is_hidden": 1, "cannot_be_modified": 0, "cannot_be_toggled": 0 }, { "columnname": "item_enumchron", "is_hidden": 0, "cannot_be_toggled": 0, "cannot_be_modified": 0 }, { "columnname": "item_url", "cannot_be_toggled": 0, "cannot_be_modified": 0, "is_hidden": 0 }, { "cannot_be_modified": 0, "cannot_be_toggled": 0, "is_hidden": 1, "columnname": "item_copy" }, { "columnname": "item_status", "cannot_be_modified": 0, "cannot_be_toggled": 0, "is_hidden": 0 }, { "cannot_be_toggled": 0, "cannot_be_modified": 0, "is_hidden": 0, "columnname": "item_notes" }, { "columnname": "item_datedue", "is_hidden": 0, "cannot_be_modified": 0, "cannot_be_toggled": 0 }, { "columnname": "item_barcode", "cannot_be_toggled": 0, "cannot_be_modified": 0, "is_hidden": 1 }, { "columnname": "item_holds", "is_hidden": 0, "cannot_be_toggled": 0, "cannot_be_modified": 0 }, { "is_hidden": 0, "cannot_be_modified": 0, "cannot_be_toggled": 0, "columnname": "item_priority" }, { "columnname": "item_coursereserves", "cannot_be_toggled": 0, "cannot_be_modified": 0, "is_hidden": 0 }]

        KohaTable("#holdingst", {
            // https://datatables.net/reference/option/dom
            // https://datatables.net/reference/option/searching
            // "B" in dom string below adds a row of buttons (CSV, copy, print) not needed?
            dom: '<"clearfix"><"form-inline form-group"f>t', // clearfix doesn't seem necessary?
            "columnDefs": [
                { "targets": [-1], "sortable": true, "searchable": true },
            ],
            "bKohaColumnsUseNames": true,
            "autoWidth": false,
            "destroy": true
        }, columns_settings)

        // datatable search filter doesn't use bootstrap, looks bad by default
        $('#holdingst_filter input').addClass('form-control').css('margin-left', '.5rem')
    })
}

// fixes the disappearing barcode bug:
// https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=15030
// for each hidden item fieldset on serials/serial-edit.pl
// we send the itemnumber to a report that returns the barcode
// & if we receive any data, we fill it into the barcode field

if (location.pathname.match('/cgi-bin/koha/serials/serials-edit.pl')) {

    // select item fieldsets (they're all on page but start hidden)
    $('#serials_edit fieldset[id^="items"]').each(function(){
        var itemfields = $(this)
        var itemnumber = itemfields.find('input[name="itemid"]').val()

        // only check if it's a real item ID, not something like "2NEW" etc.
        if (itemnumber.match(/^\d+$/)) {
            $.ajax({
                url: '/cgi-bin/koha/svc/report',
                data: {
                    id: 190,
                    sql_params: itemnumber
                },
                dataType: 'json'
            }).success(function(data, status, jqxhr) {
                // data returned is structured like [['BARCODE STRING HERE']]
                // sometimes returns a null array so we avoid errors
                var barcode = data && data[0] && data[0][0]
                var bcfield = itemfields.find('input[id^="tag_952_subfield_p"]')
                // if we have a barcode & the barcode field isn't being actively edited
                if (barcode && !bcfield.is(':focus')) {
                    bcfield.val(barcode)
                }
            }).fail(function() {
                console.log('failed request to barcode report for item #' + itemnumber)
            })
        }
    })
}

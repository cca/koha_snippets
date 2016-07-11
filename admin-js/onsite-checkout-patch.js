// fix on-site checkout date inconsistency: if you select the checkbox under
// the barcode scanner box, it fills in today's date _at 11:59 AM_
// but if you click into the datepicker tool it (correctly) shows time 23:59
if (location.pathname.match('/cgi-bin/koha/circ/circulation.pl')) {
    // must run after document load to overwrite fn that comes later in source
    $(function(){
        // fn from view-source of circ page, see circulation.tt lines 66-79
        // we're overwriting a Koha function so must use global scope
        window.toggle_onsite_checkout = function(){
            if ( $("#onsite_checkout").attr('checked') ) {
                // this is the part we're patching, used to be "MM/DD/YYYY 11:59 AM"
                $("#duedatespec").val(
                    $.datepicker.formatDate('mm/dd/yy', new Date())
                    + ' 23:59'
                )
                // NOTE: Koha server-side code inserts another line here
                // if the SpecifyDueDate setting is active
            } else {
                $("#duedatespec").datetimepicker({
                    onClose: function(dateText, inst) { $("#barcode").focus(); },
                    hour: 23,
                    minute: 59
                });
            }
        }
    })
}

// for scripts that need to run on every page
// fix bug #23518 patron autocomplete broken
// code pretty much copied from koha-tmpl/intranet-tmpl/prog/en/includes/js_includes.inc
$(document).ready(function(){
    // biggest difference: remove pre-existing autocomplete UIs before applying this one
    $( "#findborrower, #searchmember" ).filter('.ui-autocomplete').autocomplete('destroy')
    var checkoutAutocomplete = $( "#findborrower" ).autocomplete({
        source: "/cgi-bin/koha/circ/ysearch.pl",
        minLength: 3,
        select: function( event, ui ) { window.location.href = ui.item.link; }
    }).data( "ui-autocomplete" );
    if (checkoutAutocomplete) {
        checkoutAutocomplete._renderItem = function( ul, item ) {
            item.link = "/cgi-bin/koha/circ/circulation.pl?borrowernumber=" + item.borrowernumber;
            var cardnumber = "";
            if( item.cardnumber != "" ){
                // Display card number in parentheses if it exists
                cardnumber = " (" + item.cardnumber + ") ";
            }
            return $( "<li></li>" )
            .data( "ui-autocomplete-item", item )
            .append( "<a href=\"" + item.link + "\">" + item.surname + ", " + item.firstname + cardnumber + " <small>" + item.dateofbirth + " " + item.address + " " + item.city + " " + item.zipcode + " " + item.country + "</small></a>" )
            .appendTo( ul );
        };
    }
    let searchPatronAutocomplete = $( "#searchmember" ).autocomplete({
            source: "/cgi-bin/koha/circ/ysearch.pl",
            minLength: 3,
            select: function( event, ui ) {
                window.location.href = ui.item.link;
            }
        }).data( "ui-autocomplete" );
    if (searchPatronAutocomplete) {
        searchPatronAutocomplete._renderItem = function( ul, item ) {
            item.link = "/cgi-bin/koha/circ/circulation.pl?borrowernumber=" + item.borrowernumber;
            var cardnumber = "";
            if( item.cardnumber != "" ){
                // Display card number in parentheses if it exists
                cardnumber = " (" + item.cardnumber + ") ";
            }
            return $( "<li></li>" )
            .data( "ui-autocomplete-item", item )
            .append( "<a href=\"" + item.link + "\">" + item.surname + ", " + item.firstname + cardnumber + " <small>" + item.dateofbirth + " " + item.address + " " + item.city + " " + item.zipcode + " " + item.country + "</small></a>" )
            .appendTo( ul );
        };
    }
});

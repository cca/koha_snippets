// check the "Received?" box by default, saves us a click
// only run on the "receive items" path
if (location.pathname === '/cgi-bin/koha/acqui/orderreceive.pl') {
    // run after document load so checkbox is in the DOM
    $(function(){
        // no good hook for selector
        $('.yui-u.first table input[type="checkbox"]').prop('checked', true)
    })
}

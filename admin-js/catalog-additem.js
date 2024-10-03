// replacementpricedate is a date field but inexplicably doesn't use a datepicker
if (location.pathname.match('/cgi-bin/koha/cataloguing/additem.pl')) {
    $( // run a second after DOM load, hopefully form is present
        setTimeout(
            function () {
                flatpickr('#subfield952w input[name = "items.replacementpricedate"]', {})
            }
        , 1200)
    )
}

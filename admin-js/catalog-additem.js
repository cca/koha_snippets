// replacementpricedate is a date field but inexplicably doesn't use a datepicker
if (path.match('/cgi-bin/koha/cataloguing/additem.pl')) {
    $( // run a second after DOM load, hopefully form is present
        setTimeout(
            function(){
                $('#subfield952w input').first().datepicker({
                    // ISO-8601 aw yeah
                    dateFormat: 'yy-mm-dd'
                })
            }
        , 1200)
    )
}

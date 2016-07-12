// set correct default for 942$c field
// we have jQuery available, run only on advanced cataloging editor
if (location.pathname.match('/cgi-bin/koha/cataloguing/editor.pl')) {
    // set 942c _once it appears in the DOM_ (check at intervals)
    var set942c = function (itype) {
        var interval = setInterval(function(){
            var subf = $('.subfield-widget option[value="' + itype + '"]')
            if (subf.length > 0) {
                subf.prop('selected', true)
                // stop checking
                clearInterval(interval)
            }
        }, 500)
    }

    var biblionumber = location.hash.split('/')[1]
    // use Koha web service to get MARC record
    $.get('/cgi-bin/koha/svc/bib/' + biblionumber)
        .done(function(xml){
            // parse MARCXML to find 942$c
            var itype = $('datafield[tag="942"] subfield[code="c"]', xml).text()
            // run only after document load
            $(function(){
                set942c(itype)
                // also, whenever record is saved, reset 942c to correct value
                // also works for Ctrl+S shortcut b/c that just clicks #save-record
                $('#save-record').click(function(){
                    set942c(itype)
                })
            })
        })
        .fail(function(error){
            console.error('error getting MARC preview', error)
        })
}

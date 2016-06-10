// monky-patch a bug in opac-shelves.pl by overwriting this function
if (location.pathname.match('/cgi-bin/koha/opac-shelves.pl')) {
    function holdSelections() {
        var checkedBoxes = $("input:checkbox:checked");
        if ($(checkedBoxes).size() == 0) {
            // we can still use this var because it's global
            alert(MSG_NO_RECORD_SELECTED);
        } else {
            var bibs = "";
            $(checkedBoxes).each(function(){
                // bug is here, old code was:
                // var name = $(this).attr("name");
                // var bib = name.substr(4);
                // except "name" property was always equal to "biblionumber"
                // => bib is "ionumber" & screws up the destination URL below
                var bib = $(this).val();
                bibs += bib + "/";
            });
            document.location = "/cgi-bin/koha/opac-reserve.pl?biblionumbers="+bibs;
        }
    }
}

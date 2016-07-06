// set correct default for 942$c field
// we have jQuery available, run only on advanced cataloging editor
if (location.pathname.match('/cgi-bin/koha/cataloguing/editor.pl')) {
    // run on document load
    $(function(){
        // load KohaBackend module which pulls JSON MARC framework data
        // this module is in koha-tmpl/intranet-tmpl/lib/koha/cateditor/koha-backend.js
        // & you can see how it's used in the cataloging module at
        // koha-tmpl/intranet-tmpl/prog/en/includes/cateditor-ui.inc
        require(['koha-backend'], function (kohaBackend) {
            try {
                // GetTagInfo signature is (framework code, tag)
                // where empty string => default framework
                var value = kohaBackend.GetTagInfo('', 942).subfields.c.defaultvalue
            } catch (e) {
                console.error('error trying to get 942$c default value', e)
            }
            if (value) {
                $('.subfield-widget option[value="' + value + '"]').prop('selected', true)
            }
        })
    })
}

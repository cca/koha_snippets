// adds a MARC field/subfield to the catalog display
// asynchronous as it finds the field's value by fetching record's MARCXML
// usage: addMARCfield('Title statement', 245)
// or addMARCfield('Responsibility statment', 245, 'c')
function addMARCfield (label, field, subfield) {
    // extract bib ID from HTML
    var biblionumber = $('.unapi-id').attr('title').split(':')[2]
    // use the record export URL
    var url = 'https://library.cca.edu/cgi-bin/koha/opac-export.pl?op=export&format=marcxml&bib=' + biblionumber

    // pull data from record export
    // $.get always seems to request the wrong URL somehow, use $.ajax
    $.ajax({
        url: url,
        dataType: 'xml'
    }).done(function (xml, xhr) {
        // parse field/subfield from XML
        var value = $('datafield[tag="' + field + '"]' + (subfield ? ' subfield[code="' + subfield + '"]' : ''), xml).text()
        // construct HTML to insert into the DOM
        var html = '<span class="results_summary marc' + field + '"><span class="label">' + label + ': </span>'
        html += value + '</span>'
        if (value) {
            $('.results_summary').last().after(html)
        }
    })
}

// adds a MARC field/subfield to the catalog display
// asynchronous as it finds the field's value by fetching record's MARCXML
// usage: addMARCfield('Title statement', 245)
// or addMARCfield('Responsibility statment', 245, 'c')
function addMARCfield (label, field, subfield) {
    // extract bib ID from HTML
    const biblionumber = $('.unapi-id').attr('title').split(':')[2]
    // use the record export URL
    const url = 'https://library.cca.edu/cgi-bin/koha/opac-export.pl?op=export&format=marcxml&bib=' + biblionumber

    // Pull data from record export. $.get requests the wrong URL somehow, use $.ajax
    $.ajax({
        url: url,
        dataType: 'xml'
    }).done(function (xml) {
        // parse field/subfield from MARCXML
        const value = $(`datafield[tag="${field}"]` + (subfield ? ` subfield[code="${subfield}"]` : ''), xml).text().trim()
        if (value) {
            // construct HTML to insert into the DOM
            let html = document.createElement('span')
            html.classList.add('results_summary', `marc${field}`)
            let child = document.createElement('span')
            child.classList.add('label')
            child.textContent = `${label}: ${value}`
            html.appendChild(child)
            $('.results_summary').last().after(html)
        }
    })
}

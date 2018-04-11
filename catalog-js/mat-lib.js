// custom display for Materials Library samples
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl') &&
    $('td.itype').eq(0).text().trim() === 'Material Sample') {
    // mat lib labels
    var newLabel = function (selector, label) {
        $('.results_summary' + selector + ' .label').text(label + ': ')
    }
    newLabel('.online_resources', 'Manufacturer Link')
    newLabel('.genre', 'Material Type')
    newLabel('.subjects', 'Composition, Properties, & Applications')

    // "material type" & ISBN aren't useful for Mat Lib items
    $('.results_summary.type, .results_summary.isbn').remove()

    // swap author field labels
    var $authors = $('h5.author')
    $authors.each(function(index, element){
        var html = $(element).html()
                        .replace('By:', 'Company Name:')
                        .replace('Contributor(s):', 'Company Name:')
        $(element).html(html)
    })
}

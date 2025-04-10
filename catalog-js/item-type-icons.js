// use our custom-made icons instead of default theme Koha ones
const iconMap = {
    'book': 'book.svg',
    'continuing resource': 'periodical.svg',
    'film': 'video-40',
    'kit': 'other.svg',
    'mixed materials': 'other.svg',
    'object': 'material-40',
    'other materials': 'other.svg',
    'picture': 'other.svg',
    'reserve': 'reserved-book.svg',
    'serial': 'periodical.svg',
    'text': 'book.svg',
    'periodicals': 'periodical.svg',
    'video': 'video-40',
    'visual material': 'video-40'
}
const replaceIcon = function (img, detailPage) {
    let materialType = img.alt.toLowerCase()
    if (Object.hasOwn && Object.hasOwn(iconMap, materialType)) {
        img.src = `https://storage.googleapis.com/libraries-lib-production/images/${iconMap[materialType]}.original.png`
        if (detailPage) {
            // detail page icons look better with some size/spacing adjustments, too
            img.attributeStyleMap.set("margin-right", "4px")
            img.height = 30
            img.width = 30
        }
    }
}
if (location.pathname.match('/cgi-bin/koha/opac-search.pl')) {
    document.querySelectorAll('label img, .results_material_type img').forEach(replaceIcon)
}
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    document.querySelectorAll('.results_summary.type .materialtype').forEach((el) => {
        replaceIcon(el, true)
    })
}

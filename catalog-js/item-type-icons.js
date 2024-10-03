// use our custom-made icons instead of default theme Koha ones
if (location.pathname.match('/cgi-bin/koha/opac-search.pl')) {
    let icon_map = {
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
    let replaceIcon = function (img) {
        let type = img.alt.toLowerCase()
        if (icon_map[type]) {
            img.src = `https://storage.googleapis.com/libraries-lib-production/images/${icon_map[type]}.original.png`
        }
    }

    document.querySelectorAll('.results_material_type img, label img').forEach(replaceIcon)
}

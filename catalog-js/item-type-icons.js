// use our custom-made icons instead of default theme Koha ones
if (path.match('/cgi-bin/koha/opac-search.pl')) {
    let icon_map = {
        'book': 'book.svg',
        'continuing resource': 'periodical.svg',
        'film': 'video-40',
        'kit': 'other.svg',
        'mixed materials': 'other.svg',
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
        if (icon_map[type]) return img.src = `https://libraries.cca.edu/media/images/${icon_map[type]}.original.png`
    }

    Array.from(document.querySelectorAll('.results_material_type img')).forEach(replaceIcon)
    Array.from(document.querySelectorAll('label img')).forEach(replaceIcon)
}

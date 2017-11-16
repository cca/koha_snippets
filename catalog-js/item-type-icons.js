// use our custom-made icons instead of default theme Koha ones
if (location.pathname.match('/cgi-bin/koha/opac-search.pl')) {
    let icon_map = {
        'book': 'book.svg',
        'other materials': 'other.svg',
        'reserve': 'reserved-book.svg',
        'serial': 'periodical.svg',
        'periodicals': 'periodical.svg',
        'video': 'video-40',
        'visual material': 'video-40'
    }
    let replaceIcon = function (img) {
        for (let type of Object.keys(icon_map)) {
            if (img.alt.toLowerCase().match(type)) {
                img.src = `https://libraries.cca.edu/media/images/${icon_map[type]}.original.png`
                break
            }
        }
    }

    Array.from(document.querySelectorAll('.results_material_type img')).forEach(replaceIcon)
    Array.from(document.querySelectorAll('label img')).forEach(replaceIcon)
}

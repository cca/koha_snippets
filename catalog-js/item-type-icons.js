// use our custom-made icons instead of default theme Koha ones
if (location.pathname.match('/cgi-bin/koha/opac-search.pl')) {
    let icon_map = {
        'book': 'book',
        'other materials': 'other',
        'reserve': 'reserve',
        'serial': 'periodical',
        'periodicals': 'periodical',
        'video': 'video',
        'visual material': 'video'
    }
    let replaceIcon = function (img) {
        for (let type of Object.keys(icon_map)) {
            if (img.alt.toLowerCase().match(type)) {
                img.src = `https://libraries.cca.edu/media/images/${icon_map[type]}-40.original.png`
                break
            }
        }
    }

    Array.from(document.querySelectorAll('.results_material_type img')).forEach(replaceIcon)
    // @TODO: icons are too fuzzy right now
    // Array.from(document.querySelectorAll('label img')).forEach(replaceIcon)
}

// use our custom-made icons instead of default theme Koha ones
(function() {
    let icon_map = {
        'book': 'book',
        'other materials': 'other',
        'reserve': 'reserve',
        'serial': 'periodical',
        'periodicals': 'periodical',
        'video': 'video',
        'visual material': 'video'
    }
    // by default type is same as icon but for some they don't match
    let replaceIcon = function (img) {
        for (let type of Object.keys(icon_map)) {
            if (img.alt.toLowerCase().match(type)) {
                img.src = `https://libraries.cca.edu/media/images/${icon_map[type]}-40.original.png`
                img.height = 20
                img.width = 20
                break
            }
        }
    }

    if (location.pathname.match('/cgi-bin/koha/opac-search.pl')) {
        Array.from(document.querySelectorAll('.results_material_type img')).forEach(replaceIcon)
    }

    if (location.pathname.match('/cgi-bin/koha/opac-search.pl')) {
        Array.from(document.querySelectorAll('label img')).forEach(replaceIcon)
    }
})()

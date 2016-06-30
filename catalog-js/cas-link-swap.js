$('#opac-auth a[href*="cas.cca.edu"]').attr('href', function(pos, val) {
    return val.replace('library.cca.edu%2Fopac', 'library.cca.edu%2Fcgi-bin%2Fkoha')
});

// fields made mandatory in settings only have <label> with a "required" class
// we need to make their corresponding inputs required, too
if (location.pathname.match('/cgi-bin/koha/opac-request-article.pl')) {
    $('#place-article-request label.required').each((idx, el) => {
        let input = $(el).attr('for')
        $(`#${input}`).prop('required', true)
    })
}

// scrape the book cover image URL from the 856$u field  and add it as a Koha cover image
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    let hasCover = () => !!$('.cover-image').length

    const addCPCover = function () {
        if ($('#biblio-cover-slider').length && !hasCover()) {
            // COCE cover image lookup still running, we have to wait
            return
        }

        $('.online_resources .resource_list a').each(function () {
            let link = $(this)
            let url = link.attr('href')
            // example URL: https://uniapi.librarypass.com/index.php/images/cover/md/6880002490009385420231110.png
            if (url.match(/^https?:\/\/uniapi\.librarypass\.com\//) && !hasCover()) {
                // html adapted from Koha local cover image
                $('.bookcover').first().html(
`<div class="bookcover">
    <div id="biblio-cover-slider" class="cover-slider">
        <div class="cover-image local-coverimg" style="display: block;">
            <a href="${url}">
                <img style="max-width:107px;" src="${url}">
            </a>
        </div>
    </div>
</div>`
                )
            }
            // if the text is simply "image" either way, whether we added a cover image or not, remove link
            if (link.text().toLowerCase().trim() === 'image') {
                link.parent().remove()
            }
        })

        // clear the interval
        clearInterval(interval)
    }

    const interval = setInterval(addCPCover, 400)
}

// if you have a local & COCE cover image, both are displayed
// we observe the coverimages <div> & if there are ever 2, remove the COCE one
// See: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
if ($('.coverimages') && !!MutationObserver) {
    let observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            let covers = $(mutation.target).closest('.coverimages')
            if (covers.find('span').length === 2) {
                covers.find('span[id^="coce-thumbnail"]').remove()
            }
        }
    })
    Array.from(document.querySelectorAll('.coverimages')).forEach((el) => {
        observer.observe(el, { subtree: true, childList: true })
    })
}

// if you have a local & COCE cover image, both are displayed
// we observe the .coverimages elmenet on search results pages
// and if there are ever 2 thumbnail images, remove the COCE one
let selector = '.coverimages'
if ($(selector).length && !!MutationObserver) {
    let observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            let covers = $(mutation.target).closest(selector)
            if (covers.find('[id*="-thumbnail"] img').length === 2) {
                covers.find('[id^="coce-thumbnail"]').remove()
            }
        }
    })
    Array.from(document.querySelectorAll(selector)).forEach((el) => {
        observer.observe(el, { subtree: true, childList: true })
    })
}

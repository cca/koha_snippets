// if we're on HTTPS & have some HTTP images, attempt to upgrade them to HTTPS
// inspired by Chrome's autoupgrade-mixed experiment which doesn't work for
// Amazon's images because the domain for the HTTP vs HTTPS cover image servers
// is different.
$(()=>{
    if (location.protocol === 'https:') {
        // HTTP image, mixed content
        $('img[src^="http://ecx.images-amazon.com"]').each((idx, img) => {
            let new_src = img.src.replace('http://ecx.images-amazon.com', '//images-na.ssl-images-amazon.com')
            fetch(new_src)
                .then((response)=> {
                    // successful request implies image is available
                    if (response.ok) {
                        img.src = new_src
                        return Promise.resolve('silence console error')
                    }
                })
        })
    }
})

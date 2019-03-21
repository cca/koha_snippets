// if we're on HTTPS & have some HTTP images, attempt to upgrade them to HTTPS
// inspired by Chrome's autoupgrade-mixed experiment which doesn't work for
// Amazon's images because the domain for the HTTP vs HTTPS cover image servers
// is different.
$(()=>{
    // we're on HTTPS
    if (location.protocol === 'https:') {
        // image has loading error
        $('img[src^="http://ecx.images-amazon.com"]').on('error', (ev) => {
            console.log('error', ev.target)
            var new_src = ev.target.src.replace('http://ecx.images-amazon.com', '://images-na.ssl-images-amazon.com')
            fetch(new_src)
                .success(()=> {
                    ev.target.src = new_src
                })
        })
    }
})

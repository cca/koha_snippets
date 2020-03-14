// Bug #20334, fixed in 19.11 - amazingly, we moved to Elasticsearch before
// searches escaped "/" so those all break now. Staff side has a search box on
// almost every page so don't filter by path
(()=>{
    // this looks so complicated because we don't want to escape an already-
    // escaped slash a second time
    let escapeSlash = (i, str) => str.replace(/([^\\])(\/)/, '$1\\/')
    $('#cat-search-block').submit(function(ev) {
        $(this).find('input[name="q"]').val(escapeSlash)
    })
})()

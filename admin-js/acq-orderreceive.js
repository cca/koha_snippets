// on the Acquisitions "receive items" page
// check the "Received?" box by default & fill in actual price
if (path === '/cgi-bin/koha/acqui/orderreceive.pl') {
    // run after document load
    $(()=>{
        // almost no classees or other good selector hooks on this page
        $('table input[type="checkbox"]').prop('checked', true)
        // copy RRP into "Actual cost" field. The RRP HTML looks like:
        //   <li><label for="rrp">Retail price: </label>
        //   5.99<span class="hint">(adjusted for USD,tax exclusive)</span></li>
        // so we need to get the next text node sibling, FML
        let rrp = $('label[for="rrp"]').length && $('label[for="rrp"]')[0].nextSibling && $('label[for="rrp"]')[0].nextSibling.textContent.trim()
        if (rrp) $('#unitprice').val(rrp)
    })
}

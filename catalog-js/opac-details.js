// all our customizations to the bib details display in one place
if (path.match('/cgi-bin/koha/opac-detail.pl')) {
    $(()=>{
        // extra commas in 700 "contributor" field display
        // like MARC of 700 __ ‡a Brundige, James, ‡e director, ‡e editor.
        // => "Brundige, James [director,, editor.]"
        $('h5.author .relatorcode').replaceWith(()=>{
            // jQuery expects HTML string here, not just a text node
            return '<span class="relatorcode">' + $(this).text().replace(/,,/g, ',') + '</span>'
        })

        // fix dual semicolons in publisher fields
        // like two MARC 260 fields:
        // 260 ‡aNew York, NY : ‡bNew Museum ;
        // 260 ‡aLondon : ‡bPhaidon, ‡c2016.
        // => New York, NY : New Museum ; ; London : Phaidon, 2016
        let pub = $('.results_summary.publisher')
        // if there are two consecutive semicolons separated by 2 or more spaces
        if (pub.text().match(/;\s*;/)) {
            pub.find('span[property="name"] a').each(function(){
                let el = $(this)
                let fixedText = el.text().replace(/\s*;/, '')
                el.text(fixedText)
            })
        }

        // #21 multiple 520 summary tags look awkward
        // hide the label of all but the first one
        $('.results_summary.summary').each((i, el) => {
            if (i > 0) $(el).find('.label').hide()
        })

        // hide "subscription from:" text, confusing, overlaps with "library has"
        $('#subscriptions p:contains("Subscription from:")').hide()

        // course reserves: separate course name & semester with a pipe
        if ($('#item_coursereserves').length) {
            // course reserves cell is always last in row
            $('tbody td:last-child').each((index, element) => {
                let cr = $(element).find('a')
                if (cr.length) {
                    // looks like: ${course name} <!-- ${section code} --> ${term}
                    // so we use ol' school DOM navigation & edit 3rd (text) node
                    let node = cr[0].childNodes[2]
                    let text = node.textContent.trim()
                    node.textContent = "| " + text
                }
            })
        }
    }) // close $(fn(){})
}

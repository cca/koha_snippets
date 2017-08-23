// pull online holdings details from our 360 knowledgebase
// and insert into public catalog record
// 3 good samples with different types of holdings:
// - African arts (0001-9933) several holdings including print
// - ARTMargins (2162-2574) one online holding & print
// - Art & artists (0004-3001) has only a print holding
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    // do we have an ISSN? use 360 Link API to see if we have online holdings
    var issn = $('.results_summary.issn').find('span[property="issn"]')

    if (issn.length > 0) {
        // remove period at end of ISSN text]
        issn = issn.text().replace('.', '')
        // base of 360 Link XML API proxy
        var ss_url = 'https://libraries.cca.edu/sersol/?issn=' + issn

        $.get(ss_url, function (data, status, xhr) {
            // first off—did we get any results from Serials Solutions?
            if (data.results) {
                // we'll build a list of formatted holdings in HTML
                var htmlist = []

                // function takes an entry under linkGroup & adds it to htmllist
                var formatEntry = function (item) {
                    var source = item.holdingData
                    // skip our library catalog holdings
                    if (source.databaseName !== 'CCA Print Holdings') {
                        var start = source.normalizedData.startDate.substr(0, 4)
                        var end = (source.normalizedData.endDate && source.normalizedData.endDate.substr(0, 4)) || 'present'

                        htmlist.push(
                            start + ' to ' + end +
                            ' in <a property="url" href="' +
                            // want the _last_ item in url array
                            item.url[item.url.length - 1]['#text'] + '">' +
                            source.databaseName + '</a>'
                        )
                    }
                }

                // data.results.result will (hopefully) always be an object
                // because an ISSN search should yield a single result
                // 2 scenarios: linkGroup can be object (1 result) or array (multiple)
                var lg = data.results.result.linkGroups.linkGroup
                // shut up jshint, this is elegant
                /* jshint ignore:start */
                Array.isArray(lg) ? lg.forEach(formatEntry) : formatEntry(lg);
                /* jshint ignore:end */

                // if .online_resources exists, add to it, otherwise create it
                var orspan = $('.results_summary.online_resources')
                if (orspan.length > 0 && htmlist.length > 0) {
                    orspan.append('| ' + htmlist.join(' | '))
                } else if (htmlist.length > 0) {
                    $('.record').append(
                        '<span class="results_summary online_resources">' +
                        '<span class="label">Online resources: </span>' +
                        htmlist.join(' | ') + '</span>'
                    )
                }

            } // end check for data.results
        }) // end $.get
    } // end check for ISSN
}

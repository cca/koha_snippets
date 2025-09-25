// pull online holdings details from our 360 knowledgebase
// and insert into public catalog record
// 3 good samples with different types of holdings:
// - African arts (0001-9933) several holdings including print
// - ARTMargins (2162-2574) one online holding & print
// - Art & artists (0004-3001) has only a print holding
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    // do we have an ISSN? use 360 Link API to see if we have online holdings
    let issn = $('.results_summary.issn').find('span[property="issn"]')

    if (issn.length > 0) {
        // remove period at end of ISSN text
        issn = issn.text().replace('.', '')
        // base of 360 Link XML API proxy
        let ss_url = 'https://libraries.cca.edu/sersol/?issn=' + issn

        fetch(ss_url)
            .then(response => response.json())
            .then(data => {
            // first off—did we get any results from Serials Solutions?
            if (data.results) {
                // we'll build a list of formatted holdings in HTML
                let htmlist = []

                // function takes an entry under linkGroup & adds it to htmllist
                const formatEntry = (item) => {
                    const source = item.holdingData
                    // skip our library catalog holdings
                    if (!source.databaseName.match('CCA Print Holdings')) {
                        const nd = source.normalizedData
                        let coverage = ''
                        if (!nd) {
                            coverage = ''
                        } else if (nd) {
                            // Either date can be undefined
                            // Ex. ARTMargins has no startDate https://libraries.cca.edu/sersol/?issn=2162-2574
                            // We are OK with "to 2024 in X" if no startDate
                            coverage = (nd.startDate && nd.startDate.substr(0, 4)) || ''
                            coverage += ' to '
                            coverage += (nd.endDate && nd.endDate.substr(0, 4)) || 'present'
                        }

                        // item.url can be object or array, we want last entry if it's an array
                        htmlist.push(`${coverage} in <a property="url" href="${item.url['#text'] || item.url.pop()['#text']}">${source.databaseName}</a>`)
                    }
                }
                const formatLinkGroup = (result) => {
                    if (result.linkGroups && result.linkGroups.linkGroup) {
                        // linkGroup can be an object or array
                        // Ex. Object (ARTMargins): https://libraries.cca.edu/sersol/?issn=2162-2574
                        // Ex. Array (Nat Geo): https://libraries.cca.edu/sersol/?issn=0027-9358
                        const lg = result.linkGroups.linkGroup
                        Array.isArray(lg) ? lg.forEach(formatEntry) : formatEntry(lg);
                    }
                }

                // data.results.result can be an object or array (same examples above work)
                const result = data.results.result
                Array.isArray(result) ? result.forEach(formatLinkGroup) : formatLinkGroup(result);

                // truncate htmllist to 5 entries, example (Nat Geo):
                // https://library.cca.edu/cgi-bin/koha/opac-detail.pl?biblionumber=22116
                if (htmlist.length > 5) {
                    htmlist = htmlist.slice(0, 5)
                    htmlist.push(`See <a href="https://ey7mr5fu9x.search.serialssolutions.com/ejp/?libHash=EY7MR5FU9X#/search/?searchControl=title&searchType=issn_equals&criteria=${issn}">Journal Finder</a> for more...`)
                }

                // if .online_resources exists, add to it, otherwise create it
                const orspan = $('.results_summary.online_resources')
                if (htmlist.length) {
                    orspan.length ? orspan.append('| ' + htmlist.join(' | ')) : $('.record').append(`<span class="results_summary online_resources"><span class="label">Online resources: </span>${htmlist.join(' | ')}</span>`)
                }
            }
        }).catch(e => console.error("Error fetching 360 data: ", e))
    }
}

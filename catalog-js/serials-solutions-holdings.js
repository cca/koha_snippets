// pull online holdings details from our 360 knowledgebase
// and insert into public catalog record
// 3 good samples with different types of holdings:
// - African arts (0001-9933) several holdings including print
// - ARTMargins (2162-2574) one online holding & print
// - Art & artists (0004-3001) has only a print holding
// 10/2021 OUTAGE: disable sersol API lookup
// if (path.match('/cgi-bin/koha/opac-detail.pl')) {
//     // do we have an ISSN? use 360 Link API to see if we have online holdings
//     let issn = $('.results_summary.issn').find('span[property="issn"]')
//
//     if (issn.length > 0) {
//         // remove period at end of ISSN text
//         issn = issn.text().replace('.', '')
//         // base of 360 Link XML API proxy
//         let ss_url = 'https://libraries.cca.edu/sersol/?issn=' + issn
//
//         $.get(ss_url, function (data, status, xhr) {
//             // first off—did we get any results from Serials Solutions?
//             if (data.results) {
//                 // we'll build a list of formatted holdings in HTML
//                 let htmlist = []
//
//                 // function takes an entry under linkGroup & adds it to htmllist
//                 let formatEntry = (item) => {
//                     let source = item.holdingData
//                     // skip our library catalog holdings
//                     if (!source.databaseName.match('CCA Print Holdings')) {
//                         let start = source.normalizedData.startDate.substr(0, 4)
//                         let end = (source.normalizedData.endDate && source.normalizedData.endDate.substr(0, 4)) || 'present'
//
//                         // we want the _last_ entry in the item.url array
//                         htmlist.push(`${start} to ${end} in <a property="url" href="${item.url.pop()['#text']}">${source.databaseName}</a>`)
//                     }
//                 }
//                 /* jshint ignore:start */
//                 let formatLinkGroup = (result) => {
//                     if (result.linkGroups && result.linkGroups.linkGroup) {
//                         // linkGroup can be an object or array
//                         let lg = result.linkGroups.linkGroup
//
//                         // shut up jshint, this is elegant
//                         Array.isArray(lg) ? lg.forEach(formatEntry) : formatEntry(lg);
//                     }
//                 }
//
//                 // data.results.result can be an object or array
//                 let result = data.results.result
//                 Array.isArray(result) ? result.forEach(formatLinkGroup) : formatLinkGroup(result);
//                 /* jshint ignore:end */
//
//                 // if .online_resources exists, add to it, otherwise create it
//                 let orspan = $('.results_summary.online_resources')
//                 if (orspan.length > 0 && htmlist.length > 0) {
//                     orspan.append('| ' + htmlist.join(' | '))
//                 } else if (htmlist.length > 0) {
//                     $('.record').append(`<span class="results_summary online_resources"><span class="label">Online resources: </span>${htmlist.join(' | ')}</span>`)
//                 }
//
//             } // end check for data.results
//         }) // end $.get
//     } // end check for ISSN
// }

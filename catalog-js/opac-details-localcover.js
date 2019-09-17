// all our customizations to the bib details display in one place
if (location.pathname.match('/cgi-bin/koha/opac-detail.pl')) {
    // run on page load in own scope
    $(function(){
        // if there are two cover images present, hide the second one
        // lets us "fix" blurry/bad cover images by uploading our own
        // we have to overwrite KOHA.LocalCover to accomplish this since
        // images load dynamically & CSS has no "nth-descendent" type selector
        if (typeof KOHA == "undefined" || !KOHA) window.KOHA = {}
        // this function copied from /opac-tmpl/bootstrap/js/localcovers.js
        KOHA.LocalCover.GetCoverFromBibnumber = function(uselink) {
            $("div[id^=local-thumbnail],span[id^=local-thumbnail]").each(function(i) {
                var mydiv = this;
                var message = document.createElement("span");
                $(message).attr("class","no-image");
                $(message).html(NO_LOCAL_JACKET);
                $(mydiv).parent().find('.no-image').remove();
                $(mydiv).append(message);
                var img = $("<img />").attr('src',
                    '/cgi-bin/koha/opac-image.pl?thumbnail=1&biblionumber=' + $(mydiv).attr("class"))
                    .load(function () {
                        this.setAttribute("class", "thumbnail");
                        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth === 0) {
                            //IE HACK
                            try {
                                $(mydiv).append(img);
                                $(mydiv).children('.no-image').remove();
                            }
                            catch (err) {
                            }
                        } else if (this.width > 1) { // don't show the silly 1px "no image" img
                            if (uselink) {
                                var a = $("<a />").attr('href', '/cgi-bin/koha/opac-imageviewer.pl?biblionumber=' + $(mydiv).attr("class"));
                                $(a).append(img);
                                $(mydiv).empty().append(a);
                            } else {
                                $(mydiv).empty().append(img);
                            }
                            $(mydiv).children('.no-image').remove();
                            // remove the COCE cover image div
                            $('#coce-thumbnail-preview').remove()
                        }
                    })
            });
        }
        // execute function we just redefined
        KOHA.LocalCover.GetCoverFromBibnumber(true)
    }) // close $(fn(){})
}

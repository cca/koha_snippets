/* @preserve JS for Koha CoverFlow Plugin
   This JS was added automatically by installing the CoverFlow plugin
   Please do not modify */
// only run on the home page, triggers unnecessary HTTP request otherwise
if (path.match('/cgi-bin/koha/opac-main.pl') || path === '/') {
    $(function() {
        $.getScript(
            "/plugin/Koha/Plugin/Com/ByWaterSolutions/CoverFlow/bower_components/jquery-flipster/dist/jquery.flipster.min.js",
            function(data, textStatus, jqxhr) {
                $("head").append(
                    "<link id='flipster-css' href='/plugin/Koha/Plugin/Com/ByWaterSolutions/CoverFlow/bower_components/jquery-flipster/dist/jquery.flipster.min.css' type='text/css' rel='stylesheet' />"
                );
                $('#coverflow').load("/coverflow.pl?id=127", function() {
                    $('.koha-coverflow img').on("load",
                        function() {
                            if (this.naturalHeight == 1) {
                                $(this).attr("src",
                                    "https://media.bywatersolutions.com/Model/NoImage.png"
                                );
                            }
                        });
                    var opt = {
                        'items': '.item',
                        'minfactor': 15,
                        'distribution': 1.5,
                        'scalethreshold': 0,
                        'staticbelowthreshold': false,
                        'titleclass': 'itemTitle',
                        'selectedclass': 'selectedItem',
                        'scrollactive': true,
                        'step': {
                            'limit': 4,
                            'width': 10,
                            'scale': true
                        }
                    };
                    $('#coverflow').flipster({
                        autoplay: '4000',
                        loop: 'true',
                    });
                });
            });
    });
}

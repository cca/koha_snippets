if (path.match('/cgi-bin/koha/admin/admin-home.pl')) {
    $('.sysprefs').eq(1).find('dl').eq(0).append('<dt><a href="/cgi-bin/koha/admin/background_jobs.pl">Background jobs</a></dt><dd>Status of batch bibliographic record modifications</dd>')
}

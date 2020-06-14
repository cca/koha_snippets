// https://github.com/cca/koha_snippets/issues/12
// "save to my lists" feature for unauthenticated users
// this feature touches multiple pages & is kept in this one file for sanity
var storage = window.sessionStorage
var loggedIn = !!$('.loggedinusername').length
var s = '#action .addtoshelf'

if (path.match('/cgi-bin/koha/opac-detail.pl')) {
    if (!loggedIn) {
        // add link, make it store data & go to user sign in
        var biblionumber = new URLSearchParams(location.search).get('biblionumber')
        $('#action li').eq(0).after('<li><a class="addtoshelf btn btn-lg btn-link" href="/cgi-bin/koha/opac-user.pl"><i class="fa fa-fw fa-list"></i> Save to your lists</a></li>')
        $(s).click((e) => storage.cca_save_to_list = biblionumber)
    // if we're signed in & have stored data, click the link then clear data
} else if (loggedIn && storage.cca_save_to_list) {
        $(s).click()
        storage.removeItem('cca_save_to_list')
    }
}
// check that we're signed in & that there's stored data, then redirect
if (path.match('/cgi-bin/koha/opac-user.pl')) {
    if (loggedIn && storage.cca_save_to_list) {
        location = '/cgi-bin/koha/opac-detail.pl?biblionumber=' + storage.cca_save_to_list
    }
}

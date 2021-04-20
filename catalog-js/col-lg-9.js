// fix formatting bug in 20.05.09, wrong Boostrap class is used
// https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=28021
if ($('#opac-detail').length) {
  if ($('meta[name="generator"]').attr('content').slice(0, 10) === 'Koha 20.05') {
         $('#catalogue_detail_biblio').parent().addClass('span9').removeClass('col-lg-9')
         $('.row').addClass('row-fluid').removeClass('row')
  }
}

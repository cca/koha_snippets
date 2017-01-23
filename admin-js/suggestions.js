// customizations for staff-side suggestions management page
if (location.pathname.match('/cgi-bin/koha/suggestion/suggestion.pl')) {
	// run on document load
	$(function(){
		// default all "show ___ entries" <select> inputs to "All"
		$('select[name$="t_length"] option[value="-1"]').prop('selected', true)
		// default the Acquisition Information library branch to "any"
		$('#branchcode option[value="__ANY__"]').prop('selected', true)
	})
}

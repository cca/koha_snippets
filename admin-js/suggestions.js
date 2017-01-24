// customizations for staff-side suggestions management page
if (location.pathname.match('/cgi-bin/koha/suggestion/suggestion.pl')) {
	$(function(){
		// silly approach: we need to customize after all datatables are in the
		// DOM but only one init.dt event fires (?), an order.dt event fires for
		// each table so we count the number of tables & run after last order.t
		// event, then remove the event handler itself
		var numTabs = $('#suggestiontabs li').length
		// these are namespaced custom datatables events
		$(document).on('order.dt', function(){
			console.log('order.dt', numTabs)
			if (numTabs === 1) {
				// default all "show ___ entries" <select> inputs to "All"
				$('select[name$="t_length"] option[value="-1"]').prop('selected', true)
				// default the Acquisition Information library branch to "any"
				$('#branchcode option[value="__ANY__"]').prop('selected', true)
				// event handler erase thyself
				$(document).off('order.dt')
			} else {
				numTabs--
			}
		})
	})
}

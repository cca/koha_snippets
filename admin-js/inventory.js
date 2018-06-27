// display a button that fixes the sorting of call numbers of the inventory page
// this relies on Ray Voelker's js-loc-callnumbers script which is included
// in a separate file
if (location.pathname === '/cgi-bin/koha/tools/inventory.pl') {

	function fixLCCNsort() {
		let pagination = $('select[name="inventoryt_length"]').val()
		if (pagination !== "-1") {
			alert('You must set "Show ____ entries" to "All" before clicking this.')
			return false
		}
		// apply LCC sort to datatable
		let loc = new locCallClass()
		let it = $('#inventoryt')
		it.find('tr').each( (idx, el) => {
			let lccn = $(el).find('td').eq(2)
			lccn.attr( 'data-order', loc.returnNormLcCall( lccn.text() ) )
		})
		// now that we have data-order values in HTML, destroy & redraw dataTable
		it.DataTable().destroy()
		// copied from Koha page source, overwrite global inventorydt var
		inventorydt = it.dataTable($.extend(true, {}, dataTablesDefaults, {
		    'sPaginationType': 'full_numbers',
	        "aoColumnDefs": [
		            { "bSortable": false, "bSearchable": false, "aTargets": [ 0 ] },
		        ],
	        "aaSorting": [[ 2, "asc" ]],
		    'fnDrawCallback': function() {
		        $('.openWin').bind('click',function(e){
		            e.preventDefault();
		            openWindow(this.href,'marcview',800,600);
		        });
		    }
		}));
	}

	$(document).ready(()=> {
		let html = '&nbsp;<a class="btn btn-primary js-cn-sort-fix">Fix Call Number Sorting</a>'
		$('.clearall').eq(0).after(html)
		$('.js-cn-sort-fix').on('click', fixLCCNsort)
	})
}

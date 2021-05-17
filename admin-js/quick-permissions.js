// Permissions Quick Set
// Derived from https://wiki.koha-community.org/wiki/JQuery_Library#Add_clear_and_preset_permission_buttons.2C_and_a_copy_button_to_user_permissions_page_.28v20.x.29
if (path.match('/cgi-bin/koha/members/member-flags.pl')) {
    let clear_html = '<div class="btn-toolbar" id="permissions_toolbar"><button id="cleartree" type="button" style="font-size:12px; margin-left:5px"><i class="fa fa-square-o"></i> Clear All Flags</button>'
    let copy_html = '<button id="copypref" type="button" style="font-size:12px; margin-left:5px"><i class="fa fa-clone"></i> Copy Permissions to...</button></div>'
    //Create Buttons
    $('#pat_member-flags #permissionstree div.permissions').before(clear_html + copy_html)

    //Clear Button Settings
    $( "#cleartree" ).click(() => {
      $('#pat_member-flags input[name="flag"]').removeAttr('checked')
      $('#pat_member-flags').find('a.togglechildren_off:visible').click()
    })

    let modal_html = '<div id="CopyPermissionsModal" class="modal fade" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><form method="post" action="submit"><input type="hidden" name="" value=""><div class="modal-header"><h3>Copy Permissions</h3></div><div id="CardNumberInfo" class="modal-body"><label for="usrBorrowerNumber">Borrowernumber (Target User): </label><input id="usrBorrowerNumber" type="text" size="10"></div><div class="modal-footer"><button id="btnCopySave" type="button" class="btn btn-success"><i class="fa fa-clone"></i> Copy & Save Permissions</button><button id="btnCopyCancel" data-dismiss="modal" aria-hidden="true" class="btn"><i class="fa fa-times"></i> Cancel</button></div></div>'

    // Copy Permissions Button Modal and Settings
    $('#pat_member-flags').append(modal_html)

    // Copy and Save if Enter is pressed
    $('#CopyPermissionsModal').keypress((e) => {
      if (e.keyCode === 13) {
        $('#btnCopySave').click()
        return false
      }
    })

    // Open Modal
    $('#pat_member-flags #copypref').on('click', () => {
      $('#CopyPermissionsModal').modal('show')
      $('#CopyPermissionsModal').on('shown.bs.modal', () => $('#usrBorrowerNumber').focus())
    })

    // Change Borrower Number and Save
    $('#pat_member-flags #btnCopySave').on('click', () => {
      let usrBorrowerNumber = $('#usrBorrowerNumber').val()
      $('#pat_member-flags #borrowernumber').val(usrBorrowerNumber)
      $('#btnCopyCancel').click()
      $('#pat_member-flags #permissions_toolbar button.btn-default').click()
    })
} else if (path.match('/cgi-bin/koha/members/moremember.pl')) {
    // Create alert to display after permissions are copied.
    // Display alert next to patron info showing permissions have been copied.
    $('#pat_moremember').each(() => {
      let referrer =  document.referrer
      let URLParams = new URLSearchParams(window.location.search)
      let URLBorrower = URLParams.get('borrowernumber')
      let referrerBorrower = referrer.split("=").pop()
      if (referrer.match("/cgi-bin/koha/members/member-flags.pl") && URLBorrower != referrerBorrower) {
        $('#pat_moremember #circmessages').next('h3').append('<span id="PermissionsUpdate" style="display: none; color: red; background-color: yellow"><b><i> Permissions copied from other user.</i><b></span>')
        $('#PermissionsUpdate').fadeIn().delay(3000).fadeOut()
      }
    })
}

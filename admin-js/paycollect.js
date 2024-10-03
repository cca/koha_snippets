if (location.pathname.match('/cgi-bin/koha/members/paycollect.pl')) {
    // append payment type to notes field, see https://github.com/cca/koha_snippets/issues/20
    // and https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=21791
    let $note = $('#selected_accts_notes')
    $('#payfine, #payindivfine').on('submit', () => {
        if ($note.length) {
            let payment_type = $('#payment_type').val()
            if (payment_type) $note.val((i, text) => `${text} ${payment_type}`)
        }
    })

    // On a "pay individual fine" transaction, the note input does not display
    // and instead is passed in the query string and stored in a hidden input
    // named "payment_note". We grab this value & recreate the note field.
    // NOTE: we must do both checks because writeoffs also hide the notes input.
    if (!$note.length && $('#payindivfine').length) {
        let $hiddenNote = $('#payment_note')
        let hiddenNoteText = $hiddenNote.val()
        $hiddenNote.remove()
        let html = `
<li>
    <label for="payment_note">Note: </label>
    <textarea name="payment_note" id="payment_note">${hiddenNoteText}</textarea>
</li>`
        $('#payfine ol, #payindivfine ol').append(html)
        $note = $('#payment_note')
    }
}

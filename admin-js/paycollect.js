if (path.match('/cgi-bin/koha/members/paycollect.pl')) {
    // append payment type to notes field, see https://github.com/cca/koha_snippets/issues/20
    // and https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=21791
    $('#payfine').on('submit', () => {
        let $note = $('#selected_accts_notes')
        if ($note.length) {
            let payment_type = $('#payment_type').val()
            if (payment_type) $note.val((i, text) => `${text} ${payment_type}`)
        }
    })
}

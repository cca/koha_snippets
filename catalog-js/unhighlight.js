/*
see bug #25749 https://bugs.koha-community.org/bugzilla3/show_bug.cgi?id=25749
unhighlight function is broken so we just remove it from the Actions menu
I tried copying the highlight jQuery plugin into here but it still doesn't work
*/

$('.highlight_toggle').parent('li').remove()

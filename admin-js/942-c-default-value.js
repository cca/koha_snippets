// set correct default for 942$c field
// run only on advanced cataloging editor page
if (location.pathname.match('/cgi-bin/koha/cataloguing/editor.pl')) {
    $(function(){
    // patch bug in makeAuthorisedValueWidgets function
    // which causes 942$c to always default to first item in drop-down list
    // see https://bugs.koha-community.org/bugzilla3/attachment.cgi?id=53601&action=diff
    require(['koha-backend', 'widget'], function (KohaBackend, Widget) {
        // use global scope, code copied from lines ≈ 64-99 of cateditor-ui.inc
        window.makeAuthorisedValueWidgets = function ( frameworkCode ) {
            $.each( KohaBackend.GetAllTagsInfo( frameworkCode ), function( tag, tagInfo ) {
                $.each( tagInfo.subfields, function( subfield, subfieldInfo ) {
                    if ( !subfieldInfo.authorised_value ) return;
                    var authvals = KohaBackend.GetAuthorisedValues( subfieldInfo.authorised_value );
                    if ( !authvals ) return;

                    var defaultvalue = subfield.defaultvalue || authvals[0].value;

                    Widget.Register( tag + subfield, {
                        init: function() {
                            var $result = $( '<span class="subfield-widget"></span>' );

                            return $result[0];
                        },
                        postCreate: function() {
                            var value = defaultvalue;
                            var widget = this;

                            $.each( authvals, function() {
                                if ( this.value == widget.text ) {
                                    value = this.value;
                                }
                            } );

                            this.setText( value );

                            $( '<select></select>' ).appendTo( this.node );
                            var $node = $( this.node ).find( 'select' );
                            $.each( authvals, function( undef, authval ) {
                                $node.append( '<option value="' + authval.value + '"' + (authval.value == value ? ' selected="selected"' : '') + '>' + authval.lib + '</option>' );
                            } );
                            $node.val( this.text );

                            $node.change( $.proxy( function() {
                                this.setText( $node.val() );
                            }, this ) );
                        },
                        makeTemplate: function() {
                            return defaultvalue;
                        },
                    } );
                } );
            } );
        }
        // trigger the function once loaded, we assume default framework
        makeAuthorisedValueWidgets('');
    })
    })
}

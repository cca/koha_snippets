<?php
// A proxy for the Serials Solution XML API so that our client-side scripts
// can access the data, placed at libraries.cca.edu/sersol/index.php

// need an ISSN parameter passed in the query string
$issn = $_GET['issn'];

if ($issn) {
	// @TODO consider parsing & sending only needed info to the client
	// get XML from Serials Solutions
	$xml= simplexml_load_string(
			file_get_contents("http://ey7mr5fu9x.openurl.xml.serialssolutions.com/openurlxml?version=1.0&url_ver=Z39.88-2004&issn=$issn"),
			// need these last 2 parameters to parse prefixed "ssopenurl:" elements
			"SimpleXMLElement", 0, 'ssopenurl', True
		);
	// send JSON to the browser since it'll be easier to parse
	echo json_encode($xml);
} else {
	echo '{ "error": "No ISSN parameter provided" }';
}

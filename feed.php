<?php header('Access-Control-Allow-Origin: *'); 
ini_set('display_errors', false);
set_exception_handler('ReturnError');

$r = '';
$url = 'http://stage.roadify.com/php/services/trips.php?did=Roadify-Puck-NYU&zone=NYC_MTA_Subway&lat=40.72475&lon=-73.99563&dM=300&output=xml';

if ($url) {
	// fetch XML
	$c = curl_init();
	curl_setopt_array($c, array(
		CURLOPT_URL => $url,
		CURLOPT_HEADER => false,
		CURLOPT_TIMEOUT => 10,
		CURLOPT_RETURNTRANSFER => true
	));
	$r = curl_exec($c);
	curl_close($c);
}

if ($r) {
	// XML to JSON
	echo $r;
}

else {
	// nothing returned?
	ReturnError();
}
// return JSON error flag
function ReturnError() {
	echo '{"error":true}';
}

?>
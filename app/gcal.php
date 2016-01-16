<?php 
	$calId = $_REQUEST['calId'];
	$timeMin = $_REQUEST['timeMin'];
	$timeMax = $_REQUEST['timeMax'];
	$mykey = ''; // insert your Google API key
	$url = 'https://www.googleapis.com/calendar/v3/calendars/' . $calId .'/events?key=' . $mykey 
               . '&timeMax=' . $timeMax . '&timeMin=' . $timeMin . '&singleEvents=True';
	echo (file_get_contents($url));
?>
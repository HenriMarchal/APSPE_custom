<?php
// Fichier insidieusement nommé Index.php servant à stopper les site scrapers (les aspirateurs de site)
session_start();

function get_ip() {
	if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	}
	elseif(isset($_SERVER['HTTP_CLIENT_IP'])) {
		$ip  = $_SERVER['HTTP_CLIENT_IP'];
	}
	else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}
	return $ip;
}

function is_CIDR($ip, $range) {

	// Get mask bits
	list($net, $maskBits) = explode('/', $range);

	// Size
	$size = (strpos($ip, ':') === false) ? 4 : 16;

	// Convert to binary
	$ipbin = inet_pton($ip);
	$netbin = inet_pton($net);
	if (!$ipbin || !$netbin) {
		error_log('[Anti-scraping] : Invalid IP address');
		error_log('ip: '.$ip.'  net: '.$net);
		return false;
	}

	// Build mask
	$solid = floor($maskBits / 8);
	$solidBits = $solid * 8;
	$mask = str_repeat(chr(255), $solid);
	for ($i = $solidBits; $i < $maskBits; $i += 8) {
		$bits = max(0, min(8, $maskBits - $i));
		$mask .= chr((pow(2, $bits) - 1) << (8 - $bits));
	}
	$mask = str_pad($mask, $size, chr(0));

	// Compare the mask
	return (($ipbin & $mask) === ($netbin & $mask));
}

// Send a warning mail with the unknown IP
function sendMailWarningUnknown($ip) {
	// on s'envoie un mail contenant l'adresse IP du visiteur (il s'agit peut être d'un vrai moteur de recherche)
    $domaine = @gethostbyaddr($ip) or ($domaine = 'IP non résolue');

    $contenu = '<html><head><title>Aspirateur de site (site scraper) d&eacute;tect&eacute;</title></head><body>'.
    'Un nouvel aspirateur (site scraper) a &eacute;t&eacute; d&eacute;tect&eacute; et stopp&eacute; sur phobiesociale.org<br /><br />'.
    'Son IP : '.$ip.'<br />'.
    'Domaine : '.$domaine.'<br />'.
    '<br />'.
    'Pri&egrave;re de v&eacute;rifier que ce n\'est pas un simple bot de moteur de recherche (crawler) encore inconnu. Dans ce cas il faudra ajouter le range de son IP dans la liste autoris&eacute;e du fichier anti-scraping.csv. Sinon il faut ajouter son range dans la liste noire du m&ecirc;me fichier<br/>'.
    'Pour d&eacute;terminer la dangerosit&eacute; de cette IP, vous pouvez utiliser des sites comme <a href="https://www.abuseipdb.com/check/'.$ip.'">AbuseIPDB</a> ou <a href="https://ipaddress.is/blacklist-check">IPAdress.is</a><br />'.
	'Ensuite, pour d&eacute;terminer le range de cette IP, vous pouvez utiliser des sites comme <a href="https://ipinfo.io/'.$ip.'">IPInfo</a> ou <a href="https://www.ip2location.com/demo/'.$ip.'">IP2LOCATION</a><br />'.
	'</body></html>';

    mail("webmaster@phobiesociale.org", "Warning. Tentative d'aspiration (scraping) de phobiesociale.org", $contenu, "From: webmaster@phobiesociale.org\r\nReply-To: webmaster@phobiesociale.org\r\nContent-Type: text/html; charset=\"iso-8859-1\"\r\n");
}

// Send a warning mail with the unknown IP
function sendMailDangerHarassment($ip, $range, $count, $description) {
	// on s'envoie un mail contenant l'adresse IP du visiteur (il s'agit peut être d'un vrai moteur de recherche)
    $domaine = @gethostbyaddr($ip) or ($domaine = 'IP non résolue');

    $contenu = '<html><head><title>Danger ! Harc&egrave;lement ('.$count.' fois) de '.$description.', aspirateur de site (site scraper)</title></head><body>'.
    'Un aspirateur (site scraper) connu nous harc&egrave;le sur phobiesociale.org !<br /><br />'.
    'Sa description : '.$description.'<br />'.
    'Nombre d\'attaques : '.$count.'<br />'.
    'Son range : '.$range.'<br />'.
    'Dernière IP utilis&eacute;e : '.$ip.'<br />'.
    'Domaine : '.$domaine.'<br />'.
    '<br />'.
    'Il faut peut-&ecirc;tre envisag&eacute; un signalement Pharos... En attendant, la menace a &eacute;t&eacute; bloqu&eacute;e. Cet email est envoy&eacute; toutes les 15 occurences de la menace<br />'.
	'</body></html>';

    mail("webmaster@phobiesociale.org", "Danger. Harcèlement d'un aspirateur (site scraper) sur phobiesociale.org", $contenu, "From: webmaster@phobiesociale.org\r\nReply-To: webmaster@phobiesociale.org\r\nContent-Type: text/html; charset=\"iso-8859-1\"\r\n");
}

// on récupère l'adresse IP du visiteur
$ip = get_ip();

// une redirection vers le site
// header('Location: index.php');

$ip = '117.132.188.205';

//Read the csv input
$found = 0;
if (($handle = fopen("anti-scraping.csv", "r")) !== FALSE) {
	$buffer = '';
	while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
		$range = $data[0];
		$is_white = ($data[1] == 'WHITE');
		$count = $data[2];
		$description = $data[3];

		if ($found === 0 && is_CIDR($ip, $range)) {
			if ($is_white) {
				$found = 1;
			}
			else {
				$count++;
				$found = 2;

				if ($count % 15 == 0) {// Every 15 threatens
					sendMailDangerHarassment($ip, $range, $count, $description);
				}
			}
		}
		$buffer = $buffer.$data[0].",".$data[1].",".$count.",".$data[3]."\r\n";
	}
	fclose($handle);
	//Rewrite the file with the new count
	$handle = fopen("anti-scraping.csv", "w");
	fwrite($handle, $buffer);
	fclose($handle);
}

if ($found == 0) {
	// Send warning mail
	sendMailWarningUnknown($ip);

	// Stop the session
	exit();
}
elseif ($found == 1) {
	// Do nothing
}
else {// $found ==2
	// Stop the session
	exit();
}
?>

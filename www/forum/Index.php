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

function isMoteur($ip) {
	/* Liste des robots de : Google, Altavista, Inktomi, Voila, WiseNut, Fast, DeepIndex, Teoma, Whalhello, Gigablast, Mirago, picsearch, Szukacz, Openfind, Naver */
	$listeiprobots[]='62.212.117.198';
	$listeiprobots[]='62.119.21.157';
	$listeiprobots[]='64.68.82.10';
	$listeiprobots[]='64.68.82.14';
	$listeiprobots[]='64.68.82.16';
	$listeiprobots[]='64.68.82.17';
	$listeiprobots[]='64.68.82.18';
	$listeiprobots[]='64.68.82.25';
	$listeiprobots[]='64.68.82.26';
	$listeiprobots[]='64.68.82.27';
	$listeiprobots[]='64.68.82.28';
	$listeiprobots[]='64.68.82.30';
	$listeiprobots[]='64.68.82.5';
	$listeiprobots[]='64.68.82.6';
	$listeiprobots[]='64.68.82.7';
	$listeiprobots[]='64.68.82.31';
	$listeiprobots[]='64.68.82.32';
	$listeiprobots[]='64.68.82.33';
	$listeiprobots[]='64.68.82.34';
	$listeiprobots[]='64.68.82.35';
	$listeiprobots[]='64.68.82.36';
	$listeiprobots[]='64.68.82.37';
	$listeiprobots[]='64.68.82.38';
	$listeiprobots[]='64.68.82.39';
	$listeiprobots[]='64.68.82.41';
	$listeiprobots[]='64.68.82.43';
	$listeiprobots[]='64.68.82.44';
	$listeiprobots[]='64.68.82.45';
	$listeiprobots[]='64.68.82.46';
	$listeiprobots[]='64.68.82.47';
	$listeiprobots[]='64.68.82.48';
	$listeiprobots[]='64.68.82.50';
	$listeiprobots[]='64.68.82.51';
	$listeiprobots[]='64.68.82.52';
	$listeiprobots[]='64.68.82.54';
	$listeiprobots[]='64.68.82.55';
	$listeiprobots[]='64.68.82.56';
	$listeiprobots[]='64.68.82.57';
	$listeiprobots[]='64.68.82.58';
	$listeiprobots[]='64.68.82.65';
	$listeiprobots[]='64.68.82.66';
	$listeiprobots[]='64.68.82.67';
	$listeiprobots[]='64.68.82.68';
	$listeiprobots[]='64.68.82.69';
	$listeiprobots[]='64.68.82.70';
	$listeiprobots[]='64.68.82.71';
	$listeiprobots[]='64.68.82.74';
	$listeiprobots[]='64.68.82.77';
	$listeiprobots[]='64.68.82.78';
	$listeiprobots[]='64.68.82.79';
	$listeiprobots[]='64.241.243.65';
	$listeiprobots[]='64.241.243.65';
	$listeiprobots[]='64.241.242.177';
	$listeiprobots[]='65.214.36.150';
	$listeiprobots[]='65.214.36.152';
	$listeiprobots[]='65.214.38.10';
	$listeiprobots[]='66.77.73.203';
	$listeiprobots[]='66.77.73.61';
	$listeiprobots[]='66.237.60.22';
	$listeiprobots[]='66.196.72.10';
	$listeiprobots[]='66.196.72.11';
	$listeiprobots[]='66.196.72.12';
	$listeiprobots[]='66.196.72.13';
	$listeiprobots[]='66.196.72.14';
	$listeiprobots[]='66.196.72.15';
	$listeiprobots[]='66.196.72.16';
	$listeiprobots[]='66.196.72.17';
	$listeiprobots[]='66.196.72.18';
	$listeiprobots[]='66.196.72.19';
	$listeiprobots[]='66.196.72.20';
	$listeiprobots[]='66.196.72.21';
	$listeiprobots[]='66.196.72.22';
	$listeiprobots[]='66.196.72.23';
	$listeiprobots[]='66.196.72.24';
	$listeiprobots[]='66.196.72.25';
	$listeiprobots[]='66.196.72.26';
	$listeiprobots[]='66.196.72.27';
	$listeiprobots[]='66.196.72.28';
	$listeiprobots[]='66.196.72.29';
	$listeiprobots[]='66.196.72.30';
	$listeiprobots[]='66.196.72.31';
	$listeiprobots[]='66.196.72.32';
	$listeiprobots[]='66.196.72.33';
	$listeiprobots[]='66.196.72.34';
	$listeiprobots[]='66.196.72.35';
	$listeiprobots[]='66.196.72.36';
	$listeiprobots[]='66.196.72.37';
	$listeiprobots[]='66.196.72.38';
	$listeiprobots[]='66.196.72.39';
	$listeiprobots[]='66.196.72.40';
	$listeiprobots[]='66.196.72.41';
	$listeiprobots[]='66.196.72.42';
	$listeiprobots[]='66.196.72.43';
	$listeiprobots[]='66.196.72.44';
	$listeiprobots[]='66.196.72.45';
	$listeiprobots[]='66.196.72.46';
	$listeiprobots[]='66.196.72.47';
	$listeiprobots[]='66.196.72.48';
	$listeiprobots[]='66.196.72.49';
	$listeiprobots[]='66.196.72.50';
	$listeiprobots[]='66.196.72.51';
	$listeiprobots[]='66.196.72.52';
	$listeiprobots[]='66.196.72.53';
	$listeiprobots[]='66.196.72.54';
	$listeiprobots[]='66.196.72.55';
	$listeiprobots[]='66.196.72.56';
	$listeiprobots[]='66.196.72.57';
	$listeiprobots[]='66.196.72.58';
	$listeiprobots[]='66.196.72.59';
	$listeiprobots[]='66.196.72.60';
	$listeiprobots[]='66.196.72.61';
	$listeiprobots[]='66.196.72.62';
	$listeiprobots[]='66.196.72.63';
	$listeiprobots[]='66.196.72.64';
	$listeiprobots[]='66.196.72.65';
	$listeiprobots[]='66.196.72.66';
	$listeiprobots[]='66.196.72.67';
	$listeiprobots[]='66.196.72.68';
	$listeiprobots[]='66.196.72.69';
	$listeiprobots[]='66.196.72.70';
	$listeiprobots[]='66.196.72.71';
	$listeiprobots[]='66.196.72.72';
	$listeiprobots[]='66.196.72.73';
	$listeiprobots[]='66.196.72.74';
	$listeiprobots[]='66.196.72.75';
	$listeiprobots[]='66.196.72.76';
	$listeiprobots[]='66.196.72.77';
	$listeiprobots[]='66.196.72.78';
	$listeiprobots[]='66.196.72.79';
	$listeiprobots[]='66.196.72.80';
	$listeiprobots[]='66.196.72.81';
	$listeiprobots[]='66.196.72.82';
	$listeiprobots[]='66.196.72.83';
	$listeiprobots[]='66.196.72.84';
	$listeiprobots[]='66.196.72.85';
	$listeiprobots[]='66.196.72.86';
	$listeiprobots[]='66.196.72.87';
	$listeiprobots[]='66.196.72.88';
	$listeiprobots[]='66.196.72.89';
	$listeiprobots[]='66.196.72.90';
	$listeiprobots[]='66.196.72.91';
	$listeiprobots[]='66.196.72.92';
	$listeiprobots[]='66.196.72.93';
	$listeiprobots[]='66.196.72.94';
	$listeiprobots[]='66.196.72.95';
	$listeiprobots[]='66.196.72.96';
	$listeiprobots[]='66.196.72.97';
	$listeiprobots[]='66.196.72.98';
	$listeiprobots[]='66.196.72.99';
	$listeiprobots[]='66.196.72.100';
	$listeiprobots[]='66.196.72.101';
	$listeiprobots[]='66.196.72.102';
	$listeiprobots[]='66.196.72.103';
	$listeiprobots[]='66.196.72.104';
	$listeiprobots[]='66.196.72.105';
	$listeiprobots[]='66.196.72.106';
	$listeiprobots[]='66.196.72.107';
	$listeiprobots[]='66.196.72.108';
	$listeiprobots[]='66.196.72.109';
	$listeiprobots[]='193.218.115.6';
	$listeiprobots[]='195.101.94.208';
	$listeiprobots[]='195.101.94.101';
	$listeiprobots[]='195.101.94.209';
	$listeiprobots[]='209.249.67.128';
	$listeiprobots[]='209.249.67.139';
	$listeiprobots[]='209.73.164.50';
	$listeiprobots[]='210.59.144.149';
	$listeiprobots[]='212.127.141.180';
	$listeiprobots[]='213.73.184.72';
	$listeiprobots[]='213.73.184.96';
	$listeiprobots[]='216.243.113.1';
	$listeiprobots[]='216.39.48.82';
	$listeiprobots[]='216.39.48.164';
	$listeiprobots[]='216.39.50.160';
	$listeiprobots[]='216.39.50.116';
	$listeiprobots[]='216.39.50.143';
	$listeiprobots[]='216.39.50.144';
	$listeiprobots[]='216.39.50.145';
	$listeiprobots[]='216.39.50.155';
	$listeiprobots[]='216.39.48.58';
	$listeiprobots[]='216.239.46.19';
	$listeiprobots[]='216.239.46.23';
	$listeiprobots[]='216.239.46.3';
	$listeiprobots[]='216.239.46.30';
	$listeiprobots[]='216.239.46.36';
	$listeiprobots[]='216.239.46.41';
	$listeiprobots[]='216.239.46.42';
	$listeiprobots[]='216.239.46.43';
	$listeiprobots[]='216.239.46.60';
	$listeiprobots[]='216.239.46.102';
	$listeiprobots[]='216.239.46.104';
	$listeiprobots[]='216.239.46.105';
	$listeiprobots[]='216.239.46.86';
	$listeiprobots[]='216.239.46.96';
	$listeiprobots[]='216.239.46.98';
	$listeiprobots[]='216.239.46.99';
	$listeiprobots[]='216.239.46.118';
	$listeiprobots[]='216.239.46.140';
	$listeiprobots[]='216.239.46.147';
	$listeiprobots[]='216.239.46.165';
	$listeiprobots[]='216.239.46.184';
	$listeiprobots[]='217.205.60.225';
	$listeiprobots[]='218.145.25.110';
	$listeiprobots[]='218.145.25.49';
	$listeiprobots[]='216.88.158.142';
	$listeiprobots[]='127.0.0.1';// Localhost
	$listeiprobots[]='2001:41d0:1004:56::1';// Robot OVH
	$listeiprobots[]='154.3.62.58';// mixrank robot
	$listeiprobots[]='66.249.66.66';// Google crawler bot
	$listeiprobots[]='136.243.228.178';// Hezner online datacenter
	$listeiprobots[]='136.243.222.140';// Hezner online datacenter
	$listeiprobots[]='175.22.85.198'; // China unicom network
	$listeiprobots[]='182.204.140.95';// China net backbone
	if(in_array($ip, $listeiprobots)) {
		return true;
	}
	else{
		return false;
	}
}

// on récupère l'adresse IP du visiteur
$ip = get_ip();

// on teste si on a affaire à un vrai moteur de recherche
if(!isMoteur($ip)) {
	// on s'envoie un mail contenant l'adresse IP du visiteur (il s'agit peut être d'un vrai moteur de recherche)
    $domaine = @gethostbyaddr($ip) or ($domaine = 'IP non résolue');

    $contenu = '<html><head><title>Aspirateur de site (site scraper) d&eacute;tect&eacute;</title></head><body>'.
    'Un aspirateur (site scraper) a &eacute;t&eacute; d&eacute;tect&eacute; et stopp&eacute; sur phobiesociale.org<br /><br />'.
    'Son IP : '.$ip.'<br />'.
    'Domaine : '.$domaine.'<br />'.
    'Pri&egrave;re de v&eacute;rifier que ce n\'est pas un simple bot de moteur de recherche encore inconnu. Dans ce cas il faudra ajouter son IP dans la liste autoris&eacute;e du fichier Index.php'.
    '</body></html>';

    mail("webmaster@phobiesociale.org", "Warning. Tentative d'aspiration (scraping) de phobiesociale.org", $contenu, "From: webmaster@phobiesociale.org\r\nReply-To: webmaster@phobiesociale.org\r\nContent-Type: text/html; charset=\"iso-8859-1\"\r\n");

    // on bloque l'affichage
    exit();
}
// une redirection vers le site
// header('Location: index.php');
?>

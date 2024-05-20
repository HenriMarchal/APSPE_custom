<div style='text-align:center;'>
<a href="index.php">
<font face="Arial, Helvetica" color="black" size=2>
Retour page d'accueil
</font>
</a>
</div>
<br>
<?php
$Q1A=$_POST['Q1A'];
$Q2A=$_POST['Q2A'];
$Q3A=$_POST['Q3A'];
$Q4A=$_POST['Q4A'];
$Q5A=$_POST['Q5A'];
$Q6A=$_POST['Q6A'];
$Q7A=$_POST['Q7A'];
$Q8A=$_POST['Q8A'];
$Q9A=$_POST['Q9A'];
$Q10A=$_POST['Q10A'];
$Q11A=$_POST['Q11A'];
$Q12A=$_POST['Q12A'];
$Q13A=$_POST['Q13A'];
$Q14A=$_POST['Q14A'];
$Q1B=$_POST['Q1B'];
$Q2B=$_POST['Q2B'];
$Q3B=$_POST['Q3B'];
$Q4B=$_POST['Q4B'];
$Q5B=$_POST['Q5B'];
$Q6B=$_POST['Q6B'];
$Q7B=$_POST['Q7B'];
$Q8B=$_POST['Q8B'];
$Q9B=$_POST['Q9B'];
$Q10B=$_POST['Q10B'];
$Q11B=$_POST['Q11B'];
$Q12B=$_POST['Q12B'];
$Q13B=$_POST['Q13B'];
$Q14B=$_POST['Q14B'];
// V&eacute;rifier si r&eacute;ponse &agrave; toutes les questions
if (($Q1A=="") || ($Q1B==""))
{
	$err="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 1<br>";
}
if (($Q2A=="") || ($Q2B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 2<br>";
}
if (($Q3A=="") || ($Q3B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 3<br>";
}
if (($Q4A=="") || ($Q4B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 4<br>";
}
if (($Q5A=="") || ($Q5B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 5<br>";
}
if (($Q6A=="") || ($Q6B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 6<br>";
}
if (($Q7A=="") || ($Q7B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 7<br>";
}
if (($Q8A=="") || ($Q8B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 8<br>";
}
if (($Q9A=="") || ($Q9B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 9<br>";
}
if (($Q10A=="") || ($Q10B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 10<br>";
}
if (($Q11A=="") || ($Q11B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 11<br>";
}
if (($Q12A=="") || ($Q12B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 12<br>";
}
if (($Q13A=="") || ($Q13B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 13<br>";
}
if (($Q14A=="") || ($Q14B==""))
{
	$err.="Vous n'avez pas r&eacute;pondu &agrave; la question num&eacute;ro 14<br>";
}


// Calcul scores
$score_anxiete=$Q1A+$Q2A+$Q3A+$Q4A+$Q5A+$Q6A+$Q7A+$Q8A+$Q9A+$Q10A+$Q11A+$Q12A+$Q13A+$Q14A;
$score_evitement=$Q1B+$Q2B+$Q3B+$Q4B+$Q5B+$Q6B+$Q7B+$Q8B+$Q9B+$Q10B+$Q11B+$Q12B+$Q13B+$Q14B;
$degre_peur=$score_anxiete+$score_evitement;
$reaction_peur=$score_anxiete-$score_evitement;
$type_peur[1]=$Q1A+$Q3A+$Q7A+$Q9A+$Q13A+$Q1B+$Q3B+$Q7B+$Q9B+$Q13B;
$type_peur[2]=$Q2A+$Q6A+$Q10A+$Q14A+$Q2B+$Q6B+$Q10B+$Q14B;
$type_peur[3]=$Q4A+$Q8A+$Q12A+$Q4B+$Q8B+$Q12B;
$type_peur[4]=$Q5A+$Q11A+$Q5B+$Q11B;
$type_peur[1]=floor($type_peur[1]/30*12);
$type_peur[2]=floor($type_peur[2]/24*12);
$type_peur[3]=floor($type_peur[3]/18*12);
$type_peur[4]=$type_peur[4];
echo "<table align=\"center\" border=1 cellpadding=15 cellspacing=0 bordercolor=\"#00552B\" width=540>\n";
    echo "<tr bgcolor=\"#3399CC\">\n";
			echo "<td align=\"center\" colspan=3>\n";
				echo "<a name=\"resultats\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#ffffff\" size=3>\n";
				echo "<b>&Eacute;valuez votre peur des autres</b><br>\n";
				echo "</font>\n";
				if(empty($err))
				{
					echo "<font face=\"Arial, Helvetica\" color=\"#ffffff\" size=2>\n";
					echo "<b>R&eacute;sultats et <a href=\"#analyse\"><font face=\"Arial, Helvetica\" color=\"#ffffff\" size=2>Analyse</font></a></b>\n";
					echo "</font>\n";
				}
			echo "</td>\n";
		echo "</tr>\n";
	if(isset($err)) // Si pas r&eacute;ponse &agrave; toutes les questions afficher messages erreur
	{
	  echo "<tr bgcolor=\"#33CCCC\">\n";
			echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$err\n";
				echo "</font>\n";
			echo "</td>\n";
		echo "</tr>\n";
		echo "<tr bgcolor=\"#3399CC\">\n";
			echo "<td align=\"center\">\n";
				echo "<a href=\"javascript:history.go(-1);\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#ffffff\" size=2>\n";
				echo "<b>Retour au questionnaire</b>\n";
				echo "</font>\n";
				echo "</a>\n";
			echo "</td>\n";
		echo "</tr>\n";
	}
	else	// si r&eacute;ponses &agrave; toutes les questions
	{
		// Afficher les r&eacute;ponses
		echo "<tr bgcolor=\"#33CCCC\">\n";
      echo "<td align=\"center\" width=\"33%\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "<b>Vous avez r&eacute;pondu aux 14 questions</b><br>\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\" nowrap>\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "<b>Cette situation vous procure</b><br>\n";
				echo "0 = aucune g&ecirc;ne<br>\n";
				echo "1 = une g&ecirc;ne l&eacute;g&egrave;re<br>\n";
				echo "2 = une anxi&eacute;t&eacute; importante<br>\n";
				echo "3 = une vraie panique\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\" nowrap>\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "<b>Vous &eacute;vitez cette situation</b><br>\n";
				echo "0 = jamais<br>\n";
				echo "1 = rarement<br>\n";
				echo "2 = souvent<br>\n";
				echo "3 = syst&eacute;matiquement\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#e7e7e7\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
			echo "<div style=\"text-align:justify;\">\n";
				echo "1) Prendre la parole devant un groupe de personnes (pour faire un discours, un expos&eacute;, etc.)\n";				
			echo "</div>\n";
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q1A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q1B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#33CCCC\">\n";
      echo "<td >\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
			echo "<div style=\"text-align:justify;\">\n";
 			echo "2) Livrer vos sentiments intimes lors d'un t&ecirc;te &agrave; t&ecirc;te avec quelqu'un qui compte pour vous\n";
			echo "</div>\n";
			echo "</font>\n";
			echo "</td>\n";
      echo " <td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
					echo "$Q2A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
					echo "$Q2B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";		
    echo "<tr bgcolor=\"#e7e7e7\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
			echo "<div style=\"text-align:justify;\">\n";
 			echo "3) Intervenir pour donner votre point de vue lors d'une discussion\n";
			echo "</div>\n";
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
					echo "$Q3A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
					echo "$Q3B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#33CCCC\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
			echo "<div style=\"text-align:justify;\">\n";
 			echo "4) Demander &agrave; quelqu'un qui parle &agrave; voix haute, au cin&eacute;ma, au th&eacute;&acirc;tre ou au concert, de se taire\n";	
			echo "</div>\n";
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
					echo "$Q4A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
					echo "$Q4B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#e7e7e7\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
			echo "<div style=\"text-align:justify;\">\n";
 			echo "5) &Ecirc;tre observ&eacute; par quelqu'un quand vous faites un travail (taper &agrave; la machine, bricoler, coudre, etc.)	\n";
			echo "</div>\n";
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				 echo "$Q5A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q5B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#33CCCC\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
 			echo "<div style=\"text-align:justify;\">\n";
			echo "6) Aller &agrave; une soir&eacute;e o&ugrave; vous connaissez tr&egrave;s peu de monde\n";
			echo "</div>\n";
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q6A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q6B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#e7e7e7\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
 			echo "<div style=\"text-align:justify;\">\n";
			echo "7) T&eacute;l&eacute;phoner &agrave; une administration pour des renseignements (pr&eacute;fecture, s&eacute;curit&eacute; sociale, etc.)\n";
			echo "</div>\n";	
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q7A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q7B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#33CCCC\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
 			echo "<div style=\"text-align:justify;\">\n";
			echo "8) Dire non &agrave; une personne qui vous demande de lui rendre service\n";
			echo "</div>\n";	
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q8A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q8B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#e7e7e7\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
 			echo "<div style=\"text-align:justify;\">\n";
			echo "9) Rencontrer quelqu'un d'important ou de haut plac&eacute; (patron, personnalit&eacute;, etc.)\n";
			echo "</div>\n";	
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q9A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q9B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#33CCCC\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
 			echo "<div style=\"text-align:justify;\">\n";
			echo "10) Engager la conversation avec des gens que vous ne connaissez pas\n";
			echo "</div>\n";	
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q10A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q10B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#e7e7e7\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
 			echo "<div style=\"text-align:justify;\">\n";
			echo "11) &Eacute;crire, manger, boire ou marcher devant des gens\n";
			echo "</div>\n";	
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q11A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q11B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#33CCCC\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
 			echo "<div style=\"text-align:justify;\">\n";
			echo "12) Rapporter un achat qui ne vous convient pas &agrave; un commer&ccedil;ant\n";
			echo "</div>\n";	
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q12A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q12B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#e7e7e7\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
 			echo "<div style=\"text-align:justify;\">\n";
			echo "13) Passer un oral d'examen, un test d'aptitude ou un entretien d'embauche\n";
			echo "</div>\n";	
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q13A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q13B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
    echo "<tr bgcolor=\"#33CCCC\">\n";
      echo "<td>\n";
			echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
 			echo "<div style=\"text-align:justify;\">\n";
			echo "14) Parler de banalit&eacute;s (&laquo; de la pluie et du beau temps &raquo;) avec des voisins ou des commer&ccedil;ants\n";
			echo "</div>\n";	
			echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "$Q14A\n";
				echo "</font>\n";
			echo "</td>\n";
      echo "<td align=\"center\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";		
				echo "$Q14B\n";
				echo "</font>\n";
			echo "</td>\n";
    echo "</tr>\n";
		echo "<tr bgcolor=\"#3399CC\">\n";
			echo "<td align=\"center\" colspan=3>\n";
				echo "<a name=\"analyse\">\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#ffffff\" size=3>\n";
				echo "<b>&Eacute;valuez votre peur des autres</b><br>\n";
				echo "</font>\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#ffffff\" size=2>\n";
				echo "<b><a href=\"#resultats\"><font face=\"Arial, Helvetica\" color=\"#ffffff\" size=2>R&eacute;sultats</font></a> et Analyse</b>\n";
				echo "</font>\n";
			echo "</td>\n";
		echo "</tr>\n";
		// Degr&eacute; de peur
		echo "<tr bgcolor=\"#33CCCC\">\n";
			echo "<td align=\"center\" colspan=3>\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "<b>Votre degr&eacute; de peur<br><br></b>\n";
				echo "Pour conna&icirc;tre l'importance de votre peur des autres<br><br>\n";
				echo "Votre score total compris entre 0 et 84 est de : <b>$degre_peur</b> points\n";
				echo "</font>\n";
			echo "</td>\n";
		echo "</tr>\n";
		echo "<tr bgcolor=\"#e7e7e7\">\n";
			echo "<td align=\"center\" colspan=3>\n";
				echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
				echo "<div style=\"text-align:justify;\">\n";
				if ($degre_peur<10)
				{
					echo "<i>Votre score total est inf&eacute;rieur &agrave; 10 :</i><br>\n";
					echo "vous semblez ne jamais &eacute;prouver la moindre g&ecirc;ne devant les autres. &Ecirc;tes-vous bien sinc&egrave;re avec vous-m&ecirc;me ? A moins que vous ne soyez un mutant dans l'esp&egrave;ce humaine !\n";
				}
				if (($degre_peur>=10) && ($degre_peur<=29))
				{
					echo "<i>Votre score total est compris entre 10 et 29 :</i><br>\n";
					echo "vous ressentez de temps en temps une l&eacute;g&egrave;re anxi&eacute;t&eacute; face aux autres. Cette r&eacute;action est normale, mais elle peut g&acirc;cher certains de vos contacts sociaux, surtout si vous avez plusieurs fois mis des notes de 2 ou 3.\n";
				}
				if (($degre_peur>=30) && ($degre_peur<=50))
				{
					echo "<i>Votre score total est compris entre 30 et 50 :</i><br>\n";
					echo "vous paraissez redouter de nombreuses confrontations avec les autres et vous semblez en souffrir. Et si vous songiez &agrave; r&eacute;soudre votre probl&egrave;me d'anxi&eacute;t&eacute; sociale ?\n";
				}
				if ($degre_peur>50)
				{
					echo "<i>Votre score total est sup&eacute;rieur &agrave; 50 :</i><br>\n";
					echo "vous &eacute;prouvez beaucoup d'anxi&eacute;t&eacute; dans vos contacts avec les autres et votre vie s'en ressent grandement. Vous pourriez utilement en parler avec un m&eacute;decin ou un psychologue.\n";
				}
				echo "</div>\n";
				echo "</font>\n";
			echo "</td>\n";
		echo "</tr>\n";
		if ($degre_peur>10) // Seulement si degr&eacute; peur est d'au moins 10
		{
			// R&eacute;actions de peur
			echo "<tr bgcolor=\"#33CCCC\">\n";
				echo "<td align=\"center\" colspan=3>\n";
					echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
					echo "<b>Votre r&eacute;actions de peur<br><br></b>\n";
					echo "Analysez la mani&egrave;re dont vous r&eacute;agissez &agrave; cette peur<br><br>\n";
					echo "Votre score &laquo; anxi&eacute;t&eacute; &raquo; compris entre 0 et 42 est de : <b>$score_anxiete</b> points<br>\n";
					echo "Votre score &laquo; &eacute;vitement &raquo; compris entre 0 et 42 est de : <b>$score_evitement</b> points<br>\n";
					echo "La diff&eacute;rence entre votre score &laquo; anxi&eacute;t&eacute; &raquo; et votre score &laquo; &eacute;vitement &raquo; est de : <b>$reaction_peur</b> points\n";
					echo "</font>\n";
				echo "</td>\n";
			echo "</tr>\n";
			echo "<tr bgcolor=\"#e7e7e7\">\n";
				echo "<td align=\"center\" colspan=3>\n";
					echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
					echo "<div style=\"text-align:justify;\">\n";
					if ($reaction_peur<-5)
					{
						echo "<i>Votre score &laquo; anxi&eacute;t&eacute; &raquo; est nettement inf&eacute;rieur &agrave; votre score &laquo; &eacute;vitement &raquo; (de plus de 5 points) : </i><br>\n";
						echo "votre peur des autres vous pousse &agrave; &eacute;viter certains contacts. C'est fort compr&eacute;hensible, mais vous ne vous donnez pas les meilleurs chances de voir cette peur diminuer. Essayez d'affronter davantage de situations.\n";
					}
					if (($reaction_peur>=-5) && ($reaction_peur<=5))
					{
						echo "<i>Votre score &laquo; anxi&eacute;t&eacute; &raquo; est &agrave; peu pr&egrave;s &eacute;quivalent &agrave; votre score &laquo; &eacute;vitement &raquo; (&agrave; 5 points pr&egrave;s) : </i><br>\n";
						echo "vous tentez de faire face aux situations de contacts avec les autres, m&ecirc;me si vous n'&ecirc;tes toujours tr&egrave;s &agrave; l'aise Mais attention, car parfois vous y renoncez. C'est dommage car cela risque, d'une certaine fa&ccedil;on, d'entretenir votre peur.\n";
					}
					if ($reaction_peur>5)
					{
						echo "<i>Votre score &laquo; anxi&eacute;t&eacute; &raquo; est nettement sup&eacute;rieur &agrave; votre score &laquo; &eacute;vitement &raquo; (de plus de 5 points) : </i><br>\n";
						echo "malgr&eacute; la peur que vous inspire un certain nombre de contacts avec les autres, vous essayez souvent d'affronter la situation. Bravo, c'est dans ce sens qu'il faut continuer.\n";
					}
					echo "</div>\n";
					echo "</font>\n";
				echo "</td>\n";
			echo "</tr>\n";
				// type de peur
			echo "<tr bgcolor=\"#33CCCC\">\n";
				echo "<td align=\"center\" colspan=3>\n";
					echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
					echo "<b>Votre type de peur<br><br></b>\n";
					echo "Vous pouvez mieux conna&icirc;tre ce qui, dans le contact avec les autres, vous fait vraiment peur\n";
					echo "</font>\n";
				echo "</td>\n";
			echo "</tr>\n";
			echo "<tr bgcolor=\"#e7e7e7\">\n";
				echo "<td align=\"center\" colspan=3>\n";
					echo "<font face=\"Arial, Helvetica\" color=\"#000000\" size=2>\n";
					echo "<div style=\"text-align:justify;\">\n";
					echo "<i>Vos notes les plus &eacute;l&eacute;v&eacute;s (anxi&eacute;t&eacute; ou &eacute;vitement) concernent surtout les situations n&deg; : </i><br>\n";
					if (($type_peur[1]>=$type_peur[2]) && ($type_peur[1]>=$type_peur[3]) && ($type_peur[1]>=$type_peur[4]))
					{
						echo "<i>1, 3, 7, 9 et 13.</i><br>\n";
						echo "ce que vous redoutez avant tout, c'est d'<b>&ecirc;tre &eacute;valu&eacute; par les autres.</b> C'est-&agrave;-dire qu'ils portent un jugement n&eacute;gatif sur vous ou sur ce que vous venez faire.<br>\n";
						$val=1;
					}
					if (($type_peur[2]>=$type_peur[1]) && ($type_peur[2]>=$type_peur[3]) && ($type_peur[2]>=$type_peur[4]))
					{
						echo "<i>2, 6, 10 et 14.</i><br>\n";
						echo "ce qui vous rend surtout anxieux, c'est de <b>vous livrer aux autres.</b> C'est-&agrave;-dire qu'ils puissent mieux conna&icirc;tre vos sentiments intimes, votre personnalit&eacute; profonde.<br>\n";
					}
					if (($type_peur[3]>=$type_peur[1]) && ($type_peur[3]>=$type_peur[2]) && ($type_peur[3]>=$type_peur[4]))
					{
						echo "<i>4, 8 et 12.</i><br>\n";
						echo "ce qui vous g&ecirc;ne le plus, c'est de <b>vous imposer face aux autres.</b> C'est-&agrave;-dire de faire valoir vos droits, de d&eacute;fendre vos opinions.<br>\n";
					}
					if (($type_peur[4]>=$type_peur[1]) && ($type_peur[4]>=$type_peur[2]) && ($type_peur[4]>=$type_peur[3]))
					{
						echo "<i>5 et 11.</i><br>\n";
						echo "ce qui vous met particuli&egrave;rement mal &agrave; l'aise, c'est <b>le regard des autres.</b> C'est-&agrave;-dire qu'ils vous observent avec plus ou moins d'attention.\n";
					}
					echo "</div>\n";
					echo "</font>\n";
				echo "</td>\n";
			echo "</tr>\n";
			echo "<tr bgcolor=\"#3399CC\">\n";
				echo "<td align=\"center\" colspan=3>\n";
					echo "<a href=\"page2.php3\">\n";
					echo "<font face=\"Arial, Helvetica\" color=\"#ffffff\" size=2>\n";
					echo "<b>Recommencer le test</b>\n";
					echo "</font>\n";
					echo "</a>\n";
				echo "</td>\n";
			echo "</tr>\n";
		}
	}
echo "</table>\n";
?>
<br>
<div style='text-align:center;'>
<a href="index.php">
<font face="Arial, Helvetica" color="black" size=2>
Retour page d'accueil
</font>
</a>
</div>
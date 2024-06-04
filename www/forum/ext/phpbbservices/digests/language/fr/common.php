<?php
/**
*
* @package phpBB Extension - Digests
* @copyright (c) 2021 Mark D. Hamill (mark@phpbbservices.com)
* @license http://opensource.org/licenses/gpl-2.0.php GNU General Public License v2
*
*/

if (!defined('IN_PHPBB'))
{
	exit;
}

if (empty($lang) || !is_array($lang))
{
	$lang = array();
}

// DEVELOPERS PLEASE NOTE
//
// All language files should use UTF-8 as their encoding and the files must not contain a BOM.
//
// Placeholders can now contain order information, e.g. instead of
// 'Page %s of %s' you can (and should) write 'Page %1$s of %2$s', this allows
// translators to re-order the output of data while ensuring it remains correct
//
// You do not need this where single placeholders are used, e.g. 'Message %d' is fine
// equally where a string contains only two placeholders which are used to wrap text
// in a url you again do not need to specify an order e.g., 'Click %sHERE%s' is fine
//
// Some characters you may want to copy&paste:
// ’ » “ ” …
//

$lang = array_merge($lang, array(
	'PLURAL_RULE'						=> 1,

	'DIGESTS_ALL_FORUMS'				=> 'Tous',
	'DIGESTS_AM'						=> ' AM', // not used if date/time formats do not permit AM and PM
	'DIGESTS_AUTHOR'					=> 'Auteur',
	'DIGESTS_BAD_SEND_HOUR'				=> 'L\'heure de la newsletter de l\'utilisateur %1$s est invalide. C\'est %2$d. Le nombre doit être >= 0 and < 24.',
	'DIGESTS_BLOCK_IMAGES'				=> 'Bloquer les images',
	'DIGESTS_BLOCK_IMAGES_EXPLAIN'		=> 'Interdit toutes images d\'apparaître dans vos newsletters, incluant les smileys et les images attachées dans les messages. Cela peut être utile pour les connexions lentes, si minimiser la bande-passante est un soucis ou pour les forums très actifs avec beaucoup d\'images. Les newsletters texte ne contiennent jamais d\'images.',
	'DIGESTS_BOARD_LIMIT'				=> '%d (limite du forum)',
	'DIGESTS_BY'						=> 'Par',
	'DIGESTS_CLOSED_QUOTE'				=> '&rdquo;',
	'DIGESTS_CLOSED_QUOTE_TEXT'			=> '"',
	'DIGESTS_COUNT_LIMIT'				=> 'Nombre maximum de messages dans la newsletter',
	'DIGESTS_COUNT_LIMIT_EXPLAIN'		=> 'Entrez un nombre plus grand que zéro si vous voulez limitez le nombre de messages dans la newsletter.',
	'DIGESTS_DAILY'						=> 'Journalier',
	'DIGESTS_DATE'						=> 'Date',
	'DIGESTS_DELIMITER'					=> ' &#8249; ', // Used to help show the hierarchy of forum names from the index on down. Should not change in language translations unless different character is used on breadcrumb menu.
	'DIGESTS_DISCLAIMER_HTML'			=> '<p><a href="%5$s">Se désinscrire en un clic</a></p><p>Vous pouvez aussi changer ou supprimer votre souscription via le&rsquo;s <a href="%1$sucp.%3$s">Panneau de contrôle de l\'utilisateur</a>.</p><p>Si vous avez des questions ou un retour à faire sur vos newsletters, prière de l\'envoyer au<a href="mailto:%4$s?subject=Newsletters">%2$s webmaster</a>.</p>',
	'DIGESTS_DISCLAIMER_TEXT'			=> 'Se désinscrire en un clic : %5$s
	
Vous pouvez aussi changer ou supprimer votre souscription via le Panneau de contrôle de l\'utilisateur.
	
Si vous avez des questions ou un retour à faire sur vos newsletters, prière de l\'envoyer au webmaster : %4$s.',
	'DIGESTS_EXPLANATION'				=> 'Les newsletters sont des emails qui vous sont envoyés périodiquement avec le résumé des messages. Les newsletters peuvent être envoyées journalièrement, hebdomadairement ou mensuellement à l\'heure du jour que vous choisissez. Vous pouvez spécifier en particulier les forums dont vous souhaitez les derniers messages ou par défaut, vous pouvez choisir de recevoir tous les messages de tous les forums où vous avez le droit de lecture. Vous pouvez annuler votre souscription à n\'importe quel moment en venant ici. La plupart des utlisateurs trouvent les newsletters très utiles. Essayez-les donc !',
	'DIGESTS_FILTER_ERROR'				=> 'Le mailer de newsletters a été appelé avec un user_digest_filter_type invalide : %s',
	'DIGESTS_FILTER_FOES'				=> 'Enlever les message des utilisateurs ignorés',
	'DIGESTS_FILTER_TYPE'				=> 'Types de messages dans la newsletter',
	'DIGESTS_FOREIGN_LINK_REMOVED'		=> '[ Lien extérieur supprimé. Cliquez sur le lien vers le message ou le sujet pour voir ce lien. ]',
	'DIGESTS_FOREIGN_LINK_REMOVED_TEXT'	=> '[ Lien extérieur supprimé. Lisez le sujet sur le forum pour voir ce lien. ]',
	'DIGESTS_FORMAT_HTML'				=> 'Stylisé',
	'DIGESTS_FORMAT_HTML_EXPLAIN'		=> 'Les styles sont appliqués si votre programme d\'email le permet',
	'DIGESTS_FORMAT_HTML_CLASSIC'		=> 'Stylisé, messages disposés dans des tableaux',
	'DIGESTS_FORMAT_HTML_CLASSIC_EXPLAIN'	=> 'Similaire à stylisé sauf que les messages des sujets et les messages privés sont disposés dans des tableaux',
	'DIGESTS_FORMAT_PLAIN'				=> 'A plat',
	'DIGESTS_FORMAT_PLAIN_EXPLAIN'		=> 'Stylisé sans couleurs ou polices de caractère',
	'DIGESTS_FORMAT_PLAIN_CLASSIC'		=> 'A plat, messages disposés dans des tableaux',
	'DIGESTS_FORMAT_PLAIN_CLASSIC_EXPLAIN'	=> 'Similaire à à plat sauf que les messages des sujets et les messages privés sont disposés à l\'intérieur de tableaux',
	'DIGESTS_FORMAT_STYLING'			=> 'Stylisation des newsletters',
	'DIGESTS_FORMAT_STYLING_EXPLAIN'	=> 'Prière de noter que la stytlisation dépend des capacité de votre programme d\'email. Déplacer votre curseur au-dessus des styles pour en apprendre plus.',
	'DIGESTS_FORMAT_TEXT'				=> 'Texte brut',
	'DIGESTS_FORMAT_TEXT_EXPLAIN'		=> 'Aucun style ne sera appliqué sur la newsletter. Seulement le texte brut sera affiché, probablement dans une police de caractère de largeur fixe.',
	'DIGESTS_FORUMS_WANTED'				=> 'Forums désirés',
	'DIGESTS_FREQUENCY'					=> 'Type de newsletter désiré',
	'DIGESTS_FREQUENCY_EXPLAIN'			=> 'Les newsletters hebdomadaires sont envoyées le %s. Les newsletters mensuelles sont envoyées le premier jour du mois. Le temps UTC est utilsier pour déterminer le jour de la semaine.',
	'DIGESTS_FREQUENCY_SHORT'			=> 'Type de newsletter',
	'DIGESTS_HOURS_ABBREVIATION' 		=> ' h',	// see: http://www.scienceeditingexperts.com/which-is-the-correct-abbreviation-for-hours-2h-2-h-2hs-2-hs-2hrs-or-2-hrs, DIGESTS_AM and DIGESTS_PM are used instead if specified in user_dateformat
	'DIGESTS_INSTALL_REQUIREMENTS'		=> 'Votre version de phpBB doit être &gt; 3.3.0 et &lt; 4.0 pour installer cette extension. Prière de corriger ce problème, puis de réactiver l\'extension à nouveau.',
	'DIGESTS_INTRODUCTION' 				=> 'Voici le dernier résumé des messages des forums %s. <em>Ne répondez pas</em> à cet email pour répondre aux sujets, messages ou messages privés. Mais prière <em>de visiter</em> le forum et de rejoindre la discussion ! (Si le format de la newsletter dysfonctionne, soyez sûr d\'avoir télécharger tout le contenu distant.)',
	'DIGESTS_JUMP_TO_MSG'				=> 'Msg ID',
	'DIGESTS_JUMP_TO_POST'				=> 'Post ID',
	'DIGESTS_LASTVISIT_RESET'			=> 'Réinitialiser la date de ma dernière visite sur le forum quand je reçois une newsletter',
	'DIGESTS_LASTVISIT_RESET_EXPLAIN'	=> 'Si activé, la date et l\'heure auxquelles votre newsletter a été créée seront utilisées pour votre date de dernière visite. Les notifications liées aux sujets jusqu\'à l\'heure de la newsletter seront aussi marquées comme lues.',
	'DIGESTS_LINK'						=> 'Lien',
	'DIGESTS_MAILED_TOOLTIP'			=> 'Cliquez pour voir les détails envoyés',
	'DIGESTS_MARK_READ'					=> 'Marquer comme lus quand ils apparaissent dans la newsletter',
	'DIGESTS_MAX_DISPLAY_WORDS'			=> 'Nombre de mots maximum à afficher dans la newsletter',
	'DIGESTS_MAX_DISPLAY_WORDS_EXPLAIN'	=> 'Pour assurer un affichage consistent, si un message doit être tronqué, la balise HTML sera supprimé du message. Paramétrez à 0 pour afficher l\'intégralité du message. Si l\'option &ldquo;Ne pas afficher le texte du message du tout&rdquo; est sélectionné, ce champ est ignoré et le texte du message n\'est pas affiché dans la newsletter.',
	'DIGESTS_MAX_SIZE'					=> 'Nombre maximum de mots d\'un message à afficher',
	'DIGESTS_MAX_WORDS_NOTIFIER'		=> '... ',
	'DIGESTS_MIN_SIZE'					=> 'Nombre minimum de mots requis dans le message pour que le message apparaisse dans la newsletter',
	'DIGESTS_MIN_SIZE_EXPLAIN'			=> 'Si vous laissez le réglage sur 0, les messages de n\'importe quel taille sont inclus dans la newsletter.',
	'DIGESTS_MIN_POPULARITY_VALUE'		=> 'Valeur minimum de popularité',
	'DIGESTS_MIN_POPULARITY_VALUE_EXPLAIN'		=> 'Un sujet doit avoir en moyenne au moins cette valeur de messages par jour sur la période de la newsletter (jour, semaine ou mois) pour apparaître dans la newsletter. Vous ne pouvez pas paramétrer plus bas que la valeur donnée par l\'administrateur.',
	'DIGESTS_MONTHLY'					=> 'Mensuellement',
	'DIGESTS_NEW'						=> 'Nouveau',
	'DIGESTS_NEW_POSTS_ONLY'			=> 'Montrer les nouveaux messages seulement',
	'DIGESTS_NEW_POSTS_ONLY_EXPLAIN'	=> 'Cela filtrera tous les messages postés avant la date et l\'heure de votre dernière visite du forum. Si vous visitez le forum fréquemment et lisez la plupart des messages, cela empêchera les messages redondants d\'apparaître dans la newsletter. Cela signifie que vous pouvez également manquer des messages dans les forums que vous n\'avez pas lus.',
	'DIGESTS_NO_BOOKMARKED_POSTS'		=> 'Il n\y a pas de nouveaux messages favoris.',
	'DIGESTS_NO_CONSTRAINT'				=> 'Pas de contraintes',
	'DIGESTS_NO_DETAILS_ERROR'			=> ' La base de données est peut-être inconsistente. Aucun détail de newsletter ne peut êtr trouvé à cette date et heure.',
	'DIGESTS_NO_FORUMS_AVAILABLE'		=> 'Vous n\'avez accès à aucuns forums',
	'DIGESTS_NO_FORUMS_CHECKED' 		=> 'Au moins un forum doit êtr esélectionné',
	'DIGESTS_NO_LIMIT'					=> 'Pas de limite',
	'DIGESTS_NO_POSTS'					=> 'Il n\'y a pas de nouveaux messages.',
	'DIGESTS_NO_POST_TEXT'				=> 'Ne pas afficher le texte des messages du tout',
	'DIGESTS_NO_PRIVATE_MESSAGES'		=> 'Vous n\'avez aucuns nouveaux privés ou non lus.',
	'DIGESTS_NO_TIMEZONE'				=> 'Vous devez <a href="%s">spécifier votre timezone</a> dans votre profile avant pouvoir recevoir une newsletter.',
	'DIGESTS_NONE'						=> 'Aucun (se désincrire)',
	'DIGESTS_ON'						=> 'activé',
	'DIGESTS_OPEN_QUOTE'				=> '&ldquo;',
	'DIGESTS_OPEN_QUOTE_TEXT'			=> '"',
	'DIGESTS_PM'						=> ' PM', // not used if date/time formats do not permit AM and PM
	'DIGESTS_PM_SUBJECT'				=> 'Sujet du message privé',
	'DIGESTS_POST_IMAGE_TEXT'			=> '<br>(Cliquez sur l\'image pour la voir en grand.)',
	'DIGESTS_POST_TEXT'					=> 'Texte du message', 
	'DIGESTS_POST_TIME'					=> 'Date du message', 
	'DIGESTS_POST_SIGNATURE_DELIMITER'	=> '<br>____________________<br>', // Place here whatever code (make sure it is valid HTML) you want to use to distinguish the end of a post from the beginning of the signature line
	'DIGESTS_POSTED_TO_THE_TOPIC'		=> 'posté" sur le sujet',
	'DIGESTS_POSTS_TYPE_ANY'			=> 'Tous les messages',
	'DIGESTS_POSTS_TYPE_FIRST'			=> 'Premiers messages du sujet seulement',
	'DIGESTS_POWERED_BY'				=> 'phpBB Services',
	'DIGESTS_POWERED_BY_TEXT'			=> 'L\'extension Digests pour phpBB a été créé par',
	'DIGESTS_PRIVATE_MESSAGES_IN_DIGEST'	=> 'Ajouter mes messages privés non lus',
	'DIGESTS_PUBLISH_DATE'				=> 'La newsletter a été publié spécifiquement pour %1$s le %2$s',
	'DIGESTS_REGISTER'					=> 'Recevoir les newsletters',
	'DIGESTS_REGISTER_EXPLAIN'			=> 'Les réglages par défaut du forum seront utilisés. Vous pourrez ajuster ces réglages ou vous désinscrire après votre inscription.',
	'DIGESTS_REMOVE_YOURS'				=> 'Enlever mes messages',
	'DIGESTS_REPLY'						=> 'Répondre',
	'DIGESTS_ROBOT'						=> 'Robot',
	'DIGESTS_SALUTATION' 				=> 'Cher',
	'DIGESTS_SEE_POPULAR_TOPICS_ONLY'	=> 'Voir les sujets populaires seulement',
	'DIGESTS_SELECT_FORUMS'				=> 'Inclure les messages de ces forums',
	'DIGESTS_SELECT_FORUMS_EXPLAIN'		=> 'Veuillez noter que les catégories et les forums affichés sont seulement ceux dont vous possédez le droit en lecture. La sélection du forum est désactivée quand vous cochez "sujets favoris seulement". Les forums protégés par mot de passe ne sont pas affichés et ne peuvent pas être sélectionnés. Si tout est décoché et qu\'aucun favori n\'est sélectionné, alors vous devez sélectionner au moins un forum.<br><br>Les forums en gras (s\'il y en a) sont les forums que l\'administrateur requiert d\'afficher dans la newsletter (autres que les sujets favoris seulement). Vous ne pouvez pas déselectionner ces forums. Les noms de forum barrés sont les forums interdits par l\'administrateur de présenter dans aucune newsletter (autres que les sujets favoris seulement) et sont donc désélectionnés.',
	'DIGESTS_SEND_HOUR' 				=> 'Heure envoyée',
	'DIGESTS_SEND_HOUR_EXPLAIN'			=> 'L\'heure d\'arrivée de la newsletter basée sur la timezone que vous avez paramétrée dans les préférences du forum.',
	'DIGESTS_SEND_ON_NO_POSTS'	 		=> 'Envoyer une newsletter s\'il n\'y a pas de nouveaux messages',
	'DIGESTS_SENDER'	 				=> 'Expéditeur',
	'DIGESTS_SENT_AT'					=> ' a été envoyé une newsletter à ',
	'DIGESTS_SENT_TO'					=> 'envoyé vers',
	'DIGESTS_SENT_YOU_A_MESSAGE'		=> 'vous a envoyé un message privé dont le sujet est',
	'DIGESTS_SHOW_ATTACHMENTS' 			=> 'Montrer les pièces jointes',
	'DIGESTS_SHOW_ATTACHMENTS_EXPLAIN'	=> 'Si activé, les images en pièces jointes apparaitront dans la newsletter au bas du message ou du message privé. Les pièces jointes qui ne sont pas des images apparaissent comme des liens (newsletters stylisées seulement). Le tag BBCode [img] n\'est pas affecté par ce paramètre.',
	'DIGESTS_SHOW_NEW_POSTS_ONLY' 		=> 'Montrer seulement les nouveaux messages',
	'DIGESTS_SHOW_PMS' 					=> 'Montrer mes messages privés',
	'DIGESTS_SIZE_ERROR'				=> 'Ce champ est obligatoire. Vous devez saisir un nombre positif, inférieur ou égal au maximum permis par l\'administrateur. Si cette valeur vaut zéro, il n\'y a pas de limite.',
	'DIGESTS_SIZE_ERROR_MIN'			=> 'Vous devez saisir un nombre entier ou laisser ce champ vide. Si la valeur est zéro, alors il n\'y a pas de limite.',
	'DIGESTS_SKIP'						=> 'Passer le contenu',
	'DIGESTS_SKIPPED_AT'				=> ' n\'a pas été envoyé à ',
	'DIGESTS_SKIPPED_TOOLTIP'			=> 'Cliquer pour voir les détails sautés',
	'DIGESTS_SORT_BY'					=> 'Ordre du tri des messages',
	'DIGESTS_SORT_BY_EXPLAIN'			=> 'Toutes les newsletters sont triées par catégories, puis par forums, tout comme cela est affiché sur la page d\'accueil du forum. Les options de tri s\'appliquent à comment les messages sont ordfonnés à l\'intérieur des forums et des sujets. L\'ordre habituel est celui par défaut depuis phpBB 2, c\'est-à-dire les derniers sujets puis les derniers messages de chaque sujet.',
	'DIGESTS_SORT_FORUM_TOPIC'			=> 'Ordre habituel',
	'DIGESTS_SORT_FORUM_TOPIC_DESC'		=> 'Ordre habituel, les derniers messages en premier',
	'DIGESTS_SORT_POST_DATE'			=> 'Du plus ancien au plus nouveau',
	'DIGESTS_SORT_POST_DATE_DESC'		=> 'Du plus nouveau au plus ancien',
	'DIGESTS_SORT_USER_ORDER'			=> 'Utiliser mes préférences d\'affichage du forum',
	'DIGESTS_SUBJECT_TITLE'				=> '%1$s %2$s Newsletter',
	'DIGESTS_TAG_REPLACED'				=> '<strong>Note : Du contenu a été enlevé pour des raisons de sécurité. Cliquer sur le lien du sujet ou du message pour voir le contenu complet.</strong>',
	'DIGESTS_TITLE'						=> 'Newsletters',
	'DIGESTS_TRANSLATED_BY'				=> 'traduit par',
	'DIGESTS_TRANSLATOR_NAME'			=> 'mouadibs',	// Leave null string to suppress translator name
	'DIGESTS_TRANSLATOR_CONTACT'		=> '',	// Leave null string to suppress contact info, if used, use: mailto:name@emailaddress.com or a URL if you have a website.
	'DIGESTS_TOC'						=> 'Sommaire',
	'DIGESTS_TOC_EXPLAIN'				=> 'Si le forum est très actif, vous pourriez désirer inclure un sommaire dans votre newsletter. Dans les newsletters stylisés, le sommaire comprend les liens pour sauter vers un message particulier ou un message privé de la newsletter.',
	'DIGESTS_UNKNOWN'					=> 'Inconnu',
	'DIGESTS_UNREAD'					=> 'Non lu',
	'DIGESTS_UNSUBSCRIBE_FAILURE'		=> 'Désolé, la désincription a échoué.',
	'DIGESTS_UNSUBSCRIBE_SUCCESS'		=> 'Vous avez été désinscrit avec succès des futures newsletters.',
	'DIGESTS_UPDATED'					=> 'Le paramétrage de votre newsletter a été sauvegardé',
	'DIGESTS_USE_BOOKMARKS'				=> 'Sujets favoris seulement',
	'DIGESTS_WEEKDAY' 					=> 'Dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi',
	'DIGESTS_WEEKLY'					=> 'Hebdomadairement',
	'DIGESTS_YOU_HAVE_PRIVATE_MESSAGES' => 'Vous avez de nouveaux messages privés',

	'UCP_DIGESTS'								=> 'Newsletters',
	'UCP_DIGESTS_ADDITIONAL_CRITERIA'			=> 'Critères additionnels',
	'UCP_DIGESTS_ADDITIONAL_CRITERIA_OPTIONS'	=> 'Options des critères additionnels',
	'UCP_DIGESTS_BASICS'						=> 'Basique',
	'UCP_DIGESTS_BASICS_OPTIONS'				=> 'Options basiques',
	'UCP_DIGESTS_FORUMS_SELECTION'				=> 'Sélection des forums',
	'UCP_DIGESTS_FORUMS_SELECTION_OPTIONS'		=> 'Options de sélectection des forums',
	'UCP_DIGESTS_MODE_ERROR'					=> 'Digests a été appelé avec un mode invalide : %s',
	'UCP_DIGESTS_POST_FILTERS'					=> 'Filtres des messages',
	'UCP_DIGESTS_POST_FILTERS_OPTIONS'			=> 'Options des filtres des messages',
));

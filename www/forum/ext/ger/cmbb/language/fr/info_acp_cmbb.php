<?php

/**
 *
 * cmBB [English]
 *
 * @copyright (c) 2016 Ger Bruinsma
 * @license GNU General Public License, version 2 (GPL-2.0)
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

$lang = array_merge($lang, array(
	'ACP_CATEGORIES_MANAGE'				=> 'Gérer les catégories',
	'ACP_CATEGORIES_MANAGE_EXPLAIN'		=> 'Ici vous pouvez ajouter, modifier ou supprimer des catégories. Vous devez d\'abord créer une catégorie et la soumettre, et modifier son paramétrage ensuite.'
											. '<br />Veuillez noter : cmBB utilises le nom de la catégorie comme URL. Une fois que vous avez choisi le nom de la catégorie, il est recommandé de ne plus le changer car l\'URL ne sera pas changée en conséquence.',
	'ACP_CMBB_CATEGORIES'				=> 'Catégories',
	'ACP_CMBB_SETTING_SAVED'			=> 'paramétrages de cmBB sauvegardés',
	'ACP_CMBB_TITLE'					=> 'cmBB',
	'ACP_MIN_TITLE_LENGTH'				=> 'Longueur minimum du titre',
	'ACP_MIN_TITLE_LENGTH_EXPLAIN'		=> 'Longueur minimum requise pour les titres des articles',
	'ACP_MIN_CONTENT_LENGTH'			=> 'Longueur minimum du contenu',
	'ACP_MIN_CONTENT_LENGTH_EXPLAIN'	=> 'Longueur minimum requise pour le contenu des articles (corps). Préviens les articles trop étriqués.',
	'ACP_NO_ARTICLES'					=> 'Vous n\'avez pas d\'articles (actifs). Créez un nouvel article en utilisant le lien ci-dessous :',
	'ACP_NUMBER_INDEX_ITEMS'			=> 'Nombre d\'articles dans l\'index',
	'ACP_NUMBER_INDEX_ITEMS_EXPLAIN'	=> 'Nombre maximum des derniers articles à afficher sur la page d\'index. Les articles sont triés par date (du plus ancien au plus récent)',
	'ACP_REACT_FORUM_ID'				=> 'Forum pour les commentaires',
	'ACP_REACT_FORUM_ID_EXPLAIN'		=> 'Sélectionnez le forum qui accueillera le sujet pour abriter les commentaires.',
	'ACP_SHOW_MENUBAR'					=> 'Montrer la barre de menu',
	'ACP_SHOW_MENUBAR_EXPLAIN'			=> 'La barre de menu est ajoutée à l\'en-tête de la page. Elle contient toutes les catégories avec leurs enfants, un lien vers l\'accueil, et un lien de contact (si activé).',
	'ACP_SHOW_RIGHTBAR'					=> 'Afficher la barre sur le côté à droite',
	'ACP_SHOW_RIGHTBAR_EXPLAIN'			=> 'Vous pouvez choisir d\'afficher une barre sur le côté à droite, qui contient le code HTML que vous désirez. Utile pour les publicités ou tout autre contenu que vous désirez afficher.',
	'ACP_RIGHTBAR_HTML'					=> 'Contenu de la barre sur le côté à droite.',
	'ACP_RIGHTBAR_HTML_EXPLAIN'			=> 'Si vous avez activé la barre sur le côté à droite, le contenu entré ici sera affiché. Vous pouvez utiliser n\'importe quel code HTML/JS que vous voulez, tant qu\'il est valide.',
	'CHILDREN'							=> 'Enfants',
	'CHILDREN_EXPLAIN'					=> 'Nombre d\'articles dans cette catégorie',
	'CMBB_CATEGORY_NAME_INVALID'		=> 'Nom de catégorie invalide',
	'CMBB_SETTINGS'						=> 'Paramétrages cmBB',
	'CMBB_DELETE_CAT_EXPLAIN'			=> 'Une catégorie ne peut être supprimée que si elle ne contient pas d\'articles',
	'CREATE_CATEGORY'					=> 'Ajouter une catégorie',
	'ERROR_CATEGORY_NOT_EMPTY'			=> 'La catégorie doit être vide',
	'ERROR_FAILED_DELETE'				=> 'La suppression a échoué.',
	'NO_REACTIONS'						=> 'Désactiver les commentaires',
	'PROTECTED'							=> 'Protégé',
	'PROTECTED_EXPLAIN'					=> 'Seulement les administrateurs ont le droit de publier',
	'SHOW_MENU_BAR'						=> 'Montrer dans la barre de menu',
	'SHOW_MENU_BAR_EXPLAIN'				=> 'Affiche la catégorie ou non dans la barre de menu (seulement si elle possède des enfants). Utile pour personnaliser la liste de catégories.',

		));

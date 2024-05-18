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
	'ACL_U_CMBB_POST_ARTICLE'	 => 'peut écrire des articles cmBB',
	'ARTICLE_HIDDEN_WARNING'	 => 'Cet article est caché et donc seulement accessible par les administrateurs',
	'ARTICLES'					 => 'Articles',
	'ARTICLES_TOTAL'			 => 'Total des articles',
	'BACK'						 => 'Retour',
	'CATEGORY'					 => 'Catégorie',
	'CMBB_UPLOAD_BROWSE'		 => 'Ou naviguez',
	'CMBB_UPLOAD_DRAG'			 => 'Glissez et déposez vos fichiers ici',
	'CMBB_UPLOAD_EXPLAIN'		 => 'Téléchargez vos fichiers dans la boite d\'import ci-dessous. <br /> Les types de fichier permis sont : ',
	'COMMENTS'					 => 'Mettre et/ou voir des commentaires',
	'COMMENTS_DISABLED'			 => 'Commentaires désactivés',
	'CONTENT'					 => 'Contenu de l\'article',
	'DELETE_ARTICLE'			 => 'Cacher l\'article',
	'EDIT_ARTICLE'				 => 'Editer l\'article',
	'ERROR_MUCH_REMOVED'		 => 'Vous avez supprimé beaucoup de cet article. C\'est peut-être une erreur ou un abus. La modification n\'a pas été enregistré.',
	'ERROR_TITLE'				 => 'Le titre fourni est incorrect.',
	'FEATURED_IMG'				 => 'Image mise en avant',
	'LOG_ARTICLE_VISIBILLITY'	 => 'Visibilité de l\'article modifiée',
	'NEW_ARTICLE'				 => 'Nouvel article',
	'NO_HIDDEN'					 => 'Pas d\'articles cachés',
	'NO_REACTIONS_ARTICLE'		 => 'Désactiver les commentaires <small>(les commentaires sont peut-être déjà désactivés par le biais du paramétrage de la catégorie)</small>',
	'READ_MORE'					 => 'Lire plus...',
	'RESTORE_ARTICLE'			 => 'Restaurer l\'article',
	'SEARCH_USER_ARTICLES'		 => 'Rechercher les articles de l\'utilisateur',
	'SHOW_HIDDEN'				 => 'Montrer les articles cachés',
	'TITLE'						 => 'Titre',
	'USE_AVATAR'				 => '-utiliser mon avatar-',
	'WELCOME_USER'				 => 'Bonjour %s!',
		));

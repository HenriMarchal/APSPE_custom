<?php

/**
* @ignore
*/
define('IN_PHPBB', true);
$phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : '../../../../';
$phpEx = substr(strrchr(__FILE__, '.'), 1);
include($phpbb_root_path . 'common.' . $phpEx);
include($phpbb_root_path . 'includes/functions_display.' . $phpEx);

// Start session management
$user->session_begin();
$auth->acl($user->data);
$user->setup('viewforum');

page_header("Test d'&eacute;valuation de l'anxi&eacute;t&eacute;", true);
$template->set_filenames(array(
	'body' => 'evaluation_questionnary/index_evaluation.html')
);
page_footer();
?>
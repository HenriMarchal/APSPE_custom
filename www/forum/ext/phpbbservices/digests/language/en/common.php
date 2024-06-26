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

	'DIGESTS_ALL_FORUMS'				=> 'All',
	'DIGESTS_AM'						=> ' AM', // not used if date/time formats do not permit AM and PM
	'DIGESTS_AUTHOR'					=> 'Author',
	'DIGESTS_BAD_SEND_HOUR'				=> 'User %1$s digest send hour is invalid. It is %2$d. The number should be >= 0 and < 24.',
	'DIGESTS_BLOCK_IMAGES'				=> 'Block images',
	'DIGESTS_BLOCK_IMAGES_EXPLAIN'		=> 'Prohibits all images from appearing in your digests, including smilies and images attached to posts or private messages. This can be useful for slower connections, if minimizing bandwidth is a concern or for active boards with lots of images. Text digests never show images.',
	'DIGESTS_BOARD_LIMIT'				=> '%d (Board limit)',
	'DIGESTS_BY'						=> 'By',
	'DIGESTS_CLOSED_QUOTE'				=> '&rdquo;',
	'DIGESTS_CLOSED_QUOTE_TEXT'			=> '"',
	'DIGESTS_COUNT_LIMIT'				=> 'Maximum number of posts in the digest',
	'DIGESTS_COUNT_LIMIT_EXPLAIN'		=> 'Enter a number greater than zero if you want to limit the number of posts in the digest.',
	'DIGESTS_DAILY'						=> 'Daily',
	'DIGESTS_DATE'						=> 'Date',
	'DIGESTS_DELIMITER'					=> ' &#8249; ', // Used to help show the hierarchy of forum names from the index on down. Should not change in language translations unless different character is used on breadcrumb menu.
	'DIGESTS_DISCLAIMER_HTML'			=> '<p><a href="%5$s">One-click unsubscribe</a></p><p>You can also change or delete your subscription from the board&rsquo;s <a href="%1$sucp.%3$s">User Control Panel</a>.</p><p>If you have questions or feedback on your digests, please send them to the <a href="mailto:%4$s?subject=Digests">%2$s webmaster</a>.</p>',
	'DIGESTS_DISCLAIMER_TEXT'			=> 'One-click unsubscribe: %5$s
	
You can also change or delete your subscription from the board\'s User Control Panel.
	
If you have questions or feedback on your digests, please send them to the webmaster: %4$s.',
	'DIGESTS_EXPLANATION'				=> 'Digests are email summaries of posts that are sent to you periodically. Digests can be sent daily, weekly or monthly at an hour of the day you select. You can specify those particular forums for which you want posts or by default you can elect to receive all posts for all forums for which you can read. You can cancel your digest subscription at any time by simply coming back to this page. Most users find digests to be very useful. We encourage you to give them a try!',
	'DIGESTS_FILTER_ERROR'				=> 'Digests mailer was called with an invalid user_digest_filter_type = %s',
	'DIGESTS_FILTER_FOES'				=> 'Remove posts from my foes',
	'DIGESTS_FILTER_TYPE'				=> 'Types of posts in digest',
	'DIGESTS_FOREIGN_LINK_REMOVED'		=> '[ Removed foreign link. Click on link for post or topic to see this link. ]',
	'DIGESTS_FOREIGN_LINK_REMOVED_TEXT'	=> '[ Removed foreign link. Read the board topic to see this link. ]',
	'DIGESTS_FORMAT_HTML'				=> 'Styled',
	'DIGESTS_FORMAT_HTML_EXPLAIN'		=> 'Styles are applied if your email program allows',
	'DIGESTS_FORMAT_HTML_CLASSIC'		=> 'Styled, posts laid out inside tables',
	'DIGESTS_FORMAT_HTML_CLASSIC_EXPLAIN'	=> 'Similar to styled except topic posts and private messages are inside of tables',
	'DIGESTS_FORMAT_PLAIN'				=> 'Plain',
	'DIGESTS_FORMAT_PLAIN_EXPLAIN'		=> 'Styled with no colors or fonts',
	'DIGESTS_FORMAT_PLAIN_CLASSIC'		=> 'Plain, posts laid out inside tables',
	'DIGESTS_FORMAT_PLAIN_CLASSIC_EXPLAIN'	=> 'Similar to plain except topic posts and private messages are inside of tables',
	'DIGESTS_FORMAT_STYLING'			=> 'Digest styling',
	'DIGESTS_FORMAT_STYLING_EXPLAIN'	=> 'Please note that the styling actually rendered depends on the capabilities of your email program. Move your cursor over the styling type to learn more about each style.',
	'DIGESTS_FORMAT_TEXT'				=> 'Text',
	'DIGESTS_FORMAT_TEXT_EXPLAIN'		=> 'No styling will appear in the digest. Only plain text will be shown, probably in a fixed width font.',
	'DIGESTS_FORUMS_WANTED'				=> 'Forums wanted',
	'DIGESTS_FREQUENCY'					=> 'Type of digest wanted',
	'DIGESTS_FREQUENCY_EXPLAIN'			=> 'Weekly digests are sent on %s. Monthly digests are sent on the first of the month. Coordinated Universal Time (UTC) is used for determining the day of the week.',
	'DIGESTS_FREQUENCY_SHORT'			=> 'Digest type',
	'DIGESTS_HOURS_ABBREVIATION' 		=> ' h',	// see: http://www.scienceeditingexperts.com/which-is-the-correct-abbreviation-for-hours-2h-2-h-2hs-2-hs-2hrs-or-2-hrs, DIGESTS_AM and DIGESTS_PM are used instead if specified in user_dateformat
	'DIGESTS_INSTALL_REQUIREMENTS'		=> 'Your version of phpBB must be &gt; 3.3.0 and &lt; 4.0 to install this extension. Please address this issue, then try enabling the extension again.',
	'DIGESTS_INTRODUCTION' 				=> 'Here is the latest digest of posts from %s forums. Do <em>not</em> reply to this email to reply to topics, posts or private messages. But please <em>do</em> visit the board and join the discussion! (If the format of the digest looks off, make sure to download all remote content.)',
	'DIGESTS_JUMP_TO_MSG'				=> 'Msg ID',
	'DIGESTS_JUMP_TO_POST'				=> 'Post ID',
	'DIGESTS_LASTVISIT_RESET'			=> 'Reset my last visit date when I am sent a digest',
	'DIGESTS_LASTVISIT_RESET_EXPLAIN'	=> 'If enabled, the date and time your digest was created will be used to set your last visit date. Topic-related notifications for the hour digests were created are also marked as read.',
	'DIGESTS_LINK'						=> 'Link',
	'DIGESTS_MAILED_TOOLTIP'			=> 'Click to see mailed details',
	'DIGESTS_MARK_READ'					=> 'Mark as read when they appear in the digest',
	'DIGESTS_MAX_DISPLAY_WORDS'			=> 'Maximum words to display in a post',
	'DIGESTS_MAX_DISPLAY_WORDS_EXPLAIN'	=> 'To ensure consistent rendering, if a post must be truncated the HTML markup will be removed from the post. Set to 0 to allow the full post text to appear. If the &ldquo;Show no post text at all&rdquo; option is checked, this field is ignored and no post text will appear in the digest.',
	'DIGESTS_MAX_SIZE'					=> 'Maximum words to display in a post',
	'DIGESTS_MAX_WORDS_NOTIFIER'		=> '... ',
	'DIGESTS_MIN_SIZE'					=> 'Minimum words required in post for the post to appear in a digest',
	'DIGESTS_MIN_SIZE_EXPLAIN'			=> 'If you leave set to 0, posts with text of any number of words are included.',
	'DIGESTS_MIN_POPULARITY_VALUE'		=> 'Minimum value for popularity',
	'DIGESTS_MIN_POPULARITY_VALUE_EXPLAIN'		=> 'A topic must have an average of at least this many posts per day over your digest time period (day, week or month) to appear in your digest. You cannot set it below the value set by the board administrator.',
	'DIGESTS_MONTHLY'					=> 'Monthly',
	'DIGESTS_NEW'						=> 'New',
	'DIGESTS_NEW_POSTS_ONLY'			=> 'Show new posts only',
	'DIGESTS_NEW_POSTS_ONLY_EXPLAIN'	=> 'This will filter out any posts posted prior to the date and time you last visited this board. If you visit the board frequently and read most of the posts, this will keep redundant posts from appearing in your digest. It may also mean that you will miss some posts in forums that you did not read.',
	'DIGESTS_NO_BOOKMARKED_POSTS'		=> 'There are no new bookmarked posts.',
	'DIGESTS_NO_CONSTRAINT'				=> 'No constraint',
	'DIGESTS_NO_DETAILS_ERROR'			=> 'The database may be inconsistent. No digest detail records can be found for this date and hour.',
	'DIGESTS_NO_FORUMS_AVAILABLE'		=> 'You do not have access to any forums',
	'DIGESTS_NO_FORUMS_CHECKED' 		=> 'At least one forum must be checked',
	'DIGESTS_NO_LIMIT'					=> 'No limit',
	'DIGESTS_NO_POSTS'					=> 'There are no new posts.',
	'DIGESTS_NO_POST_TEXT'				=> 'Show no post text at all',
	'DIGESTS_NO_PRIVATE_MESSAGES'		=> 'You have no new or unread private messages.',
	'DIGESTS_NO_TIMEZONE'				=> 'You must <a href="%s">specify your timezone</a> in your profile before you can run digests.',
	'DIGESTS_NONE'						=> 'None (unsubscribe)',
	'DIGESTS_ON'						=> 'on',
	'DIGESTS_OPEN_QUOTE'				=> '&ldquo;',
	'DIGESTS_OPEN_QUOTE_TEXT'			=> '"',
	'DIGESTS_PM'						=> ' PM', // not used if date/time formats do not permit AM and PM
	'DIGESTS_PM_SUBJECT'				=> 'Private message subject',
	'DIGESTS_POST_IMAGE_TEXT'			=> '<br>(Click on the image to see it full size.)',
	'DIGESTS_POST_TEXT'					=> 'Post Text', 
	'DIGESTS_POST_TIME'					=> 'Post Time', 
	'DIGESTS_POST_SIGNATURE_DELIMITER'	=> '<br>____________________<br>', // Place here whatever code (make sure it is valid HTML) you want to use to distinguish the end of a post from the beginning of the signature line
	'DIGESTS_POSTED_TO_THE_TOPIC'		=> 'posted to the topic',
	'DIGESTS_POSTS_TYPE_ANY'			=> 'All posts',
	'DIGESTS_POSTS_TYPE_FIRST'			=> 'First posts of topics only',
	'DIGESTS_POWERED_BY'				=> 'phpBB Services',
	'DIGESTS_POWERED_BY_TEXT'			=> 'Digests extension for phpBB created by',
	'DIGESTS_PRIVATE_MESSAGES_IN_DIGEST'	=> 'Add my unread private messages',
	'DIGESTS_PUBLISH_DATE'				=> 'The digest was published specifically for %1$s on %2$s',
	'DIGESTS_REGISTER'					=> 'Receive digests',
	'DIGESTS_REGISTER_EXPLAIN'			=> 'The board&rsquo;s defaults will be used. You can adjust digest settings or unsubscribe after completing registration.',
	'DIGESTS_REMOVE_YOURS'				=> 'Remove my posts',
	'DIGESTS_REPLY'						=> 'Reply',
	'DIGESTS_ROBOT'						=> 'Robot',
	'DIGESTS_SALUTATION' 				=> 'Dear',
	'DIGESTS_SEE_POPULAR_TOPICS_ONLY'	=> 'See popular topics only',
	'DIGESTS_SELECT_FORUMS'				=> 'Include posts for these forums',
	'DIGESTS_SELECT_FORUMS_EXPLAIN'		=> 'Please note the categories and forums shown are for those you are allowed to read only. Forum selection is disabled when you select bookmarked topics only. Password protected forums are not shown and cannot be selected. If all is unchecked and bookmarks are not selected, then you must select at least one forum to submit successfully.<br><br>Bolded forum names (if any) are forums that the administrator requires to be presented in any digest (other than for bookmarked topics only). You cannot unselect these forums. Forum names that have strikethrough text are disallowed by the administrator for presentation in any digest (other than for bookmarked topics only) and are thus unselected.',
	'DIGESTS_SEND_HOUR' 				=> 'Hour sent',
	'DIGESTS_SEND_HOUR_EXPLAIN'			=> 'The digest arrival time is the time based on the timezone you set in your board preferences.',
	'DIGESTS_SEND_ON_NO_POSTS'	 		=> 'Send a digest if there are no new posts',
	'DIGESTS_SENDER'	 				=> 'Sender',
	'DIGESTS_SENT_AT'					=> ' was sent a digest at ',
	'DIGESTS_SENT_TO'					=> 'sent to',
	'DIGESTS_SENT_YOU_A_MESSAGE'		=> 'sent you a private message with the subject',
	'DIGESTS_SHOW_ATTACHMENTS' 			=> 'Show attachments',
	'DIGESTS_SHOW_ATTACHMENTS_EXPLAIN'	=> 'If enabled, attachment images will appear in your digest at the bottom of the post or private message. Non-image attachments appear as links (styled digests only). The BBCode [img] tag is not affected by this setting.',
	'DIGESTS_SHOW_NEW_POSTS_ONLY' 		=> 'Show new posts only',
	'DIGESTS_SHOW_PMS' 					=> 'Show my private messages',
	'DIGESTS_SIZE_ERROR'				=> 'This field is a required field. You must enter a positive whole number, less than or equal to the maximum allowed by the board administrator. If this value is zero, there is no limit.',
	'DIGESTS_SIZE_ERROR_MIN'			=> 'You must enter a whole number or leave the field blank. If this value is zero, there is no limit.',
	'DIGESTS_SKIP'						=> 'Skip to content',
	'DIGESTS_SKIPPED_AT'				=> ' was not sent a digest at ',
	'DIGESTS_SKIPPED_TOOLTIP'			=> 'Click to see skipped details',
	'DIGESTS_SORT_BY'					=> 'Post sort order',
	'DIGESTS_SORT_BY_EXPLAIN'			=> 'All digests are sorted by category and then by forum, as they are shown on the main index. Sort options apply to how posts are ordered within forums and topics. Traditional Order is the default order used since phpBB 2, which is last topic post time (descending) and then by post time within the topic.',
	'DIGESTS_SORT_FORUM_TOPIC'			=> 'Traditional Order',
	'DIGESTS_SORT_FORUM_TOPIC_DESC'		=> 'Traditional Order, Latest Posts First',
	'DIGESTS_SORT_POST_DATE'			=> 'From oldest to newest',
	'DIGESTS_SORT_POST_DATE_DESC'		=> 'From newest to oldest',
	'DIGESTS_SORT_USER_ORDER'			=> 'Use my board display preferences',
	'DIGESTS_SUBJECT_TITLE'				=> '%1$s %2$s Digest',
	'DIGESTS_TAG_REPLACED'				=> '<strong>Notice: content removed for security reasons. Click on the post or topic link to see the complete post content.</strong>',
	'DIGESTS_TITLE'						=> 'Digests',
	'DIGESTS_TRANSLATED_BY'				=> 'translated by',
	'DIGESTS_TRANSLATOR_NAME'			=> '',	// Leave null string to suppress translator name
	'DIGESTS_TRANSLATOR_CONTACT'		=> '',	// Leave null string to suppress contact info, if used, use: mailto:name@emailaddress.com or a URL if you have a website.
	'DIGESTS_TOC'						=> 'Table of contents',
	'DIGESTS_TOC_EXPLAIN'				=> 'If the board is active, you might want to include a table of contents in your digest. In styled digests, the table of contents includes links that let you jump to a particular post or private message in the digest.',
	'DIGESTS_UNKNOWN'					=> 'Unknown',
	'DIGESTS_UNREAD'					=> 'Unread',
	'DIGESTS_UNSUBSCRIBE_FAILURE'		=> 'Sorry, but we were unable to unsubscribe you from receiving digests.',
	'DIGESTS_UNSUBSCRIBE_SUCCESS'		=> 'You have been unsubscribed from receiving further digests.',
	'DIGESTS_UPDATED'					=> 'Your digest settings were saved',
	'DIGESTS_USE_BOOKMARKS'				=> 'Bookmarked topics only',
	'DIGESTS_WEEKDAY' 					=> 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
	'DIGESTS_WEEKLY'					=> 'Weekly',
	'DIGESTS_YOU_HAVE_PRIVATE_MESSAGES' => 'You have new private messages',

	'UCP_DIGESTS'								=> 'Digests',
	'UCP_DIGESTS_ADDITIONAL_CRITERIA'			=> 'Additional criteria',
	'UCP_DIGESTS_ADDITIONAL_CRITERIA_OPTIONS'	=> 'Additional criteria options',
	'UCP_DIGESTS_BASICS'						=> 'Basics',
	'UCP_DIGESTS_BASICS_OPTIONS'				=> 'Basics options',
	'UCP_DIGESTS_FORUMS_SELECTION'				=> 'Forums selection',
	'UCP_DIGESTS_FORUMS_SELECTION_OPTIONS'		=> 'Forums selection options',
	'UCP_DIGESTS_MODE_ERROR'					=> 'Digests was called with an invalid mode of %s',
	'UCP_DIGESTS_POST_FILTERS'					=> 'Post filters',
	'UCP_DIGESTS_POST_FILTERS_OPTIONS'			=> 'Post filters options',
));

# APSPE_custom

Repository for the customized files of the APSPE site (phobiesociale.org)

# Customized new features

## Anti-scraping protection

The files Index.php and Index.png are there to protect against scraping. A link snipet is included in overall_header.html of every styles (`<a href="Index.php"><img src="Index.png" width="1px" height="1px" border="0"></a>`).

The idea is to trap the scraper in a blank image that checks if the IP is a known search bot. If not a warning mail is sent to webmaster@phobisociale.org. If it happens it is a false positive, then you must add manually the new trusted IP in the robot list in Index.php.

# PHPBB

## Styles customization

We have installed several styles and customized them in order to display some elements in the board page:

- the background image of the header and the site logo are in theme/colour.css or theme/content.css (or yet another css).

- the chat button, the menu of articles and the link to newsletters are in template/overalll_header.html.

- the link for the PS auto-test is in template/index-body.html.

- our copyright is in template/overall_footer.html.

colour.css can also contain a customisation for the background colour of cmBB articles.

# Arrrowchat

We installed this chat that integrates itself in PHPBB

## How to uninstall

Remove the snipet `<script type="text/javascript" src="/forum/arrowchat/autoload.php" charset="utf-8"></script>` from chat.php.

Drop the tables prefixed by arrowchat.

Remove the www/forum/arrowchat folder.

You must import the code you will find in *.php in modificationsByGUI folder.

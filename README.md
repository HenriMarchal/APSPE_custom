# APSPE_custom

Repository for the customized files of the APSPE site (phobiesociale.org)

# Customized new features

## Anti-scraping protection

The files Index.php and Index.png are there to protect against scraping. A link snipet is included in overall_header.html of every styles (`<a href="Index.php"><img src="Index.png" width="1px" height="1px" border="0"></a>`).

The idea is to trap the scraper in a blank image that checks if the IP is a known search bot. If not a warning mail is sent to webmaster@phobisociale.org. If it happens it is a false positive, then you must add manually the new trusted IP in the robot list in Index.php.

# Arrrowchat

We installed this chat that integrates itself in PHPBB

## How to uninstall

Remove the snipet `<script type="text/javascript" src="/forum/arrowchat/autoload.php" charset="utf-8"></script>` from chat.php.

Drop the tables prefixed by arrowchat.

Remove the www/forum/arrowchat folder.


# APSPE_custom
Repository for the customized files of the ASPE site (phobiesociale.org)

# Customized new features

## Anti-scraping protection
the files Index.php and Index.png are there to protect against scraping. A link snipet is included in overall_header.html of every styles.
The idea is to trap the scraper in a blank image that checks if the IP is a known search bot. If not a warning mail is sent to webmaster@phobisociale.org. If it happens it is a false positive, then you must add manually the new trusted IP in the robot list in Index.php.

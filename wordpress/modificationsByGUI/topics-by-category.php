<?php
$bbp = bbpress();
// List of forum fathers
$query = new wp_query( array( 'post_type' => 'forum', 'post_parent' => '0', 'post_status' => 'publish', 'posts_per_page' => '20' ) );   ?>

<!-- wp:group {"tagName":"main","style":{"spacing":{"blockGap":"0","margin":{"top":"0"}}},"layout":{"type":"default"}} -->
<main class="wp-block-group" style="margin-top:0">
    <!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|50","right":"var:preset|spacing|50"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained"}} -->
    <div class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)">
        <!-- wp:heading {"align":"wide","style":{"typography":{"lineHeight":"1"},"spacing":{"margin":{"top":"0","bottom":"var:preset|spacing|40"}}},"fontSize":"x-large"} -->
        <h2 class="wp-block-heading alignwide has-x-large-font-size" style="margin-top:0;margin-bottom:var(--wp--preset--spacing--40);line-height:1">
            <a aria-label="Les forums" href="index.php/forums">FORUMS</a>
        </h2>
        <!-- /wp:heading -->

        <?php while ( $query->have_posts() ): $query->the_post();
        $father_id=$query->post->ID;

        ?>
        <!-- wp:group {"align":"wide","layout":{"type":"constrained"}} -->
        <div class="wp-block-group alignwide">
            <div class="wp-block-query alignwide">
                <!-- wp:separator {"style":{"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"className":"is-style-dots"} -->
                <hr class="wp-block-separator has-alpha-channel-opacity is-style-dots" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20)"/>
                <!-- /wp:separator -->
                <!-- wp:columns {"verticalAlignment":"center","align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}}} -->
                <div class="wp-block-columns alignwide are-vertically-aligned-center" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20)">
                    <!-- wp:column {"verticalAlignment":"center","width":"28%"} -->    
                    <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:72%">
                        <a aria-label="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </div>
                    <!-- /wp:column -->
                </div>
                <!-- /wp:columns -->
            </div>
        </div>
        <!-- /wp:group -->


        <?php
        // List of sub-forums by father
        $query2 = new wp_query( array( 'post_type' => 'forum', 'post_parent' => $father_id, 'post_status' => 'publish', 'posts_per_page' => '20' ) );
        $son_ids = array();
        ?>
                            <?php while ( $query2->have_posts() ): $query2->the_post();
        array_push($son_ids, $query2->post->ID);
        endwhile;

        // The topics of sub-forums
        $query3 = new wp_query( array( 'post_type' => 'topic', 'post_parent__in' => $son_ids, 'post_status' => 'publish', 'posts_per_page' => '3', 'meta_key' => '_bbp_last_active_time', 'orderby' => 'meta_value', 'order' => 'DESC' ) ); ?>
        <?php while ( $query3->have_posts() ): $query3->the_post(); get_post($query3->post->ID); ?>
        <!-- wp:separator {"backgroundColor":"contrast-3","className":"alignwide is-style-wide"} -->
        <hr class="wp-block-separator has-text-color has-contrast-3-color has-alpha-channel-opacity has-contrast-3-background-color has-background alignwide is-style-wide"/>
        <!-- /wp:separator -->
        <!-- wp:columns {"verticalAlignment":"center","align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}}} -->
        <div class="wp-block-columns alignwide are-vertically-aligned-center is-layout-flex wp-container-core-columns-is-layout-1 wp-block-columns-is-layout-flex" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20)">
            <!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
            <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:50%">
                <h2 style="font-size:clamp(0.984rem, 0.984rem + ((1vw - 0.2rem) * 0.86), 1.5rem);line-height:1.1;" class="wp-block-post-title">
                    <a aria-label="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?>
                    </a>
                </h2>
            </div>
            <!-- /wp:column -->
            <!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
            <div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:50%">
                <div class="wp-block-template-part">
                    <div class="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
                        <div class="wp-block-group is-content-justification-left is-layout-flex wp-container-core-group-is-layout-6 wp-block-group-is-layout-flex">
                            <!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                            <div class="wp-block-group">
                            <?php // the last reply
                                $query4 = new wp_query( array( 'post_type' => 'reply', 'post_parent' => $query3->post->ID, 'posts_per_page' => '1' ) );
                                if ( $query4->have_posts() ) :
                            ?>
                                <div class="wp-block-post-date"><a href="<?php the_permalink(); ?>"><?php $query4->the_post();echo date('d/m/Y H:i', strtotime($query4->post->post_date)); ?></a></div>
                                <p class="has-contrast-2-color has-text-color">—</p>
                                <p class="has-small-font-size has-contrast-2-color has-text-color">par</p>
                                <div class="wp-block-post-author-name"><?php echo bbp_get_reply_author_link( array( 'post_id' => $query4->post->ID, 'type' => 'both', 'size' => 1 ) ) ?></div>
                            
                                <?php else :?>
                                <div class="wp-block-post-date"><a href="<?php the_permalink(); ?>"><?php echo date('d/m/Y H:i', strtotime($query3->post->post_date)); ?></a></div>
                                <p class="has-contrast-2-color has-text-color">—</p>
                                <p class="has-small-font-size has-contrast-2-color has-text-color">par</p>
                                <div class="wp-block-post-author-name"><?php echo bbp_get_reply_author_link( array( 'post_id' => $query3->post->ID, 'type' => 'both', 'size' => 1 ) ) ?></div>

                            <?php endif; ?>
                            </div>
                            <!-- /wp:group -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- /wp:column -->
        </div>
        <!-- /wp:columns -->
            
        <?php
        endwhile; ?>
        <?php
        endwhile; ?>

    </div>  
<!-- /wp:group --></main>
<!-- /wp:group -->
<?php wp_reset_postdata(); ?>
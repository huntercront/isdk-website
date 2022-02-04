<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ISDK_THEME
 */

get_header();
?>

<main class="projects">
	   <section class="hero">
    <div class="container">
     <div class="banner">
      <div class="title-line iconed">
       <div class="title-icon chevrone">
        <svg fill="none" viewBox="0 0 148 222">
	<path fill="url(#a)" d="M37.2.9.5 37.6 74 111 .5 184.4l36.7 36.7L147.4 111 37.2.9Z" />
	<defs>
		<linearGradient id="a" x1="99.5" x2="76.3" y1=".9" y2="323.7" gradientUnits="userSpaceOnUse">
			<stop offset=".2" stop-color="#EF7800" />
			<stop offset="1" stop-color="#fff" />
		</linearGradient>
	</defs>
</svg>
       </div>
       <h1 class="m-0 title-xl">
        <?php the_title();?>
       </h1>
      </div>

     </div>
    </div>
   </section>



	
	
	<section class="cases">
	<div class="container">
		<div class="cases-list">


<?php
$args = array(
	'post_type' => 'projects',
	'publish' => true,
	'paged' => get_query_var('paged'),
	'orderby' => 'date',
	'order'   => 'DESC',
	'suppress_filters' => true
);
query_posts( $args );
if( have_posts() ){ 
	while( have_posts() ){ 
		the_post();?>	

<a href="<?php the_permalink();?>" class="case" style="color: <?php echo get_field('project_color',get_the_ID());?>">
	<div class=" case-wrapper">
		<div class="case-descr">
			<div class="case-icon c-s">
				<img class="lazy" data-src="<?php echo get_field('project_icon',get_the_ID());?>" alt="<?php the_title();?> icon">
			</div>
			<h3 class="title-m m-0"><?php the_title();?></h3>
			<div class="link-name m-descr">
				<span>Explore case</span>
				<div class="icon-arrow c-s color-light arrow-l">
					<div class="icon-line">
					</div>
					<div class="angle c-c">
						<svg fill="none" viewBox="0 0 9 16">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M1.5 1.5 8 8.3l-6.5 6.2" />
					</svg>
						</svg>
					</div>
				</div>
			</div>
			<div class="case-img lazy-progress s-s lazy-img">
				<picture>
				<?php if (get_field('webp@1', get_the_ID()) or get_field('webp@2',get_the_ID())){ ?>
				<source type="image/webp" data-srcset="<?php echo get_field('webp@1',get_the_ID()).' 1x';?><?php echo ' ,'.get_field('webp@2',get_the_ID()).' 2x';?>">
				<?php }; ?>
				<?php if (get_field('jpeg@1',get_the_ID()) or get_field('jpeg@2',get_the_ID())){ ?>
				<source type="image/jpeg" data-srcset="<?php echo get_field('jpeg@1',get_the_ID()).' 1x';?><?php echo ' ,'.get_field('jpeg@2',get_the_ID()).' 2x';?>">
				<img class="lazy" width="1042" height="585" alt="<?php the_title();?>-Article poster" data-src="<?php echo get_field('jpeg@1',get_the_ID());?>">
				<?php }; ?>
			</picture>
			</div>
		</div>
	</div>
</a>

<?php 
	  } wp_reset_query();
}
?>	
		</div>
		<div class="see-all c-e">
			<a href="#" class="read-more m-descr slide-hover c-s">
				<span>Browse all cases</span>
				<div class="icon-arrow color-gray c-e">
					<div class="icon-line">
					</div>
					<div class="angle c-c">
						<svg fill="none" viewBox="0 0 5 9">
						<path stroke-linecap="round" stroke-linejoin="round" d="m1 1 3 3.5L1 8"></path>
					</svg>
					</div>
				</div>
			</a>
		</div>
	</div>
</section>

			<div class="button-block">
	<div class="container">
		<a href="<?php echo get_field('link_on_page');?>" class="main-btn slide-hover c-c">
			<div class="button-icon icon icon-m c-c">
				<img class="lazy" data-src="<?php echo get_template_directory_uri();?>/img/chat-icon.svg" alt="Chat icon">
			</div>
			<span class="title-m">Get in touch to discuss your case</span>
		</a>
	</div>
</div>


		
	</main>


<?php
get_footer();

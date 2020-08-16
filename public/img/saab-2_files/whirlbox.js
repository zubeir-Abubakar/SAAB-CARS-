$(document).ready(function(){

  
  // Lightbox settings -----------------------------------------------------------------------------
  
  var debug               = false;
  var language            = $('html').attr('lang'); // en, de, fr, it, es, nl
  var lightbox_link       = 'a.lightbox, a.whirlbox, a.album_image, a.video, #preview_rectbanner a, #screenshots a, .gallery a, .fotogalerij a, .img_right a, #columns2 #column1 .image a, .float_right a, .image_in_text a, #product_picture_main a, .image_gallery.lightbox a, .box.image a, #product_images_info #product_images #product_image a'; // .ce_image a, .image_gallery a
  var window_width_hd     = 900;
  var slideshow_speed     = 4000;
  
  
  // Default values --------------------------------------------------------------------------------
  
  var gallery_items       = {};
  var slideshow_interval  = '';
  
  
  // Languages -------------------------------------------------------------------------------------
  
  var lang = {
    // English
    "en": {
      "loading":      "Loading...",
      "fullscreen":   "Full screen",
      "slideshow":    "Slideshow",
      "of":           "of",
    },
    // Deutsch
    "de": {
      "loading":      "Laden...",
      "fullscreen":   "Vollbild",
      "slideshow":    "Diashow",
      "of":           "von",
    },
    // Français
    "fr": {
      "loading":      "Chargement...",
      "fullscreen":   "Plein écran",
      "slideshow":    "Diaporama",
      "of":           "sur",
    },
    // Italiano
    "it": {
      "loading":      "Caricamento in corso...",
      "fullscreen":   "A schermo intero",
      "slideshow":    "Presentazione",
      "of":           "su",
    },
    // Español
    "es": {
      "loading":      "Cargando...",
      "fullscreen":   "Pantalla completa",
      "slideshow":    "Diapositivas",
      "of":           "de",
    },
    // Nederlands
    "nl": {
      "loading":      "Bezig met laden...",
      "fullscreen":   "Volledig scherm",
      "slideshow":    "Slideshow",
      "of":           "van",
    },
  };
  
  
  // Full screen -----------------------------------------------------------------------------------
  
  /*
  jquery.fullscreen 1.1.5
  https://github.com/kayahr/jquery-fullscreen-plugin
  Copyright (C) 2012-2013 Klaus Reimer <k@ailis.de>
  Licensed under the MIT license
  (See http://www.opensource.org/licenses/mit-license)
  */
  function d(c){var b,a;if(!this.length)return this;b=this[0];b.ownerDocument?a=b.ownerDocument:(a=b,b=a.documentElement);if(null==c){if(!a.exitFullscreen&&!a.webkitExitFullscreen&&!a.webkitCancelFullScreen&&!a.msExitFullscreen&&!a.mozCancelFullScreen)return null;c=!!a.fullscreenElement||!!a.msFullscreenElement||!!a.webkitIsFullScreen||!!a.mozFullScreen;return!c?c:a.fullscreenElement||a.webkitFullscreenElement||a.webkitCurrentFullScreenElement||a.msFullscreenElement||a.mozFullScreenElement||c}c?(c=
  b.requestFullscreen||b.webkitRequestFullscreen||b.webkitRequestFullScreen||b.msRequestFullscreen||b.mozRequestFullScreen)&&c.call(b):(c=a.exitFullscreen||a.webkitExitFullscreen||a.webkitCancelFullScreen||a.msExitFullscreen||a.mozCancelFullScreen)&&c.call(a);return this}jQuery.fn.fullScreen=d;jQuery.fn.toggleFullScreen=function(){return d.call(this,!d.call(this))};var e,f,g;e=document;
  e.webkitCancelFullScreen?(f="webkitfullscreenchange",g="webkitfullscreenerror"):e.msExitFullscreen?(f="MSFullscreenChange",g="MSFullscreenError"):e.mozCancelFullScreen?(f="mozfullscreenchange",g="mozfullscreenerror"):(f="fullscreenchange",g="fullscreenerror");jQuery(document).bind(f,function(){jQuery(document).trigger(new jQuery.Event("fullscreenchange"))});jQuery(document).bind(g,function(){jQuery(document).trigger(new jQuery.Event("fullscreenerror"))});
  
  
  // Smart preload ---------------------------------------------------------------------------------
  
  /*
  Author: Muhammad Shahbaz Saleem
  Source: http://egrappler.com/jquery-image-preload-plugin-smart-preloader/
  */
  (function($){
    $.fn.extend({
      smartpreload: function(options){
        var settings = $.extend({
          images: null,
          oneachimageload: null,
          onloadall: null
        }, options);
        return this.each(function(){
          var loadcounter = 0;
          for (var i = 0; i < settings.images.length; i++){
            var img = $('<img/>').addClass('preloading').css('display', 'none').attr('src', settings.images[i]).load(function(){
              loadcounter++;
              if (settings.oneachimageload != null) settings.oneachimageload($(this).attr('src'));
              if (loadcounter == settings.images.length){
                if (settings.onloadall != null) settings.onloadall();
              }
            });
          }
        });
      }
    });
  })(jQuery);
  
  
  // General functions -----------------------------------------------------------------------------
  
  // Display message in console
  function consol(message){
    if (debug == true){
      console.log(message);
    }
  }
  
  // Get number of items in object
  function len(obj){
    var l = 0;
    $.each(obj, function(i, elem){
      l++;
    });
    return l;
  }
  
  
  // Lightbox functions ----------------------------------------------------------------------------
  
  // Prepare lightbox
  function prepare_lightbox(){
    consol('-- function prepare_lightbox --');
    var lightbox_html = '';
    lightbox_html += '<div id="whirlbox_bg"></div>';
    lightbox_html += '<div id="whirlbox_container">';
    lightbox_html += '  <div id="whirlbox">';
    lightbox_html += '    <div id="whirlbox_loading">' + lang[language]['loading'] + '</div>';
    lightbox_html += '    <div id="whirlbox_content"></div>';
    lightbox_html += '    <div id="whirlbox_fullscreen"><i></i>' + lang[language]['fullscreen'] + '</div>';
    lightbox_html += '    <div id="whirlbox_title_above"></div>';
    lightbox_html += '    <div id="whirlbox_title_below"></div>';
    lightbox_html += '    <div id="whirlbox_slideshow" class="play"><i></i>' + lang[language]['slideshow'] + '</div>';
    lightbox_html += '    <div id="whirlbox_left" class=""></div>';
    lightbox_html += '    <div id="whirlbox_right" class=""></div>';
    lightbox_html += '    <div id="whirlbox_close"></div>';
    lightbox_html += '  </div>';
    lightbox_html += '</div>';
    $('body').append(lightbox_html);
  }
  
  // Index gallery
  function index_gallery(){
    consol('-- function index_gallery --');
    var counter      = parseInt(0);
    var total_images = parseInt(0);
    $(lightbox_link).each(function(){
      var item_url = $(this).attr('href');
      // Check whether item is already indexed
      already_indexed = false;
      $.each(gallery_items, function(key, gallery_item){
        if (already_indexed == false){
          if (gallery_item['item_url'] == item_url){
            already_indexed = true;
          }
        }
      });
      if (already_indexed == false){
        counter++;
        $(this).attr('data-position', counter);
        // Check whether item is video or image
        if ( (item_url.indexOf('youtube.com') >= 0) || (item_url.indexOf('youtu.be') >= 0) ){
          // YouTube video
          var item_type = 'youtube';
          var item_hd   = '';
        } else if (item_url.indexOf('vimeo.com') >= 0){
          // Vimeo video
          var item_type = 'vimeo';
          var item_hd   = '';
        } else if (item_url.indexOf('dailymotion.com') >= 0){
          // Dailymotion video
          var item_type = 'dailymotion';
          var item_hd   = '';
        } else {
          // Image
          var item_type = 'image';
          var item_hd   = '';
          if ($(this).attr('data-hd')){ item_hd = $(this).attr('data-hd'); }
          total_images++;
        }
        var item_title = '';
        if ($(this).attr('title')){ item_title = $(this).attr('title'); }
        var item_description = '';
        if ($(this).attr('data-desc')){ item_description = $(this).attr('data-desc'); }
        gallery_items[counter] = {
          'counter':          counter,
          'item_url':         item_url,
          'item_hd':          item_hd,
          'item_type':        item_type,
          'item_title':       item_title,
          'item_description': item_description,
        };
      } else {
        $(this).attr('data-position', counter);
      }
    });
    consol(gallery_items);
    consol(len(gallery_items) + ' items');
    if (total_images > 1){
      $('#whirlbox_slideshow').show();
    } else {
      $('#whirlbox_slideshow').hide();
    }
  }
  
  // Preload image
  function preload_image(position){
    consol('-- function preload_image: "' + position + '" --');
    if (gallery_items[position]['item_type'] == 'image'){
      var window_width = $(window).width();
      if (window_width < window_width_hd){
        var image_file = gallery_items[position]['item_url'];
      } else {
        if (gallery_items[position]['item_hd'] != ''){
          var image_file = gallery_items[position]['item_hd'];
        } else {
          var image_file = gallery_items[position]['item_url'];
        }
      }
      consol('image_file = "' + image_file + '"');
      $(document).smartpreload({
        images: [image_file],
        oneachimageload: function(src){
          consol('image loaded: "' + src + '"');
        }
      });
    }
  }
  
  // Show item
  function show_item(position){
    consol('-- function show_item: "' + position + '" --');
    $('#whirlbox_content').html('');
    if (gallery_items[position]['item_type'] == 'image'){
      // Image
      $('#whirlbox_loading').show();
      var window_width = $(window).width();
      if (window_width < window_width_hd){
        var image_file = gallery_items[position]['item_url'];
      } else {
        if (gallery_items[position]['item_hd'] != ''){
          var image_file = gallery_items[position]['item_hd'];
        } else {
          var image_file = gallery_items[position]['item_url'];
        }
      }
      consol('image_file = "' + image_file + '"');
      $(document).smartpreload({
        images: [image_file],
        oneachimageload: function(src){
          consol('image loaded: "' + src + '"');
          var image_html = '<div id="whirlbox_image" style="background-image: url(\'' + image_file + '\');"></div>';
          $('#whirlbox_loading').hide();
          $('#whirlbox_content').html(image_html);
        }
      });
    } else if (gallery_items[position]['item_type'] == 'youtube' ||
               gallery_items[position]['item_type'] == 'vimeo'   ||
               gallery_items[position]['item_type'] == 'dailymotion'){
      // Video
      if (gallery_items[position]['item_type'] == 'youtube'){
        // YouTube
        if (gallery_items[position]['item_url'].indexOf('http://youtu.be') >= 0){
          var video_id = gallery_items[position]['item_url'].replace('http://youtu.be/', '');
        } else if (gallery_items[position]['item_url'].indexOf('https://youtu.be') >= 0){
          var video_id = gallery_items[position]['item_url'].replace('https://youtu.be/', '');
        } else if (gallery_items[position]['item_url'].indexOf('http://www.youtube.com') >= 0){
          var video_id = gallery_items[position]['item_url'].replace('http://www.youtube.com/watch?v=', '');
        } else if (gallery_items[position]['item_url'].indexOf('https://www.youtube.com') >= 0){
          var video_id = gallery_items[position]['item_url'].replace('https://www.youtube.com/watch?v=', '');
        }
        var video_width  = '853';
        var video_height = '480';
        var video_html   = '<iframe src="https://www.youtube.com/embed/' + video_id + '?rel=0&autoplay=1&loop=1" width="' + video_width + '" height="' + video_height + '" frameborder="0" allowfullscreen></iframe>';
      } else if (gallery_items[position]['item_type'] == 'vimeo'){
        // Vimeo
        var video_id     = gallery_items[position]['item_url'].replace('https://vimeo.com/', '');
        var video_width  = '640';
        var video_height = '360';
        var video_html   = '<iframe src="https://player.vimeo.com/video/' + video_id + '?autoplay=1&loop=1&color=ffffff&title=0&byline=0&portrait=0" width="' + video_width + '" height="' + video_height + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
      } else if (gallery_items[position]['item_type'] == 'dailymotion'){
        // Dailymotion
        var video_id     = gallery_items[position]['item_url'].replace('http://www.dailymotion.com/video/', '');
        var video_width  = '560';
        var video_height = '315';
        var video_html   = '<iframe src="//www.dailymotion.com/embed/video/' + video_id + '?autoPlay=1" width="' + video_width + '" height="' + video_height + '" frameborder="0" allowfullscreen></iframe>';
      }
      consol('video_html = "' + video_html + '"');
      $('#whirlbox_content').html(video_html);
      // Stop slideshow
      remove_slideshow();
    }
    // Both image and video
    $('#whirlbox_title_above').html(gallery_items[position]['item_title']);
    $('#whirlbox_title_below').html('<span class="counter">' + position + ' ' + lang[language]['of'] + ' ' + len(gallery_items) + '</span><span class="description">' + gallery_items[position]['item_description'] + '</span>');
    $('#whirlbox_left').html('<a><span>&lt;</span></a>');
    $('#whirlbox_right').html('<a><span>&gt;</span></a>');
    $('html').addClass('overflow-hidden');
    $('body').addClass('overflow-hidden');
    $('#whirlbox_bg').show();
    $('#whirlbox_container').show();
    // Disable/enable previous button
    if (position == 1){
      $('#whirlbox_left').attr('class', 'invisible');
    } else {
      $('#whirlbox_left').attr('class', '');
    }
    // Disable/enable next button
    if (position == len(gallery_items)){
      $('#whirlbox_right').attr('class', 'invisible');
    } else {
      $('#whirlbox_right').attr('class', '');
    }
    // Preload image to left
    if (position != 1){
      var position_left = position - 1;
      preload_image(position_left);
    }
    // Preload image to right
    if (position != len(gallery_items)){
      var position_right = position + 1;
      preload_image(position_right);
    }
  }
  
  // Previous/next item
  function prev_next_item(direction){
    consol('-- function prev_next_item: "' + direction + '" --');
    change_position = false;
    if (direction == 'prev'){
      // Previous
      if (position > 1){
        position        = position - 1;
        change_position = true;
      }
    } else {
      // Next
      if (position < len(gallery_items)){
        position        = position + 1;
        change_position = true;
      } else {
        // End of gallery; turn off slideshow if running
        if (slideshow_interval != ''){
          remove_slideshow();
        }
      }
    }
    if (change_position == true){
      if (direction == 'prev'){
        consol('previous item: "' + position + '"');
      } else {
        consol('next item: "' + position + '"');
      }
      show_item(position);
    } else {
      consol('begin or end of gallery');
    }
  }
  
  // Start/pause slideshow
  function start_pause_slideshow(){
    consol('-- function start_pause_slideshow --');
    var slideshow_status = $('#whirlbox_slideshow').attr('class');
    if (slideshow_status == 'play'){
      // Start slideshow
      consol('slideshow started; slideshow setInterval');
      $('#whirlbox_left').hide();
      $('#whirlbox_right').hide();
      $('#whirlbox_slideshow').attr('class', 'pause');
      slideshow_interval = setInterval(function(){
        consol('slideshow interval');
        prev_next_item('next');
      }, slideshow_speed);
    } else if (slideshow_status == 'pause'){
      // Pause slideshow
      consol('slidshow paused; remove slideshow');
      remove_slideshow();
    }
  }
  
  // Remove slideshow
  function remove_slideshow(){
    consol('-- function remove_slideshow --');
    if (slideshow_interval != ''){
      consol('slideshow clearInterval');
      $('#whirlbox_slideshow').attr('class', 'play');
      $('#whirlbox_left').show();
      $('#whirlbox_right').show();
      clearInterval(slideshow_interval);
      slideshow_interval = '';
    } else {
      consol('no slideshow');
    }
  }
  
  // Close lightbox
  function close_lightbox(){
    consol('-- function close_lightbox --');
    $('#whirlbox_content').html('');
    $('#whirlbox_title_above').html('');
    $('#whirlbox_title_below').html('');
    $('#whirlbox_left').html('');
    $('#whirlbox_right').html('');
    $('#whirlbox_bg').hide();
    $('#whirlbox_container').hide();
    $('#whirlbox_loading').hide();
    $('html').removeClass('overflow-hidden');
    $('body').removeClass('overflow-hidden');
    remove_slideshow();
    if (typeof position_on_page != 'undefined'){
      consol('position_on_page: "' + position_on_page + '"');
      $('body, html').scrollTop(position_on_page);
    }
    // Close full screen view if needed
    if ($('#whirlbox_fullscreen').css('display') == 'none'){
    } else {
      $(document).fullScreen(false);
    }
  }
  
  
  // Interactions ----------------------------------------------------------------------------------
  
  // Click on gallery item
  $(document).on('click', lightbox_link, function(e){
    e.preventDefault();
    position         = parseInt($(this).data('position'));
    position_on_page = parseInt($(document).scrollTop());
    consol('position         = "' + position         + '"');
    consol('position_on_page = "' + position_on_page + '"');
    show_item(position);
  });
  
  // Click on previous button
  $(document).on('click', '#whirlbox_left', function(e){
    e.preventDefault();
    prev_next_item('prev');
  });
  
  // Click on next button
  $(document).on('click', '#whirlbox_right', function(e){
    e.preventDefault();
    prev_next_item('next');
  });
  
  // Keyboard input: left key, right key, escape
  $(document).keyup(function(e){
    e.preventDefault();
    if ($('#whirlbox_bg').is(':visible')){
      if (e.keyCode == 37 || e.keyCode == 39){
        // Left/right arrow key
        if (len(gallery_items) == 0){
          consol('no gallery items found');
        } else {
          consol('left/right arrow key');
          if (slideshow_interval != ''){
            consol('slideshow is running');
          } else {
            if (e.keyCode == 37){
              prev_next_item('prev');
            } else if (e.keyCode == 39){
              prev_next_item('next');
            }
          }
        }
      } else if (e.keyCode == 27){
        // Escape key
        consol('escape key');
        close_lightbox();
      }
    }
  });
  
  // Click on lightbox background / close button
  $(document).on('click', '#whirlbox_bg, #whirlbox_close', function(e){
    e.preventDefault();
    close_lightbox();
  });
  
  // Click on full screen button
  $(document).on('click', '#whirlbox_fullscreen', function(e){
    e.preventDefault();
    $(document).toggleFullScreen();
  });
  
  // Click on slideshow button
  $(document).on('click', '#whirlbox_slideshow', function(e){
    e.preventDefault();
    start_pause_slideshow();
  });
  
  
  // On page load ----------------------------------------------------------------------------------
  
  prepare_lightbox();
  index_gallery();
  
  // Only display full screen button in browsers with full screen support
  $('#whirlbox_fullscreen').toggle($(document).fullScreen() != null);


});
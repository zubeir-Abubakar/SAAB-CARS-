$(document).ready(function(){


  // Settings --------------------------------------------------------------------------------------
  
  setting_debug     = false;
  
  site_name         = $('body').attr('data-site');
  brand_name        = $('body').attr('data-brand');
  image_name        = $('body').attr('data-image');
  cookie_name       = $('body').attr('data-cookie');
  analytics_id      = $('body').attr('data-analytics');
  number_wallpapers = $('#number_wallpapers').text();
  
  
  // Window size -----------------------------------------------------------------------------------
  
  function window_size(){
    $('body').removeClass('desktop');
    $('body').removeClass('mobile');
    if (Modernizr.mq('(max-width: 670px)')){
      // Mobile
      if (setting_debug == true){
        console.log('mobile');
      }
      $('body').addClass('mobile');
    } else {
      // Desktop
      if (setting_debug == true){
        console.log('desktop');
      }
      $('body').addClass('desktop');
      $('#menu_mobile').attr('class', 'closed');
      $('#menu_items').show();
      $('.menu').show();
    }
    // Cookie popup
    /*
    if (typeof Cookies.get(cookie_name) == 'undefined'){
      // Popup found
      if (setting_debug == true){
        console.log('popup found');
      }
      if (Modernizr.mq('(max-width: 670px)')){
        // Mobile
        $('#page_container').hide();
      } else {
        // Desktop
        $('#page_container').show();
      }
    } else {
      // Popup not found
      if (setting_debug == true){
        console.log('popup not found');
      }
      $('#page_container').show();
    }
    */
  }
  
  
  // Cookie popup ----------------------------------------------------------------------------------
  
  function check_cookie(){
    if (setting_debug == true){
      console.log('-- function check_cookie: "' + cookie_name + '" --');
    }
    if (typeof Cookies.get(cookie_name) == 'undefined'){
      // No cookie available
      show_cookie_popup();
    } else {
      // Cookie available
      load_services();
    }
  }
  
  function show_cookie_popup(){
    if (setting_debug == true){
      console.log('-- function show_cookie_popup --');
    }
    $('body').prepend('<div id="cookie_bg"></div><div id="cookie_popup_container"><div id="cookie_popup"><div id="cookie_popup_content"><div id="cookie_popup_header" style="background-image: url(\'/' + image_name + '\');"><div id="cookie_popup_logo">' + site_name + '</div></div><div id="cookie_popup_content_1"><h1>Welcome to ' + site_name + '</h1><p>You are a fan of ' + brand_name + ' cars and looking for a great background image to brighten up your desktop? Then look no further! On this site you can download <strong>' + number_wallpapers + '</strong>. These car backgrounds are divided into several categories so you can easily find your favorite ' + brand_name + ' image.</p></div><button id="button_accept_cookies">Visit ' + site_name + '</button><div id="cookie_popup_content_2"><p>On this website we use cookies to display advertisements, to provide social media share buttons and to analyze our website traffic. We share general information about your visit with our advertising, social media and analytics partners. By clicking the button above you agree with this. <a class="more" href="http://www.google.com/intl/en/policies/privacy/partners/" target="_blank" rel="nofollow">More information</a></p></div></div></div></div>');
  }
  
  function hide_cookie_popup(){
    if (setting_debug == true){
      console.log('-- function hide_cookie_popup --');
    }
    $('#cookie_bg').remove();
    $('#cookie_popup_container').remove();
    $('#page_container').show();
  }
  
  function load_analytics(){
    if (setting_debug == true){
      console.log('-- function load_analytics: "' + analytics_id + '" --');
    }
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', analytics_id, 'auto');
    ga('send', 'pageview');
  }
  
  function load_banner(banner){
    if (setting_debug == true){
      console.log('-- function load_banner: "' + banner + '" --');
    }
    if ($(banner).length){
      if ($(banner + ' script').length){
        var banner_code = $(banner + ' script').html();
        banner_code     = banner_code.replace("var banner_code = '", "");
        banner_code     = banner_code.replace(/(\\\/)/g, "/");
        banner_code     = banner_code.replace("';", "");
        banner_code     = $.trim(banner_code);
        if (setting_debug == true){
          console.log('banner_code:');
          console.log(banner_code);
        }
        $(banner + ' .banner').html(banner_code);
      } else {
        if (setting_debug == true){
          console.log('banner code not found');
        }
      }
    } else {
      if (setting_debug == true){
        console.log(banner + ' not found');
      }
    }
  }
  
  function load_banners(){
    if (setting_debug == true){
      console.log('-- function load_banners --');
    }
    load_banner('#banner_top');       // Leaderboard       970 x  90
    load_banner('#banner_left');      // Half page         300 x 600
    load_banner('#rectbanner');       // Rectangle         300 x 250
    load_banner('#linkunit_header');  // Link unit header  468 x  15
    load_banner('#linkunit_top');     // Link unit top     200 x  90
    load_banner('#linkunit_bottom');  // Link unit bottom  200 x  90
  }
  
  function load_share_buttons(){
    /*
    var site_id = '428cbf7c3954d75690b3df8090bbc219';
    var app_id  = '19521366';
    if (setting_debug == true){
      console.log('-- function load_share_buttons: "' + site_id + '" / "' + app_id + '" --');
    }
    $('head').append('<script src="//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js" data-shr-siteid="' + site_id + '" async="async" data-cfasync="false"></script>');
    $('#share_buttons').html('<div class="shareaholic-canvas" data-app="share_buttons" data-app-id="' + app_id + '"></div>');
    */
  }
  
  function load_services(){
    if (setting_debug == true){
      console.log('-- function load_services --');
    }
    load_analytics();
    load_banners();
    load_share_buttons();
  }
  
  $(document).on('click', '#button_accept_cookies', function(){
    if (setting_debug == true){
      console.log('-- button_accept_cookies --');
    }
    Cookies.set(cookie_name, 'yes');
    hide_cookie_popup();
    load_services();
  });
  
  
  // Mobile menu -----------------------------------------------------------------------------------
  
  $(document).on('click', '#menu_mobile', function(){
    if ($('#menu_items').is(':visible')){
      $('#menu_items').slideUp('fast');
      $('.menu').slideUp('fast');
    } else {
      $('#menu_items').slideDown('fast');
      $('.menu').slideDown('fast');
    }
  });
  
  
  // All sites -------------------------------------------------------------------------------------
  
  function show_all_sites(){
    if (setting_debug == true){
      console.log('-- function show_all_sites --');
    }
    $('#sites_popup').attr('class', 'open');
    $('#logo_container').hide();
  }
  
  function hide_all_sites(){
    if (setting_debug == true){
      console.log('-- function hide_all_sites --');
    }
    $('#sites_popup').attr('class', 'closed');
    $('#logo_container').show();
  }
  
  $('#all_sites a').mouseenter(function(){
    show_all_sites();
  });  
  $('#all_sites a').mouseleave(function(){
    hide_all_sites();
  });
  
  $('#sites_popup').mouseenter(function(){
    show_all_sites();
  });  
  $('#sites_popup').mouseleave(function(){
    hide_all_sites();
  });
  
  
  // User resolution -------------------------------------------------------------------------------
  
  if ($('#user_resolution').length){
    var resolution_width  = screen.width;
    var resolution_height = screen.height;
    var resolution_text   = '<p>Your screen resolution:<br><strong>' + resolution_width + ' x ' + resolution_height + '</strong></p>';
    $('#user_resolution').html(resolution_text);
    $('#custom_size_width_input').val(resolution_width);
    $('#custom_size_height_input').val(resolution_height);
    if (setting_debug == true){
      console.log(resolution_text);
    }
  }
  
  
  // Custom size -----------------------------------------------------------------------------------
  
  $(document).on('change', '#custom_size_width_select', function(){
    var width = $(this).val();
    $('#custom_size_width_input').val(width);
  });
  
  $(document).on('change', '#custom_size_height_select', function(){
    var height = $(this).val();
    $('#custom_size_height_input').val(height);
  });
  
  $(document).on('submit', '#form_custom_size', function(e){
    e.preventDefault();
    var id     = $('#wallpaper_id').html();
    var width  = $('#custom_size_width_input').val();
    var height = $('#custom_size_height_input').val();
    if (width == ''){
      width = parseInt(0);
    } else {
      width = parseInt(width);
    }
    if (height == ''){
      height = parseInt(0);
    } else {
      height = parseInt(height);
    }
    if (setting_debug == true){
      console.log('id     = "' + id     + '"');
      console.log('width  = "' + width  + '"');
      console.log('height = "' + height + '"');
    }
    if (width == ''){
      alert('Please enter the custom width.');
    } else {
      if (width > 4000){
        alert('The maximum width is 4000 pixels.');
      } else {      
        if (height == ''){
          alert('Please enter the custom height.');
        } else {
          if (height > 3000){
            alert('The maximum height is 3000 pixels.');
          } else {
            var url = id + '/' + width + '/' + height;
            window.location = url;
          }
        }
      }
    }
  });
  
  
  // On page load ----------------------------------------------------------------------------------
  
  window_size();
  // check_cookie();
  
  
  // On window resize ------------------------------------------------------------------------------
  
  $(window).resize(function(){
    if (setting_debug == true){
      // console.log('resize');
    }
    window_size();
  });


});
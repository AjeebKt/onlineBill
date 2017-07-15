app.controller('LeftavCtrl', function($scope,$http) {
	var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
		  BODY = document.getElementsByTagName('body'),
		  MENU_TOGGLE = document.getElementById("menu_toggle"),
		  SIDEBAR_MENU = document.getElementById("sidebar-menu"),
		  SIDEBAR_FOOTER = document.getElementsByClassName("sidebar-footer"),
		  LEFT_COL = document.getElementsByClassName('left_col'),
		  RIGHT_COL = document.getElementsByClassName('right_col'),
		  NAV_MENU = document.getElementsByClassName('nav_menu'),
		  FOOTER = document.getElementsByTagName('footer');

		// Sidebar
		// $(document).ready(function() {
		  // TODO: This is some kind of easy fix, maybe we can improve this
		  var setContentHeight = function () {
		      // reset height
		      RIGHT_COL.style.minHeight = window.innerHeight;

		      var bodyHeight = window.outerHeight,
		          footerHeight = BODY.classList.contains('footer_fixed') ? -10 : FOOTER.offsetHeight,
		          leftColHeight = LEFT_COL.eq(1).offsetHeight + SIDEBAR_FOOTER.offsetHeight,
		          contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

		      // normalize content
		      contentHeight -= NAV_MENU.offsetHeight + footerHeight;

		      // RIGHT_COL.css('min-height', contentHeight);
		      RIGHT_COL.style.minHeight = contentHeight;
		  };

		  var anchor = document.querySelector("#sidebar-menu > a");
		  anchor.onclick = function() {
		  	navMenu();
		  };

		  function navMenu(ev) {
	      var li = $(this).parent();

	      if (li.is('.active')) {
          li.removeClass('active active-sm');
          $('ul:first', $li).slideUp(function() {
              setContentHeight();
          });
	      } else {
          // prevent closing menu if we are on child menu
          if (!$li.parent().is('.child_menu')) {
              SIDEBAR_MENU.find('li').removeClass('active active-sm');
              SIDEBAR_MENU.find('li ul').slideUp();
          }
          
          li.addClass('active');

          $('ul:first', $li).slideDown(function() {
              setContentHeight();
          });
	      }
		  }

		  // toggle small or large menu
		  MENU_TOGGLE.on('click', function() {
		      if (BODY.hasClass('nav-md')) {
		          SIDEBAR_MENU.find('li.active ul').hide();
		          SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
		      } else {
		          SIDEBAR_MENU.find('li.active-sm ul').show();
		          SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
		      }

		      BODY.toggleClass('nav-md nav-sm');

		      setContentHeight();

		      $('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });
		  });

		  // check active menu
		  SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

		  SIDEBAR_MENU.find('a').filter(function () {
		      return this.href == CURRENT_URL;
		  }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
		      setContentHeight();
		  }).parent().addClass('active');

		  // recompute content when resizing
		  $(window).smartresize(function(){  
		      setContentHeight();
		  });

		  setContentHeight();

		  // fixed sidebar
		  if ($.fn.mCustomScrollbar) {
		      $('.menu_fixed').mCustomScrollbar({
		          autoHideScrollbar: true,
		          theme: 'minimal',
		          mouseWheel:{ preventDefault: true }
		      });
		  }
		// });
		// /Sidebar
});
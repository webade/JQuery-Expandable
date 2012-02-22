(function($) {
	jQuery.fn.expandable = function(options) {
		
		var settings = $.extend( {
	      moreText : 'View more',
	      lessText : 'View less',
	    }, options);

		return this.each(function(){

			var $span
			if(($span = $(this).find('span')).length>0){
				$span.hide();
				var $expand_link_html = ' <a href="javascript:void(0)" class="expand-link">View more</a>';
				$span.after($expand_link_html);
				var $expand_link = $(this).find('.expand-link');
				$expand_link.on('click',function(e){
					e.preventDefault();
					if($span.hasClass('expanded')){
						$span.hide();
						$span.removeClass('expanded');
						$expand_link.text(settings.moreText);
					}else{
						$span.fadeIn();
						$span.addClass('expanded');
						$expand_link.text(settings.lessText);
					}
				});
			}

		});

	}
}) (jQuery);
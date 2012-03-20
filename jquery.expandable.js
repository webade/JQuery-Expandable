/*!
 * jquery Expandable
 * Original author: @webade
 * built on lightweight pattern by @ajpiano / @addyosmani http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
*/

;(function($, window, document, undefined) {
	
	//create defaults
	var pluginName = 'expandable',
		defaults = {
			moreText : 'View more',
      		lessText : 'View less',
      		words: 40
    	};


   
    //constructor
    function Plugin( element, options){
    	this.element = element;

    	this.options = $.extend( {}, defaults, options);
    	this._defaults = defaults;
    	this._name = pluginName;

    	newString = this.getnewString();
    	if(!newString){
    		return false;
    	}
		$(this.element).html(newString);
			

    	this.container = $(element).children('span');
    	if(this.container == 'undefined'){
    		console.log('jQuery Expandable Error: No container found. Make sure you have a span as a child of the element.')
    		
    	}else{
    		this.init();
    	}

    	

    	
    }


    //init function
    Plugin.prototype.init = function(){
			
			//reference to options
			options = this.options;


		    //reference to container
		    $container = $(this.container);


    		//hide container
			$container.hide();

			//trigger html
			expand_link_html = ' <a href="javascript:void(0)" class="expand-link">View more</a>';

			//insert trigger into the dom
			$container.after(expand_link_html);

			//get handle on trigger
			$trigger = $(this.element).find('.expand-link');

			//add click event
			$trigger.on('click.namespace',function(e){
				//prevent default action
				e.preventDefault();
				//if already expanded, hide, remove class and change text
				if($container.hasClass('expanded')){
					$container.hide();
					$container.removeClass('expanded');
					$trigger.text(options.moreText);
				//else, show, add class and change text
				}else{
					$container.fadeIn();
					$container.addClass('expanded');
					$trigger.text(options.lessText);
				}
			});

	};

	Plugin.prototype.getnewString = function(){
		
		wordArray = $(this.element).text().split(' ');
		if(wordArray.length<=this.options.words){
			return false;
		}
		wordArray.splice(this.options.words,0,"<span>");
		wordArray.push('</span>');

		newString = '';
		for(word in wordArray){

			newString += wordArray[word];
			if(wordArray[word] != '<span>'||word != wordArray.length){
				newString += ' ';
			}


		}
		return newString;
		

	}


	
	// A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations

	$.fn[pluginName] = function(options){
		 return this.each(function () {
         if (!$.data(this, 'plugin_' + pluginName)) {
             $.data(this, 'plugin_' + pluginName,
             new Plugin( this, options ));
         }
     });
	}


		

}) ( jQuery, window, document );

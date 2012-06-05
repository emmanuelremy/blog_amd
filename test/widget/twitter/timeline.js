// module widget/twitter/timeline
define(['utils/console',
	'jquery',
	'js!utils/mustache.js!order!exports=Mustache',
	'text!./template/template.html',
	'utils/jquery.color',
	'css!./css/widget',
	'js!http://stevenlevithan.com/assets/misc/date.format'], function (console, $, tpl, txtTemplate, jqColor) {
		//ATTENTION: cette ligne de code est purement donnée pour l'exemple, 
		//           l'intégration du plugin jquery.color ne se fait pas ainsi,
		//           normalement elle est automatique !
		jqColor($);
	
		function Timeline(/* le nom du compte twitter */ twitterName, 
				  /* le nombre de tweets à afficher */ nbTweets, 
				  /* le container où afficher le widget */ container) {
			this.twitterName = twitterName;
			this.nbTweets = nbTweets;
			this.container = container;
			console.log("Objet Timeline instancié");
		}	
		
		Timeline.prototype.render = function() {
			$.getJSON("http://twitter.com/statuses/user_timeline.json?callback=?",
				  {
				   screen_name: this.twitterName,
				   count: this.nbTweets
				  },
				   (function(scope) {
				   	return function(data) { scope._display(data); };
				  })(this)
				);
		};
		
		Timeline.prototype._display = function(data) {
                        var tweets = $.map(data,function(tweet) {
				
				tweet.text = tweet.text.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,
					'<a href="$1" target="_blank">$1<\/a>')
					.replace(/@([a-zA-Z0-9_]+)/gi,'<a href="http://twitter.com/$1" target="_blank">@$1<\/a>')
					.replace(/#([a-zA-Z0-9_]+)/gi,'<a href="http://search.twitter.com/search?q=%23$1" target="_blank">#$1<\/a>');
				
				return {'name': tweet.user.name,
					'avatar':tweet.user.profile_image_url, 
					'text': tweet.text,
					'date': (new Date (tweet.created_at)).format("dd/mm/yyyy HH:MM:ss")
					};
			});

			console.log(tweets);
			var view = { baseClass: "twitterWidget", tweets : tweets };		
			
			var output = tpl.render(txtTemplate, view);
			//console.log(output);
	
			$(this.container).html(output); 
			$(".twitterWidget").hover(function() {
				$(this).stop().animate({ backgroundColor: "#eeeeee"}, 500);
			},function() {
				$(this).stop().animate({ backgroundColor: "#ffffff" }, 500);
			});

		}	
		return Timeline; 
	}
);


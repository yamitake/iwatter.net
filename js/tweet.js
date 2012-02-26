 $(function() {
 
	/* search area */
	$("#search_form").submit(function(){
		return true;
	});
	
	/**
	 * update message in #header>h2
	 */
	function setTagline(word){
		$("#collect_word").text(word);
	}
	
	$(".tweet").live("mouseover",function(){$(this).addClass("over");});
	$(".tweet").live("mouseout",function(){ $(this).removeClass("over");});
	
	// get query parameter
	var q = decodeURIComponent(swfobject.getQueryParamValue("q"));
	if(q){
		$("#search_word").val(q);
		setTagline(q);
		tweets = new Array();
	}
	
	//start pop write tweet_setting.js
});
 
var MAX_DISPLAY_TWEET = 30;
var MESSAGE_TEMPLATE_WIDTH = 320;
var MESSAGE_TEMPLATE_HEIGHT = 250;

var TWITTER_ADDRESS = "http://twitter.com/";
 
var tweets = new Array();
var refresh_url = "";
var timerID;
function setPopInterval(time){
	timerID = setInterval(function(){
	//return;
		if(tweets.length == 0){
			clearInterval(timerID);
			
			var param = "";
			if(IWATTER_MODE==MODE_ALWAYS){
				param = "?q="+ encodeURIComponent($("#search_word").val()) +"&callback=viewTwitter&rpp=100";
			}else{
				if(!refresh_url){
					refresh_url = "?q="+ encodeURIComponent($("#search_word").val())
				}
				param = refresh_url + "&callback=viewTwitter&rpp=100";
			}
			
			$.ajax({
				  type: "GET",
				  url: "http://search.twitter.com/search.json"+ param,
				  dataType: "script"
				  });
		}else{
			popTweet();
		}
	},time);
}

/**
 * 定期的に実行し、ひとつのメッセージを表示する。
 */
function popTweet(){
	var canvas_height = $("#contents").height();
	var canvas_width = $("#contents").width();

	var center_position = {x:canvas_width/2 - MESSAGE_TEMPLATE_WIDTH/2,
							y:canvas_height/2 -MESSAGE_TEMPLATE_HEIGHT/2};

	var tweet = tweets.pop();
	var div = $('<div class="tweet" style="top:'+ center_position.y +'px;left:'+ center_position.x +'px;">' +
						'<p class="'+ FONT_CLASS +'">' + createTweetText(tweet["text"]) + 
							'<span class="tweet_info">' +
								'<span class="user">' + tweet["from_user"] + '</span>' +
								'<span class="created_at">' + relative_time(tweet["created_at"]) + '</span>' +
							'</span>' +
						'</p>' +
					'<div class="tooltip_footer">&nbsp;</div>' +
					'<a href="' + TWITTER_ADDRESS + tweet["from_user"] +'" target="_blank" name="">' +
						'<img class="icon" src="'+ tweet["profile_image_url"] +'" alt="' + tweet["from_user"] + '" />' +
					'</a>' +
			'</div>');
		
    $("#main").append(div);
    div.animate({ 
	    opacity: 1,
	    top:(canvas_height - MESSAGE_TEMPLATE_HEIGHT/2) * Math.random() + $("#header").height(),
	    left:(canvas_width - MESSAGE_TEMPLATE_WIDTH) * Math.random() 
	  }, 
	  2000 ,
	  "easeOutBounce",
	  deleteTweet
	);
}
 
/**
 * jsonデータをtweets(array)に格納する。
 * 定期的に表示するのは上記ソース参照
 * @param json
 */
function viewTwitter(json){
 	tweets = json["results"];//.reverse();
 	refresh_url = json["refresh_url"];
 	if(tweets.length == 0 && IWATTER_MODE == MODE_ALWAYS){
 		alert("The retrieval result was 0. Please change the retrieval word.\n※It is not likely to be able to retrieve it by # and multi byte character.");
 	}else{
 		setPopInterval(POP_INTERVAL_TIME);
 	}
 	$(".loading").remove();
}

/**
 * 最大表示数まで言っていたら、吹き出しを古い順に削除する。
 */
function deleteTweet(){
	if(MAX_DISPLAY_TWEET < $(".tweet").length){
		$(".tweet:first").animate({opacity: 0},
									DELETE_ANIME_TIME,
									"linear",
									function(){
										$(this).remove();
										deleteTweet();
									}
								);
	}
}

/**
 * 文字列のうち,http://または@xxxxまたは
 * 引用:http://twitter.com/javascripts/blogger.js
 */
function createTweetText(str){
	return str.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a target="_blank" href="'+url+'">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a target="_blank" href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
    });
}

/**
 * 引用:http://twitter.com/javascripts/blogger.js
 */
function relative_time(time_value) {
	var post_date = new Date(time_value);
	return post_date.toLocaleDateString() + " " + post_date.getHours() + ":" + post_date.getMinutes() + ":" + post_date.getSeconds();
}

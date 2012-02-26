(function(){
/*
 * konami command 0.1
 *
 * Copyright (c) 2008 wakasa.org
 *
 * $Date: 2008-06-09 $
 */
	$.fn.konamicmd = function(param){
		var config;
		var target=this;
		if(typeof(param)=="function"){
			config ={success:param};
		}else{
			config = param;
		}
		
		if(typeof(config.successReset)!="boolean")config.successReset=false;
		if(typeof(config.errorReset)!="boolean")config.errorReset=true;
		
		var keyList=[38,38,40,40,37,39,37,39,66,65];
		var now=0;
		target.keydown(function(e){
			if(now>=0 && keyList.length!=now){
				if(keyList[now]==e.keyCode){
					now++;
					if(keyList.length==now){
						if(typeof(config.success)=="function"){
							config.success.call();
						}
						if(config.successReset){
							now=0;
						}else{
							now=-1;
						}
					}
				}else{
					if(typeof(config.error)=="function"){
						config.error.call();
					}
					if(config.errorReset){
						now=0;
					}else{
						now=-1;
					}
				}
			}
		});
	};
})(jQuery);

$(function(){
 $(document).konamicmd({
  success:function(){
    (function(d,s){s=d.createElement('script');s.type='text/javascript';s.src='http://www.rr.iij4u.or.jp/~kazumix/d/javascript/meltdown2.js?'+(new Date).getTime();s.charset='UTF-8';d.body.appendChild(s);})(document);
  },
  error:function(){
  },
  successReset:false,
  errorReset:true
 });
});

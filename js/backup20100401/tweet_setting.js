 $(function() {
	$("#setting").dialog({
		autoOpen: false,
		bgiframe: true,
		height: 600,
		width:600,
		modal: true,
		buttons: {
				'OK': function() {
					//mode set
					load_setting();
					save_setting();
					$(this).dialog('close');
				},
				'デフォルト設定に戻す':function(){
					$("input[name='mode'][value='"+MODE_ALWAYS+"']").attr("checked","checked");
					$("#color").val("#ffffff");
					$("input[name='background-position'][value='center center']").attr("checked","checked");
					$("#url").val("");
					$("input[name='background-attachment'][value='fixed']").attr("checked","checked");
					$("input[name='background-repeat'][value='repeat']").attr("checked","checked");
					$("input[name='font'][value='medium']").attr("checked","checked");
				}
			}
	});
	
	/**
	 * 設定反映 
	 */
	function load_setting(){
		IWATTER_MODE = $("input[name='mode']:checked").val();
		$("body").css("background-color",$("#color").val());
		$("body").css("background-position",$("input[name='background-position']:checked").val());
		$("body").css("background-image","url('" + $("#url").val() +"')");
		$("body").css("background-attachment",$("input[name='background-attachment']:checked").val());
		$("body").css("background-repeat",$("input[name='background-repeat']:checked").val());
		$(".tweet p").removeClass(FONT_CLASS);
		FONT_CLASS = $("input[name='font']:checked").val();
		$(".tweet p").addClass(FONT_CLASS);
		MESSAGE_TEMPLATE_HEIGHT = (FONT_CLASS=="large" || FONT_CLASS=="medium-large") ? 400 :250;
	}
	
	/**
	 * cookieに設定を保存する。
	 */
	function save_setting(){
		$.cookie('iwatter_mode',$("input[name='mode']:checked").val());
		$.cookie('background-color',$("#color").val());
		$.cookie('background-position',$("input[name='background-position']:checked").val());
		$.cookie('background-image',$("#url").val());
		$.cookie('background-attachment',$("input[name='background-attachment']:checked").val());
		$.cookie('background-repeat',$("input[name='background-repeat']:checked").val());
		$.cookie('font',$("input[name='font']:checked").val());
		$.cookie('setting_flag',true);
	}
	
	/**
	 * cookieに設定が保存されている場合に初期化する。
	 */
	function init_setting(){
		if($.cookie('setting_flag')){
			$("input[name='mode'][value='"+$.cookie('iwatter_mode')+"']").attr("checked","checked");
			$("#color").val($.cookie('background-color'));
			$("input[name='background-position'][value='"+$.cookie('background-position')+"']").attr("checked","checked");
			$("#url").val($.cookie('background-image'));
			$("input[name='background-attachment'][value='"+ $.cookie('background-attachment') +"']").attr("checked","checked");
			$("input[name='background-repeat'][value='"+ $.cookie('background-repeat') +"'").attr("checked","checked");
			$("input[name='font'][value='"+ $.cookie('font') +"']").attr("checked","checked");
		
			load_setting();
		}else{
		}
		setPopInterval(300);
	}
	init_setting();
	
	$('#picker').farbtastic('#color');
	
 	$("#show_setting").click(function(){
		$("#setting").dialog("open");
	});
});

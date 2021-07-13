$(function()
{
	if($.cookie('font_size') != null)
	{
		$("body").css("font-size", "120%");
	}
	$(".font-size").click(function () {
        if($.cookie('font_size') != null)
		{
			$.removeCookie('font_size');
			$("body").css("font-size", "100%");
		}
		else
		{
			$.cookie('font_size', '1');
			$("body").css("font-size", "120%");	
		}
    });
});
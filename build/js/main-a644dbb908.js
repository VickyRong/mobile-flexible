$(function(){var a={phone:$(".js-phone"),clear:$(".js-clear"),err:$(".js-error"),select:$(".js-select"),selectText:$(".js-select-text"),code:$(".js-code"),codeBtn:$(".js-code-btn"),login:$(".js-login")},o=!1,n=!1,c=!0,s={reg:/^1[3|4|5|6|7|8|9][0-9]{9}$/,reg1:/^09[0-9]{8}$/,reg2:/^[5|6|8|9][0-9]{7}$/,reg3:/^6[0-9]{7}$/};function l(){var e,t=a.select.get(0).selectedIndex,n=a.phone.val();if(""!=n&&null!=n){if(!c){switch(t){case 0:e=s.reg;break;case 1:e=s.reg1;break;case 2:e=s.reg2;break;case 3:e=s.reg3}e.test(n)?(r(""),o=!0):(r("请输入正确的手机号码！"),o=!1)}}else r("请输入手机号码！")}function e(){0<a.phone.val().length?a.clear.addClass("active"):a.clear.removeClass("active")}function r(e){e?a.err.addClass("active").text(e):a.err.removeClass("active")}a.select.on("change",function(){l();var e=$(this),t=e.get(0).selectedIndex,n=e.find("option").eq(t).data("text");a.selectText.text(n)}),a.phone.on("keyup",function(){l(),e()}),a.phone.on("blur",function(){c=!1,l()}),a.code.on("keyup",function(){0<$(this).val().length&&o?(a.login.addClass("active"),n=!0):a.login.removeClass("active")}),a.clear.on("click",function(){a.phone.val(""),l(),e()}),a.codeBtn.on("click",function(){var e=a.phone.val();o?(!function(e){var t=a.codeBtn;if(!t.hasClass("disabled")){t.addClass("disabled"),t.text(e+"s");var n=setInterval(function(){0<--e?t.text(e+"s"):(clearInterval(n),t.removeClass("disabled").text("获取验证码"))},1e3)}}(60),$.ajax({url:"",method:"post",dataType:"json",data:{phone:e},success:function(e){},error:function(e){}})):l()}),a.login.on("click",function(){$(this);var e=a.phone.val(),t=a.code.val();o&&n&&$.ajax({url:"",method:"post",dataType:"json",data:{zone:a.select.val(),phone:e,code:t},success:function(e){},error:function(e){}})})});
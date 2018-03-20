$(function(){
    var domObj = {
        phone : $(".js-phone"),
        clear : $(".js-clear"),
        err   : $(".js-error"),
        select: $(".js-select"),
        selectText:$(".js-select-text"),
        code  : $(".js-code"),
        codeBtn:$(".js-code-btn"),
        login : $(".js-login")
    }
    var checkPhoneStatus = false,checkCodeStatus = false,firstCheck = true;

    var phoneRules = {
        reg  : /^1[3|4|5|6|7|8|9][0-9]{9}$/, //大陆
        reg1 : /^09[0-9]{8}$/,               //台湾 09开头 10位
        reg2 : /^[5|6|8|9][0-9]{7}$/,        //香港 5,6,8,9开头 8位
        reg3 : /^6[0-9]{7}$/                 //澳门 6开头 8位
    }

    domObj.select.on("change",function(){
        checkPhone();
        var th = $(this);
        var index  = th.get(0).selectedIndex;
        var zone = th.find("option").eq(index).data("text");
        domObj.selectText.text(zone);
    });

    domObj.phone.on("keyup",function(){
        checkPhone();
        isClearBtn();
    });

    domObj.phone.on("blur",function(){
        firstCheck = false;
        checkPhone();
    });

    domObj.code.on("keyup",function(){
        var val = $(this).val();
        if(val.length > 0 && checkPhoneStatus){
            domObj.login.addClass("active");
            checkCodeStatus = true;
        }else{
            domObj.login.removeClass("active");
        }
    });

    domObj.clear.on("click",function(){
        domObj.phone.val("");
        checkPhone();
        isClearBtn();
    });

    //获取验证码
    domObj.codeBtn.on("click",function(){
        var phoneNum = domObj.phone.val();
        if(checkPhoneStatus){
            timeCounter(60);
            $.ajax({
                url:"",
                method: "post",
                dataType: 'json',
                data:{
                    phone:phoneNum,
                },
                success:function(res){
                },
                error:function(res){
                    // errMsg('网络异常，请稍后重试');
                }
            })
        }else{
            checkPhone();
        }
    });
    
    //登录
    domObj.login.on("click",function(){
        var th = $(this);
        var phoneNum = domObj.phone.val();
        var codeNum = domObj.code.val();
        if(checkPhoneStatus && checkCodeStatus){
            $.ajax({
                url:"",
                method: "post",
                dataType: 'json',
                data:{
                    zone:domObj.select.val(),
                    phone:phoneNum,
                    code:codeNum
                },
                success:function(res){
                },
                error:function(res){
                    // errMsg('网络异常，请稍后重试');
                }
            })
        }
    });
    
    /***通用方法***/
    function checkPhone(){
        var reg;
        var type = domObj.select.get(0).selectedIndex;
        var val = domObj.phone.val();

        if(val == "" || val == undefined){
            errMsg("请输入手机号码！");return;
        }
        
        if(firstCheck){ return; } 
        switch (type){
            case 0: reg = phoneRules.reg;  break;
            case 1: reg = phoneRules.reg1; break;
            case 2: reg = phoneRules.reg2; break;
            case 3: reg = phoneRules.reg3; 
        }
        
        if(reg.test(val)){
            errMsg("");checkPhoneStatus = true;
        }else{
            errMsg("请输入正确的手机号码！");
            checkPhoneStatus = false;
        }
    };

    function isClearBtn(){
        var val = domObj.phone.val();
        val.length > 0 ? domObj.clear.addClass("active"):domObj.clear.removeClass("active");
    }

    function timeCounter(count){
        var th = domObj.codeBtn;
        if(!th.hasClass("disabled")){
            th.addClass("disabled");
            th.text(count +"s");
            var timer = setInterval(function(){
                count -- ;
                if(count > 0){
                    th.text(count +"s");
                }else{
                    clearInterval(timer);
                    th.removeClass("disabled").text("获取验证码");
                }
            },1000);
        }
    }

    function errMsg(msg){
        if(msg){
            domObj.err.addClass("active").text(msg);
        }else{
            domObj.err.removeClass("active");
        }
    }
});
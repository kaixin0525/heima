$(function () { 
    // 注册和登录的显示隐藏
    // 点击去注册
    $('#goto-reg').on('click', function () { 
        $('#login').hide().next().show();
    })
    $('#goto-login').on('click', function () { 
        $('#login').show().next().hide();
    })

    // 注册页面监听事件
    $('#register form').on('submit', function (e) {
        // 取消默认事件
        e.preventDefault();
        // 获取输入框文本
        var data = $(this).serialize();
        // 发送ajax请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (res) { 
                alert(res.message)
                if (res.status === 0) { 
                    // 返回到登录页面
                    $('#login').show().next().hide()
                }
            }
        })
    })


    // 自定义判断条件
    // 加载模块
    var form = layui.form;
    form.verify({
        len: function (val) { 
            if (val.trim().length < 6 || val.trim().length > 12) { 
                
            }
        }
    })


    












})
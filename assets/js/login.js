// 切换登录和注册
$(function () {
    //切换登录和注册
    $('#goto-reg').click(function () {
        $('#login').hide().next().show();
    })

    $('#goto-login').click(function () {
        $('#login').show().next().hide();
    })



    // 注册功能
    // 监听注册表单的提交事件
    $('#register form').on('submit', function (e) {
        // 取消默认事件
        e.preventDefault();
        // 获取账号密码
        var data = $(this).serialize();
        // serialize 是根据表单项的name属性获取值的,所以这里一定要检查单项的name属相是否存在,值是否正确

        // 发送ajax请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (res) {
                // 无论成功失败都给出一个提示
                alert(res.message)
                if (res.status === 0) {
                    $('#login').show().next().hide()
                }
            }
        })
    })


    // 表单验证
    // 加载form模块
    var form = layui.form;
    // 调用form.verify()方法自定义规则
    form.verify({
        len: function (val) {
            // val 表示使用该验证规则的输入框的值
            if (val.trim().length < 6 || val.trim().length > 12) {
                return '密码有误,请重新输入'
            }
        },
        same: function (val) {
            // val表示重复密码的值
            var password = $('.pass').val();
            // 比较密码和重复密码
            if (val !== password) {
                return '两次密码不一致'
            }
        }
    })


    // 完成登录功能
    $('#login form').on('submit', function (e) {
        // 取消默认事件
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                alert(res.message)
                if (res.message === 0) {
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                }
            }
        })
    })
})
// 入口函数
$(function () { 
    // 一进入页面发送ajax请求,获取页面用户信息
    getUserInfo();
    // 退出功能
    $('#logout').click(function () { 
        // 询问是否要退出
        layer.confirm('确定要关闭么?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 删除token
            localStorage.removeItem('token');
            // 跳转到/login.html
            location.href = '/login.html';
            // 下边代码是关闭弹出层的意思
            layer.close(index);
          });
    })
})

// 封装函数
function getUserInfo() { 
    $.ajax({
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        success: function (res) { 
            if (res.status === 0) { 
                // 设置欢迎语(有昵称,就是用昵称)
                var myname = res.data.nickname || res.data.username;
                $('.myname').text(myname);
                // 设置头像(有图片,使用图片,没有图片使用米子的首字符)
                if (res.data.user_pic) {
                    //使用图片
                    $('.layui-nav-img').attr('src', res.data.user_pic).show
                    $('.text-avatar').hide();
                } else { 
                    var t = myname.substr(0, 1).toUpperCase();
                    $('.text-avatar').text(t).css('display','inline-block')
                    $('.layui-nav-img').hide();
                }
            }
        },
        complete: function (xhr) { 
            // 判断身份认证是否成功
            console.log(xhr);
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败!') { 
                // 删除假的token
                localStorage.removeItem('token');
                // 跳转到登录界面
                location.href = '/login.html';
            }
        },
        headers: {
            'Authorization': localStorage.getItem('token')
        }

    })
}

$(function(){
    getUserinfo()

    //退出登录
    $('#loginOut').on('click',function(){
        layui.layer.confirm('是否退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
})

function getUserinfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo', 
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            renderUser(res.data)
        }
    })
}

//渲染用户信息
function renderUser(user){
    let name = user.nickname ||  user.username

    $('.welcome').html('欢迎 &nbsp;&nbsp;'+ name)
   

    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show() 
        $('.text-avatar').hide() 
        

    }else{
        $('.layui-nav-img').hide()
        $('.welcome').show()  
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}


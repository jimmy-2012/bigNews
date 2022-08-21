$(function(){
    
    layui.form.verify({
        nickname:function(val){
            if (val.length > 6){
            return '昵称长度必须在1~6个字符之间!'
            }
        }
    })

    inituserInfo()

    function inituserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !==0){
                    return layui.layer.msg('用户信息获取失败')
                } 
                layui.form.val('inituser',res.data)
            }
        })
    }

     
    $('#resetUser').on('click',function(e){
        e.preventDefault() 
        inituserInfo()
    }) 
            
    $('#userinfoForm').on('submit',function(e){
        e.preventDefault()
        
        let data = $(this).serialize()
         
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:data,
            success:function(res){
               
                if(res.status !==0 ){
                    return layui.layer.msg('更新用户信息失败')
                }
                layui.layer.msg('更新用户信息成功')
                window.parent.getUserinfo()
            }
        })
    })


    


})

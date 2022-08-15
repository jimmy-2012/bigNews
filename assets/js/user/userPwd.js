$(function(){
    layui.form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ],
        newPwd:function(val){
            if(val === $('[name=oldPassword]').val()){
                return '新密码与旧密码不能相同！'
            }
        },
        rePwd:function(val){
            if(val !== $('[name=newPassword]').val()){
                return '新密码与确认密码不一致！'
            } 
        }
         
    })
})

$('.layui-form').on('submit',function(e){
    e.preventDefault()
    let data = {oldPwd:$('[name=oldPassword]').val(),newPwd:$('[name=newPassword]').val()} 
    $.post('/my/updatepwd',data,function(res){ 
        if(res.status !== 0){
            return layui.layer.msg("更新密码失败!") 
        }
        layui.layer.msg("更新密码成功!")   
        $('.layui-form')[0].reset()    
    })    


})
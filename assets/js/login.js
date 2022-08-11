$(function(){
    $('#toReg').on('click',function(){
        $('.logBox').show()
        $('.regBox').hide()
    })
    $('#toLogin').on('click',function(){
        $('.regBox').show()
        $('.logBox').hide()
    })   
    
    //表单效验
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        repwd:function(val){
            let vl=$('.regBox [name=password]').val()
            if(val!==vl){
                return '两次密码不一致！'
            }
        }
    })

    //注册
    $('#formReg').on('submit',function(e){
        e.preventDefault() 
        let data = {
            username:$('.regBox [name=username]').val(),
            password:$('.regBox [name=password]').val()
        }
     
        $.post('/api/reguser',data,function(res) {
             

            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#toReg').click()
        })
    })

    //登录
    $('#formLog').on('submit',function(e){
        e.preventDefault()
        let data = {
            username:$('.logBox [name=username]').val(),
            password:$('.logBox [name=password]').val()
        }

        $.post('/api/login',data,function(res){
            if(res.status !== 0 ){
                return layer.msg(res.message)
            }
            layer.msg('登录成功')
            localStorage.setItem('token',res.token)
      
            location.href = '/index.html'

        })

    })
})

$(function(){
    initArticleList ()
    function initArticleList (){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){                
                let htmlstr = template('htmlstrs',res)
                $('tbody').html(htmlstr)
            }
        })
    }

    let layer = layui.layer

    let indexAdd = null
    let indexEdit = null

    $('#addClass').on('click',function(){
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialogAdd').html()
        }); 
    })

    $('body').on('submit','#formAddClass',function(e){
        e.preventDefault() 
       
        // $.ajax({
        //     method:'POST',
        //     url:'/my/article/addcates',
        //     data:$('#formAddClass').serialize(),
        //     success:function(res){
        //         console.log(res)
        //     }
        // })
        $.post('/my/article/addcates',{name:'士的',alias:'asdf'},function(res){
            if(res.status !== 0){
                return layer.msg('分类添加失败！')
            }
            layer.msg('分类添加成功！')
            initArticleList ()
            layer.close(indexAdd)
        })

    })

    $('tbody').on('click','.editList',function(e){
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialogEdit').html()
        });  
         
        let id = $(this).attr('dataId')
      
        $.ajax({
            method:'GET',
            url:'/my/article/cates'+id,
            success:function(res){
                layui.form.val('formEdit',res.data)
            }
        }) 
    })

    $('body').on('submit','#formEditClass',function(e){
        e.preventDefault() 
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0 ){
                   return layer.msg('文章分类更新失败！')
                }
                layer.msg('文章分类更新成功！')

                initArticleList ()
                layer.close(indexEdit)
            }
        })
    })
    

    $('tbody').on('click','.layui-btn-danger',function(e){
        let id = $(this).attr('dataId')
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+ id,
                success:function(res){
                    if(res.status !==0 ){
                       return layer.msg('分类删除失败！')
                    }
                    layer.msg('分类删除成功！')
                }
            })
            layer.close(index);
            initArticleList ()
          });
    })
})
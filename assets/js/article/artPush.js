$(function(){
    let form = layui.form
    let layer =layui.layer
    initEditor()
    initSelect()
    function initSelect(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                let htmlStr = template('artSelect',res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            } 
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
    
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    } 

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnchooseImg').on('click',function(e){
        e.preventDefault() 
        $('#cFile').click() 
    })

    $('#cFile').on('change',function(e){
        var file = e.target.files[0]
        if(file.length ===0){
            return layer.msg('请选择上传图片')
        }

        var newImgURL = URL.createObjectURL(file)
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
    })

    let avatar = '已发布'

    $('#btnSave').on('click',function(){
        avatar = '已草稿'  
    })
 

    $('#formCate').on('submit',function(e){
        e.preventDefault() 
      
        let data = new FormData($(this)[0])

        data.append('state',avatar)

        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
          width: 400,
          height: 280
        })
        .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            data.append('cover_img',blob)

            pushArtcate(data)
        })

        function pushArtcate(d){
            
            $.ajax({
                method:'POST',
                url:'/my/article/add',
                data:d,
                contentType:false,
                processData:false,
                success:function(res){
                    if(res.status !==0 ){
                        return layer.msg('文章发布失败！')
                    }
                    layer.msg('文章发布成功！')
                    location.href = '/article/artList.html'
                }

            })
        }
        
    })


})
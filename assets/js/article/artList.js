$(function(){

    let layer = layui.layer
    let form = layui.form
    let q = {
        pagenum : '1',
        pagesize: '2',
        cate_id: '',
        state:''
    }

    initTable()

    function initTable(){
 
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
              
                if(res.status !==0){
                    return layer.msg('文章列表获取失败！')
                }else if(res.status ===0 && res.data.length ===0){
                    return $('tbody').html(`
                        <tr>
                            <td colspan='5' align="center">还没有发布文章！</td>
                        </tr>
                    `)
                } 
                let htmlstr = template('htmlTab',res)
                $('tbody').html(htmlstr)
                 
                renterPage(res.total)
            }
        })        
    }

    template.defaults.imports.dataFormat = function (time){
        let dt = new Date(time)

        let y = dt.getFullYear()
        let m = bling(dt.getMonth()+1)
        let d = bling(dt.getDate())

        let hh = bling(dt.getHours())
        let mm = bling(dt.getMinutes())
        let ss = bling(dt.getSeconds())

        return y +'-'+ m +'-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function bling (n){

        return n > 9 ? n : '0' + n

    }

    initSelect()

    function initSelect(){

        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                
                if(res.status !== 0){ 
                   return layer.msg('获取分类数据失败！') 
                }
                let htmlStr = template('artSelect',res)
                $('[name=cateName]').html(htmlStr)
                form.render()
            }
        })
    }

    $('#formSC').on('submit',function(e){
        e.preventDefault() 
        q.cate_id = $('[name=cateName]').val()
        q.state = $('[name=cateCg]').val() 
      
        initTable() 
        renterPage()

    })

    $('tbody').on('click','.layui-btn-danger',function(e){

        let id= $(this).attr('dataId')
        layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
            let len =$('.layui-btn-danger').length
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('文章删除失败！')
                    }
                    layer.msg('文章已删除')
                    if(len ===1){
                         q.pagenum = q.pagenum===1?1:q.pagenum-1
                    }
                    initTable()
                    //renterPage()
                }
            })            
            layer.close(index);
        });

    })

    renterPage()

    function renterPage(total){ 
        let laypage = layui.laypage;
        
        //执行一个laypage实例
        laypage.render({
            elem: 'artPage' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: total //数据总数，从服务端得到
            ,limit: q.pagesize  //设置每页显示的条数
            ,curr: q.pagenum //设置起始页
            ,jump: function(obj, first){  
                q.pagenum = obj.curr
                
                q.pagesize = obj.limit
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
           
                //首次不执行
                if(!first){
                //do something
                    initTable()
                }

            }
            ,layout:['count','limit','prev', 'page', 'next','skip']
            ,limits:[2,3,5]
        });
 
    }

})
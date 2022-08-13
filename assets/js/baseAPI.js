$.ajaxPrefilter(function(opt){

    opt.url = 'http://www.liulongbin.top:3007' + opt.url  

    if(opt.url.indexOf('/my/') !== -1){
        opt.headers = {
            Authorization:localStorage.getItem('token') || ''
        } 
    }

    opt.complete = function(res) {
            
        if(res.responseJSON.status == 1){
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})
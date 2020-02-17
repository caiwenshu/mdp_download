import index from './css/index.css';
import $ from 'zepto';
import 'lib-flexible/flexible.js'

$(function(){
    let {origin} = window.location;
    let url = `${origin}/alps/info/1/`;
    
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $('#version').html('版本：'+ res.version);
            $('#updatedate').html('更新时间：'+ res.time);
            $("#downloadBtn").attr('href', res.url);
        },
        error: function(xhr, type){
            alert(`请求错误: ${type}`);
        }
    });
});
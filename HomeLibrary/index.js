$(function() {
    var App = {
        init: function() {
            App.attachListeners();
        },
        attachListeners: function() {
            var self = this;

            $(".controls input[type=file]").on("change", function(e) {
                $("#cover").show();
                if (e.target.files && e.target.files.length) {
                    App.decode(URL.createObjectURL(e.target.files[0]));
                }
            });
            $("#scan-btn").on("click",function(){
                $(".controls input[type=file]").click();
            })
        },
        detachListeners: function() {
            $(".controls input[type=file]").off("change");
            $(".controls button").off("click");
        },
        decode: function(src) {
            var self = this,
                config = $.extend({}, self.state, {src: src});

            Quagga.decodeSingle(config, function(result) {});
        },
        inputMapper: {
            inputStream: {
                size: function(value){
                    return parseInt(value);
                }
            },
            numOfWorkers: function(value) {
                return parseInt(value);
            },
            decoder: {
                readers: function(value) {
                    if (value === 'ean_extended') {
                        return [{
                            format: "ean_reader",
                            config: {
                                supplements: [
                                    'ean_5_reader', 'ean_2_reader'
                                ]
                            }
                        }];
                    }
                    return [{
                        format: value + "_reader",
                        config: {}
                    }];
                }
            }
        },
        state: {
            inputStream: {
                size: 800,
                singleChannel: false
            },
            locator: {
                patchSize: "large",
                halfSample: true
            },
            decoder: {
                readers: [{
                    format: "ean_reader",
                    config: {}
                }]
            },
            locate: true,
            src: null
        }
    };
    App.init();
    /*
    此处为处理完成函数
    结果存储在result中
    如果成功，则可以通过result.codeResult.code获取到对应的编码
    如果失败，则在result中只有一个boxes
     */
    Quagga.onProcessed(function(result) {
        if (result) {
            if (result.codeResult && result.codeResult.code) {
            }else{
                alert("没有正常扫描，请重试！");
            }
        }
    });

    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        alert(code);
        $("#cover").hide();
        // var url = "http://127.0.0.1:5000/interface/getBInfoByISBN/"+code+"?callback=tt";
        // $.ajax({
        //  url:url,
        //  dataType:'jsonp',
        //  processData: false, 
        //  type:'get',
        //  success:function(data){
        //    alert(data);
        //  },
        //  error:function(XMLHttpRequest, textStatus, errorThrown) {
        //     $("#cover").hide();
        //     console.log(XMLHttpRequest);
        //    alert(XMLHttpRequest.status);
        //    alert(XMLHttpRequest.readyState);
        //    alert(textStatus);
        //  }});
    });
});

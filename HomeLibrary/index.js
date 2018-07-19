$(function() {
    var App = {
        init: function() {
            App.attachListeners();
        },
        attachListeners: function() {
            var self = this;
            $(".controls input[type=file]").on("change", function(e) {
                if (e.target.files && e.target.files.length) {
                    App.decode(URL.createObjectURL(e.target.files[0]));
                }
            });
            $(".controls button").on("click", function(e) {
                var input = document.querySelector(".controls input[type=file]");
                if (input.files && input.files.length) {
                    App.decode(URL.createObjectURL(input.files[0]));
                }
            });
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
                    return parseInt(800);
                }
            },
            numOfWorkers: function(value) {
                return parseInt(1);
            },
            decoder: {
                readers: function(value) {
                    return [{
                        format: "ean_reader",
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
                halfSample: false
            },
            decoder: {
                readers: [{
                    format: "ean",
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
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay,
            area;
        if (result) {
            if (result.codeResult && result.codeResult.code) {
            }else{
                alert("该图像没有扫描到对应的数据，请重新扫描！");
            }
    }
    });

    /*
    如果检测到有条码
    可以在此处进行下一步工作
    */
    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        alert(code);
    });
});

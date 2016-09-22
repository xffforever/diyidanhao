// ==UserScript==
// @name         DYDH CAPTCH
// @namespace    http://www.diyidanhao.com
// @description
// @authuer      Kevin
// @icon         http://www.diyidanhao.com/favicon.ico?&delivery=1&stock=1&wtype=1&psort=3
// @version      1.0
// @match        http://www.diyidanhao.com/user/index/
// ==/UserScript==

(function() {
    'use strict';
    var IMG_WIDTH = 50;
    var IMG_HEIGHT = 22;
    var CHAR_WIDTH = 8;
    var CHAR_HEIGHT = 10;

    var numData = [10];
    numData[0] = [3,4,10,11,12,13,17,18,21,22,24,25,30,31,32,33,38,39,40,41,46,47,48,49,54,55,57,58,61,62,66,67,68,69,75,76];
    numData[1] = [3,4,10,11,12,17,18,19,20,27,28,35,36,43,44,51,52,59,60,67,68,73,74,75,76,77,78];
    numData[2] = [2,3,4,5,9,10,13,14,16,17,22,23,30,31,37,38,44,45,51,52,58,59,65,66,72,73,74,75,76,77,78,79];
    numData[3] = [1,2,3,4,5,8,9,13,14,22,23,29,30,35,36,37,45,46,54,55,62,63,64,65,69,70,73,74,75,76,77];
    numData[4] = [4,5,6,11,12,13,14,18,19,21,22,25,26,29,30,32,33,37,38,40,41,42,43,44,45,46,47,53,54,61,62,69,70];
    numData[5] = [0,1,2,3,4,5,6,8,9,16,17,24,25,27,28,29,32,33,34,37,38,46,47,54,55,56,57,62,63,65,66,69,70,74,75,76,77];
    numData[6] = [2,3,4,5,9,10,13,14,16,17,22,24,25,32,33,35,36,37,40,41,42,45,46,48,49,54,55,56,57,62,63,65,66,69,70,74,75,76,77];
    numData[7] = [0,1,2,3,4,5,6,7,14,15,22,23,29,30,36,37,43,44,50,51,57,58,64,65,72,73];
    numData[8] = [2,3,4,5,9,10,13,14,16,17,22,23,25,26,29,30,34,35,36,37,41,42,45,46,48,49,54,55,56,57,62,63,65,66,69,70,74,75,76,77];
    numData[9] = [2,3,4,5,9,10,13,14,16,17,22,23,24,25,30,31,33,34,37,38,39,42,43,44,46,47,54,55,57,62,63,65,66,69,70,74,75,76,77];

    function matchData(data,start,num){
        for(var i = 1;i<num.length;i++){
            if(!compare(data,num[0]+start,Math.floor(num[i]/CHAR_WIDTH)*IMG_WIDTH+Math.floor(num[i]%CHAR_WIDTH)+start)){
                return false;
            }
        }
        return true;
    }

    function compare(data,a,b){
        return data[a*4+0]==data[b*4+0]&&data[a*4+1]==data[b*4+1]&&data[a*4+2]==data[b*4+2]&&data[a*4+0]>0&&data[a*4+1]>0&&data[a*4+2]>0;
    }

    function comparePoint(data,a,c){
        return data[a*4+0]==c[0]&&data[a*4+1]==c[1]&&data[a*4+2]==c[2];
    }

    function findBack(data){
        for(var x = 1;x<IMG_WIDTH-4;x++){
            for(var y = 1;y<IMG_HEIGHT;y++){
                var a = x+y*IMG_WIDTH;
                if(compare(data,a,a+1)&&compare(data,a,a+2)&&compare(data,a,a+3)&&compare(data,a,a+IMG_WIDTH)&&compare(data,a,a+IMG_WIDTH+1)&&compare(data,a,a+IMG_WIDTH+2)&&compare(data,a,a+IMG_WIDTH+3)){
                    return [data[a*4+0],data[a*4+1],data[a*4+2]];
                }
            }
        }
    }

    function findValid(data){
        for(var x = 1;x<IMG_WIDTH-2;x++){
            for(var y = 1;y<IMG_HEIGHT;y++){
                var a = x+y*IMG_WIDTH;
                if(compare(data,a,a+1)&&compare(data,a,a+IMG_WIDTH)&&compare(data,a,a+IMG_WIDTH+1)){
                    return [data[a*4+0],data[a*4+1],data[a*4+2]];
                }
            }
        }
    }

    function clearBack(data,c){
        for(var a = 0;a<data.length/4;a++){
            if(comparePoint(data,a,c)){
                clearPoint(data,a);
            }
        }
    }

    function clearInvalid(data,c){
        for(var a = 0;a<data.length/4;a++){
            if(!comparePoint(data,a,c)){
                clearPoint(data,a);
            }
        }
    }

    function clearPoint(data,a){
        data[a*4+0] = 0;
        data[a*4+1] = 0;
        data[a*4+2] = 0;
        data[a*4+3] = 0;
    }

    $(document).ready(function(){
        var img = $('img[src="/verify/"]').get(0);
        var canvas = document.createElement("canvas");
        canvas.width = IMG_WIDTH;
        canvas.height = IMG_HEIGHT;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var imageData = ctx.getImageData(0, 0, IMG_WIDTH, IMG_HEIGHT);
        var data = imageData.data;
        var back = findBack(data);
        clearBack(data,back);
        var valid = findValid(data);
        clearInvalid(data,valid);
        ctx.putImageData(imageData, 0, 0);
        var code = "";
        for(var i = 0;i<4;i++){
            var x = 5 + i * 10;
            for(var y = 1;y<IMG_HEIGHT/2+1;y++){
                var point = x + y*IMG_WIDTH;
                if(comparePoint(data,4+point,valid)){
                    for(var n=0;n<numData.length;n++){
                        if(matchData(data,point,numData[n])){
                            code+=n;
                            break;
                        }
                    }
                    break;
                }
            }
        }
        //$(img).after(canvas);
        $('input[name="code"]').val(code);
    });
})();

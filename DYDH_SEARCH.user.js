// ==UserScript==
// @name         DYDH SEARCH
// @namespace    http://www.diyidanhao.com
// @description  
// @authuer      Kevin
// @icon         http://www.diyidanhao.com/favicon.ico?&delivery=1&stock=1&wtype=1&psort=3

// @include      http://www.diyidanhao.com/buy/general*
// @grant        none
// @run-at       document_start

// @version      0.0.1
// ==/UserScript==


(function() {
    "use strict";
    load_area('s1', 25, 's2');
    load_area('r1', 25, 'r2');
    load_area('r2', 321, 'r3');
    $("#form1 select[name='scan']").val(1);

})();

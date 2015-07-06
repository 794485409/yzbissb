
function sliding(){
    if(s<600){
        s+=100;
        document.body.scrollTop=s;
        return true;
    }
}
function reduction(){
    console.log(s)
    if(s>0){
        s-=100;
        document.body.scrollTop=s;
        return true;
    }
}


//recommendSeriesÒ³Ãæ¶ÁÈ¡js
//        var t=0;
//        window.onscroll=function() {
//            var p=document.body.scrollTop;
//            setTimeout(function(){
//                t=p;
//            },0);
//            if(p>t){
//                if(document.body.scrollTop>0&&document.body.scrollTop<600){
//                    //$(".yzb-recommend-header").slideUp("slow");
//                    //console.log("*"+p+"---"+t)
//                    //    setInterval("sliding()", 50);
//                    document.body.scrollTop=550;
//
//                }else if (document.body.scrollTop>=600) {
//                    $("#recommendAddSumbit").css("display","block");
//                }else{
//                    $("#recommendAddSumbit").css("display","none");
//                }
//            }else{
//                if (document.body.scrollTop>=400) {
//                    $("#recommendAddSumbit").css("display","block");
//                }else{
//                    document.body.scrollTop=0;
//                    p=1;
//                    console.log(p+"---"+t)
//                    $("#recommendAddSumbit").css("display","none");
//                }
//            }
//        };



var appScanningController=['$scope','$location','getTrackAppList',function($scope,$location,getTrackAppList) {
    $scope.currentPage = 0;
    $scope.count = 0;
    $scope.pageSize = 25;
    $scope.totalPage = 0;
    $scope.changeCurrent = 1;
    $scope.middlePage = 0;
    $scope.SelectD="";
    $scope.SelectMessage="";
    if($scope.SelectD==""){
        $scope.SelectMessage="All";
    }
    $scope.titi=new Date();
    getTrackAppList($scope.currentPage, $scope.pageSize, $scope.SelectD,1400000000,'').success(function (data) {
        $scope.appScans = data.msg;
        $scope.count=data.total;
        $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);
    });
    $scope.SelectDevice=function(choose){
        $scope.SelectD=choose;
        var min=new Date($('#datepickmintime').val()).getTime();
        var max=new Date($('#datepickmaxtime').val()).getTime();
        var todayYear=new Date().getFullYear();
        var todayMonth=new Date().getMonth();
        var todayDay=new Date().getDate();
        var today=new Date(todayYear+"/"+(todayMonth+1)+"/"+todayDay).getTime();
        if(isNaN(min)){
            min=today;
            $('#datepickmintime').val("today")
        }
        getTrackAppList($scope.currentPage, $scope.pageSize, $scope.SelectD,min,max).success(function (data) {
            $scope.appScans = data.msg;
            $scope.count=data.total;
            $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);
        });
    };
    $scope.$watch('SelectD',function(value){
        if(value==""){
            $scope.SelectMessage="All";
        }else{
            $scope.SelectMessage=value;
        }
    });
    $scope.onLoadPage = function (page) {
        var min=new Date($('#datepickmintime').val()).getTime();
        var max=new Date($('#datepickmaxtime').val()).getTime();
        var todayYear=new Date().getFullYear();
        var todayMonth=new Date().getMonth();
        var todayDay=new Date().getDate();
        var today=new Date(todayYear+"/"+(todayMonth+1)+"/"+todayDay).getTime();
        if(isNaN(min)){
            min=today;
            $('#datepickmintime').val("today")
        }
        if(page>$scope.totalPage){
            page=$scope.totalPage-1;
        }else if(page<0){
            page=0;
        }else{
            $scope.currentPage=page;
        }
        $scope.middlePage=page;
        getTrackAppList(page, $scope.pageSize, $scope.SelectD,min,max).success(function (data) {
            $scope.appScans = data.msg;
            $scope.count=data.total;
            $scope.changeCurrent=page+1;
            $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);
        });
    };
    $(function(){
        $("#datepickmintime").change(function(){
            var min=new Date($('#datepickmintime').val()).getTime();
            var max=new Date($('#datepickmaxtime').val()).getTime();
                if(isNaN(min)){
                    min=1400000000;
                }
                getTrackAppList(0, $scope.pageSize, $scope.SelectD,min,max).success(function (data) {
                    $scope.appScans = data.msg;
                    $scope.count=data.total;
                    $scope.changeCurrent=1;
                    $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);
                });

        });
        $("#datepickmaxtime").change(function(){
            var min=new Date($('#datepickmintime').val()).getTime();
            var max=new Date($('#datepickmaxtime').val()).getTime();
            if(isNaN(min)){
                min=1400000000;
            }
            getTrackAppList(0, $scope.pageSize, $scope.SelectD,min,max).success(function (data) {
                $scope.appScans = data.msg;
                $scope.count=data.total;
                $scope.changeCurrent=1;
                $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);
            });

        });
    });
    $scope.AppScanning=function(){
        $location.path("/appScanning");
    };
    $scope.localVideo=function(){
        $location.path("/localVideo");
    };
    $scope.RecommendSeries=function(){
        $location.path("/recommendSeries");
    };
    $scope.superTag=function(){
        $location.path("/superTag");
    };

}];
var recommendSeriesController=['$scope','$location','$modal','seriesList','seriesUpdate',function($scope,$location,$modal,seriesList,seriesUpdate){
    seriesList.success(function(data){
        $scope.series=data.msg;
    });
    //series弹出模态框
    $scope.getSeries=function(d,index){
        $scope.lastId=d._id;
        var seriesModal=$modal.open({
            animation:true,
            templateUrl:"SeriesModal",
            controller:"seriesModalController",
            resolve:{
                updateId:function(){
                    return d._id;
                }
            }
        });
        seriesModal.opened.then(function(){   //模态框打开后执行的函数
            console.log("open seriesModal")
        });
        seriesModal.result.then(function(d){  //模态框提交后执行函数
            $scope.series.splice(index,1,d.msg[0]);
        }, function () {                    //模态框关闭后执行函数
            console.log("click kongbai")
        });
    };
    $scope.submitAllSeriesId=function(){
        var list=[];
        angular.forEach($scope.series,function(data,index,array){   //data是遍历出来的值，index是下标，array是数组中的需要遍历的子数组
            list.push(data._id);   //将所有的id封装进list数组��
        });
        $scope.msg={
            "slist":list
        };
        seriesUpdate($.param($scope.msg)).success(function(data){
            console.log(data)
        })
    };
    //window.onscroll=function() {
    //    $scope.scrolTop=document.body.scrollTop;
    //};

    $scope.remove=function(index){
        $scope.series.splice(index,1);//从本地缓存文件中按下标移除数据��
    };
    $scope.AppScanning=function(){
        $location.path("/appScanning");
    };
    $scope.localVideo=function(){
        $location.path("/localVideo");
    };
    $scope.RecommendSeries=function(){
        $location.path("/recommendSeries");
    };
    $scope.superTag=function(){
        $location.path("/superTag");
    };

    //553747ac2131242435d4a124    553747ae2131242435d4a159     553747ae2131242435d4a164    553747b12131242435d4a1e3
}];
var SuperTagListController=['$scope','$location','$modal','sTagList','delSTag',function($scope,$location,$modal,sTagList,delSTag){
    $scope.currentPage=0;
    $scope.count=0;
    $scope.pageSize=8;
    $scope.totalPage=0;
    $scope.ObyStatus="";
    $scope.changeCurrent=1;
    $scope.middlePage=0;
    sTagList($scope.currentPage,$scope.pageSize).success(function(data){
        $scope.supertags=data.msg;
        $scope.count=data.total;
        $scope.totalPage=Math.ceil(data.total/$scope.pageSize);
    });
    $scope.onLoadPage=function(page){
        if(page>$scope.totalPage){
            page=$scope.totalPage-1;
        }else if(page<0){
            page=0;
        }else{
            $scope.currentPage=page;
        }
        $scope.middlePage=page;
        sTagList(page,$scope.pageSize).success(function(data){
            $scope.supertags=data.msg;
            $scope.count=data.total;
            $scope.changeCurrent=page+1;
            $scope.totalPage=Math.ceil(data.total/$scope.pageSize);
        });
    };

    //添加sTag弹出模态框
    $scope.showAddStagModal=function(){
        var addmodal= $modal.open({
            animation:true,
            templateUrl:"addStagModal",
            controller:"addSTagController"
        });
        addmodal.opened.then(function(){   //模态框打开后执行的函数
            console.log("open addSTag")
        });
        addmodal.result.then(function(){  //模态框提交后执行函数
            $scope.onLoadPage($scope.currentPage);
        }, function () {                    //模态框关闭后执行函数
            console.log("click kongbai")
        });
    };

    //获取sTag信息弹出模态框
    $scope.getSuperTags=function(supertag) {
        var getsTagmodal= $modal.open({
            animation:true,
            templateUrl:"getMyTag",
            controller:"getSTagController",
            resolve: {
                tagData: function () {
                    return supertag;
                }
            }
        });
        getsTagmodal.result.then(function(){     //模态框提交后执行函数
            $scope.onLoadPage($scope.currentPage);
        }, function () {    //模态框关闭后执行函数
            $scope.onLoadPage($scope.currentPage);
        });
    };

    //页面上的删除事件
    $scope.delTag=function(supertag){
        if(confirm("是否要删除？")){
            delSTag($.param(supertag)).success(function(data){
                if(data.msg>=1){
                    $scope.onLoadPage($scope.currentPage);
                }
            });
        }
    };


    $scope.AppScanning=function(){
        $location.path("/appScanning");
    };
    $scope.localVideo=function(){
        $location.path("/localVideo");
    };
    $scope.RecommendSeries=function(){
        $location.path("/recommendSeries");
    };
    $scope.superTag=function(){
        $location.path("/superTag");
    };
}];
var localVideoController=['$scope','$sce','$location','$modal','getSeriesList','getVideoSeries','updateLocalVideo','hideLocalVideo',
    function($scope,$sce,$location,$modal,getSeriesList,getVideoSeries,updateLocalVideo,hideLocalVideo){
        $scope.currentPage = 0;
        $scope.count = 0;
        $scope.pageSize = 6;
        $scope.totalPage = 0;
        $scope.defaultSeries=[];
        $scope.changeCurrent = 1; //当前页的显示，页码是从0开始，所以比currentPage大1
        $scope.middlePage = 0;  //中间件的页码，从2开始算起��
        $scope.sortVideos=[];   //每个分类下的视频的详细信息
        $scope.activeid;       //初始选中的series的id
        $scope.serid;           //当前所选中的视频类别
        $scope.getvideoid;
        $scope.queryId="";
        $scope.sQueryList=[];   //下拉列表框内的数据
        //获取所有分类�
        //$scope.totalPage=Math.ceil($scope.count/$scope.pageSize);    //初始一个totalPage用于页面初始加载时的bug
        getSeriesList.success(function(data){
            $scope.querySeries=data.msg;  //类别综合
            angular.forEach($scope.querySeries,function(data){
                var a=[
                    {_id:data._id,name:data.name}
                ];
                $scope.sQueryList.push(a[0])
            });
            var hi={_id:1,name:"隐藏"};
            $scope.sQueryList.push(hi);    //增加一个隐藏参数
            $scope.activeid=data.msg[0]._id;
            $scope.selectQuery=data.msg[0]._id;
            getVideoSeries($scope.activeid,0,10000000).success(function(d){
                $scope.count= d.msg.length;
                $scope.totalPage=Math.ceil($scope.count/$scope.pageSize);
                getVideoSeries($scope.activeid,$scope.currentPage,$scope.pageSize).success(function(sd){
                    $scope.sortVideos= sd.msg;
                    $scope.changeCurrent=$scope.currentPage+1;
                });
            });
        });
        //遍历不同分类下的信息
        $scope.SelectQuerySeries=function(id){
            $scope.currentPage=0;
            $scope.serid=id;
            $scope.selectQuery=id;
            getVideoSeries(id,10000000,0).success(function(d){ //
                $scope.count= d.msg.length;
                $scope.totalPage=Math.ceil($scope.count/$scope.pageSize);
                getVideoSeries(id,0,$scope.pageSize).success(function(d){
                    $scope.sortVideos= d.msg;
                    $scope.changeCurrent=$scope.currentPage+1;
                });
            });

        };
        //添加视频弹出模态框
        $scope.addVideo=function(){
            var addV=$modal.open({
                animation:true,
                templateUrl:'addVideoModal',
                controller:'addVideoController',
                resolve:{
                    sQuery:function(){
                        return $scope.querySeries;
                    }
                }
            });
            addV.result.then(function(){  //模态框提交后执行函数
                $scope.onLoadPage($scope.currentPage);
            }, function () {                    //模态框关闭后执行函数
                console.log("addtagmodal is close")
            });
        };

        //播放视频弹出模态框
        $scope.playVideo=function(sortvideo){
            console.log(sortvideo)
            var videos=[];
            $scope.getvideoid=sortvideo._id;
            videos.push(sortvideo);
            videos.push($scope.sQueryList);
            videos.push($scope.selectQuery);
            var playVideo=$modal.open({
                animation:true,
                templateUrl:'playVideoModal',
                controller:'playLocalVideoController',
                resolve:{
                    videos:function(){
                        return videos;
                    }
                }
            });
            playVideo.opened.then(function(){   //模态框打开后执行的函数
                console.log("open playVideo")
            });
            playVideo.result.then(function(){  //模态框提交后执行函数
                $scope.onLoadPage($scope.currentPage);
            }, function () {                    //模态框关闭后执行函数
                console.log("modal is close")
            });
        };
        //下拉列表框的值
        $scope.sQuery=function(d){
            $scope.queryId=d;
        };
        //修改local视频
        $scope.updateLVideo=function(d){
            if($scope.queryId==""){
                $scope.queryId=$scope.selectQuery;
            }
            var hl=[];
            hl.push(d._id);
            $scope.upLocal={"video":d._id,"series":$scope.queryId};
            $scope.hidVideo={"ids":hl,"hid":$scope.queryId};
            if($scope.queryId==1){
                hideLocalVideo($scope.hidVideo).success(function(d){
                    if (d.status == 0) {
                        $scope.onLoadPage($scope.currentPage);
                    }
                })
            }else {
                updateLocalVideo($scope.upLocal).success(function (d) {
                    console.log(d)
                    if (d.status == 0) {
                        $scope.onLoadPage($scope.currentPage);
                    }
                });
            }
        };
        //读取页面
        $scope.onLoadPage=function(page){
            if(page>$scope.totalPage){
                page=$scope.totalPage-1;
            }else if(page<0){
                page=0;
            }else{
                $scope.currentPage=page;
            }
            $scope.middlePage=page;
            if($scope.serid==undefined){
                $scope.serid=$scope.activeid;
            }
            getVideoSeries($scope.serid,page,$scope.pageSize).success(function(data){
                $scope.sortVideos=data.msg;
                $scope.changeCurrent=page+1;
            });
        };
        $scope.AppScanning=function(){
            $location.path("/appScanning");
        };
        $scope.localVideo=function(){
            $location.path("/localVideo");
        };
        $scope.RecommendSeries=function(){
            $location.path("/recommendSeries");
        };
        $scope.superTag=function(){
            $location.path("/superTag");
        };
    }];
//=============================mainCrmController====================
var mainCrmController=['$scope','$location','$modal','$watch',function($scope,$location,$modal,$watch){
    angular.element(document).ready(function() {
        $("[id^='mbtmTop']").css("display","none");
        var t=0;
                    var p=jQuery(window).scrollTop();
            setTimeout(function(){
                t=p;
            },0);
            if(p>t){
                if(document.body.scrollTop>0&&document.body.scrollTop<600){
                    //$(".yzb-recommend-header").slideUp("slow");
                    //console.log("*"+p+"---"+t)
                    //    setInterval("sliding()", 50);
                    document.body.scrollTop=550;

                }else if (document.body.scrollTop>=600) {
                    $("#recommendAddSumbit").css("display","block");
                }else{
                    $("#recommendAddSumbit").css("display","none");
                }
            }else{
                if (document.body.scrollTop>=400) {
                    $("#recommendAddSumbit").css("display","block");
                }else{
                    document.body.scrollTop=0;
                    p=1;
                    console.log(p+"---"+t)
                    $("#recommendAddSumbit").css("display","none");
                }
            }

    });

    var topNum=[];   //设置一个判断状态
    $scope.showVideos=function(){
        $location.href=("#CrmVideos");
    };
    $scope.mbtmTopOver=function(i){
        var topOverBoolean=false;
        for(var t= 0;t<3;t++){
            if(topNum[t]==i){
                topOverBoolean=false;
                break;
            }else{
                topOverBoolean=true;
            }
        }
        if(topOverBoolean==true){
            $("#mbtmTop"+i).slideDown(100);
        }
    };
    $scope.mbtmTopLeave=function(i){
        $("#mbtmTop"+i).slideUp(100);
    };
    $scope.mbtmUpdate=function(i){
        $("#mainCrmVideosSwindows"+i).css("display","block");
        $("#mbtmTop"+i).slideUp(100);
        topNum.push(i);
    };
    $scope.crmMainVideosCancel=function(i){
        for(var t=0;t<3;t++){
            if(topNum[t]==i){
                topNum.splice(t,1);
            }
        }
        $("#crmMainVideosForm")[0].reset();
        $("#mainCrmVideosPad"+i).slideDown(100);
        $("#mainCrmVideosSwindows"+i).css("display","none");
    };

    $scope.crmVideoButton=function(i){
        $("#crmVideosPad"+i).slideUp(100);
        $("#crmSwindows"+i).css("display","block");
    };
    $scope.crmVideosCancel=function(i){
        $("#crmVideosPad"+i).slideDown(100);
        $("#crmSwindows"+i).css("display","none");
    };


}];
//=============================mainIndexController====================
var mainIndexController=['$scope','$location',function($scope,$location){
    $scope.AppScanning=function(){
        $location.path("/appScanning");
    };
    $scope.localVideo=function(){
        $location.path("/localVideo");
    };
    $scope.RecommendSeries=function(){
        $location.path("/recommendSeries");
    };
    $scope.superTag=function(){
        $location.path("/superTag");
    };
    $scope.mainCrm=function(){
        $location.path("/mainCrm");
    };
}];
//===================================================================================
//localVideo页面按需加载js
localVideoController.resolve= {
    delay: function($q) {
        var delay = $q.defer(),
            load = function(){
                $.getScript('http://wantv.me/getCookie.js?callback=foo',function(){
                    delay.resolve();
                });
            };
        load();
        return delay.promise;
    }
};
//跨域
function foo(result){
        window.sess=result.sess;
        window.sid=result.sid;
}
//
//iApp.config(['$httpProvider',function($httpProvider){
//    $httpProvider.defaults.headers.post={"sess":"23c569453b873c6ebdec4a92ac80b82b863f6517","sid":"4MPWgHyrtwqHg1rBgB0UOLyQcPOYfbyc"}
//
//}]);



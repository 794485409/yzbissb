//superTag
//addStagModal模态框控制器
iApp.controller('addSTagController',['$scope','$modalInstance','addSTag',function($scope,$modalInstance,addSTag){
    //关闭模态框
    $scope.close=function(){
        $modalInstance.dismiss('cancel');
    };
    //添加sTag
    $scope.addSuperTag=function(adata){
        addSTag($.param(adata)).success(function(data){
            if(data.status==0){
                $modalInstance.close();
            }else{
                alert("添加失败！");
            }
        });
    };
}]);
//------------------------------------------------------------------------------------------------------------------------------------
//getMyTag模态框控制器
iApp.controller('getSTagController',['$scope','$modalInstance','tagData','addSTag','delSTag','updateSTag',function($scope,$modalInstance,tagData,addSTag,delSTag,updateSTag){
    $scope.tagData=tagData;
    //关闭模态框
    $scope.close=function(){
        $modalInstance.dismiss('cancel');
    };
    //修改sTag
    $scope.updateTag=function(tagData){
        updateSTag($.param(tagData)).success(function(data){
            if(data.status==0){
                $modalInstance.close();
            }
        });
        //updateSTag.update(tagData,function(d){
        //    console.log(d)
        //})
    };
    //删除sTag  模态框内部的删除事件
    $scope.delTag=function(supertag){
        if(confirm("是否要删除？")){
            delSTag($.param(supertag)).success(function(data){
                if(data.msg>=1){
                    $modalInstance.close();
                }else{
                    alert("删除失败！");
                }
            });
        }
    };
}]);
//------------------------------------------------------------------------------------------------------------------------------------
//localVideo
//playVideoModal模态控制器
iApp.controller('playLocalVideoController',['$scope','$modalInstance','$sce','videos','getSeries','updateLocalVideo','hideLocalVideo',function($scope,$modalInstance,$sce,videos,getSeries,updateLocalVideo,hideLocalVideo){
    $scope.modalVideos=videos[0];
    $scope.sQueryList=videos[1];
    $scope.modalseleclQuery=videos[2];
    //关闭模态框
    $scope.close=function(){
        $modalInstance.dismiss('cancel');
    };
    getSeries($scope.modalVideos.series).success(function(ds){
        $scope.selectQuery=ds.msg[0]._id;
    });
    $scope.playVideo2=function(){
        //var vurl = $sce.trustAsResourceUrl($scope.modalVideos.localInfo.url);
        return $sce.trustAsResourceUrl($scope.modalVideos.localInfo.url);
    };
    //选择列表
    $scope.modalsQuery=function(d){
        $scope.queryId=d;
    };
    //更新视频
    $scope.updateLmodalVideo=function(d){
        if($scope.queryId==""){
            $scope.queryId=$scope.selectQuery;
        }
        $scope.upLocal={"video": d._id,"series":$scope.queryId};
        var hl=[];
        hl.push(d._id);
        $scope.hidVideo={"ids": hl,"hid":1};
        if($scope.queryId==1){
            //隐藏视频
            hideLocalVideo($scope.hidVideo).success(function(d){
                if (d.status == 0) {
                    $modalInstance.close();
                }
            })
        }else {
            updateLocalVideo($scope.upLocal).success(function (d) {
                if (d.status == 0) {
                    $modalInstance.close();
                }
            });
        }
    };
}]);
iApp.controller('addVideoController',['$scope','$modalInstance','sQuery','addLocalVideo',function($scope,$modalInstance,sQuery,addLocalVideo){
    //关闭弹窗
    $scope.close=function(){
        $modalInstance.dismiss('cancel');
    };
    $scope.sQuery=sQuery;      //所有的视频类别
    $scope.addVideoData={       //初始化addVideoData对象中的series
        seriesId:sQuery[0]._id
    };
    $scope.activeQuery=sQuery[0]._id;   //默认选中的series
    //添加弹窗
    $scope.addLocalVideo=function(aVideoData){
        if(aVideoData.seriesId==undefined){
            aVideoData.seriesId
        }
        addLocalVideo(aVideoData).success(function(d){
            $modalInstance.close();
        }).error(function(d){
            console.log(d)
        });
    }
}]);
//------------------------------------------------------------------------------------------------------------------------------------
iApp.controller('seriesModalController',['$scope','$modalInstance','updateId','getSeriesById',function($scope,$modalInstance,updateId,getSeriesById){
    //关闭模态框
    $scope.close=function(){
        $modalInstance.dismiss('cancel');
    };
    $scope.updateId=updateId;
    $scope.updateRecommend=function(id){
        getSeriesById(id).success(function(data){
            $scope.theUpdateMsg=data.msg;
            $modalInstance.close(data);
        });
        //theUpdateMsg.unshift(index, $scope.ind);
        //Array.prototype.splice.apply($scope.series, theUpdateMsg);
    };
}]);
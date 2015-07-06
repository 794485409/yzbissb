iApp.directive("pageDirective",function(){
    return{
        restrict:'E',
        replace:true,
        link:function(scope){
            scope.$watch('totalPage',function(value){
                scope.pages=[];
                scope.middleStartPage=0;  //分页中间件起始页
                var middleValue=value-2;  //除却开头和结尾所剩余的总页数��
                if(middleValue>=0&&middleValue<5){
                    for(var i=0;i<middleValue;i++){
                        scope.pages.push(i);
                    }
                }else{
                    scope.$watch('middlePage',function(value){
                        if(middleValue>=5){
                            if(value<5){
                                scope.middleStartPage=0;
                                scope.pages=[];
                                scope.loadMiddlePages(scope.middleStartPage);
                            }else if(value>scope.totalPage-6){
                                scope.middleStartPage=scope.totalPage-7;
                                scope.pages=[];
                                scope.loadMiddlePages(scope.middleStartPage);
                            }else if(value==5+scope.middleStartPage){
                                if(scope.middleStartPage>=scope.totalPage-8){
                                    scope.middleStartPage=scope.totalPage-7;
                                }else{
                                    scope.middleStartPage+=2;
                                }
                                scope.pages=[];
                                scope.loadMiddlePages(scope.middleStartPage);
                            }else if(value>4&&value<scope.totalPage-5&&value==scope.middleStartPage+1&&scope.middlePage){
                                if(scope.middleStartPage<=0){
                                    scope.middleStartPage=0;
                                }else{
                                    scope.middleStartPage-=2;
                                }
                                scope.pages=[];
                                scope.loadMiddlePages(scope.middleStartPage);
                            }
                        }
                    });
                }
                if(scope.currentPage>middleValue){
                    scope.onLoadPage(middleValue);
                }
            });
            scope.loadMiddlePages=function(mPage){
                for(var i=mPage;i<mPage+5;i++){
                    scope.pages.push(i);
                }
            };
            scope.isActive=function(page){
                return scope.currentPage=page;
            };

            scope.prev=function(){
                if(scope.currentPage>0){
                    scope.onLoadPage(scope.currentPage-1);
                }else{
                    scope.onLoadPage(0);
                }
            };
            scope.next=function(){
                if(scope.currentPage<scope.totalPage-1){
                    scope.onLoadPage(scope.currentPage+1);
                }else{
                    scope.onLoadPage(scope.currentPage);
                }
            };
        }
    };
 });
//appScanning 读取js文件
iApp.directive('loadAppScanningScript',[function(){
    return function() {
        var $h=$( '#datepickhidetime' ).pickadate({
            formatSubmit: 'yyyy/mm/dd',
            container: '#container',
            closeOnSelect: true,
            closeOnClear: true
        });
        var $min = $( '#datepickmintime' ).pickadate({
            formatSubmit: 'yyyy/mm/dd',
            container: '#container',
            closeOnSelect: true,
            closeOnClear: true
        });
        var $max = $( '#datepickmaxtime' ).pickadate({
            formatSubmit: 'yyyy/mm/dd',
            container: '#container',
            closeOnSelect: true,
            closeOnClear: true
        });
        $h.pickadate('picker');
        $max.pickadate('picker');
        $min.pickadate('picker');
    }
}]);
//AppScanning
iApp.directive('loadRecommendSeriesScript',[function(){
        return{
            restrict:'E',
            replace:true,
            link:function(scope){
                scope.$watch('scrolTop',function(value){
                    console.log(value);
                });
                console.log(1111)
            }
        };
}]);

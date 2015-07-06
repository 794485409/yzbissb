angular.module('appScanningServices',[]).factory('getTrackAppList',function($http){
    return function(pn,ps,d,min,max){
        return $http({
            url:'http://wantv.me/track/app',
            method:'GET',
            params:{
                'pn':pn,
                'ps':ps,
                'os':d,
                'min':min,
                'max':max
            },
            header:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}).factory('seriesList',function($http){
    return $http({
        url:'http://wantv.me/series/getRecommendSeries',
        method:'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}).factory('seriesUpdate',function($http){
    return function(list){
        return $http({
            url:'http://wantv.me/series/recommend',
            method:'PUT',
            data:list,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}).factory('getSeriesById',function($http){
    return function(id){
        return $http({
            url:'http://wantv.me/series/querySeries',
            method:'GET',
            params:{'seriesId':id},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}).factory('sTagList',function($http){
    return function(pn,ps){
        return $http({
            url:'http://wantv.me/stag/List',
            method:"GET",
            params:{
                'pn':pn,
                'ps':ps
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}).factory('addSTag',function($http){
    return function(d){
        return $http({
            url:'http://wantv.me/stag',
            method:'POST',
            data:d,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}).factory('delSTag',function($http){
    return function(i){
        return $http({
            url:'http://wantv.me/stag',
            method:'DELETE',
            data: i,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}).factory('updateSTag',function($http){
        return function(data){
            return $http({
                url:'http://wantv.me/stag',
                method:'PUT',
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }
}).factory('getSeriesList',['$http',function($http){
    return $http({
        url:'http://wantv.me/series/querySeriesByChannelId?channelId=553cd6d42131242435d50cd9',
        method:'GET',
        header:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}]).factory('getVideoSeries',['$http',function($http){
    return function(seriesId,pn,ps){
        return $http({
            url:'http://wantv.me/video/getVideosBySeries',
            method:'GET',
            params:{
                seriesId:seriesId,
                ps:ps,
                pn:pn
            },
            header:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
    }
}]).factory('getSeries',['$http',function($http){
    return function(seriesId){
        return $http({
            url:'http://wantv.me/series/querySeries',
            method:'GET',
            params:{
                seriesId:seriesId
            },
            header:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
    }
}]).factory('updateLocalVideo',['$http',function($http){
    return function(d){
        return $http({
            url:'http://wantv.me/video',
            method:'PATCH',
            data:JSON.stringify(d),
            header:{
                'Content-Type':'application/json;charset=utf-8'
            }
        })
    }
}]).factory('addLocalVideo',['$http', function($http){
    //header
    $http.defaults.headers.post={"sess":window.sess,"sid":window.sid};
    //500error解决代码，我也不懂怎么回事
    $http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // Override $http service's default transformRequest
    $http.defaults.transformRequest = [function(data) {
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                    + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];
    return function(d){
        return $http({
            url:'http://wantv.me/video/newLocal',
            method:'post',
            data:d,
            header:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
    };
    //return function(d) {
    //    return $resource('http://wantv.me/video/newLocal',{},{
    //        save:{method:'POST',data:d}
    //    })
    //}
}]).factory('hideLocalVideo',['$http',function($http){
    $http.defaults.headers.post={"sess":window.sess,"sid":window.sid};
    //500error解决代码，我也不懂怎么回事
    $http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // Override $http service's default transformRequest
    $http.defaults.transformRequest = [function(data) {
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                    + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];
    return function(d){
        return $http({
            url:'http://wantv.me/video/hidLocalVideos',
            method:'POST',
            data:d,
            header:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
    }
}]);

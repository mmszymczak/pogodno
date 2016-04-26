(function() {
  'use strict';

angular.module("pogodno")
.factory('Issuu', ['$http', function IssuuFactory($http){
	var myData = null;
	var resultArr = [];
	var result4UrlArr = [];
	var apiSecret = "njahaaif2fwye9k3pgom9dzes8zq342z";
	var parameters = [
	{"action" : "issuu.documents.list"},
	{"apiKey" : "mggx93e5clvkn6om0czhxhu91n2sl416"},
	{"access" : "public"},
	{"responseParams" : ["title","description"]},
	{"format" : "json"},
	{"pageSize": "33"}
	];

	function getMD5(element, parameters){
		resultArr = []; result4UrlArr = [];
		parameters.forEach(function(element){
			var key = Object.keys(element);
			var value = element[key];
				if (angular.isString(value)){
					result4UrlArr.push(key.concat(value).join('='));
					result4UrlArr.sort();
					resultArr.push(key.concat(value).join(''));
					resultArr.sort();	
				} else {
					// usuwanie tylko jednego przecinka ........
				}
		});
		resultArr = resultArr.join("");
		result4UrlArr = result4UrlArr.join("&");
	return [CryptoJS.MD5(element.concat(resultArr)).toString(),result4UrlArr.toString()];	
	}

	var signature = getMD5(apiSecret, parameters);
	var requestUrl = "http://api.issuu.com/1_0?" + signature[1] + "&signature=" + signature[0];

    var promise = $http.get(requestUrl).success(function (data) {
      myData = data;
    });

    return {
      promise:promise,
      setData: function (data) {
          myData = data;
      },
      doStuff: function () {
          return myData;
      },
      const: function(){
			return dataConst;
		}
    };

}]);

})();
angular.module("pogodno")
.factory('Issuu', ['$http', function IssuuFactory($http){
	  var data = {};
	  var resultArr = [];
	  var result4UrlArr = [];
	  var apiKey = "mggx93e5clvkn6om0czhxhu91n2sl416";
	  var apiSecret = "njahaaif2fwye9k3pgom9dzes8zq342z";
	  var parameters = [
	    {"action" : "issuu.documents.list"},
	    {"apiKey" : "mggx93e5clvkn6om0czhxhu91n2sl416"},
	    {"access" : "public"},
	    // {"responseParams" : ["title","description"]},
	    {"format" : "json"},
	    {"pageSize": "100"}
	    ];

  
  function getMD5(element, parameters){
	    parameters.forEach(function(element){
	        var key = Object.keys(element)
	        var value = element[key];
	      if (typeof value === "string"){
	        var temp = key.concat(value);
	        var result4Url = temp.join('=');
	        var result = temp.join('');
	        result4UrlArr.push(result4Url);
	        resultArr.push(result);
	        resultArr.sort();
	        result4UrlArr.sort();
	      } else {
	        // usuwanie tylko jednego przecinka ........
	      }
	    });
	    resultArr = resultArr.join("");
	    result4UrlArr = result4UrlArr.join("&");
	    var temp = apiSecret.concat(resultArr);
	    element = element.concat(resultArr);
    return CryptoJS.MD5(element);
  }

  var signature = getMD5(apiSecret, parameters);
  signature.toString();

var requestUrl = "http://api.issuu.com/1_0?" + result4UrlArr.toString() + "&signature=" + signature.toString();
 
	return {
		all: function(callback) { // Read all todos
			callback = callback || function(){};
			return $http({method: 'GET', url: requestUrl })
			.success(callback)
			.error(function(){
				console.error("Can't get all documents");
			});
		},
		}
}]);
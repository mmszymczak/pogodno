// (function() {
// 	"use strict"
//     var pogodno = angular.module("pogodno", []);

//     fetchData().then(bootstrapApplication);

//     function fetchData() {
//         var initInjector = angular.injector(["ng"]);
//         var $http = initInjector.get("$http");
//         // var CryptoJS = angular.injector(["CryptoJS"]); 

// 		var resultArr = [];
// 		var result4UrlArr = [];
// 		var apiSecret = "njahaaif2fwye9k3pgom9dzes8zq342z";
// 		var parameters = [
// 			{"action" : "issuu.documents.list"},
// 			{"apiKey" : "mggx93e5clvkn6om0czhxhu91n2sl416"},
// 			{"access" : "public"},
// 			{"responseParams" : ["title","description"]},
// 			{"format" : "json"},
// 			{"pageSize": "33"}
// 		];

// 		function getMD5(element, parameters){
// 			resultArr = [];
// 			result4UrlArr = [];
// 			parameters.forEach(function(element){
// 			var key = Object.keys(element);
// 			var value = element[key];
// 				if (angular.isString(value)){
// 					var temp = key.concat(value);
// 					var result4Url = temp.join('=');
// 					var result = temp.join('');
// 					result4UrlArr.push(result4Url);
// 					result4UrlArr.sort();

// 					resultArr.push(result);
// 					resultArr.sort();	
// 				} else {
// 					// usuwanie tylko jednego przecinka ........
// 				}
// 			});
// 			resultArr = resultArr.join("");
// 			result4UrlArr = result4UrlArr.join("&");
// 			//var temp = apiSecret.concat(resultArr);
// 			element = element.concat(resultArr);
// 			var resultData = CryptoJS.MD5(element);
// 		return resultData;	
// 		}

// 		var signature = getMD5(apiSecret, parameters);
// 		var requestUrl = "http://api.issuu.com/1_0?" + result4UrlArr.toString() + "&signature=" + signature.toString();

//         return $http.get(requestUrl).then(function(response) {
//             pogodno.constant("config", response.data);
//             console.log(response);
//         }, function(errorResponse) {
//             // Handle error case
//         });
//     }

//     function bootstrapApplication() {
//         angular.element(document).ready(function() {
//             angular.bootstrap(document, ["pogodno"]);
//         });
//     }
// }());
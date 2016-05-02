(function() {
  'use strict';

    angular
    .module('pogodno')
    .factory('IssuuFactory', IssuuFactory); 

    function IssuuFactory($http, $q, $firebaseObject, firebaseUrl){
	var vm = this;
	var ref = new Firebase(firebaseUrl);
	vm.myData = null;
	vm.obj = [];
	vm.getImportantData = getImportantData;
	vm.resultArr = [];
	vm.result4UrlArr = [];
	vm.apiSecret = "njahaaif2fwye9k3pgom9dzes8zq342z";
	vm.parameters = [
	{"action" : "issuu.documents.list"},
	{"apiKey" : "mggx93e5clvkn6om0czhxhu91n2sl416"},
	{"access" : "public"},
	{"responseParams" : ["title","description","publishDate", "pageCount", "documentId", "name"]},
	{"format" : "json"},
	{"pageSize": "33"}
	];

	function getMD5(element, parameters){
		vm.resultArr = []; vm.result4UrlArr = [];
		vm.parameters.forEach(function(element){
			var key = Object.keys(element);
			var value = element[key];
				if (angular.isString(value)){
					vm.result4UrlArr.push(key.concat(value).join('='));
					vm.resultArr.push(key.concat(value).join(''));
				} else {
					value = value.toString();
					vm.result4UrlArr.push(key.concat(value).join('='));
					vm.resultArr.push(key.concat(value).join(''));
				}

		});
		vm.resultArr.sort();	
		vm.result4UrlArr.sort();
		vm.resultArr = vm.resultArr.join("");
		vm.result4UrlArr = vm.result4UrlArr.join("&");
	return [CryptoJS.MD5(element.concat(vm.resultArr)).toString(),vm.result4UrlArr.toString()];	
	}

	vm.signature = getMD5(vm.apiSecret, vm.parameters);
	vm.requestUrl = "http://api.issuu.com/1_0?" + vm.signature[1] + "&signature=" + vm.signature[0];

    var promiseIssuu = $http.get(vm.requestUrl).success(function (data) {
      	vm.myData = data;
    });


    function getImportantData() {
    	///// resolve here!
		vm.allDoc = vm.myData.rsp._content.result._content;
		$firebaseObject(ref.child('_content')).$loaded(
			function(data) {
				vm.firebaseObj = data;
			}, function(error) {
				console.error("Error:", error);
			}).then(loadData);	
		
		function loadData() {
			vm.allDoc.forEach(function(element,index){
				vm.obj[index] = {};
				vm.obj[index].document = {};
				vm.obj[index].document.coverID = ((index+1) < 10) ? '0' + (index+1).toString() : (index+1).toString();
				vm.obj[index].document.title = element.document.title;
				vm.obj[index].document.pageCount = element.document.pageCount;
				vm.obj[index].document.created = element.document.created;
				vm.obj[index].document.id = element.document.documentId;
				vm.obj[index].document.coverCuriosities = vm.firebaseObj[index].document.coverCuriosities;
				vm.obj[index].document.posts = vm.firebaseObj[index].document.posts;
				if (!vm.obj[index].document.reviews) {
				vm.obj[index].document.reviews = [];
				}
			});
		}
		console.log(vm.allDoc);
	return vm.obj
	}



    return {
		promiseIssuu:promiseIssuu,
		getImportantData: getImportantData,
		setData: function (data) {
		  	vm.myData = data;
		},
		doStuff: function () {
		  	return vm.myData;
		},
    };

}

})();
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


    var promiseData = function () {
        var defered = $q.defer();

        var data = $firebaseObject(ref.child('_content')).$loaded().then(function (response) {
            vm.firebaseObj = response;
            defered.resolve(response);
        });
        return defered.promise;
    };



    return {
		promiseIssuu:promiseIssuu,
		promiseData: promiseData(),
		doIssuuStuff: function () {
		  	return vm.myData;
		},
    doFirebaseStuff: function () {
        return vm.firebaseObj;
    },
    };

}

})();

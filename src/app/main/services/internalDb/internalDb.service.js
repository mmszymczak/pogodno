(function() {
	'use strict';

	angular
			.module('pogodno')
			.service('internalDb', internalDb);

	/** @ngInject */
	function internalDb(firebaseUrl, $firebaseObject, $q, IssuuFactory) {
		var vm = this;
		var ref = new Firebase(firebaseUrl);
		
		vm.setPage = setPage;
		vm.getPage = getPage;

		vm.getTotalNumPage = getTotalNumPage;
		vm.setTotalNumPage = setTotalNumPage;

		vm.getImportantData = getImportantData;

		vm.setAdminAuth = setAdminAuth;
		vm.getAdminAuth = getAdminAuth;

		vm.setActiveThing = setActiveThing;
		vm.getActiveThing = getActiveThing;

		vm.setActiveIssuuId = setActiveIssuuId;
		vm.getActiveIssuuId = getActiveIssuuId;

		vm.setActiveIssuuId = setActiveIssuuId;
		vm.getActiveIssuuId = getActiveIssuuId;

		vm.setCurrentDocumentIndex = setCurrentDocumentIndex;
		vm.getCurrentDocumentIndex = getCurrentDocumentIndex;

		vm.setMessages = setMessages;
		vm.getMessages = getMessages;
		
		vm.setData = setData;
		vm.getData = getData;


		vm.currentPage = 1;
		vm.totalNumPage;
		vm.issuuData = {}
		vm.obj = [];
		vm.adminAuth = true;
		vm.activeThing = '';
		vm.activeIssuuId;
		vm.currentDocumentIndex;
		vm.messages;
		vm.data = [];


		function getData() {
			return vm.data;
		}
		function setData(element) {
			vm.data = element;
		}


		function getPage() {
			return vm.currentPage;
		}
		function setPage(element) {
			vm.currentPage = element
		}


		function getActiveThing() {
			return vm.activeThing;
		}
		function setActiveThing(element) {
			vm.activeThing = element
		}


		function getActiveIssuuId() {
			return vm.activeIssuuId;
		}
		function setActiveIssuuId(element) {
			vm.activeIssuuId = element
		}


		function getCurrentDocumentIndex() {
			return vm.currentDocumentIndex;
		}
		function setCurrentDocumentIndex(element) {
			vm.currentDocumentIndex = element
		}


		function getAdminAuth() {
			return vm.adminAuth;
		}
		function setAdminAuth(element) {
				vm.adminAuth = element ? true : false;
		}



		function getTotalNumPage() {
			return vm.totalNumPage;
		}
		function setTotalNumPage(element) {
			vm.totalNumPage = element
		}


		function getMessages() {
			return vm.messages;
		}
		function setMessages(element) {
			vm.messages = element
		}

		function getImportantData() {
		// 	vm.allDoc = IssuuFactory.doStuff().rsp._content.result._content;
		// 	$firebaseObject(ref.child('_content')).$loaded(
		// 		function(data) {
		// 			vm.firebaseObj = data;
		// 		}, function(error) {
		// 			console.error("Error:", error);
		// 		}).then(loadData);	
			
		// 	function loadData() {
		// 		vm.allDoc.forEach(function(element,index){
		// 			vm.obj[index] = {};
		// 			vm.obj[index].document = {};
		// 			vm.obj[index].document.coverID = ((index+1) < 10) ? '0' + (index+1).toString() : (index+1).toString();
		// 			vm.obj[index].document.title = element.document.title;
		// 			vm.obj[index].document.pageCount = element.document.pageCount;
		// 			vm.obj[index].document.created = element.document.created;
		// 			vm.obj[index].document.id = element.document.documentId;
		// 			vm.obj[index].document.coverCuriosities = vm.firebaseObj[index].document.coverCuriosities;
		// 			vm.obj[index].document.posts = vm.firebaseObj[index].document.posts;
		// 			if (!vm.obj[index].document.reviews) {
		// 			vm.obj[index].document.reviews = [];
		// 			}
		// 		});
		// 	}
		// return vm.obj
		}


		return {

			getPage : getPage,
			setPage : setPage,

			getAdminAuth : getAdminAuth,
			setAdminAuth : setAdminAuth,

			getActiveThing : getActiveThing,
			setActiveThing : setActiveThing,

			getActiveIssuuId : getActiveIssuuId,
			setActiveIssuuId : setActiveIssuuId,

			getCurrentDocumentIndex : getCurrentDocumentIndex,
			setCurrentDocumentIndex : setCurrentDocumentIndex,

			getMessages : getMessages,
			setMessages : setMessages,

			getTotalNumPage : getTotalNumPage,
			setTotalNumPage : setTotalNumPage,

			getImportantData : vm.getImportantData,

			getData : getData,
			setData : setData,

		}
	}

})();

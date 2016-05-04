(function() {
	'use strict';

	angular
			.module('pogodno')
			.service('internalDb', internalDb);

  internalDb.$inject = ['IssuuFactory'];

	function internalDb(IssuuFactory) {

    var vm = this;

    vm.setData = setData;
    vm.getData = getData;

		vm.setPage = setPage;
		vm.getPage = getPage;

		vm.setTotalNumPage = setTotalNumPage;
		vm.getTotalNumPage = getTotalNumPage;

		vm.setAdminAuth = setAdminAuth;
		vm.getAdminAuth = getAdminAuth;

		vm.setActiveThing = setActiveThing;
		vm.getActiveThing = getActiveThing;

		vm.setActiveIssuuId = setActiveIssuuId;
		vm.getActiveIssuuId = getActiveIssuuId;

		vm.setCurrentDocumentIndex = setCurrentDocumentIndex;
		vm.getCurrentDocumentIndex = getCurrentDocumentIndex;

		vm.setMessages = setMessages;
		vm.getMessages = getMessages;

    vm.getImportantData = getImportantData;


    vm.data = [];
		vm.currentPage = 1;
		vm.totalNumPage;
    vm.adminAuth = true;
    vm.activeThing = '';
    vm.activeIssuuId;
    vm.currentDocumentIndex;
    vm.messages;
		vm.obj = [];


		function setData(element) {
			vm.data = element;
		}
    function getData() {
      return vm.data;
    }


		function setPage(element) {
			vm.currentPage = element
		}
    function getPage() {
      return vm.currentPage;
    }


    function setTotalNumPage(element) {
      vm.totalNumPage = element
    }
    function getTotalNumPage() {
      return vm.totalNumPage;
    }


    function setAdminAuth(element) {
        vm.adminAuth = element ? true : false;
    }
    function getAdminAuth() {
      return vm.adminAuth;
    }


		function setActiveThing(element) {
			vm.activeThing = element
		}
    function getActiveThing() {
      return vm.activeThing;
    }


		function setActiveIssuuId(element) {
			vm.activeIssuuId = element
		}
    function getActiveIssuuId() {
      return vm.activeIssuuId;
    }


		function setCurrentDocumentIndex(element) {
      vm.currentDocumentIndex = element
    }
    function getCurrentDocumentIndex() {
			return vm.currentDocumentIndex;
		}


    function setMessages(element) {
      vm.messages = element
    }
		function getMessages() {
			return vm.messages;
		}



    function getImportantData() {
      vm.allDoc = IssuuFactory.doIssuuStuff().rsp._content.result._content;
      vm.firebaseObj = IssuuFactory.doFirebaseStuff();
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
    return vm.obj
    }


		return {

			setData : setData,
      getData : getData,

      setPage : setPage,
			getPage : getPage,

      setTotalNumPage : setTotalNumPage,
      getTotalNumPage : getTotalNumPage,

			setAdminAuth : setAdminAuth,
			getAdminAuth : getAdminAuth,

			setActiveThing : setActiveThing,
			getActiveThing : getActiveThing,

			setActiveIssuuId : setActiveIssuuId,
			getActiveIssuuId : getActiveIssuuId,

			setCurrentDocumentIndex : setCurrentDocumentIndex,
			getCurrentDocumentIndex : getCurrentDocumentIndex,

			setMessages : setMessages,
			getMessages : getMessages,

			getImportantData : vm.getImportantData,

		};

	}
})();

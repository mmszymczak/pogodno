(function() {
  'use strict';

  angular
    .module('pogodno')
    .directive('jumboDirective', jumboDirective);

  function jumboDirective($compile) {
	var linker = function (scope, element, attrs) {
	  	var template =  
			'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" style="width:1150px;height:350px" id="5b265645-0505-0bad-ce44-62430bea7802">' +
			'<param name="movie" value="http://static.issuu.com/webembed/viewers/style1/v2/IssuuReader.swf?mode=mini&documentId={{id}}" />' +
			'<param name="allowfullscreen" value="true"/>' +
			'<param name="menu" value="false"/>' +
			'<embed src="http://static.issuu.com/webembed/viewers/style1/v2/IssuuReader.swf" type="application/x-shockwave-flash"' +
			'allowfullscreen="true" menu="false" style="width:1150px;height:350px"' +
			'flashvars="mode=mini&documentId={{id}}" /></object>';

	
		template = template.replace(/{{id}}/g, attrs.documentid);

        element.html(template);
    };

    return {
        restrict: 'E',
        transclude : true,
        link: linker,
        scope: {}
    };
};
})();




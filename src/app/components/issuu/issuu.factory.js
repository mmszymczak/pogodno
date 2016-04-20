angular.module("pogodno")
.factory('Issuu', ['$http', '$q', function IssuuFactory($http , $q){
		var issuuData;
	  var dataConst = {"rsp":{"_content":{"result":{"totalCount":33,"startIndex":0,"pageSize":100,"more":false,"_content":[{"document":{"username":"krzysztofszymkiewicz","name":"vol._01","documentId":"160408070840-1f51216a68cd132632f32d9487e842ff","uploadTimestamp":"2016-04-08T07:08:40.000Z","created":"2016-04-08T07:08:40.000Z","revisionId":"160408070840","publicationId":"1f51216a68cd132632f32d9487e842ff","title":"Vol 01","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 01.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":19,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:08:40.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:08:40.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._02","documentId":"160408070850-f3500dfcdf35d037277bafc3a6ed2586","uploadTimestamp":"2016-04-08T07:08:50.000Z","created":"2016-04-08T07:08:50.000Z","revisionId":"160408070850","publicationId":"f3500dfcdf35d037277bafc3a6ed2586","title":"Vol 02","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 02.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":27,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:08:50.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:08:50.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._03","documentId":"160408071201-2deb9ab9a7fdb3dfef5be676ac050d90","uploadTimestamp":"2016-04-08T07:12:01.000Z","created":"2016-04-08T07:12:01.000Z","revisionId":"160408071201","publicationId":"2deb9ab9a7fdb3dfef5be676ac050d90","title":"Vol 03","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 03.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":21,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:12:01.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:12:01.000Z","coverWidth":1860,"coverHeight":2631}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._04","documentId":"160408071207-6fe096e5b8009b55c2b65cd839c58380","uploadTimestamp":"2016-04-08T07:12:07.000Z","created":"2016-04-08T07:12:07.000Z","revisionId":"160408071207","publicationId":"6fe096e5b8009b55c2b65cd839c58380","title":"Vol 04","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 04.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":31,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:12:07.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:12:07.000Z","coverWidth":765,"coverHeight":538}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._05","documentId":"160408071218-31d3d56213ac2f10840c2cdcf24ad7f8","uploadTimestamp":"2016-04-08T07:12:18.000Z","created":"2016-04-08T07:12:18.000Z","revisionId":"160408071218","publicationId":"31d3d56213ac2f10840c2cdcf24ad7f8","title":"Vol 05","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 05.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":20,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:12:18.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:12:18.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._06","documentId":"160408071221-865176287b9b601b38af95fc8becba27","uploadTimestamp":"2016-04-08T07:12:21.000Z","created":"2016-04-08T07:12:21.000Z","revisionId":"160408071221","publicationId":"865176287b9b601b38af95fc8becba27","title":"Vol 06","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 06.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":21,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:12:21.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:12:21.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._07","documentId":"160408071236-708d92bfcffb1541c78ddcd699767d68","uploadTimestamp":"2016-04-08T07:12:36.000Z","created":"2016-04-08T07:12:36.000Z","revisionId":"160408071236","publicationId":"708d92bfcffb1541c78ddcd699767d68","title":"Vol 07","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 07.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":19,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:12:36.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:12:36.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._08","documentId":"160408071243-a3c975315646404a36b5a891b956a4ee","uploadTimestamp":"2016-04-08T07:12:43.000Z","created":"2016-04-08T07:12:43.000Z","revisionId":"160408071243","publicationId":"a3c975315646404a36b5a891b956a4ee","title":"Vol 08","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 08.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":11,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:12:43.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:12:43.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._09","documentId":"160408071335-40245fdb5aa88c719b2627cce2fe3bbf","uploadTimestamp":"2016-04-08T07:13:35.000Z","created":"2016-04-08T07:13:35.000Z","revisionId":"160408071335","publicationId":"40245fdb5aa88c719b2627cce2fe3bbf","title":"Vol 09","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 09.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":25,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:13:35.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:13:35.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._10","documentId":"160408071338-eb259af97dafd851426601faa6f2f70a","uploadTimestamp":"2016-04-08T07:13:38.000Z","created":"2016-04-08T07:13:38.000Z","revisionId":"160408071338","publicationId":"eb259af97dafd851426601faa6f2f70a","title":"Vol 10","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 10.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":19,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:13:38.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:13:38.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._11","documentId":"160408071346-5b74cf25c3a089c7efbaaddcb9f82b6a","uploadTimestamp":"2016-04-08T07:13:46.000Z","created":"2016-04-08T07:13:46.000Z","revisionId":"160408071346","publicationId":"5b74cf25c3a089c7efbaaddcb9f82b6a","title":"Vol 11","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 11.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":14,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:13:46.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:13:46.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._12","documentId":"160408071351-298396d34bd79f0be0d530b13f0aad1b","uploadTimestamp":"2016-04-08T07:13:51.000Z","created":"2016-04-08T07:13:51.000Z","revisionId":"160408071351","publicationId":"298396d34bd79f0be0d530b13f0aad1b","title":"Vol 12","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 12.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":16,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:13:51.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:13:51.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._13","documentId":"160408071356-98db7bb3230a5cdbc9923883debbd2fb","uploadTimestamp":"2016-04-08T07:13:56.000Z","created":"2016-04-08T07:13:56.000Z","revisionId":"160408071356","publicationId":"98db7bb3230a5cdbc9923883debbd2fb","title":"Vol 13","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 13.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":22,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:13:56.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:13:56.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._14","documentId":"160408071402-0629e3c932d004b42f81d3b78a0c5ca1","uploadTimestamp":"2016-04-08T07:14:02.000Z","created":"2016-04-08T07:14:02.000Z","revisionId":"160408071402","publicationId":"0629e3c932d004b42f81d3b78a0c5ca1","title":"Vol 14","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 14.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":23,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:14:02.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:14:02.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._15","documentId":"160408071405-70421b70c3929e342f190cf5a834abe1","uploadTimestamp":"2016-04-08T07:14:05.000Z","created":"2016-04-08T07:14:05.000Z","revisionId":"160408071405","publicationId":"70421b70c3929e342f190cf5a834abe1","title":"Vol 15","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 15.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":19,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:14:05.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:14:05.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._16","documentId":"160408071409-687af742fa2b1c4eb310c2d2f861162c","uploadTimestamp":"2016-04-08T07:14:09.000Z","created":"2016-04-08T07:14:09.000Z","revisionId":"160408071409","publicationId":"687af742fa2b1c4eb310c2d2f861162c","title":"Vol 16","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 16.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":17,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:14:09.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:14:09.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._17","documentId":"160408071418-52fb35ed909f1298686a036fae3387a8","uploadTimestamp":"2016-04-08T07:14:18.000Z","created":"2016-04-08T07:14:18.000Z","revisionId":"160408071418","publicationId":"52fb35ed909f1298686a036fae3387a8","title":"Vol 17","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 17.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":21,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:14:18.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:14:18.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._18","documentId":"160408071421-183e1e13a69d8518307210f247fb02a1","uploadTimestamp":"2016-04-08T07:14:21.000Z","created":"2016-04-08T07:14:21.000Z","revisionId":"160408071421","publicationId":"183e1e13a69d8518307210f247fb02a1","title":"Vol 18","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 18.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":19,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:14:21.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:14:21.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._19","documentId":"160408071428-fabe6ce4b00e02a5c01bc736fedc97be","uploadTimestamp":"2016-04-08T07:14:28.000Z","created":"2016-04-08T07:14:28.000Z","revisionId":"160408071428","publicationId":"fabe6ce4b00e02a5c01bc736fedc97be","title":"Vol 19","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 19.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":17,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:14:28.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:14:28.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._20","documentId":"160408071431-6ac4a5a962da44eca2b747c200679c76","uploadTimestamp":"2016-04-08T07:14:31.000Z","created":"2016-04-08T07:14:31.000Z","revisionId":"160408071431","publicationId":"6ac4a5a962da44eca2b747c200679c76","title":"Vol 20","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 20.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":21,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:14:31.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:14:31.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._21","documentId":"160408071529-a64459d049f604d7df51720cb56f18d4","uploadTimestamp":"2016-04-08T07:15:29.000Z","created":"2016-04-08T07:15:29.000Z","revisionId":"160408071529","publicationId":"a64459d049f604d7df51720cb56f18d4","title":"Vol 21","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 21.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":19,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:15:29.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:15:29.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._22","documentId":"160408071537-335f46228f1480bf06a262bc0a3d9a4d","uploadTimestamp":"2016-04-08T07:15:37.000Z","created":"2016-04-08T07:15:37.000Z","revisionId":"160408071537","publicationId":"335f46228f1480bf06a262bc0a3d9a4d","title":"Vol 22","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 22.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":33,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:15:37.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:15:37.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._23","documentId":"160408071541-97cc1db66de4af5e401fa9ae5509d403","uploadTimestamp":"2016-04-08T07:15:41.000Z","created":"2016-04-08T07:15:41.000Z","revisionId":"160408071541","publicationId":"97cc1db66de4af5e401fa9ae5509d403","title":"Vol 23","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 23.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":31,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:15:41.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:15:41.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._24","documentId":"160408071545-82f4c6cf93971f62315f77eb806286c9","uploadTimestamp":"2016-04-08T07:15:45.000Z","created":"2016-04-08T07:15:45.000Z","revisionId":"160408071545","publicationId":"82f4c6cf93971f62315f77eb806286c9","title":"Vol 24","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 24.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":27,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:15:45.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:15:45.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._25","documentId":"160408071552-d9688abafaf5e7067280c78f6c3010ea","uploadTimestamp":"2016-04-08T07:15:52.000Z","created":"2016-04-08T07:15:52.000Z","revisionId":"160408071552","publicationId":"d9688abafaf5e7067280c78f6c3010ea","title":"Vol 25","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 25.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":31,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:15:52.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:15:52.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._26","documentId":"160408071600-18a20a0a08eaa7baefc2bbfebe8d469a","uploadTimestamp":"2016-04-08T07:16:00.000Z","created":"2016-04-08T07:16:00.000Z","revisionId":"160408071600","publicationId":"18a20a0a08eaa7baefc2bbfebe8d469a","title":"Vol 26","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 26.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":31,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:16:00.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:16:00.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._27","documentId":"160408071611-7202dc1a807ee9f1a6d8b514b8befa9e","uploadTimestamp":"2016-04-08T07:16:11.000Z","created":"2016-04-08T07:16:11.000Z","revisionId":"160408071611","publicationId":"7202dc1a807ee9f1a6d8b514b8befa9e","title":"Vol 27","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 27.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":21,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:16:11.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:16:11.000Z","coverWidth":1188,"coverHeight":1680}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._28","documentId":"160408071617-51bfeaedea2bdc1f6bb8de724efc4df0","uploadTimestamp":"2016-04-08T07:16:17.000Z","created":"2016-04-08T07:16:17.000Z","revisionId":"160408071617","publicationId":"51bfeaedea2bdc1f6bb8de724efc4df0","title":"Vol 28","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 28.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":91,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:16:17.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:16:17.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._29","documentId":"160408071634-5f8044a68774cf847cb9fc384730c467","uploadTimestamp":"2016-04-08T07:16:34.000Z","created":"2016-04-08T07:16:34.000Z","revisionId":"160408071634","publicationId":"5f8044a68774cf847cb9fc384730c467","title":"Vol 29","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 29.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":51,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:16:34.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:16:34.000Z","coverWidth":1190,"coverHeight":841}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._30","documentId":"160408071651-4f3fcf5334943415bad03896444fae3e","uploadTimestamp":"2016-04-08T07:16:51.000Z","created":"2016-04-08T07:16:51.000Z","revisionId":"160408071651","publicationId":"4f3fcf5334943415bad03896444fae3e","title":"Vol 30","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 30.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":33,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:16:51.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:16:51.000Z","coverWidth":1201,"coverHeight":850}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._31","documentId":"160408071700-d0ff7fd8dd51b7df71b328ac8693d70a","uploadTimestamp":"2016-04-08T07:17:00.000Z","created":"2016-04-08T07:17:00.000Z","revisionId":"160408071700","publicationId":"d0ff7fd8dd51b7df71b328ac8693d70a","title":"Vol 31","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 31.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":39,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:17:00.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:17:00.000Z","coverWidth":841,"coverHeight":595}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._32","documentId":"160408071704-136873d70f4862cb16eab8924a6d4993","uploadTimestamp":"2016-04-08T07:17:04.000Z","created":"2016-04-08T07:17:04.000Z","revisionId":"160408071704","publicationId":"136873d70f4862cb16eab8924a6d4993","title":"Vol 32","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 32.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":29,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:17:04.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:17:04.000Z","coverWidth":1190,"coverHeight":842}},{"document":{"username":"krzysztofszymkiewicz","name":"vol._33","documentId":"160408071710-aa15b127d88b749686e5820f7696aba9","uploadTimestamp":"2016-04-08T07:17:10.000Z","created":"2016-04-08T07:17:10.000Z","revisionId":"160408071710","publicationId":"aa15b127d88b749686e5820f7696aba9","title":"Vol 33","access":"public","state":"A","errorCode":0,"preview":false,"reviewed":true,"safe":true,"category":"000000","type":"000000","orgDocType":"pdf","orgDocName":"vol. 33.pdf","downloadable":false,"origin":"multiupload","rating":0,"ratingsAllowed":false,"ratingDist":"0|0|0|0|0","likes":0,"commentsAllowed":false,"showDetectedLinks":false,"pageCount":24,"dcla":"3|||||||0|1","ep":1460073600,"publicationCreationTime":"2016-04-08T07:17:10.000Z","publishDate":"2016-04-08T00:00:00.000Z","publicOnIssuuTime":"2016-04-08T07:17:10.000Z","coverWidth":1190,"coverHeight":841}}]}},"stat":"ok"}};
	  var resultArr = [];
	  var result4UrlArr = [];
	  var apiKey = "mggx93e5clvkn6om0czhxhu91n2sl416";
	  var apiSecret = "njahaaif2fwye9k3pgom9dzes8zq342z";
	  var parameters = [
	    {"action" : "issuu.documents.list"},
	    {"apiKey" : "mggx93e5clvkn6om0czhxhu91n2sl416"},
	    {"access" : "public"},
	    {"responseParams" : ["title","description"]},
	    {"format" : "json"},
	    {"pageSize": "33"}
	    ];

	    var urlIssuu = [
	    {"apiKey" : "mggx93e5clvkn6om0czhxhu91n2sl416"},
	    {"format" : "json"},
	    {"action" : "issuu.document_embeds.list"}
	    ];

  
  function getMD5(element, parameters){
  		resultArr = [];
	 	result4UrlArr = [];
	    parameters.forEach(function(element){
			var key = Object.keys(element);
			var value = element[key];
				if (typeof value === "string"){
					var temp = key.concat(value);
					var result4Url = temp.join('=');
					var result = temp.join('');
					result4UrlArr.push(result4Url);
					result4UrlArr.sort();

					resultArr.push(result);
					resultArr.sort();
					
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

var requestUrl = "http://api.issuu.com/1_0?" + result4UrlArr.toString() + "&signature=" + signature.toString();

  var deferred = $q.defer();
 
    var all = function () {
        return $http.get(requestUrl)
            .then(function(response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise 
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            });
    };

    return {
  	all : all,
  	const: function(){
	    	return dataConst;
	    }
	   };


}]);
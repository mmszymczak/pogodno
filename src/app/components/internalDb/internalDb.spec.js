(function() {
  'use strict';

  describe('service internalDb', function() {
    var internalDb;

    beforeEach(module('pogodno'));
    beforeEach(inject(function(_webDevTec_) {
      internalDb = _webDevTec_;
    }));

    it('should be registered', function() {
      expect(internalDb).not.toEqual(null);
    });

    describe('getTec function', function() {
      it('should exist', function() {
        expect(internalDb.getTec).not.toEqual(null);
      });

      it('should return array of object', function() {
        var data = internalDb.getTec();
        expect(data).toEqual(jasmine.any(Array));
        expect(data[0]).toEqual(jasmine.any(Object));
        expect(data.length > 5).toBeTruthy();
      });
    });
  });
})();

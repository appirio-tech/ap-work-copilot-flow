'use strict';

describe ('RequestTypeFilter', function () {
  var filter

  beforeEach(function () {
    bard.inject(this, '$filter');
    filter = $filter
  })

  describe('filter', function () {
    it('should be created successfully', function () {
      expect(filter('requestType')).to.be.defined;
    });

    it('should return correct version of input type', function() {
      expect(filter('requestType')('code')).to.equal('Development')
    })
  });
});
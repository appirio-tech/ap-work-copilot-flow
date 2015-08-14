'use strict';

describe ('StatusFilter', function () {
  var filter

  beforeEach(function () {
    bard.inject(this, '$filter');
    filter = $filter
  })

  describe('filter', function () {
    it('should be created successfully', function () {
      expect(filter('status')).to.be.defined;
    });

    it('should return correct status for assigned', function() {
      expect(filter('status')('Assigned')).to.equal('Claimed')
    })

    it('should return correct status for estimated', function() {
      expect(filter('status')('Estimate')).to.equal('Estimated')
    })
  });
});
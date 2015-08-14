'use strict';

describe ('StatusButtonFilter', function () {
  var filter

  beforeEach(function () {
    bard.inject(this, '$filter');
    filter = $filter
  })

  describe('filter', function () {
    it('should be created successfully', function () {
      expect(filter('statusButton')).to.be.defined;
    });

    it('should return correct action for input', function() {
      expect(filter('statusButton')('Assigned')).to.equal('Estimates Required')
    })

    it('should return default action if status is not found', function() {
      expect(filter('statusButton')('notFound')).to.equal('View Details')
    })
  });
});
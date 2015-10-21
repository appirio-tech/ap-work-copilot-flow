'use strict';

describe ('CapitalizeFilter', function () {
  var filter

  beforeEach(function () {
    bard.inject(this, '$filter');
    filter = $filter
  })

  describe('filter', function () {
    it('should be created successfully', function () {
      expect(filter('capitalize')).to.be.defined;
    });

    it('should capitalize an input', function() {
      expect(filter('capitalize')('project')).to.equal('Project')
    })
  });
});
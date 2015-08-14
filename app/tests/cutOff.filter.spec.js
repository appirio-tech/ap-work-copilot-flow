'use strict';

describe('cutOff', function () {
  var filter

  beforeEach(function () {
    bard.inject(this, '$filter');
    filter = $filter
  })

  describe('filter', function () {
    it('should be created successfully', function () {
      expect(filter('cutOff')).to.be.defined;
    });

    it('should return a substring if input length is over 20 characters', function() {
      expect(filter('cutOff')('ProjectWithALongTitle')).to.equal('ProjectWithALongTitl')
    })

    it('should return whole title if less than 20 characters', function() {
      expect(filter('cutOff')('Normal Project')).to.equal('Normal Project')
    })
  });
});
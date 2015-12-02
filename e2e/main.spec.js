'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.headerTitleEl.getText()).toBe('Ionic Typescript Gulp Seed App');
    expect(page.imgEl.getAttribute('ng-src')).toMatch(/assets\/images\/ionic.svg$/);
    expect(page.imgEl.getAttribute('alt')).toBe('Ionic');
  });

  it('should list more than 5 awesome things', function () {
    expect(page.thumbnailEls.count()).toBeGreaterThan(5);
  });

});

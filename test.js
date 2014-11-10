/*!
 * helper-date <https://github.com/jonschlinkert/helper-date>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var date = require('dateformat');
var handlebars = require('handlebars');
var _ = require('lodash');

var helper = require('./');

function dateformat(format) {
  return date(new Date(), format);
}

describe('date', function () {
  it('should return a formatted moment date:', function () {
    helper().should.eql(dateformat('mmmm dd, yyyy'));
  });

  it('should return a formatted dateformat date:', function () {
    helper('mmmm dd, yyyy').should.eql(dateformat('mmmm dd, yyyy'));
  });

  it('should work as a lodash helper:', function () {
    _.template('<%= date("mmmm dd, yyyy") %>', {}, {imports: {date: helper}}).should.eql(dateformat('mmmm dd, yyyy'));
    _.template('<%= date("mmmm") %>', {}, {imports: {date: helper}}).should.eql(dateformat('mmmm'));
    _.template('<%= date("mmmm dd, yyyy") %>', {}, {imports: {date: helper}}).should.not.eql(dateformat('mmmm'));
  });

  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('date', helper);

    handlebars.compile('{{date "mmmm dd, yyyy"}}')().should.eql(dateformat('mmmm dd, yyyy'));
    handlebars.compile('{{date "mmmm"}}')().should.eql(dateformat('mmmm'));
    handlebars.compile('{{date "mmmm"}}')().should.not.eql(dateformat('mmmm dd, yyyy'));
  });
});


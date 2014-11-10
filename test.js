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
    helper().should.eql(dateformat('MMMM DD, YYYY'));
  });

  it('should return a formatted dateformat date:', function () {
    helper('MMMM DD, YYYY').should.eql(dateformat('MMMM DD, YYYY'));
  });

  it('should work as a lodash helper:', function () {
    _.template('<%= date("MMMM DD, YYYY") %>', {}, {imports: {date: helper}}).should.eql(dateformat('MMMM DD, YYYY'));
    _.template('<%= date("MMMM") %>', {}, {imports: {date: helper}}).should.eql(dateformat('MMMM'));
    _.template('<%= date("MMMM DD, YYYY") %>', {}, {imports: {date: helper}}).should.not.eql(dateformat('MMMM'));
  });

  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('date', helper);

    handlebars.compile('{{date "MMMM DD, YYYY"}}')().should.eql(dateformat('MMMM DD, YYYY'));
    handlebars.compile('{{date "MMMM"}}')().should.eql(dateformat('MMMM'));
    handlebars.compile('{{date "MMMM"}}')().should.not.eql(dateformat('MMMM DD, YYYY'));
  });
});


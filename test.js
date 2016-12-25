/*!
 * helper-dateformat <https://github.com/jonschlinkert/helper-dateformat>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var assert = require('assert');
var date = require('dateformat');
var handlebars = require('handlebars');
var _ = require('lodash');
var helper = require('./');

function dateformat(format) {
  return date(new Date(), format);
}

describe('dateformat', function () {
  it('should return a formatted date:', function () {
    assert.deepEqual(helper(), dateformat('mmmm dd, yyyy'));
    assert.deepEqual(helper(new Date()), dateformat('mmmm dd, yyyy'));
  });

  it('should return a formatted dateformat date:', function () {
    assert.deepEqual(helper('mmmm dd, yyyy'), dateformat('mmmm dd, yyyy'));
    assert.deepEqual(helper(new Date(), 'mmmm dd, yyyy'), dateformat('mmmm dd, yyyy'));
  });

  it('should work as a lodash helper:', function () {
    assert.deepEqual(_.template('<%= date("mmmm dd, yyyy") %>', {}, {imports: {date: helper}}), dateformat('mmmm dd, yyyy'));
    assert.deepEqual(_.template('<%= date("mmmm") %>', {}, {imports: {date: helper}}), dateformat('mmmm'));
    assert.notDeepEqual(_.template('<%= date("mmmm dd, yyyy") %>', {}, {imports: {date: helper}}), dateformat('mmmm'));
  });

  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('date', helper);

    assert.deepEqual(handlebars.compile('{{date "mmmm dd, yyyy"}}')(), dateformat('mmmm dd, yyyy'));
    assert.deepEqual(handlebars.compile('{{date "mmmm"}}')(), dateformat('mmmm'));
    assert.notDeepEqual(handlebars.compile('{{date "mmmm"}}')(), dateformat('mmmm dd, yyyy'));
  });
});


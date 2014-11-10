'use strict';

/**
 * Module dependences
 */

var dateformat = require('dateformat');

module.exports = function date(format) {
  if (typeof format !== 'string' || format === 'today') {
    format = 'mmmm dd, yyyy';
  }
  return dateformat(new Date(), format);
};
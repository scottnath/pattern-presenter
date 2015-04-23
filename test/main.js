'use strict';
var fs = require('fs'),
    path = require('path');

var should = require('should'),
    chai = require('chai'),
    expect = chai.expect,
    File = require('vinyl'),
    es = require('event-stream');

var createPatternObject = require('../lib/create-pattern-object.js'),
    path = require('path');

var createFile = function(filePath, type) {
  var contents;
  var filePath = path.join(__filename, '..', 'fixtures', filePath);

  if (type == 'stream') {
    contents = fs.createReadStream(filePath);
  } else {
    contents = fs.readFileSync(filePath);
  }

  return new File({
    path: filePath,
    cwd: 'test/',
    base: 'test/fixtures',
    contents: contents
  });
};


describe('pattern-presenting', function () {

  describe('pattern gathering', function () {

    it('should create an object from a folder of compiled patterns', function () {
      var patternsObj = createPatternObject(path.join(process.cwd(),'./test/fixtures/_patterns'));
      console.log(patternsObj);
      console.log(path.join(process.cwd(),'./test/fixtures/_patterns'));
    });

  });

});

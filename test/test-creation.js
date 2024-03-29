/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('chaiseblog generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaiseblog:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '_attachments',
  		'_attachments/js',
  		'_attachments/css',

  		'config.json',

  		'views',
  		'src',

  		'package.json',
  		'rewrites.json',
  		'app.js',
  		'readme.md',
  		'.gitignore',
  		'Gruntfile.js'
    ];

    helpers.mockPrompt(this.app, {
      'blogName': 'blog',
      'username': 'blog',
      'password': 'blog',
      'db':       'blog'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});

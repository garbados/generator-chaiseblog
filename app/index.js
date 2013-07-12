'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var CloudantGenerator = module.exports = function CloudantGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CloudantGenerator, yeoman.generators.Base);

CloudantGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'blogName',
    message: 'What would you like to name your blog?',
    default: "Chaise Blog"
  },{
    name: 'username',
    message: "What's your Cloudant username?"
  },{
    name: 'password',
    message: "What's your Cloudant password?",
    // still trying to figure out how to hide password input D:
    // silent: true
  },{
    name: "db",
    message: "What database will your blog use?",
    default: "blog"
  }];

  this.prompt(prompts, function (props) {
    for(var key in props){
      this[key] = props[key];
    }

    cb();
  }.bind(this));
};

CloudantGenerator.prototype.app = function app() {
  this.mkdir('_attachments');
  this.mkdir('_attachments/js');
  this.mkdir('_attachments/css');

  this.template('_config.json', 'config.json');

  this.directory('views', 'views');
  this.directory('src', 'src');

  this.copy('package.json', 'package.json');
  this.copy('rewrites.json', 'rewrites.json');
  this.copy('app.js', 'app.js');
  this.copy('readme.md', 'readme.md');
  this.copy('gitignore', '.gitignore');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};
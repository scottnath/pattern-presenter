'use strict';
var fs = require('fs'),
  twigger = require('pattern-importer').twigCompiler;

var menuPath = './app/PUBLIC/menu.html';
var navHtml = fs.readFileSync(menuPath);
var data = {
  menu: navHtml
}
var destPath = './app/basic-example.html';
var twigTemplate = './node_modules/pattern-presenter/templates/dev-interface.twig';

var finalFile = twigger(twigTemplate,data);
fs.writeFile(destPath, finalFile,

  function (err) {
    if (err) { return console.error(err) }
    console.log('basic-example.html is generated!');
  }
);


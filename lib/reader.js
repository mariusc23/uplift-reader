/*
 * uplift-reader
 * https://github.com/mariusc23/uplift-reader
 *
 * Copyright (c) 2015 Marius Craciunoiu
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

function filterJinjaUrl(url) {
  var jinjaRegExp = /(?:filename=['|"])(.+?)(?:['|"])/;

  var result;

  if (result = jinjaRegExp.exec(url)) {
    result = result[1];
  } else {
    result = url;
  }

  return result;
}

function getScriptUrls(contents) {
  var scriptRegExp = /(?:<script[^>\n\r]*)(?: src=")(.+?)(?:")/g;

  var scriptMatches = [];
  var scriptMatch;

  while (scriptMatch = scriptRegExp.exec(contents)) {
    scriptMatches.push(filterJinjaUrl(scriptMatch[1]));
  }

  return scriptMatches;
}

function getLinkUrls(contents) {
  var linkRegExp = /(?:<link[^>\n\r]*)(?: href=")(.+?)(?:")/g;

  var linkMatches = [];
  var linkMatch;

  while (linkMatch = linkRegExp.exec(contents)) {
    linkMatches.push(filterJinjaUrl(linkMatch[1]));
  }

  return linkMatches;
}

function getFileType(filename) {
  var fileTypeRegExp = /^(?:.+\.)(.+)/;

  var result = fileTypeRegExp.exec(filename);

  if (!result) {
    throw new Error('File "' + filename + '" missing extension.');
  }

  return result[1];
}

function mapFileTypes(files) {
  var map = {};
  var fileType;
  for (var i = 0; i < files.length; i++) {
    fileType = getFileType(files[i]);
    if (!map[fileType]) {
      map[fileType] = [];
    }
    map[fileType].push(files[i]);
  }
  return map;
}

function getBuildAreas(contents) {
  var buildRegExp = /(?:<!-- build:)(\w+)(?: )(.+)(?: -->)([^\u263A]+?)(?:<!-- endbuild -->)/gm;

  var buildMatches = [];
  var buildMatch;

  while (buildMatch = buildRegExp.exec(contents)) {
    buildMatches.push({
      type: buildMatch[1],
      url: filterJinjaUrl(buildMatch[2]),
      contents: buildMatch[3]
    });
  }

  return buildMatches;
}

function readContent(contents) {
  
}

// function getBuildUrls(contents) {
//   var buildRegExp = /(?:<!-- build:)(\w+)(?: )(.+)(?: -->)/g;

//   var buildMatches = [];
//   var buildMatch;

//   while (buildMatch = buildRegExp.exec(contents)) {
//     buildMatches.push({
//       type: buildMatch[1],
//       url: filterJinjaUrl(buildMatch[2])
//     });
//   }

//   return buildMatches;
// }

exports.read = function(contents) {
  // Match resource urls
  var matches = getScriptUrls(contents).concat(getLinkUrls(contents));

  // Map files by type
  var result = mapFileTypes(matches);

  // Set raw results
  result.$raw = matches;

  // Get build areas
  result.$build = [];
  var buildAreas = getBuildAreas(contents);

  for (var i = 0; i < buildAreas.length; i++) {
    buildAreas[i].files = getScriptUrls(buildAreas[i].contents).concat(getLinkUrls(buildAreas[i].contents));
    result.$build.push(buildAreas[i]);
  }

  return result;
};

exports.readFile = function(filename) {
  var contents = fs.readFileSync(filename, 'utf8');

  return exports.read(contents);
};
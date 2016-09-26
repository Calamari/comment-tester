var assert = require('assert');
var CommentParser = require('./lib/CommentParser');

var test1 = `exports.calcPercentage(100, 20)`;
var result1 = `20`;
var test2 = `exports.calcPercentage(50, 10)`;
var result2 = `21`;

var testComment = `
/**
 * @example
 * ? exports.calcPercentage(100, 20)
 * > 20
 * ? exports.calcPercentage(50, 10)
 * > 20
 */
`;

var parser = new CommentParser('jsdoc');
console.log(parser.parse(`/* test */`));
console.log(parser.parse(testComment));

var babel = require('babel-core');
var result = babel.transformFileSync('./examples/math.js');
console.log(result.code);
var module = eval(result.code);

parser.parse(testComment).forEach(function(test) {
  assert.equal(eval(test.code), eval(test.result), `${test.code} should result in ${test.result}`);
});
//
// var result = babel.transformFileSync('./src/js/utils/math.js');
// var module = eval(result.code);
// console.log(result.code);
// console.log(exports);
//
// assert.equal(eval(test1), eval(result1), 'test 1 is bad');
// assert.equal(eval(test2), eval(result2), 'test 2 is bad');
//
// // var module = require('./src/js/utils/math');
//
// // assert.equal(eval(test1), eval(result1), 'test 1 is bad');
// // assert.equal(eval(test2), eval(result2), 'test 2 is bad');

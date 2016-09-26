
var TEST_REGEXP = /\s*\? (.*)/;
var ANSWER_REGEXP = /\s*> (.*)/;
function generateCodeResultPairs(lines) {
  return lines.reduce(function(pairs, line) {
    var matches = line.match(TEST_REGEXP);
    if (matches) {
      pairs.push({ code: matches[1] });
      return pairs
    }
    matches = line.match(ANSWER_REGEXP);
    if (matches) {
      pairs[pairs.length - 1].result = matches[1];
    }
    return pairs;
  }, []);
}

var parserTypes = {
  'jsdoc': function(comment) {
    var isExample = false;
    return comment.split("\n")
      .reduce(function(lines, line) {
        if (line.match('@example')) {
          isExample = true;
        } else if (isExample) {
          if (line.match(/\*\/$/)) {
            isExample = false;
          } else {
            lines.push(line);
          }
        }
        return lines;
      }, [])
      .map(function(line) {
        return line.replace(/^ \* /, '');
      });
    return comment.match(jsdocRegex);
  }
};

module.exports = function CommentParser(parserType) {
  if (!parserTypes[parserType]) {
    throw new Error('Parser type was not found, please use one of ' + Object.keys(parserTypes).join(','));
  }

  return {
    parse: function(comment) { return generateCodeResultPairs(parserTypes[parserType](comment)); }
  };
};

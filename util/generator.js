'use strict';

var Base = require('yeoman-generator').generators.Base,
	_ = require('lodash');

function Generator(protoProps) {
	if (!this instanceof Generator) {
		return new Generator(protoProps);
	}

	_.mixin(protoProps || {}, {
		prompting: function _usePredefinedAnswersOrPrompt() {
			var that = this,
				done = that.async(),
				answers = this.options.answers,
				next;
			//use predefined answers
			if (answers) {
				answers = Array.isArray(answers) ? answers[0] : answers;
				_.assign(that, answers);

				done();
			} else { //or prompt
				next = _.isFunction(that._prompting) ? that._prompting.bind(that) : done;
				next();
			}
		}
	});

	return Base.extend(protoProps);
}

module.exports = Generator;
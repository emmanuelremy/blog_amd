define([], function () {
	// mock console for IE
	if (!window.console) console = {};
	if (!('log' in console)) {
		console._msg = [];
		console.log = function (msg) {
			var _msg = this._msg;
			_msg.push([].join.call(arguments, ' '));
			clearTimeout(this._timeout);
			this._timeout = setTimeout(function () {
				alert(_msg.join('\n'));
			}, 100);
		};
	}

	return window.console || console;
});


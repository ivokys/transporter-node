'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('transporter:listener');

var Listener = (function () {
    function Listener() {
        _classCallCheck(this, Listener);

        this._subs = {};
        if (!this._start) throw new Error('this._start() not defined for ${this.constructor.name}');
    }

    _createClass(Listener, [{
        key: '_process',
        value: function _process(msg) {
            var callbacks, context, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, n, error;

            return _regeneratorRuntime.async(function _process$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        debug('Input', msg);
                        callbacks = this._subs[msg.channel];

                        if (callbacks) {
                            context$2$0.next = 5;
                            break;
                        }

                        debug('No callbacks for', msg.channel);
                        return context$2$0.abrupt('return', {
                            error: 'Invalid channel',
                            code: 1000
                        });

                    case 5:
                        context = {};
                        result = undefined;
                        context$2$0.prev = 7;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        context$2$0.prev = 11;
                        _iterator = _getIterator(callbacks);

                    case 13:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            context$2$0.next = 21;
                            break;
                        }

                        n = _step.value;
                        context$2$0.next = 17;
                        return _regeneratorRuntime.awrap(n(msg, context));

                    case 17:
                        result = context$2$0.sent;

                    case 18:
                        _iteratorNormalCompletion = true;
                        context$2$0.next = 13;
                        break;

                    case 21:
                        context$2$0.next = 27;
                        break;

                    case 23:
                        context$2$0.prev = 23;
                        context$2$0.t0 = context$2$0['catch'](11);
                        _didIteratorError = true;
                        _iteratorError = context$2$0.t0;

                    case 27:
                        context$2$0.prev = 27;
                        context$2$0.prev = 28;

                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }

                    case 30:
                        context$2$0.prev = 30;

                        if (!_didIteratorError) {
                            context$2$0.next = 33;
                            break;
                        }

                        throw _iteratorError;

                    case 33:
                        return context$2$0.finish(30);

                    case 34:
                        return context$2$0.finish(27);

                    case 35:
                        context$2$0.next = 42;
                        break;

                    case 37:
                        context$2$0.prev = 37;
                        context$2$0.t1 = context$2$0['catch'](7);

                        debug('Error while processing', msg.channel, context$2$0.t1);
                        error = context$2$0.t1 instanceof Error ? { message: String(context$2$0.t1), code: context$2$0.t1.code | 50000 } : context$2$0.t1;
                        return context$2$0.abrupt('return', {
                            error: error,
                            success: false
                        });

                    case 42:
                        debug('Output', result);
                        return context$2$0.abrupt('return', { success: true, result: result });

                    case 44:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[7, 37], [11, 23, 27, 35], [28,, 30, 34]]);
        }
    }, {
        key: 'on',
        value: function on(channel) {
            if (this._subs[channel]) throw new Error('Handler already registered for ${channel}');

            for (var _len = arguments.length, callbacks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                callbacks[_key - 1] = arguments[_key];
            }

            this._subs[channel] = callbacks;
            if (this._onRegister) this._onRegister(channel, callbacks);
        }
    }, {
        key: 'onRegister',
        value: function onRegister(func) {
            this._onRegister = func;
        }
    }, {
        key: 'start',
        value: function start() {
            return this._start();
        }
    }]);

    return Listener;
})();

exports['default'] = Listener;
module.exports = exports['default'];
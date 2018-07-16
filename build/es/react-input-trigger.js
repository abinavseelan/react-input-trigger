'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _textareaCaret = require('textarea-caret');

var _textareaCaret2 = _interopRequireDefault(_textareaCaret);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getHookObject(type, element, startPoint) {
  var caret = (0, _textareaCaret2.default)(element, element.selectionEnd);

  var result = {
    hookType: type,
    cursor: {
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
      top: caret.top,
      left: caret.left,
      height: caret.height
    }
  };

  if (!startPoint) {
    return result;
  }

  result.text = element.value.substr(startPoint, element.selectionStart);

  return result;
}

var InputTrigger = function (_Component) {
  _inherits(InputTrigger, _Component);

  function InputTrigger(args) {
    _classCallCheck(this, InputTrigger);

    var _this = _possibleConstructorReturn(this, (InputTrigger.__proto__ || Object.getPrototypeOf(InputTrigger)).call(this, args));

    _this.state = {
      triggered: false,
      triggerStartPosition: null
    };

    _this.handleTrigger = _this.handleTrigger.bind(_this);
    _this.resetState = _this.resetState.bind(_this);
    _this.element = _this.props.elementRef;
    return _this;
  }

  _createClass(InputTrigger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.endTrigger(this.resetState);
    }
  }, {
    key: 'handleTrigger',
    value: function handleTrigger(event) {
      var _this2 = this;

      var _props = this.props,
          trigger = _props.trigger,
          onStart = _props.onStart,
          onCancel = _props.onCancel,
          onType = _props.onType;
      var which = event.which,
          key = event.key,
          shiftKey = event.shiftKey,
          metaKey = event.metaKey,
          ctrlKey = event.ctrlKey;
      var selectionStart = event.target.selectionStart;
      var _state = this.state,
          triggered = _state.triggered,
          triggerStartPosition = _state.triggerStartPosition;


      if (!triggered) {
        if ((key === trigger.key || which === trigger.keyCode) && shiftKey === !!trigger.shiftKey && ctrlKey === !!trigger.ctrlKey && metaKey === !!trigger.metaKey) {
          this.setState({
            triggered: true,
            triggerStartPosition: selectionStart + 1
          }, function () {
            setTimeout(function () {
              onStart(getHookObject('start', _this2.element));
            }, 0);
          });
          return null;
        }
      } else {
        if (which === 8 && selectionStart <= triggerStartPosition) {
          this.setState({
            triggered: false,
            triggerStartPosition: null
          }, function () {
            setTimeout(function () {
              onCancel(getHookObject('cancel', _this2.element));
            }, 0);
          });

          return null;
        }

        setTimeout(function () {
          onType(getHookObject('typing', _this2.element, triggerStartPosition));
        }, 0);
      }

      return null;
    }
  }, {
    key: 'resetState',
    value: function resetState() {
      this.setState({
        triggered: false,
        triggerStartPosition: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          elementRef = _props2.elementRef,
          children = _props2.children,
          trigger = _props2.trigger,
          onStart = _props2.onStart,
          onCancel = _props2.onCancel,
          onType = _props2.onType,
          endTrigger = _props2.endTrigger,
          rest = _objectWithoutProperties(_props2, ['elementRef', 'children', 'trigger', 'onStart', 'onCancel', 'onType', 'endTrigger']);

      return _react2.default.createElement(
        'div',
        _extends({
          role: 'textbox',
          tabIndex: -1,
          onKeyDown: this.handleTrigger
        }, rest),
        !elementRef ? _react2.default.Children.map(this.props.children, function (child) {
          return _react2.default.cloneElement(child, {
            ref: function ref(element) {
              _this3.element = element;
              if (typeof child.ref === 'function') {
                child.ref(element);
              }
            }
          });
        }) : children
      );
    }
  }]);

  return InputTrigger;
}(_react.Component);

InputTrigger.propTypes = {
  trigger: _propTypes2.default.shape({
    key: _propTypes2.default.string,
    keyCode: _propTypes2.default.number,
    shiftKey: _propTypes2.default.bool,
    ctrlKey: _propTypes2.default.bool,
    metaKey: _propTypes2.default.bool
  }),
  onStart: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  onType: _propTypes2.default.func,
  endTrigger: _propTypes2.default.func,
  children: _propTypes2.default.element.isRequired,
  elementRef: _propTypes2.default.element
};

InputTrigger.defaultProps = {
  trigger: {
    key: null,
    keyCode: null,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false
  },
  onStart: function onStart() {},
  onCancel: function onCancel() {},
  onType: function onType() {},
  endTrigger: function endTrigger() {},
  elementRef: null
};

exports.default = InputTrigger;

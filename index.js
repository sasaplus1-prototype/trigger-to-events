(function(){

  'use strict';

  var input = document.getElementById('js-input');

  var inputLink = document.getElementById('js-input-link'),
      customLink = document.getElementById('js-custom-link');

  input.onchange = function() {
    if (!!window.console && !!window.console.log) {
      console.log('triggered onchange');
    }
  };

  inputLink.onclick = function() {
    var mouseEvent;

    if (typeof MouseEvent === 'function') {
      alert('use MouseEvent constructor');

      try {
        mouseEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
      } catch(e) {
        alert(e);
      }

      if (!mouseEvent && typeof document.createEvent === 'function') {
        alert('use document.createEvent');

        mouseEvent = document.createEvent('MouseEvents');
        mouseEvent.initEvent('click', true, true);
      }

      input.dispatchEvent(mouseEvent);
    } else if (typeof document.createEvent === 'function') {
      alert('use document.createEvent');

      mouseEvent = document.createEvent('MouseEvents');
      mouseEvent.initEvent('click', true, true);

      input.dispatchEvent(mouseEvent);
    } else if ('createEventObject' in document) {
      alert('use document.createEventObject');

      mouseEvent = document.createEventObject();

      input.fireEvent('onclick', mouseEvent);

      alert('execute element.click');

      input.click();
    } else {
      alert('cannot trigger event');
    }
  };

  customLink.onclick = function() {
    var listener, event;
    
    listener = function() {
      alert('triggered customevent');
    };

    if (typeof Event === 'function') {
      alert('use Event constructor');

      event = new Event('customevent', {
        view: window,
        bubbles: true,
        cancelable: true
      });
    } else if (typeof document.createEvent === 'function') {
      alert('use document.createEvent');

      event = document.createEvent('HTMLEvents');
      event.initEvent('customevent', true, true);
    } else if ('createEventObject' in document) {
      alert('use document.createEventObject');

      event = document.createEventObject();
    } else {
      alert('cannot create custom event');
    }

    if (typeof document.dispatchEvent !== 'undefined') {
      alert('use element.dispatchEvent');

      document.addEventListener('customevent', listener, false);
      document.dispatchEvent(event);
      document.removeEventListener('customevent', listener, false);
    } else if (typeof document.fireEvent !== 'undefined') {
      alert('use element.fireEvent');

      document.attachEvent('oncustomevent', listener);
      // NOTE: `Invalid argument.` in IE8
      document.fireEvent('oncustomevent', event);
      document.detachEvent('oncustomevent', listener);
    } else {
      alert('cannot trigger custom event');
    }
  };

}());

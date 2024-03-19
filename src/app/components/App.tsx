import React, { useRef, useCallback, useEffect } from 'react';
import logo from '../assets/logo.svg';
import '../styles/ui.css';
import { Event } from '../../plugin/enum/event.enum';

function App() {
  const textbox = useRef<HTMLInputElement>(undefined);

  const countRef = useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5';
    textbox.current = element;
  }, []);

  const onCreate = () => {
    // const count = parseInt(textbox.current.value, 10);
    parent.postMessage({ pluginMessage: { type: Event.GenerateHtml } }, '*');
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: Event.ClosePlugin } }, '*');
  };

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === Event.GenerateHtml) {
        console.log(message.html);
      }
    };
  }, []);

  return (
    <div>
      <img src={logo} />
      <h2>Rectangle Creator</h2>
      <p>
        Count: <input ref={countRef} />
      </p>
      <button id="create" onClick={onCreate}>
        Create
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default App;

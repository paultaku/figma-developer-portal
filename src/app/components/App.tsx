import React, { Fragment, useEffect, useState } from 'react';
import htmlPrettierPlugin from 'prettier/plugins/html';
import * as prettier from 'prettier';
import '../styles/ui.css';
import { Event } from '../../plugin/enum/event.enum';

const App = () => {
  const [htmlString, setHtmlString] = useState<string>('');

  const onCreate = () => {
    parent.postMessage({ pluginMessage: { type: Event.GenerateHtml } }, '*');
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: Event.ClosePlugin } }, '*');
  };

  const copyContent = () => {
    const el = document.createElement('textarea');
    el.value = htmlString;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = async (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === Event.GenerateHtml) {
        const html = await prettier.format(message.html, {
          parser: 'html',
          trailingComma: 'es5',
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
          bracketSpacing: true,
          plugins: [htmlPrettierPlugin],
        });
        setHtmlString(html);
      }
    };
  }, []);

  return (
    <div>
      <h2>TailwindCss</h2>
      {htmlString && (
        <Fragment>
          <div className="code-container">
            <code>{htmlString}</code>
          </div>
          <div>
            <button id="copy" onClick={copyContent}>
              Copy
            </button>
          </div>
        </Fragment>
      )}

      <div className="footer">
        <button id="create" onClick={onCreate}>
          Create
        </button>
        <button onClick={onCancel}>Close</button>
      </div>
    </div>
  );
};

export default App;

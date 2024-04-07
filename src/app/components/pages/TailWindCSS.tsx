import React, { Fragment, useEffect, useState } from 'react';
import htmlPrettierPlugin from 'prettier/plugins/html';
import * as prettier from 'prettier';
import { Event } from '../../../plugin/enum/event.enum';
import { Link } from 'react-router-dom';

export function TailWindCSS() {
  const [htmlString, setHtmlString] = useState<string>('');

  useEffect(() => {
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

    parent.postMessage({ pluginMessage: { type: Event.GenerateHtml } }, '*');
  }, []);

  const copyContent = () => {
    navigator.clipboard.writeText(htmlString);
  };

  return (
    <Fragment>
      <h2 className="text-2xl uppercase">TailwindCss</h2>
      {htmlString && (
        <Fragment>
          <div className="code-container">
            <code>{htmlString}</code>
          </div>
          <button id="copy" onClick={copyContent}>
            Copy
          </button>
        </Fragment>
      )}
      <button type="button">
        <Link to=".." relative="route">
          Back
        </Link>
      </button>
    </Fragment>
  );
}

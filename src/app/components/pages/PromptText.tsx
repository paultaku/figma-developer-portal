import React, { Fragment, useEffect, useState } from 'react';
import htmlPrettierPlugin from 'prettier/plugins/html';
import * as prettier from 'prettier';
import { Event } from '../../../plugin/enum/event.enum';
import { Link } from 'react-router-dom';
import { textCopy } from '../../utils/copyText';

export function PromptText() {
  const [prompt, setPrompt] = useState<string>('');

  useEffect(() => {
    window.onmessage = async (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === Event.GeneratePrompt) {
        const prompt = await prettier.format(message.prompt, {
          parser: 'html',
          trailingComma: 'es5',
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
          bracketSpacing: true,
          plugins: [htmlPrettierPlugin],
        });
        setPrompt(prompt);
      }
    };

    parent.postMessage({ pluginMessage: { type: Event.GeneratePrompt } }, '*');
  }, []);

  const copyContent = () => {
    textCopy(prompt);
  };

  return (
    <Fragment>
      <h2 className="text-2xl uppercase">Prompt Text</h2>
      {prompt && (
        <Fragment>
          <div className="container">
            <textarea cols={30} rows={10} onChange={(ev) => setPrompt(ev.target.value)} value={prompt}></textarea>
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

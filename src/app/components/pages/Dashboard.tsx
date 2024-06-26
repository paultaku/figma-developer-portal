import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <Fragment>
      <h2 className="text-2xl uppercase">Dashboard</h2>
      <div className="box-container">
        <div className="box">
          <h3>TailWindCSS</h3>
          <button type="button">
            <Link to={'/tailwindcss'}>Create</Link>
          </button>
        </div>
        <div className="box">
          <h3>Prompt</h3>
          <button type="button">
            <Link to={'/prompttext'}>Create</Link>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

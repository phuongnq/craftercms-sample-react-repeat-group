import React from 'react';
import ReactDOM from 'react-dom/client';
import { crafterConf } from '@craftercms/classes';
import cookies from 'js-cookie';
import './index.css';
import App from './App';
import { BASE_URL } from './constants';

let siteName = document.querySelector('#site')?.innerHTML;
/*eslint no-template-curly-in-string: "off"*/
if (siteName === undefined || siteName === '${siteName}' || siteName === '') {
  siteName = cookies.get('crafterSite') ?? 'react-app';
}

crafterConf.configure({
  baseUrl: BASE_URL,
  site: siteName,
  cors: 'cors'
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

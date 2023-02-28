import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import GithubCorner from './components/github-corner';

const UID = 'ce4b8a9728064410aef495199bf9f42e';

function App() {
  useEffect(() => {
    const frame = document.querySelector('#api-frame');
    if (frame) {
      // eslint-disable-next-line no-undef
      const client = new Sketchfab(frame);
      client.init(UID, {
        success: onSuccess,
        error: function onError() {
          console.log('DEBUG: VIEWER ERROR');
        },
        autostart: 1,
        preload: 1,
        camera: 1,
        dnt: 1, //disable cookies, analytics, audience measurement / tracking, etc.
        transparent: 0,
        ui_animations: 0,
        ui_controls: 0,
        ui_infos: 0,
        ui_inspector: 0,
        ui_stop: 0,
        ui_watermark: 0,
        ui_watermark_link: 0,
        ui_hint: 0
      });
    }
  }, []);

  function onSuccess(api) {
    api.start();

    api.addEventListener('viewerready', function () {
      api.getNodeMap(function (error, nodes) {
        if (!error) {
          window.console.log(nodes); // [ ... ]
        }
      });
    });
  }

  return (
    <BrowserRouter>
      <main className='flex h-screen flex-col items-center justify-center bg-secondary p-14 text-color'>
        <div className='relative h-full w-full'>
          <div className='absolute -top-2 h-14 w-full rounded-2xl border-b-2 border-neutral-50 bg-secondary'></div>
          <div className='absolute -bottom-2 z-[1] h-14 w-full rounded-2xl border-t-2 border-neutral-50 bg-secondary'></div>
          <iframe
            title='3D viewer'
            id='api-frame'
            className='h-full w-full rounded-xl outline-none'
          ></iframe>
        </div>
        <GithubCorner
          title='Get started on GitHub'
          url='https://github.com/doinel1a/vite-react-js-starter'
        />
      </main>
    </BrowserRouter>
  );
}

export default App;

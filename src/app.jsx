import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import GithubCorner from './components/github-corner';

const UID = 'ce4b8a9728064410aef495199bf9f42e';

const rootStyle = document.querySelector(':root');

function App() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    const frame = document.querySelector('#api-frame');

    if (frame) {
      // eslint-disable-next-line no-undef
      const client = new Sketchfab(frame);

      client.init(UID, {
        success: onSuccess,
        error: () => console.log('DEBUG: VIEWER ERROR'),
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

  useEffect(() => {
    const configContainer = document.querySelector('#config-container');

    const timeoutsId = [];
    const eventListeners = [];

    if (isModelLoaded && configContainer) {
      const buttons = configContainer.querySelectorAll('button');

      for (const button of buttons) {
        timeoutsId.push(
          setTimeout(() => {
            button.classList.add('show');
          }, 700)
        );

        eventListeners.push(
          button.addEventListener(
            'animationend',
            () => {
              button.classList.add('!duration-150');
            },
            false
          )
        );
      }
    }

    return () => {
      for (const timeout of timeoutsId) {
        clearTimeout(timeout);
      }

      for (const event of eventListeners) {
        removeEventListener('animationend', event, false);
      }
    };
  }, [isModelLoaded]);

  function onSuccess(api) {
    api.start(
      api.addEventListener('modelLoadProgress', (factor) => {
        rootStyle.style.setProperty(
          '--bg-size',
          `${Math.round(factor.progress * 100)}%`
        );
      }),
      api.addEventListener('viewerready', function () {
        setTimeout(() => setIsModelLoaded(true), 700);
      })
    );
  }

  return (
    <BrowserRouter>
      <main className='flex h-screen flex-col items-center justify-center bg-secondary p-14 text-color'>
        <div className='relative h-full w-full'>
          {isModelLoaded ? (
            <></>
          ) : (
            <div className='absolute z-[2] flex h-full w-full flex-col items-center justify-center rounded-xl bg-primary'>
              <span className='loader'></span>
            </div>
          )}
          <div className='absolute -top-2 h-14 w-full rounded-2xl border-b-2 border-neutral-50 bg-secondary'></div>
          <div className='absolute -bottom-2 z-[1] h-14 w-full rounded-2xl border-t-2 border-neutral-50 bg-secondary'></div>
          <iframe
            title='3D viewer'
            id='api-frame'
            className='h-full w-full rounded-xl outline-none'
          ></iframe>
          <div
            id='config-container'
            className='absolute bottom-16 z-0 flex h-24 w-full justify-center gap-x-8 bg-blue-500 bg-opacity-0 p-2'
          >
            <button
              type='button'
              className='hide aspect-square h-full rounded-xl bg-blue-500 transition-all hover:bg-blue-700'
            />
            <button
              type='button'
              className='hide aspect-square h-full rounded-xl bg-violet-500 transition-all hover:bg-violet-700'
            />
            <button
              type='button'
              className='hide aspect-square h-full rounded-xl bg-red-500 transition-all hover:bg-red-700'
            />
            <button
              type='button'
              className='hide aspect-square h-full rounded-xl bg-green-500 transition-all hover:bg-green-700'
            />
          </div>
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

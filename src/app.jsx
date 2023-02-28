import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import GithubCorner from './components/github-corner';

const UID = 'ce4b8a9728064410aef495199bf9f42e';

const rootStyle = document.querySelector(':root');

let updateMaterial = () => {};

const colors = [
  {
    name: 'sky',
    r: 0,
    g: 0.265_222_255_437_353_7,
    b: 0.667_162_779_707_386
  },
  {
    name: 'indigo',
    r: 0.124_771_817_560_950_45,
    g: 0.132_868_321_553_817_92,
    b: 0.879_622_396_887_831_5
  },
  {
    name: 'red',
    r: 0.904_661_174_391_149_2,
    g: 0.049_706_565_984_127_23,
    b: 0.111_932_427_836_905_67
  },
  {
    name: 'emerald',
    r: 0.001_517_634_917_744_192_4,
    g: 0.304_987_314_069_886_16,
    b: 0.141_263_291_140_271_7
  }
];

function App() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [plasticLargePartsMaterial, setPlasticLargePartsMaterial] = useState();

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

        api.getMaterialList(function (error, materials) {
          if (!error) {
            for (const material of materials) {
              if (material.name === 'plastic_large_parts') {
                console.log('BEFORE', material);

                setPlasticLargePartsMaterial(material);
              }
            }
          }
        });
      })
    );

    updateMaterial = (material, r, g, b) => {
      material.channels.AlbedoPBR.color = [r, g, b];

      api.setMaterial(material);
    };
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
              onClick={() => {
                const color = colors[0];
                updateMaterial(
                  plasticLargePartsMaterial,
                  color.r,
                  color.g,
                  color.b
                );
              }}
            />
            <button
              type='button'
              className='hide aspect-square h-full rounded-xl bg-violet-500 transition-all hover:bg-violet-700'
              onClick={() => {
                const color = colors[1];
                updateMaterial(
                  plasticLargePartsMaterial,
                  color.r,
                  color.g,
                  color.b
                );
              }}
            />
            <button
              type='button'
              className='hide aspect-square h-full rounded-xl bg-red-500 transition-all hover:bg-red-700'
              onClick={() => {
                const color = colors[2];
                updateMaterial(
                  plasticLargePartsMaterial,
                  color.r,
                  color.g,
                  color.b
                );
              }}
            />
            <button
              type='button'
              className='hide aspect-square h-full rounded-xl bg-green-500 transition-all hover:bg-green-700'
              onClick={() => {
                const color = colors[3];
                updateMaterial(
                  plasticLargePartsMaterial,
                  color.r,
                  color.g,
                  color.b
                );
              }}
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

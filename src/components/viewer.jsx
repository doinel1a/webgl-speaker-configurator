import React, { useEffect, useState } from 'react';

import { client as clientConfig } from '../config/client';
import { colors } from '../config/colors';
import ButtonColor from './button-color';

const MODEL_UID = 'ce4b8a9728064410aef495199bf9f42e';
const rootStyle = document.querySelector(':root');

let updateMaterial = () => {};

export default function Viewer() {
  const [activeButton, setActiveButton] = useState(colors[0].name);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [plasticLargePartsMaterial, setPlasticLargePartsMaterial] = useState();

  useEffect(() => {
    const frame = document.querySelector('#api-frame');

    if (frame) {
      // eslint-disable-next-line no-undef
      const client = new Sketchfab(frame);

      client.init(MODEL_UID, {
        success: onSuccess,
        ...clientConfig
      });
    }
  }, []);

  function onSuccess(api) {
    api.start(
      api.addEventListener('modelLoadProgress', (factor) => {
        const progress = Math.round(factor.progress * 100);

        rootStyle.style.setProperty('--bg-size', `${progress}%`);
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
      {isModelLoaded ? (
        <div
          id='config-container'
          className='absolute bottom-16 z-0 flex h-24 w-full justify-center gap-x-8 bg-blue-500 bg-opacity-0 p-2'
        >
          {colors.map((color, index) => (
            <ButtonColor
              key={`${color}-${index}`}
              colorName={color.name}
              r={color.standard.r}
              g={color.standard.g}
              b={color.standard.b}
              isActive={activeButton === color.name}
              onClick={() => {
                if (activeButton !== color.name) {
                  setActiveButton(color.name);

                  updateMaterial(
                    plasticLargePartsMaterial,
                    color.normalized.r,
                    color.normalized.g,
                    color.normalized.b
                  );
                }
              }}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

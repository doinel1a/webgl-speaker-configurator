import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

ButtonColor.propTypes = {
  colorName: PropTypes.string.isRequired,
  r: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default function ButtonColor({ colorName, r, g, b, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const configContainer = document.querySelector('#config-container');

    const timeoutsId = [];
    const eventListeners = [];

    if (configContainer) {
      const buttons = configContainer.querySelectorAll('button');
      console.log('buttons', buttons);

      for (const button of buttons) {
        timeoutsId.push(
          setTimeout(() => {
            button.classList.add('show');
          }, 400)
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
  }, []);

  return (
    <button
      type='button'
      title={`Apply ${colorName} color`}
      className='hide aspect-square h-full rounded-xl shadow-lg transition-all hover:shadow-xl'
      style={{
        border: `2px solid ${isActive ? '#000' : '#fff'}`,
        backgroundColor: isHovered
          ? `rgb(${r - 30}, ${g - 30}, ${b - 30})`
          : `rgb(${r}, ${g}, ${b})`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    ></button>
  );
}

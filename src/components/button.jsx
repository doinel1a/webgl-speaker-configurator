import PropTypes from 'prop-types';
import React from 'react';

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default function Button({ text, onClick }) {
  return (
    <button
      type='button'
      className='w-16 rounded-xl bg-accent-primary px-4 py-2 text-xl transition-colors hover:bg-accent-primary-state focus:bg-accent-primary-state'
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
}

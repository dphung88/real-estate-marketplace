'use client';

import React from 'react';

/**
 * A reusable Button component
 * 
 * @param {Object} props
 * @param {string} props.children - Button text or elements
 * @param {string} [props.type='button'] - Button type (button, submit, reset)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Function} [props.onClick] - Click event handler
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.variant='primary'] - Button style variant (primary, secondary, outline, call)
 */
const Button = ({ 
  children, 
  type = 'button', 
  className = '', 
  onClick, 
  disabled = false,
  variant = 'primary' 
}) => {
  // Map variant to CSS class defined in globals.css
  const variantClass = `btn-${variant}`;
  
  return (
    <button
      type={type}
      className={`btn ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

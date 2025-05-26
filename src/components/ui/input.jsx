import React from 'react';
import classNames from 'classnames';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={classNames(
        'p-2 border border-gray-300 rounded w-full',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

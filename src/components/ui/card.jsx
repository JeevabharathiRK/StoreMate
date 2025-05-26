import React from 'react';
import classNames from 'classnames';

export const Card = ({ className, children }) => {
  return (
    <div
      className={classNames(
        'bg-white p-4 rounded-2xl shadow-sm border border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

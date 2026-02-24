
import * as React from 'react';

const Spinner: React.FC = () => (
  React.createElement('div', { className: "flex size-6 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] md:border-4" })
);
export default Spinner;

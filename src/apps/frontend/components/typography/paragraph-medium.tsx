import clsx from 'clsx';
import React, { type PropsWithChildren } from 'react';

import paragraphMediumStyles from './paragraph-medium.styles';

interface ParagraphMediumProps {
  text?: keyof typeof paragraphMediumStyles.textAlign;
}

const ParagraphMedium: React.FC<PropsWithChildren<ParagraphMediumProps>> = ({
  children,
  text,
}) => (
  <p
    className={clsx([
      'text-xl font-medium',
      text && paragraphMediumStyles.textAlign[text],
    ])}
  >
    {children}
  </p>
);

export default ParagraphMedium;

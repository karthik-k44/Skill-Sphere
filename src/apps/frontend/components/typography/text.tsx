import clsx from 'clsx';
import React, { type PropsWithChildren } from 'react';

import styles from '../../../../../clsx.styles';

import textStyles from './text.styles';

interface TextProps {
  color?: string;
  desktopFont?: 'ParagraphLarge' | 'LabelXSmall' | 'LabelSmall' | 'LabelLarge' | 'ParagraphMedium' | 'ParagraphXSmall' | 'LabelMedium' | 'ParagraphSmall' | 'LabelXLarge';
  font?: 'ParagraphLarge' | 'LabelXSmall' | 'LabelSmall' | 'LabelLarge' | 'ParagraphMedium' | 'ParagraphXSmall' | 'LabelMedium' | 'ParagraphSmall' | 'LabelXLarge';
  tabletFont?: 'ParagraphLarge' | 'LabelXSmall' | 'LabelSmall' | 'LabelLarge' | 'ParagraphMedium' | 'ParagraphXSmall' | 'LabelMedium' | 'ParagraphSmall' | 'LabelXLarge';
  textAlign?: 'center' | 'left' | 'right';
  width?: string;
  isTruncated?: boolean;
}

const Text: React.FC<PropsWithChildren<TextProps>> = ({
  children,
  color = 'text-black',
  desktopFont,
  font = 'ParagraphLarge',
  tabletFont,
  textAlign = 'left',
  width,
  isTruncated,
}) => (
  <div
    className={`${clsx([
      textStyles.font[font],
      tabletFont && textStyles.tabletFont[tabletFont],
      desktopFont && textStyles.desktopFont[desktopFont],
      textStyles.textAlign[textAlign],
      width && styles.width[width as keyof typeof styles.width],
      color,
    ])}  ${isTruncated && 'truncate'}`}
  >
    {children}
  </div>
);

export default Text;

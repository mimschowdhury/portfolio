import { css } from 'styled-components';

import CalibreRegularWoff from '@fonts/Calibre/Calibre-Regular.woff';
import CalibreRegularWoff2 from '@fonts/Calibre/Calibre-Regular.woff2';
import CalibreMediumWoff from '@fonts/Calibre/Calibre-Medium.woff';
import CalibreMediumWoff2 from '@fonts/Calibre/Calibre-Medium.woff2';
import CalibreSemiboldWoff from '@fonts/Calibre/Calibre-Semibold.woff';
import CalibreSemiboldWoff2 from '@fonts/Calibre/Calibre-Semibold.woff2';

import CalibreRegularItalicWoff from '@fonts/Calibre/Calibre-RegularItalic.woff';
import CalibreRegularItalicWoff2 from '@fonts/Calibre/Calibre-RegularItalic.woff2';
import CalibreMediumItalicWoff from '@fonts/Calibre/Calibre-MediumItalic.woff';
import CalibreMediumItalicWoff2 from '@fonts/Calibre/Calibre-MediumItalic.woff2';
import CalibreSemiboldItalicWoff from '@fonts/Calibre/Calibre-SemiboldItalic.woff';
import CalibreSemiboldItalicWoff2 from '@fonts/Calibre/Calibre-SemiboldItalic.woff2';

import SFMonoRegularWoff from '@fonts/SFMono/SFMono-Regular.woff';
import SFMonoRegularWoff2 from '@fonts/SFMono/SFMono-Regular.woff2';
import SFMonoSemiboldWoff from '@fonts/SFMono/SFMono-Semibold.woff';
import SFMonoSemiboldWoff2 from '@fonts/SFMono/SFMono-Semibold.woff2';

import SFMonoRegularItalicWoff from '@fonts/SFMono/SFMono-RegularItalic.woff';
import SFMonoRegularItalicWoff2 from '@fonts/SFMono/SFMono-RegularItalic.woff2';
import SFMonoSemiboldItalicWoff from '@fonts/SFMono/SFMono-SemiboldItalic.woff';
import SFMonoSemiboldItalicWoff2 from '@fonts/SFMono/SFMono-SemiboldItalic.woff2';

import NunitoBoldTtf from '@fonts/Nunito/Nunito-Bold.ttf';
import NunitoExtraBoldTtf from '@fonts/Nunito/Nunito-ExtraBold.ttf';
import NunitoMediumTtf from '@fonts/Nunito/Nunito-Medium.ttf';
import NunitoBlackTtf from '@fonts/Nunito/Nunito-Black.ttf';

const calibreNormalWeights = {
  400: [CalibreRegularWoff, CalibreRegularWoff2],
  500: [CalibreMediumWoff, CalibreMediumWoff2],
  600: [CalibreSemiboldWoff, CalibreSemiboldWoff2],
};

const calibreItalicWeights = {
  400: [CalibreRegularItalicWoff, CalibreRegularItalicWoff2],
  500: [CalibreMediumItalicWoff, CalibreMediumItalicWoff2],
  600: [CalibreSemiboldItalicWoff, CalibreSemiboldItalicWoff2],
};

const sfMonoNormalWeights = {
  400: [SFMonoRegularWoff, SFMonoRegularWoff2],
  600: [SFMonoSemiboldWoff, SFMonoSemiboldWoff2],
};

const sfMonoItalicWeights = {
  400: [SFMonoRegularItalicWoff, SFMonoRegularItalicWoff2],
  600: [SFMonoSemiboldItalicWoff, SFMonoSemiboldItalicWoff2],
};

const calibre = {
  name: 'Calibre',
  normal: calibreNormalWeights,
  italic: calibreItalicWeights,
};

const sfMono = {
  name: 'SF Mono',
  normal: sfMonoNormalWeights,
  italic: sfMonoItalicWeights,
};

const nunitoWeights = {
  500: [NunitoMediumTtf],
  700: [NunitoBoldTtf],
  800: [NunitoExtraBoldTtf],
  900: [NunitoBlackTtf],
};

const nunito = {
  name: 'Nunito',
  normal: nunitoWeights,
};

// const createFontFaces = (family, style = 'normal') => {
//   let styles = '';

//   for (const [weight, formats] of Object.entries(family[style])) {
//     const woff = formats[0];
//     const woff2 = formats[1];

//     styles += `
//       @font-face {
//         font-family: '${family.name}';
//         src: url(${woff2}) format('woff2'),
//             url(${woff}) format('woff');
//             url(${ttf}) format('truetype');
//         font-weight: ${weight};
//         font-style: ${style};
//         font-display: auto;
//       }
//     `;
//   }

//   return styles;
// };

const createFontFaces = (family, style = 'normal') => {
  let styles = '';

  for (const [weight, formats] of Object.entries(family[style])) {
    // Build the src string based on available formats
    const src = formats
      .map((format) => {
        if (format.endsWith('.woff2')) {
          return `url(${format}) format('woff2')`;
        } else if (format.endsWith('.woff')) {
          return `url(${format}) format('woff')`;
        } else if (format.endsWith('.ttf')) {
          return `url(${format}) format('truetype')`;
        }
        return ''; // Fallback for unrecognized formats
      })
      .filter(Boolean) // Remove empty strings
      .join(', ');

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: ${src};
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  }

  return styles;
};

const calibreNormal = createFontFaces(calibre);
const calibreItalic = createFontFaces(calibre, 'italic');

const sfMonoNormal = createFontFaces(sfMono);
const sfMonoItalic = createFontFaces(sfMono, 'italic');

const nunitoNormal = createFontFaces(nunito);

const Fonts = css`
  ${calibreNormal + calibreItalic + sfMonoNormal + sfMonoItalic + nunitoNormal}
`;

export default Fonts;

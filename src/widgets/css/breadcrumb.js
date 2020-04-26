import { px2remcss } from '../css/units';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import get from '../css/theme-common-dict';

const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const noLastItemColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const themeHoverColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const textToSeparatorDistance = get('padding');
const iconToTextpadding = get('paddingToText');

export const defaultColor = blackColor;
export const HoverDefaultColor = themeHoverColor;
export const FontSize = px2remcss(14);
export const separatorMarginLeft = px2remcss(textToSeparatorDistance);
export const separatorMarginRight = px2remcss(textToSeparatorDistance);
export const iconToTextMargin = iconToTextpadding;

export const CommonSpan = CSSComponent({
  tag: 'span',
  className: 'commonSpan',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font'], ['margin'], ['padding'], ['font']],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig } = themeConfig;
      const { isLastItem } = propsConfig;
      const color = isLastItem ? defaultColor : noLastItemColor;
      return {
        color,
      };
    },
  },

  hover: {
    selectNames: [['color'], ['font'], ['fontSize'], ['font']],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig } = themeConfig;
      const { isLastItem } = propsConfig;
      const color = isLastItem ? defaultColor : HoverDefaultColor;
      return {
        color,
      };
    },
  },
  css: css`
    font-size: ${FontSize};
    transition: font-size 0.3s;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
  `,
  option: { hover: true },
});

export const ALink = CSSComponent({
  tag: 'a',
  className: 'aLink',
  normal: {
    selectNames: [
      ['color'],
      ['fontSize'],
      ['font'],
      ['margin', 'left'],
      ['margin', 'right'],
      ['padding', 'left'],
      ['padding', 'right'],
    ],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig } = themeConfig;
      const { isLastItem } = propsConfig;
      const color = isLastItem ? defaultColor : noLastItemColor;
      return {
        color,
      };
    },
  },

  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig } = themeConfig;
      const { isLastItem } = propsConfig;
      const color = isLastItem ? defaultColor : HoverDefaultColor;
      return {
        color,
      };
    },
  },

  css: css`
    text-decoration: none;
    transition: font-size 0.3s;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: ${FontSize};
    display: flex;
    align-items: center;
  `,
  option: { hover: true },
});

export const SeparatorSpan = CSSComponent({
  tag: 'span',
  className: 'separatorSpan',
  normal: {
    selectNames: [
      ['color'],
      ['fontSize'],
      ['font'],
      ['margin', 'left'],
      ['margin', 'right'],
      ['padding', 'left'],
      ['padding', 'right'],
    ],
    getThemeMeta(themeMeta, themeConfig) {
      const { propsConfig } = themeConfig;
      const { isLastItem } = propsConfig;
      const color = isLastItem ? defaultColor : noLastItemColor;
      return {
        color,
      };
    },
    getCSS(themeMeta, themeConfig) {
      const {
        propsConfig: { isLastItem },
      } = themeConfig;
      return `
      margin-left: ${isLastItem ? 0 : separatorMarginLeft};
      margin-right: ${isLastItem ? 0 : separatorMarginRight}
      `;
    },
  },

  css: css`
    font-size: ${px2remcss(16)};
    display: inline-block;
  `,
});

export const BreadcrumbContainer = CSSComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['padding'],
      ['margin'],
      ['border'],
      ['opacity'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
    getCSS: themeMeta => {
      const { height = 30 } = themeMeta;
      return `line-height: ${px2remcss(height)}`;
    },
    defaultTheme: {},
  },
  hover: {
    selectNames: [['border'], ['borderRadius'], ['boxShadow'], ['background'], ['opacity']],
  },
  css: css`
    height: ${px2remcss(30)};
    display: inline-block;
    box-sizing: border-box;
    transition: all 0.3s;
    overflow: hidden;
    width: 100%;
  `,
  option: { hover: true },
});

export const ItemWrap = CSSComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  normal: {
    selectNames: [
      ['width'],
      ['padding'],
      ['margin'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
  },
  hover: {
    selectNames: [
      ['width'],
      ['padding'],
      ['margin'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
  },
  css: css`
    display: inline-block;
    padding: 0;
    box-sizing: border-box;
    vertical-align: top;
  `,
});

export const FlexBox = StaticComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  css: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  `,
});

export const FlexContainer = StaticComponent({
  tag: 'div',
  className: 'breadcrumbContainer',
  css: css`
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
  `,
});

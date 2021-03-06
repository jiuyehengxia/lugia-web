/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';
import ThemeHoc from '@lugia/theme-hoc';
import {
  ALink,
  CommonSpan,
  SeparatorSpan,
  ItemWrap,
  FlexBox,
  iconToTextMargin,
  iconfontSize,
} from '../css/breadcrumb';
import Icon from '../icon';
import { deepMerge } from '@lugia/object-utils';
import { addMouseEvent } from '@lugia/theme-hoc';

export type BreadcrumbItemProps = {
  separator?: string | React.Element<any>,
  href?: string,
  isLastItem?: boolean,
  children: React.Node,
  lastSeparator?: string | React.Element<any>,
  textThemeHoc: Object,
  separatorThemeProps: Object,
  getPartOfThemeProps: Function,
  index: number,
  count: number,
  icons: Object,
};

class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static defaultProps = {
    separator: '/',
  };

  getPrefixIcon() {
    const { icons = {} } = this.props;
    if (!icons) {
      return null;
    }
    const { prefixIconClass } = icons;
    if (!prefixIconClass) {
      return null;
    }
    const { viewClass, theme } = this.getIconTheme('PrefixIcon');
    return (
      <Icon
        iconClass={prefixIconClass}
        {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
        singleTheme
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getSuffixIcon() {
    const { icons = {} } = this.props;
    if (!icons) {
      return null;
    }
    const { suffixIconClass } = icons;
    if (!suffixIconClass) {
      return null;
    }
    const { viewClass, theme } = this.getIconTheme('SuffixIcon');
    return (
      <Icon
        iconClass={suffixIconClass}
        {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
        singleTheme
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getIconTheme = (iconType: string) => {
    const { index, count, getPartOfThemeHocProps, getPartOfThemeProps } = this.props;
    const { viewClass, theme } = getPartOfThemeHocProps(iconType);
    theme[viewClass] = getPartOfThemeProps(iconType, {
      selector: { index, count },
    }).themeConfig;
    const marginLeft = iconType === 'SuffixIcon' ? iconToTextMargin : 0;
    const marginRight = iconType === 'PrefixIcon' ? iconToTextMargin : 0;
    const defaultTheme = {
      normal: {
        margin: {
          left: marginLeft,
          right: marginRight,
        },
        fontSize: iconfontSize,

        getCSS: () => {
          return `
          transition: all 0.3s
          `;
        },
      },
    };
    return {
      viewClass,
      theme: deepMerge(
        {
          [viewClass]: { ...defaultTheme },
        },
        theme
      ),
    };
  };

  render() {
    const {
      separator,
      children,
      getPartOfThemeProps,
      isLastItem,
      href,
      index,
      count,
      path,
    } = this.props;
    const cursorOptions = href || path ? 'pointer' : 'default';
    let Link = CommonSpan;
    if ('href' in this.props) {
      Link = ALink;
    }
    return (
      <ItemWrap
        themeProps={getPartOfThemeProps('ItemWrap', { selector: { index, count } })}
        {...addMouseEvent(this)}
      >
        <FlexBox themeProps={getPartOfThemeProps('ItemWrap', { selector: { index, count } })}>
          <Link
            href={href}
            themeProps={getPartOfThemeProps('Text', {
              selector: { index, count },
              props: { isLastItem, cursorOptions },
            })}
          >
            {this.getPrefixIcon()}
            {children}
            {this.getSuffixIcon()}
          </Link>
          <SeparatorSpan
            themeProps={getPartOfThemeProps('Separator', {
              selector: { index, count },
              props: { isLastItem },
            })}
          >
            {separator}
          </SeparatorSpan>
        </FlexBox>
      </ItemWrap>
    );
  }
}
export default ThemeHoc(BreadcrumbItem, 'BreadcrumbItem', { hover: true });

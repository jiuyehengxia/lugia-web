/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Menu from './index';
import Theme from '../theme';
import Widget from '../consts/index';
import styled from 'styled-components';
const { MenuItem } = Menu;
const Placeholder = Menu.Placeholder;
const computeCanSeeCount = Menu.computeCanSeeCount;

const Button = styled.div`
  width: 200px;
  height: 40px;
  background: cornflowerblue;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  margin: 10px;
`;

const H2 = styled.h2`
  margin: 10px;
  color: orangered;
`;

const MenuWrap = styled.div`
  border: 1px solid #ccc;
  margin: 10px;
`;

const Box = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  margin: 10px 30px;
`;

const items = [];
for (let i = 0; i < 100000; i++) {
  items.push({ text: i, value: i, disabled: false });
}
const hasChildrenData = [
  {
    text: '一级菜单1',
    value: '一级菜单1',
    disabled: false,
  },
  { text: '一级菜单2', value: '一级菜单2', disabled: false },
  { text: '一级菜单3', value: '一级菜单3', disabled: false },
  {
    text: '一级菜单4',
    value: '一级菜单4',
    disabled: false,
    children: [
      {
        text: '次级菜单4-1',
        value: '次级菜单4-1',
        children: [{ text: '三级菜单4-1-1', value: '三级菜单4-1-1' }],
      },
    ],
  },
  { text: '一级菜单5', value: '一级菜单5', disabled: true },
  {
    text: '一级菜单6',
    value: '一级菜单6',
    disabled: false,
    children: [
      { text: '次级菜单6-1', value: '次级菜单6-1' },
      {
        text: '次级菜单6-2',
        value: '次级菜单6-2',
        children: [
          {
            text: '三级菜单6-2-1',
            value: '三级菜单6-2-1',
            children: [
              { text: 'sub1', value: 'sub1', children: [{ text: 'sub2', value: 'sub2' }] },
            ],
          },
          { text: '三级菜单6-2-2', value: '三级菜单6-2-2' },
          { text: '三级菜单6-2-3', value: '三级菜单6-2-3' },
        ],
      },
    ],
  },
  { text: '一级菜单7', value: '一级菜单7', disabled: true },
  { text: '一级菜单8', value: '一级菜单8', disabled: false },
  { text: '一级菜单9', value: '一级菜单9', disabled: true },
  { text: '一级菜单10', value: '一级菜单10', disabled: false },
];

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      items,
      // selectedKeys: ['一级菜单6/次级菜单6-2/三级菜单a/sub1'],
      // expandedPath: ['一级菜单6/次级菜单6-2/三级菜单a/sub1'],
      selectedKeys: [],
      expandedPath: [],
      scrollerValue: 0,
      start: 0,
    };
  }

  render() {
    const { items = [], selectedKeys, expandedPath } = this.state;
    const checkedKey = '4';
    return (
      <div>
        <MenuWrap>
          <H2>级联嵌套菜单 </H2>
          <Box>
            <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
              <Menu
                separator={'/'}
                mutliple={false}
                popupVisible={true}
                // action={'click'}
                action={'hover'}
                expandedPath={expandedPath}
                selectedKeys={selectedKeys}
                handleIsInMenu={this.handleIsInMenu}
                data={hasChildrenData}
                offsetY={0}
                onMouseEnter={this.onMouseEnter}
                onClick={this.onClick}
              />
            </Theme>
          </Box>
          <Button onClick={this.btnClick}>hello</Button>
        </MenuWrap>

        <MenuWrap>
          <Box>
            <H2>单选框 checkedCSS: checkbox</H2>
            <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
              <Menu
                mutliple={false}
                data={items}
                checkedCSS={'checkbox'}
                onMouseEnter={this.onMouseEnter}
                onClick={this.clickDefaultMenu}
              />
            </Theme>
          </Box>

          <Box>
            <H2>多选框 checkedCSS: checkbox</H2>
            <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
              <Menu
                mutliple={true}
                data={items}
                checkedCSS={'checkbox'}
                onMouseEnter={this.onMouseEnter}
                onClick={this.clickDefaultMenu}
              />
            </Theme>
          </Box>
        </MenuWrap>

        <MenuWrap>
          <Box>
            <H2>单选框 checkedCSS: background</H2>
            <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
              <Menu
                mutliple={false}
                data={items}
                checkedCSS={'background'}
                onMouseEnter={this.onMouseEnter}
                onClick={this.clickDefaultMenu}
              />
            </Theme>
          </Box>

          <Box>
            <H2>多选框 checkedCSS: background</H2>
            <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
              <Menu
                mutliple={true}
                data={items}
                checkedCSS={'background'}
                onMouseEnter={this.onMouseEnter}
                onClick={this.clickDefaultMenu}
              />
            </Theme>
          </Box>
        </MenuWrap>

        <MenuWrap>
          <Box>
            <H2>单选框 checkedCSS: mark</H2>
            <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
              <Menu
                mutliple={false}
                data={items}
                checkedCSS={'mark'}
                onMouseEnter={this.onMouseEnter}
                onClick={this.clickDefaultMenu}
              />
            </Theme>
          </Box>

          <Box>
            <H2>多选框 checkedCSS: mark</H2>
            <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
              <Menu
                mutliple={false}
                data={items}
                checkedCSS={'mark'}
                onMouseEnter={this.onMouseEnter}
                onClick={this.clickDefaultMenu}
              />
            </Theme>
          </Box>
        </MenuWrap>

        <MenuWrap>
          <Box>
            <H2>单选框 checkedCSS: none</H2>
            <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
              <Menu
                mutliple={false}
                data={items}
                checkedCSS={'none'}
                onMouseEnter={this.onMouseEnter}
                onClick={this.clickDefaultMenu}
              />
            </Theme>
          </Box>

          <Box>
            <H2>多选框 checkedCSS: none</H2>
            <Theme config={{ [Widget.Menu]: { width: 200, submenuWidth: 150 } }}>
              <Menu
                mutliple={true}
                data={items}
                checkedCSS={'none'}
                onMouseEnter={this.onMouseEnter}
                onClick={this.clickDefaultMenu}
              />
            </Theme>
          </Box>
        </MenuWrap>
      </div>
    );
  }

  clickDefaultMenu = (e, keys, item) => {
    const { selectedKeys } = keys;
    // console.log('selectedKeys', selectedKeys);
  };

  btnClick = (e, keys, item) => {
    this.setState({
      selectedKeys: ['一级菜单6/次级菜单6-2/三级菜单6-2-1/sub1'],
      expandedPath: ['一级菜单6/次级菜单6-2/三级菜单6-2-1/sub1'],
    });
  };

  onClick = (e, keys, item) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeys, expandedPath: selectedKeys });
  };

  onMouseEnter = (event, expandedPath, item) => {
    this.setState({ expandedPath });
  };

  onScroller = (start, end) => {
    // this.setState({ start });
  };
}

/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import Affix from './affix';
import Button from '../button';

export default class AffixDemo extends React.Component<any, any> {
  EleRef: any;
  Ele2Ref: any;
  constructor() {
    super();
    this.EleRef = null;
    this.Ele2Ref = null;
    this.state = {
      display: true,
    };
  }
  handleClick = () => {
    const { display } = this.state;
    this.setState({
      display: !display,
    });
  };
  handleChange = (val: boolean) => {
    console.info(val);
  };
  render() {
    const { display } = this.state;
    return (
      <div onClick={this.handleClick}>
        {display ? (
          <div style={{ width: '200px', height: '1200px' }}>
            <div style={{ width: '200px', height: '200px' }} />
            <Affix offsetTop={50} onChange={this.handleChange}>
              <Button>affix-top</Button>
            </Affix>

            <div
              style={{ width: '200px', height: '200px', overflowY: 'scroll' }}
              ref={node => (this.EleRef = node)}
            >
              <div style={{ height: '400px' }}>
                <div style={{ width: '20px', height: '100px' }} />
                <Affix offsetTop={50} target={() => this.EleRef} onChange={this.handleChange}>
                  <Button>affix-top</Button>
                </Affix>
              </div>
            </div>
            <div
              style={{ width: '200px', height: '200px', overflowY: 'scroll' }}
              ref={node => (this.Ele2Ref = node)}
            >
              <div style={{ height: '400px' }}>
                <div style={{ width: '20px', height: '200px' }} />
                <Affix offsetBottom={50} target={() => this.Ele2Ref}>
                  <Button>affix2-bottom</Button>
                </Affix>
              </div>
            </div>

            <div style={{ width: '200px', height: '500px' }} />
            <Affix offsetBottom={50}>
              <Button>affix-bottom</Button>
            </Affix>
            <div style={{ width: '200px', height: '500px' }} />
          </div>
        ) : (
          <div style={{ width: '200px', height: '1200px' }}>unmount Affix</div>
        )}
      </div>
    );
  }
}

/**
 *
 * create by liangguodong on 2018/8/14
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme';
import NumberInput from './';
import Button from '../button';
import styled from 'styled-components';
import SearchIcon from '../icon/SearchIcon';

export class LimitNumberInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: props.value };
  }

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
    this.props.onChange({ newValue: value });
  };

  render() {
    const { value } = this.state;
    const { max, min, step } = this.props;
    return <NumberInput max={max} min={min} step={step} value={value} onChange={this.onChange} />;
  }
}

export class DefaultValueNumberInput extends React.Component<any, any> {
  render() {
    return (
      <NumberInput
        defaultValue={1000}
        onChange={this.props.onChange}
        max={10000}
        min={100}
        step={100}
      />
    );
  }
}
class DisabledNumberInput extends React.Component<any, any> {
  state = {
    disabled: true,
  };

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    return (
      <div>
        <NumberInput min={1} max={10} disabled={this.state.disabled} defaultValue={5} />
        <p />
        <Button onClick={this.toggle} type="primary">
          点击切换
        </Button>
      </div>
    );
  }
}

class ValidateInput extends React.Component<any, any> {
  state = { value: '' };

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
    this.props.onChange({ newValue: value });
  };

  render() {
    const { validateType } = this.props;
    const value = this.state.value;
    const validateStatus = String(value).indexOf('5') !== -1 ? 'error' : 'default';
    return (
      <NumberInput
        value={value}
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}

const Wrapper = styled.div`
  margin-left: 50px;
`;

const NumberInputDemo = () => {
  const view = {};
  const onChange = (cmpName: string) => (value: any) => {};
  const formatter = (value: string) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const parser = (value: string) => {
    return value.replace(/\$\s?|(,*)/g, '');
  };
  return (
    <div>
      <Wrapper>
        <Theme config={view}>
          <p>small size</p>
          <NumberInput size={'small'} placeholder="small NumberInput" max={5} />
          <p>default size</p>
          <NumberInput placeholder="default NumberInput" />
          <p>large size</p>
          <NumberInput size={'large'} placeholder="large NumberInput" />
          <p>禁用状态 </p>
          <NumberInput disabled={true} />
          <p>可控制disabled 的numberInput</p>
          <DisabledNumberInput />
          <p>主动聚焦的numberInput</p>
          <button
            onClick={() => {
              this.inputFocus();
            }}
          >
            点击主动聚焦
          </button>
          <NumberInput
            getFocus={focus => {
              this.inputFocus = focus;
            }}
          />
          <p>校验信息显示类型 top 输入值 是否含有5</p>
          <ValidateInput validateType="top" onChange={onChange('limit')} />
          <p>校验信息显示类型 bottom 输入值 是否含有5</p>
          <ValidateInput validateType="bottom" onChange={onChange('limit')} />
          <p>校验信息显示类型 inner 输入值 是否含有5</p>
          <ValidateInput validateType="inner" onChange={onChange('limit')} />
        </Theme>
      </Wrapper>
      <Wrapper>
        <p>max 1 min 0.001 step 0.005 </p>
        <NumberInput max={1} min={0.001} step={0.005} defaultValue="0.05" precision={3} />
        <p>max 10 min 0.01 step 0.05 </p>
        <NumberInput max={10} min={0.01} step={0.05} defaultValue="1" precision={2} />
        <p>max 30 min 9 step 5 </p>
        <NumberInput max={30} min={9} step={5} defaultValue="10" precision={1} />
        <p>max 100 min -100 step -2 </p>
        <NumberInput max={100} min={-100} step={-2} />
      </Wrapper>
      <Theme config={view}>
        <Wrapper>
          <p>受限NumberInput</p>
          <LimitNumberInput onChange={onChange('limit')} value={200} max={100} step={10} />
          <p>有默认值的 受限NumberInput</p>
          <DefaultValueNumberInput onChange={onChange('limit')} />
          <p>formatter max 10000000 min 10000 step 10000</p>
          <NumberInput
            formatter={formatter}
            parser={parser}
            defaultValue={100000}
            max={1000000}
            min={10000}
            step={10000}
          />
          <p>formatter % max 100 min 5 step 5</p>
          <NumberInput
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            defaultValue={50}
            max={70}
            min={30}
            step={10}
          />
          <p>showArrow false 不显示步长箭头</p>
          <NumberInput showArrow={false} />
        </Wrapper>
      </Theme>

      <Wrapper style={{ marginTop: '10px' }}>
        <Theme config={view}>
          <p>配置后缀图标</p>
          <NumberInput
            placeholder="NumberInput"
            showArrow={false}
            suffix={<SearchIcon transferSuffixIcon="lugia-icon-direction_caret_down" />}
          />
        </Theme>
      </Wrapper>
    </div>
  );
};
export default NumberInputDemo;

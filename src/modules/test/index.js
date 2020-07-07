import React from 'react';
import classnames from 'classnames';
import { weChat } from '@/img';
import { observer, inject } from 'mobx-react';
import { dateFormat, numberFormat } from '@/utils/formatUtils';
import ComponentsTest from './components/ComponentsTest';
import { iosKeyMsg } from '@/utils';

@inject('TestStore')
@observer
class Test extends React.Component {
  static defaultProps = {
    prefixCls: 'test-container',
  }

  constructor(props) {
    super(props);
    this.state = {
      isGray: false
    }
  }

  componentDidMount() {
    const { TestStore } = this.props;
    const { mobxDataTest } = TestStore;

    iosKeyMsg();

    console.log('mobxDataTest:::', mobxDataTest);
    console.log('时间格式化:::', dateFormat(new Date('2020.07.04 18:18:16'), 'yyyy-MM-dd hh:mm:ss'));
    console.log('号码脱敏:::', numberFormat('18920199681'));

    setTimeout(() => {
      this.setState({
        isGray: true
      })
    }, 3000);

  }

  testModal(props) {
    const { prefixCls } = this.props;

    const testClassNames = classnames({
      [`${prefixCls}`]: true,
      'test-gray': this.state.isGray,
    });

    return (
      <div className={testClassNames}>
        <img src={weChat} alt='test' />
      </div>
    );
  }

  render() {
    const { prefixCls } = this.props;

    const testOpt = {
      paramTest: 'test'
    }

    return (
      <div className={prefixCls}>
        {this.testModal(testOpt)}
        <ComponentsTest {...testOpt} />
      </div>
    )
  }
}

export default Test;

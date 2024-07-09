import React, { Component } from 'react'; // Fixed import statement
import { Spin } from 'antd';

class Spinner extends Component {
    render() {
        return (
            <div className='spinner'>
                <Spin size='large'/>
            </div>
         );
    }
}

export default Spinner;

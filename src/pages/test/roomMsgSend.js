import React, { PureComponent } from 'react';
import { Button, Input, Form } from 'antd';
import style from './joinRoom.less';

const FormItem = Form.Item;

// function objDeepCopy(source) {
//   // check it is the array or object
//   const sourceCopy = source instanceof Array ? [] : {};

//   const keys = Object.keys(source);

//   for (let i = 0; i < keys.length; i += 1) {
//     // eslint-disable-line no-use-before-define
//     if (source != null) {
//       // recursively check the obj in array
//       sourceCopy[keys[i]] =
//         typeof source[keys[i]] === 'object' ? objDeepCopy(source[keys[i]]) : source[keys[i]];
//     }
//   }
//   return sourceCopy;
// }

class RoomMsgSend extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, socket, currentRoom } = this.props;

    // calling the effect for search
    form.validateFields((err, values) => {
      if (!err) {
        console.log(err, values);
        socket.emit('roomBoardcastTest', currentRoom, values.message);
      }
    });
  }

  render() {
    const { form, message } = this.props;
    const { getFieldDecorator } = form;

    // forming message list
    const msgList = [];
    for (let i = 0; i < message.length; i += 1) {
      msgList.push(<li key={i}>{message[i]}</li>);
    }

    return (
      <div>
        <div className={style.chatRoom}>
          <h3>Room Message List</h3>
          <ul>{msgList}</ul>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem key="message" label="Boardcast Message">
            {getFieldDecorator('message', {
              rules: [{ required: true, message: 'Please input room name!' }],
            })(<Input placeholder="Message" />)}
          </FormItem>
          <FormItem key="submitButton">
            <Button type="primary" htmlType="submit">
              {' '}
              Room Boardcast Test{' '}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const RoomMsgSendForm = Form.create()(RoomMsgSend);
export default RoomMsgSendForm;

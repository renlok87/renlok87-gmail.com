import React from "react";
import { Form, Input, Button } from 'antd';


export const TimerInput = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout='vertical'
            style={{width: 140}}
        >
            <Form.Item
                label="Задайте таймер"
                name="timer"
                rules={[{ required: true, message: 'Пожалуйста, введите корректное значение' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Задать таймер
                </Button>
            </Form.Item>
        </Form>
    );
};

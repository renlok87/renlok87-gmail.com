import React, {useState} from "react";
import {Row, Col, Layout, Card, Form, Input, Button, TimePicker} from 'antd';
import {MyTimer} from "../MyTimer";

export function Timer() {
    const [timerValue, setTimerValue] = useState(null);
    const [timeStamp, setTimeStamp] = useState(null);
    const [form] = Form.useForm();

    const handleChangeDebut = (time) => {
        if (time !== null) {
            setTimerValue(Number(time.format('m') * 60) + Number(time.format('s')) + Time.getSeconds());
            console.log(Number(time.format('m') * 60) + Number(time.format('s')) + Time.getSeconds());
            setTimeStamp(time.format('X'));
        }
    };
    const format = 'mm:ss';
    const Time = new Date();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Row>
                <Col span={12} offset={6}>
                        <Card style={{margin: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <TimePicker
                                    name="time"
                                    onChange={handleChangeDebut}
                                    format={format}
                                />
                            </div>

                            <MyTimer expiryTimestamp={timerValue} />
                        </Card>

                </Col>
            </Row>

        </Layout>
    );
}

import React, {useEffect, useState} from 'react';
import { Form, Input, Button, Space, message } from 'antd';

const AddForm = () => {
    const [form] = Form.useForm();

    // const [data, setData] = useState([]);
    // useEffect(() => {
        // Check if data exists in localStorage

    const onFinish = (values) => {
        const storedData = localStorage.getItem('tableData');
        const parsedData = storedData ? JSON.parse(storedData) : [];  // Parse or fallback to empty array if null
        const counter = parsedData.length
        values.key=counter
        values.tags=["En Attente"]
        // console.log('Form Submitted:', values);
        message.success('Item added successfully!');
        parsedData.push(values)
        localStorage.setItem('tableData', JSON.stringify(parsedData));
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="addForm"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
                title: '',
                description: '',
            }}
            style={{ maxWidth: '600px', margin: '0 auto' }}
        >
            <Form.Item
                name="name"
                label="Titre"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input placeholder="Enter the title" />
            </Form.Item>



            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Add Item
                    </Button>
                    <Button htmlType="button" onClick={() => form.resetFields()}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default AddForm;

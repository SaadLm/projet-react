import React from 'react';
import { Form, Input, Button, Space, message } from 'antd';

const AddForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // Submit data logic
        console.log('Form Submitted:', values);
        message.success('Item added successfully!');
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
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input placeholder="Enter the title" />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Input.TextArea rows={4} placeholder="Enter a description" />
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

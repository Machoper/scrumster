import { Form, Modal } from 'antd';
import React from 'react'

interface IProps {
    title: string
    visible: boolean
    onSubmit: (values: any) => void
    confirmLoading?: boolean
    onCancel: () => void
    // component: React.FC<any>
    getContent: () => JSX.Element
    initialValues?: any
}

const FormModal: React.FC<IProps> = ({
    title,
    visible,
    onSubmit,
    confirmLoading,
    onCancel,
    getContent,
    initialValues
}) => {

    const [form] = Form.useForm();

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onSubmit(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
            confirmLoading={false}
            onCancel={onCancel}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={initialValues}
            >
                {getContent()}
            </Form>
        </Modal>
    )
}

export default FormModal
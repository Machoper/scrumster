import { Form, Modal } from 'antd';
import React from 'react'

interface IProps {
    visible: boolean
    onSubmit: (values: any) => void
    confirmLoading?: boolean
    onCancel: () => void
    // component: React.FC<any>
    getContent: () => JSX.Element
}

const FormModal: React.FC<IProps> = ({
    visible,
    onSubmit,
    confirmLoading,
    onCancel,
    getContent,
}) => {

    const [form] = Form.useForm();

    return (
        <Modal
            title="Title"
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
            >
                {getContent()}
            </Form>
        </Modal>
    )
}

export default FormModal
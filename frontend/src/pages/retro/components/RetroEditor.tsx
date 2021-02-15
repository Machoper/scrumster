import { Button, Form } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'


interface IProps {
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	onSubmit: () => void
	submitting: boolean
	value: string
}

const RetroEditor: React.FC<IProps> = ({
	onChange,
	onSubmit,
	submitting,
	value
}) => (
	<>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
				Add
      		</Button>
		</Form.Item>
	</>
)

export default RetroEditor
import { EditFilled, DeleteFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { Comment, List, Card } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'


interface IProps {
	items: any[]
	removeItem: (itemId: string) => void
}

const RetroItemList: React.FC<IProps> = ({
	items,
	removeItem
}) => {

	const viewMode = useSelector((state: any) => state.getIn(['retro', 'viewMode']))

	return (
		<List
			dataSource={items}
			header={`${items.length} ${items.length > 1 ? 'Items' : 'Item'}`}
			itemLayout="horizontal"
			renderItem={item =>
				<Card
					actions={[
						<EditFilled key='edit' />,
						<DeleteFilled key='delete' onClick={() => removeItem(item.id)} />
					]}
				>
					{viewMode || item.read ?
						<Comment
							style={{ margin: '-16px 0' }}
							author={item.authorName}
							content={item.content}
						/> : <div className='align-center-flex' style={{fontSize: 30}}><EyeInvisibleFilled /></div>}
				</Card>
			}
		/>
	)
}

export default RetroItemList
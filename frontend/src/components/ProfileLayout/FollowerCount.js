import React from 'react'
import { Typography } from 'antd';

const { Text } = Typography;

export default function FollowerCount({numberOfFollowers}) {
  return (
    <div>
      <Text type="secondary">{numberOfFollowers} Followers</Text>
    </div>
  )
}

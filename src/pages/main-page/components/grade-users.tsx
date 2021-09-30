import React, { FC } from 'react';
import { Tabs } from 'antd';
import PositiveUsers from './positive-users';
import NegativeUsers from './negative-users';

const { TabPane } = Tabs;

const GradeUser: FC = (props) => {
    return (
        <div>
            <Tabs>
                <TabPane tab="С позитивной оценкой" key="1">
                    <PositiveUsers />
                </TabPane>
                <TabPane tab="С отрицательной оценкой" key="2">
                    <NegativeUsers />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default GradeUser;
import React, { FC, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PositiveUsers from './positive-users';
import NegativeUsers from './negative-users';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../store/configureStore';

const { TabPane } = Tabs;

const GradeUser: FC = (props) => {
    const [active, setActive] = useState<string>('1');
    const { activeTab } = useSelector((store: RootStore) => store.users)

    useEffect(() => {
        setActive(activeTab)
    }, [activeTab])

    return (
        <div>
            <Tabs activeKey={active} onChange={setActive}>
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
import { FC, useEffect, useState } from "react";
import { Layout, Row, Col, Button } from 'antd';
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { /* getNextUsers, */ getUsers } from "../../store/bus/user/actions";
import { RootStore } from "../../store/configureStore";
import UserList from './components/userList'
import GradeUsers from './components/grade-users';
import { UserRequestType } from "../../store/bus/user/types";


const MainPage: FC = () => {
    const dispatch = useDispatch();
    const { userList, currentPage } = useSelector((store: RootStore) => store.users)

    useEffect(() => {
        getUsersList()
    }, [])

    const getUsersList = (data: UserRequestType = {page: 1, size: 3}) => {
        dispatch(getUsers.async({...data}));
    }
    
    return (
        <Layout>
            <div>
                <Row >
                    <Col span={12}>
                        <Content
                            className="content__block"
                        >
                            <Button 
                                type="primary"
                                style={{marginRight: 10}}
                                size="small" 
                                loading={userList.loading}
                                onClick={() => getUsersList()}
                            >
                                Обновить список
                            </Button>
                            <Button 
                                type="default" 
                                size="small"
                                onClick={() => getUsersList({page: currentPage + 1, size: 3})}
                            >
                                Следующая страница
                            </Button>
                            <UserList />
                        </Content>
                    </Col>
                    <Col span={12}>
                        <Content
                            className="content__block content__block--border"
                        >
                            <GradeUsers />
                        </Content>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default MainPage;
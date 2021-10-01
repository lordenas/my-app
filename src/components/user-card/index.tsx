import { FC } from 'react';
import { Card, Button, Tooltip, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { User } from '../../store/bus/user/types';
import { useDispatch } from 'react-redux';
import { banUser, rewardUser } from '../../store/bus/user/actions';

const { Meta } = Card;
const { confirm } = Modal;

type UserCardProps = {
    user: User;
    up: (id: number) => void;
    down: (id: number) => void;
    showDelete?: boolean;
    deleteUser?: (id: number) => void;
}

const UserCard: FC<UserCardProps> = (props) => {
    const dispatch = useDispatch();



    const plus = () => {
        props.up(props.user.id)
        
        if(props.user.rating >= 4) {
 
            confirm({
                content: `Нужно вознаградить ${props.user.first_name}. Сделать это?`,
                onOk() {
                    dispatch(rewardUser({userId: props.user.id}))
                },
                onCancel() {
                  console.log('Закрыть');
                },
              });
        }
    }
    
    const minus = () => {
        props.down(props.user.id)

        if(props.user.rating <= -4) {
            confirm({
                content: `Пора забанить ${props.user.first_name}. Сделать это?`,
                onOk() {
                    dispatch(banUser({userId: props.user.id}))
                },
                onCancel() {
                    console.log('Закрыть');
                },
              });
        }
    }

    const deleteButton = () => {
        props.deleteUser && props.deleteUser(props.user.id)
    }

    return (
        <Card
            hoverable
            style={{
                width: 140,
                marginBottom: 20,
                marginRight: 20,
                cursor: 'default'
            }}
            cover={<img alt="example" src={props.user.avatar} />}
        >
            <Meta title={`${props.user.first_name + props.user.last_name}`} description={`Рейтинг: ${props.user.rating}`} />

            <div className="card__action">
                <Tooltip title="Увеличить рейтинг">
                    <Button 
                        type="primary" 
                        size="small" 
                        style={{marginRight: 5, width: 30}}
                        onClick={plus}
                    >
                        +
                    </Button>
                </Tooltip>
                <Tooltip title="Уменьшить рейтинг">
                    <Button 
                        type="primary"
                        danger
                        size="small" 
                        style={{width: 30}}
                        onClick={minus}
                    >
                        -
                    </Button>
                </Tooltip>
            </div>
            {
                props.user.rating === 0 && props.showDelete &&
                    <div className="card__delete">
                        <Tooltip title="Удалить">
                            <Button 
                                type="dashed" 
                                danger 
                                shape="circle" 
                                icon={<DeleteOutlined />}
                                onClick={deleteButton}
                            />
                        </Tooltip>
                    </div>
            }
        </Card>
    )
}

export default UserCard;
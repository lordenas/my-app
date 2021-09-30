import React, { FC } from 'react';
import { Card, Button, Tooltip  } from 'antd';
import { User } from '../../store/bus/user/types';
import { useDispatch } from 'react-redux';
import { addNegativeRating, addPositiveRating , downRating, upRating} from '../../store/bus/user/actions';

const { Meta } = Card;

type UserCardProps = {
    user: User;
    up: (id: number) => void;
    down: (id: number) => void;
}

const UserCard: FC<UserCardProps> = (props) => {
    const dispatch = useDispatch();



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
                        onClick={() => props.up(props.user.id)}
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
                        onClick={() => props.down(props.user.id)}
                    >
                        -
                    </Button>
                </Tooltip>
            </div>
        </Card>
    )
}

export default UserCard;
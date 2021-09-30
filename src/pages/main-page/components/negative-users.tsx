import { Row } from 'antd';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from '../../../components';
import { downRating, upRating } from '../../../store/bus/user/actions';
import { RootStore } from '../../../store/configureStore';



const NegativeUser: FC = (props) => {
    const dispatch = useDispatch();
    const { negativeUsersList } = useSelector((store: RootStore) => store.users)

	const upRatingButton = (id: number) => {
        dispatch(upRating(id));
    }

    const downRatingButton = (id: number) => {
        dispatch(downRating(id));
    }

    return (
        <div className="card__block">
			<Row>
				{
					negativeUsersList.map((item) => (
                        <UserCard 
                            user={item}
                            key={item.id}
                            up={upRatingButton}
                            down={downRatingButton}
                        />
					))
				}
			</Row>
		</div>
    )
}

export default NegativeUser;
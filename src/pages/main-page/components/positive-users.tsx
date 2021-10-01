import { Row } from 'antd';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from '../../../components';
import { RootStore } from '../../../store/configureStore';
import { downgrade, upRating } from '../../../store/bus/user/actions';

const PositiveUser: FC = (props) => {
    const dispatch = useDispatch();
    const { positiveUsersList } = useSelector((store: RootStore) => store.users)

    const upRatingButton = (id: number) => {
        dispatch(upRating({userId: id, type:'POSITIVE'}));
    }

    const downgradeButton = (id: number) => {
        dispatch(downgrade({userId: id, type: 'POSITIVE'}));
    }

	return (
		<div className="card__block">
			<Row>
				{
					positiveUsersList.map((item) => (
                        <UserCard 
                            user={item}
                            key={item.id}
                            up={upRatingButton}
                            down={downgradeButton}
                            showDelete
                        />
					))
				}
			</Row>
		</div>
	)
}

export default PositiveUser;
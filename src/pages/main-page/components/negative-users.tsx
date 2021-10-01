import { Row } from 'antd';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from '../../../components';
import { downgrade, upRating } from '../../../store/bus/user/actions';
import { RootStore } from '../../../store/configureStore';

const NegativeUser: FC = (props) => {
    const dispatch = useDispatch();
    const { negativeUsersList } = useSelector((store: RootStore) => store.users)

	const upRatingButton = (id: number) => {
        dispatch(upRating({userId: id, type: 'NEGATIVE'}));
    }

    const downgradeButton = (id: number) => {
        dispatch(downgrade({userId: id, type: 'NEGATIVE'}));
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
                            down={downgradeButton}
                            showDelete
                        />
					))
				}
			</Row>
		</div>
    )
}

export default NegativeUser;
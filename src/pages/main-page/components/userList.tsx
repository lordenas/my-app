import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootStore } from "../../../store/configureStore";
import { UserCard } from '../../../components'
import { Row } from "antd";
import { addNegativeRating, addPositiveRating } from "../../../store/bus/user/actions";

const MainPage: FC = () => {
	const dispatch = useDispatch();
	const { userList } = useSelector((store: RootStore) => store.users)

	const upRatingButton = (id: number) => {
        dispatch(addPositiveRating(id));
    }

    const downRatingButton = (id: number) => {
        dispatch(addNegativeRating(id));
    }

	return (
		<div className="card__block">
			<Row>
				{
					userList.data.map((item) => (
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

export default MainPage;
import { all } from 'redux-saga/effects';

// Watchers
import { watchUsers } from './bus/user/sagas/wathcer'


export default function* rootSaga(): Generator {
    while (true) {
        try {
            yield all([
                watchUsers()
            ]);
        } catch(error) {
            console.log('_____error root saga____-', error)
        }
    }

}
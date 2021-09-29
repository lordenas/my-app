import { all } from 'redux-saga/effects';


// Watchers


export default function* rootSaga(): Generator {
    while (true) {
        try {
            yield all([

            ]);
        } catch(error) {
            console.log('_____error root saga____-', error)
        }
    }

}
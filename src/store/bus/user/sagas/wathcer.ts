import { all, call, takeEvery } from "@redux-saga/core/effects";
import { SagaIterator } from "@redux-saga/types";
import { userList} from "./worker";
import { getUsers } from "../actions";

function* watchUsersList(): SagaIterator {
    yield takeEvery(getUsers.async, userList)
}


export function* watchUsers(): SagaIterator {
    yield all([
        call(watchUsersList),
    ])
}
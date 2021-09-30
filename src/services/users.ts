
import $axios from "../utils/axios-instance";
import { User, UserRequestType } from "../store/bus/user/types";

export default class UsersApi {
    async getUsers (data: UserRequestType) {
        return await $axios.get<User[]>(`/users/random_user?size=${data.size}&page=${data.page}`).then((res) => res).catch(e => {
            throw(e)
        })
    }
}
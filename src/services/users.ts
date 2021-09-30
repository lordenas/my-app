
import $axios from "../utils/axios-instance";
import { User, UserRequestType } from "../store/bus/user/types";

export default class UsersApi {
    async getUsers (data: Omit<UserRequestType, 'rating' | 'typeRating'>) {
        return await $axios.get<User[]>(`/users/random_user?size=${data.size}&page=${data.page}`).then((res) => res).catch(e => {
            throw(e)
        })
    }
}
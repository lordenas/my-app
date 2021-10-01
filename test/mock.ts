import { AxiosError } from "axios";

export const axiosError: AxiosError = {
    config: { url: '' },
    code: '400',
    isAxiosError: true,
    toJSON: () => ({}),
    name: '',
    message: 'test error',
}


export const userMock = {
    "id": 4122,
    "uid": "05483d93-88fb-4bb8-b5cc-cf2fc542274e",
    "password": "PgURYzL8mA",
    "first_name": "Zachery",
    "last_name": "Bayer",
    "username": "zachery.bayer",
    "email": "zachery.bayer@email.com",
    "avatar": "https://robohash.org/quaeidipsam.png?size=300x300&set=set1",
    "gender": "Non-binary",
    "phone_number": "+227 271-540-2619",
    "social_insurance_number": "747398808",
    "date_of_birth": "1986-01-30",
    "employment": {
        "title": "Direct Sales Director",
        "key_skill": "Teamwork"
    },
    "address": {
        "city": "McLaughlinmouth",
        "street_name": "Ruecker Squares",
        "street_address": "1411 Mayola Square",
        "zip_code": "11390-9269",
        "state": "New Jersey",
        "country": "United States",
        "coordinates": {
            "lat": -69.67846938458382,
            "lng": 135.98424367162983
        }
    },
    "credit_card": {
        "cc_number": "4207119331244"
    },
    "subscription": {
        "plan": "Starter",
        "status": "Idle",
        "payment_method": "WeChat Pay",
        "term": "Annual"
    },
    "rating": 1
}

import Cookie from "js-cookie";
import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { formatDate } from "./lib/utils";

const token = localStorage.getItem("token");

if (token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}


const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8000/api/v1/" : "https://mysfakebnbite.onrender.com//api/v1/",
    withCredentials: true,
});

export const getRooms = () => instance.get("rooms/").then(response => response.data);
export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomID] = queryKey;
    return instance.get(`rooms/${roomID}`).then((response) => response.data);
};
export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomID] = queryKey;
    return instance.get(`rooms/${roomID}/reviews`).then((response) => response.data);
};

export const getMe = () =>
    instance.get(`users/my-profile`).then((response) => response.data);


export const logOut = () => instance
    .post(`users/log-out`, null, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) => instance
    .post(`users/github`, { code }, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    })
    .then((response) => response.status);

export const kakaoLogIn = (code: string) => instance
    .post(`users/kakao`, { code }, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    })
    .then((response) => response.status);

export interface IUsernameLoginVariables {
    username: string;
    password: string;
}
export interface IUsernameLoginSuccess {
    ok: string;
}
export interface IUsernameLoginError {
    error: string;
}

export const usernameLogIn = ({
    username,
    password,
}: IUsernameLoginVariables) =>
    instance
        .post(
            `users/log-in`,
            { username, password },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                    Authorization: null,
                },
            }
        )
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common[
                "Authorization"
            ] = `Token ${response.data.token}`;
            return response.data;
        });


export interface ISignUpVariables {
    name: string;
    email: string;
    username: string;
    password: string;
    currency: string;
    gender: string;
    language: string;
}

export const userSignUp = ({
    username,
    password,
    email,
    name,
    currency,
    gender,
    language,
}: ISignUpVariables) =>
    instance
        .post(
            `users/`,
            { username, password, email, name, currency, gender, language },
            {
                headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
            }
        )
        .then((response) => response.data);



export const getAmenities = () =>
    instance.get(`rooms/amenities/`).then((response) => response.data);

export const getCategories = () =>
    instance.get(`categories/room-category`).then((response) => response.data);

export interface IUploadRoomVariables {
    name: string;
    country: string;
    city: string;
    price: number;
    rooms: number;
    toilets: number;
    description: string;
    address: string;
    pet_friendly: boolean;
    kind: string;
    amenities: number[];
    category: number;
}


export const uploadRoom = (roomvariables: IUploadRoomVariables) =>
    instance
        .post(
            `rooms/`,
            roomvariables,
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);

export interface IEditRoomVariables {
    name: string;
    country: string;
    city: string;
    price: number;
    rooms: number;
    toilets: number;
    description: string;
    address: string;
    pet_friendly: boolean;
    kind: string;
    amenities: number[];
    category: number;
    roomID: string;
}

export const editRoom = (variables: IEditRoomVariables) =>
    instance
        .put(`rooms/${variables.roomID}`, variables, {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);



export const getUploadURL = () =>
    instance
        .post(
            `medias/photos/get-upload-url`, null,
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);

export interface IUploadImageVarialbles {
    file: FileList;
    uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVarialbles) => {
    const form = new FormData();
    form.append("file", file[0]);
    return axios
        .post(uploadURL, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

export interface ICreatePhotoVariables {
    description: string;
    file: string;
    roomID: string;
}


export const createPhoto = ({ description, file, roomID }: ICreatePhotoVariables) =>
    instance.post(`rooms/${roomID}/photos`, { description, file },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    )
        .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
    queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
    const [_, roomID, dates] = queryKey;
    if (dates) {
        const [firstDate, secondDate] = dates;
        const checkIn = formatDate(firstDate);
        const checkOut = formatDate(secondDate);
        return instance
            .get(
                `rooms/${roomID}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
            )
            .then((response) => response.data);
    }
};


export interface IReserveBookingVariables {
    pk: string;
    check_in: string;
    check_out: string;
    guests: number;
}


export const reserveBooking = (variables: IReserveBookingVariables) =>
    instance
        .post(`rooms/${variables.pk}/bookings`, variables, {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => response.status);


export type GetBookingQueryKey = [
    string,
    string?,
    {
        year: number;
        month: number;
    }?
];

export interface ISearchDate {
    year: number;
    month: number;
}

//api for owner
export const getReservation = ({
    queryKey,
}: QueryFunctionContext<GetBookingQueryKey>) => {
    const [_, roomID, formDate] = queryKey;
    const year = formDate?.year;
    const month = formDate?.month;
    return instance
        .get(`rooms/${roomID}/bookings?year=${year}&month=${month}`)
        .then((response) => response.data);
};


export const getMyBookings = () =>
    instance.get("bookings/me").then((response) => response.data);



export const cancelBooking = (bookingPk: number) =>
    instance
        .post(`bookings/me/${bookingPk}/cancel`, null, {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => response.status);
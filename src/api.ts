import Cookie from "js-cookie";
import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    withCredentials: true,
});

export const getRooms = () => instance.get("rooms/").then(response => response.data);
export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, room_id] = queryKey;
    return instance.get(`rooms/${room_id}`).then((response) => response.data);
};
export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, room_id] = queryKey;
    return instance.get(`rooms/${room_id}/reviews`).then((response) => response.data);
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
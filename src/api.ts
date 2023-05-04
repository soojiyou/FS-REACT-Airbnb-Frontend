import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/"
});

export const getRooms = () => instance.get("rooms/").then(response => response.data);
export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, room_id] = queryKey;
    return instance.get(`rooms/${room_id}`).then((response) => response.data);
};
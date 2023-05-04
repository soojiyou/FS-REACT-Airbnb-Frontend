import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";

export default function RoomDetail() {
    const { room_id } = useParams();
    const { isLoading, data } = useQuery([`rooms`, room_id], getRoom);
    console.log(data);
    return <h1>hello</h1>;
}
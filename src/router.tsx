import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import UploadRoom from "./routes/UploadRoom";
import UploadPhotos from "./routes/UploadPhotos";
import EditRoom from "./routes/EditRoom";
import MyHostRoomReservations from "./routes/MyHostRoomReservations";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "rooms/upload",
                element: <UploadRoom />,
            },
            {
                path: "rooms/:roomID/",
                children: [
                    {
                        path: "",
                        element: <RoomDetail />,
                    },
                    {
                        path: "edit",
                        element: <EditRoom />,
                    },
                    {
                        path: "photos",
                        element: <UploadPhotos />,
                    },
                    {
                        path: "my-hosting-reservation",
                        element: <MyHostRoomReservations />
                    },
                ],
            },

            {
                path: "social",
                children: [
                    {
                        path: "github",
                        element: <GithubConfirm />,
                    },
                    {
                        path: "kakao",
                        element: <KakaoConfirm />,
                    },
                ],
            },

        ]

    },
]);

export default router;
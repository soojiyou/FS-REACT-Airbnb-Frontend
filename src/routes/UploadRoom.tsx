import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
    useHostOnlyPage();
    return (
        <ProtectedPage>
            <h1>Upload Room</h1>
        </ProtectedPage>
    )
}
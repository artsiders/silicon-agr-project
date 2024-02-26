import LoginForm from "../components/LoginForm";
import Topbar from "../components/Topbar";

export default function Login() {
    return (
        <div>
            <Topbar />
            <div className="min-h-screen w-full flex justify-center items-center">
                <LoginForm />
            </div>
        </div>
    )
}

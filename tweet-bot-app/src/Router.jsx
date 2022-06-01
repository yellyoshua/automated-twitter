import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "./App"
import Authentication from "./components/Authentication";
import HomePage from "./pages/HomePage"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <Authentication>
                        <HomePage />
                    </Authentication>
                } />
                <Route path="/login" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}
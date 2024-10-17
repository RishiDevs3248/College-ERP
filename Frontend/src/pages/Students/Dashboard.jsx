import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "./Profile";
import NoMatch from "../../components/NoMatch";
import Calander from "../../components/Calander";
import UpdateProfile from "./UpdateProfile";
import Logout from "./Logout";
import UpdateCredentials from "./UpdateCredentials";
import ID from "./ID";


export default function Dashboard() {
    const Location = useLocation();
    let ifDashboard = false;
    if (Location.pathname === "/student/Dashboard") {
        ifDashboard = true;
    }
    return (
        <div>
            {/* {ifDashboard && <>
                <Calander></Calander>
            </>} */}
            <Routes>
                <Route path="/" element={<Calander />} />
                <Route path="Profile" element={<Profile />} />
                <Route path="UpdateProfile" element={<UpdateProfile />} />
                <Route path="UpdateCredentials" element={<UpdateCredentials />} />
                <Route path="Logout" element={<Logout />} />
                <Route path="ID" element={<ID />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </div>
    );
}

import { Route, Routes, useLocation } from "react-router-dom";
import Calander from "../../../components/Calander";
import NoMatch from "../../../components/NoMatch";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdateCredentials from "./UpdateCredentials";
import ID from "./ID";
import Logout from "./Logout";

export default function Dashboard() {
    const Location = useLocation();
    let ifDashboard = false;
    if (Location.pathname === "/teacher/Dashboard") {
        ifDashboard = true;
    }
    return (<>
        {/* {ifDashboard && <>
            <Calander></Calander>
        </>} */}
        <Routes>
            <Route path="/" element={<Calander />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="UpdateProfile" element={<UpdateProfile />} />
            <Route path="UpdateCredentials" element={<UpdateCredentials />} />
            <Route path="ID" element={<ID />} />
            <Route path="Logout" element={<Logout />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </>
    );
}
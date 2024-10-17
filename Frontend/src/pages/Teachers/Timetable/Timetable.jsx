import { Route, Routes } from "react-router-dom";
import NoMatch from "../../../components/NoMatch";
import CreateOrUpdate2nd3rd4thYearTimetable from "./CreateOrUpdate2nd-3rd-4thYrarTimetable";
import CreateOrUpdateFYtt from "./CreateORUpdateFYtt";
import DeleteFYtt from "./DeleteFYtt";
import GetTimetable from "./GetTimetable";

export default function UpdateProfile() {
    return (
        <Routes>
        <Route path="/" element={<CreateOrUpdate2nd3rd4thYearTimetable />} />
        <Route path="CreateOrUpdateFYtt" element={< CreateOrUpdateFYtt/>} />
        <Route path="GetTimetable" element={< GetTimetable/>} />
        <Route path="DeleteFYtt" element={< DeleteFYtt/>} />
        <Route path="*" element={<NoMatch />} />
    </Routes>
    );
}
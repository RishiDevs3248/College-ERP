import { Route, Routes, useLocation } from "react-router-dom";
import NoMatch from "../../../components/NoMatch";
import NewStudent from "./NewStudent";
import NewTeacher from "./NewTeacher";


export default function NewMember() {
    return (<>
        <Routes>
            <Route path="/" element={<NewTeacher />} />
            <Route path="Newstudent" element={<NewStudent />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </>
    );
}
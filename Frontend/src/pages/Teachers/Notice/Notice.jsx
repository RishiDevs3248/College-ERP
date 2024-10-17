import { Route, Routes, useLocation } from "react-router-dom";
import NewNotice from "./NewNotice";
import DeleteParticularNotice from "./DeleteParticularNotice";
import DeleteAllNotice from "./DeleteAllNotice";
import NoMatch from "../../../components/NoMatch";
import GetNotice from "./GetNotice";


export default function Notice() {
    return (<>
        <Routes>
            <Route path="/" element={<NewNotice />} />
            <Route path="GetNotice" element={<GetNotice />} />
            <Route path="DeleteParticularNotice" element={<DeleteParticularNotice />} />
            <Route path="DeleteAllNotice" element={<DeleteAllNotice />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </>
    );
}
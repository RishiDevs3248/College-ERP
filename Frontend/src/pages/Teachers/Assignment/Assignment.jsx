import { Route, Routes, useLocation } from "react-router-dom";
import NoMatch from "../../../components/NoMatch";
import CreateOrUpdateAssignment from "./NewOrUpdateAssignment";
import DeleteParticularAssignment from "./Delete";
import DeleteAllAssignment from "./DeleteAll";
import GetAssignment from "./GetAssignment";

export default function Assignment() {
    return (<>
        <Routes>
            <Route path="/" element={<CreateOrUpdateAssignment />} />
            <Route path="GetAssignment" element={<GetAssignment />} />
            <Route path="DeleteParticularAssignment" element={<DeleteParticularAssignment />} />
            <Route path="DeleteAllAssignment" element={<DeleteAllAssignment />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </>
    );
}
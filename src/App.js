import TextEditor from "./Screens/textEditor/TextEditor";
import "./app.scss";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import HomeScreen from "./Screens/homeScreen/HomeScreen";
import TextViewer from "./Screens/textViewer/TextViewer";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route
                    path="/document/create"
                    element={<Navigate to={`/document/edit/${uuidV4()}`} />}
                />
                <Route path="/document/edit/:id" element={<TextEditor />} />
                <Route path="/document/view/:id" element={<TextViewer />} />
            </Routes>
        </Router>
    );
}

export default App;

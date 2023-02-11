import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import "./homeScreen.scss";
import HomePageDocView from "./HomePageDocView";

export default function HomeScreen() {
    const [documents, setDocuments] = useState([]);
    const fetchDocuments = async () => {
        const { data } = await axios.get("http://localhost:8000/documents");

        setDocuments(data);
    };
    useEffect(() => {
        fetchDocuments();
    }, []);

    const createDocument = () => {
        window.location.href = `/document/edit/${uuidV4()}`;
    };

    const DeleteDocument = async (id) => {
        const res = await axios.delete(`http://localhost:8000/documents/${id}`);
        console.log(res);
        fetchDocuments();
    };

    const openDocument = (id) => {
        window.location.href = `/document/edit/${id}`;
    };

    const ViewDocument = (id) => {
        window.location.href = `/document/view/${id}`;
    };

    const changeDocumentName = async (id, documentName) => {
        console.log(id, documentName);
        const res = axios.put(`http://localhost:8000/documents/${id}`, {
            documentName,
        });
        if (res.status === 200) {
            fetchDocuments();
        }
    };

    return (
        <div className="Homepage_container">
            {/* {JSON.stringify(documents)} */}

            <div className="create_new">
                <div className="create_new_btn" onClick={createDocument}>
                    <h3>Create New Document</h3>
                </div>
            </div>
            <div>
                <h1>Previous Documents</h1>
                <div className="document_holder">
                    {documents.map((document, index) => (
                        <HomePageDocView
                            document={document}
                            DeleteDocument={DeleteDocument}
                            openDocument={openDocument}
                            changeDocumentName={changeDocumentName}
                            index={index}
                            ViewDocument={ViewDocument}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

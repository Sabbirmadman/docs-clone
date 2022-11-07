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
        await axios.delete(`http://localhost:8000/documents/${id}`);
        fetchDocuments();
    };

    const openDocument = (id) => {
        window.location.href = `/document/edit/${id}`;
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
                    {documents.map((document) => (
                        <div
                            key={document._id}
                            className="document_card"
                            onClick={() => openDocument(document._id)}
                        >
                            <p>
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                                {document._id}
                            </p>

                            <button
                                className="delete_btn"
                                onClick={() => DeleteDocument(document._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

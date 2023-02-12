import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./textViewer.scss";

export default function TextViewer() {
    const { id: documentId } = useParams();
    const [documentData, setDocumentData] = useState();

    useEffect(() => {
        const fetchDocument = async () => {
            const res = await axios.get(
                `http://localhost:8000/documents/${documentId}`
            );
            setDocumentData(res.data.data);
        };
        fetchDocument();
    }, [documentId]);

    const wrapperRef = useCallback(
        (wrapper) => {
            if (wrapper == null) return;
            wrapper.innerHTML = "";
            const editor = document.createElement("div");
            wrapper.append(editor);
            const quill = new Quill(editor, {
                theme: "snow",
                modules: {
                    toolbar: false,
                },

                readOnly: true,
            });
            quill.setContents(documentData);
        },
        [documentData]
    );

    return (
        <div className="textViewerContainer">
            <div className="headerContainer">Teaching C</div>
            <div className="quillViewContainer" ref={wrapperRef}></div>
        </div>
    );
}

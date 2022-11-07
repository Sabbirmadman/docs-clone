import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./textEditor.scss";

import io from "socket.io-client";

import { useParams } from "react-router-dom";

const SAVE_INTERVAL_MS = 2000;

export default function TextEditor() {
    const { id: documentId } = useParams();
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    useEffect(() => {
        const s = io("http://localhost:3001");
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket == null || quill == null) return;
        const interVal = setInterval(() => {
            socket.emit("save-document", quill.getContents());
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interVal);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        socket.once("load-document", (document) => {
            console.log(document);
            quill.setContents(document);

            quill.enable();
        });

        socket.emit("get-document", documentId);
    }, [socket, quill, documentId]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const handler = (delta) => {
            quill.updateContents(delta);
        };
        socket.on("receive-changes", handler);

        return () => {
            socket.off("receive-changes", handler);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const handler = (delta, oldDelta, source) => {
            if (source !== "user") return;
            socket.emit("send-changes", delta);
        };
        quill.on("text-change", handler);

        return () => {
            quill.off("text-change", handler);
        };
    }, [socket, quill]);

    const TOOLBAR_OPTIONS = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["image", "blockquote", "code-block"],
        ["clean"],
    ];

    const wrapperRef = useCallback((wrapper) => {
        //prevent quill from creating a new editor on every render
        if (wrapper == null) return;
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);

        const q = new Quill(editor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS },
        });
        q.disable();
        q.setText("Loading...");
        setQuill(q);
    }, []);

    //download the file
    const handleTextPrint = () => {
        window.print();
    };

    return (
        <div className="TextEditor_container">
            <div
                id="printable"
                className="Text-container"
                ref={wrapperRef}
            ></div>
            <div className="downloadBtn" onClick={handleTextPrint}>
                <i class="fa-solid fa-print"></i>
            </div>
        </div>
    );
}

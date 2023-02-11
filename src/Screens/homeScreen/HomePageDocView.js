import React, { useState } from "react";
import "./homeScreen.scss";
export default function HomePageDocView({
    document,
    DeleteDocument,
    openDocument,
    changeDocumentName,
    index,
    ViewDocument,
}) {
    const [editor, closeDocument] = useState(false);
    const [docName, setDocName] = useState(document.documentName);
    const updateDocumentName = () => {
        changeDocumentName(document._id, docName);
        closeDocument(!editor);
    };

    return (
        <div key={document._id} className="document_card">
            <p>
                <div
                    style={{
                        height: "30px",
                        width: "100%",
                        backgroundColor: "gray",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                    }}
                >
                    {index + 1}
                </div>
                <i
                    onClick={() => openDocument(document._id)}
                    class="fa-solid fa-arrow-up-right-from-square"
                ></i>{" "}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    {editor ? (
                        <textarea
                            type="text"
                            value={docName}
                            style={{
                                width: "100%",
                                fontSize: "15px",
                            }}
                            onChange={(e) => setDocName(e.target.value)}
                        />
                    ) : (
                        <p
                            style={{
                                cursor: "pointer",
                                color: "blue",
                            }}
                            onClick={() => openDocument(document._id)}
                        >
                            {document.documentName}
                        </p>
                    )}
                    <i
                        class="fa-solid fa-edit"
                        style={{
                            cursor: "pointer",
                            marginLeft: "10px",
                            color: "blue",
                            fontSize: "20px",
                        }}
                        onClick={() =>
                            editor
                                ? updateDocumentName()
                                : closeDocument(!editor)
                        }
                    ></i>
                </div>
            </p>

            <button
                className="view_btn"
                onClick={() => ViewDocument(document._id)}
            >
                View
            </button>

            <button
                className="delete_btn"
                onClick={() => DeleteDocument(document._id)}
            >
                Delete
            </button>
        </div>
    );
}

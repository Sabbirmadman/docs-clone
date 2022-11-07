import React, { useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
    const [documents, setDocuments] = React.useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            const { data } = await axios.get("http://localhost:8000/documents");
            setDocuments(data);
        };
        fetchDocuments();
    }, []);

    return <div>{JSON.stringify(documents)}</div>;
}

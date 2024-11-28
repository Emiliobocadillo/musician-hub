import React, { useState } from "react";
import { createEnsemble } from "../services/ensembleService";

const CreateEnsemblePage: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createEnsemble({ name, description });
            setMessage("Ensemble created successfully!");
            setName("");
            setDescription("");
        } catch (error: any) {
            setMessage(error.message || "Failed to create ensemble.");
        }
    };

    return (
        <div>
            <h1>Create Ensemble</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create Ensemble</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateEnsemblePage;

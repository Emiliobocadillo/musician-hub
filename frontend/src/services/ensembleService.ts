import apiClient from "./apiClient";

export const createEnsemble = async (ensembleData: { name: string; description: string }) => {
    try {
        const response = await apiClient.post("/ensemble", ensembleData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create ensemble.");
    }
};

export const registerInEnsemble = async (ensembleId: string): Promise<string> => {
    try {
        const response = await apiClient.patch(`/ensemble/${ensembleId}/register`);
        return response.data; // Success message from the backend
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to register in ensemble.");
    }
};

export const getAllEnsembles = async (): Promise<any[]> => {
    try {
        const response = await apiClient.get("/ensemble"); // Fetch all ensembles
        return response.data; // Return the array of ensembles
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch ensembles.");
    }
};

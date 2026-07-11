import api from "./api";

const managerService = {

    getAllReports: async () => {
        const response = await api.get("/reports");
        return response.data;
    },

    lockReport: async (id) => {
        const response = await api.patch(`/reports/${id}/lock`);
        return response.data;
    }

};

export default managerService;
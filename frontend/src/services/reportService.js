import api from "./api";

const reportService = {
  createReport: async (reportData) => {
    const response = await api.post("/reports", reportData);
    return response.data;
  },

  getMyReports: async () => {
        const response = await api.get("/reports/my");
        return response.data;
    },


    updateReport: async (id, reportData) => {
        const response = await api.put(`/reports/${id}`, reportData);
        return response.data;
    },


    submitReport: async (id) => {
        const response = await api.patch(`/reports/${id}/submit`);
        return response.data;
    },

    getAllReports: async()=>{
        const response = await api.get("/reports");
        return response.data;
    },

};

export default reportService;
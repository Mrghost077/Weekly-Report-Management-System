import { createReport, getMyReports, updateReport, submitReport, getAllReports} from "../services/report.service.js";


export const create = async (req, res) => {
    try {

        const report = await createReport(
            req.user.id,
            req.body
        );

        res.status(201).json({
            message: "Report created successfully",
            report,
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message,
        });

    }
};



export const getMine = async (req, res) => {
    try {

        const reports = await getMyReports(
            req.user.id
        );

        res.status(200).json(reports);

    } catch (error) {

         res.status(error.statusCode || 500).json({
            message: error.message,
        });

    }
};

export const update = async (req, res) => {
    try {

        const report = await updateReport(
            req.params.id,
            req.user.id,
            req.body
        );

        res.status(200).json({
            message: "Report updated successfully",
            report,
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message,
        });

    }
};



export const submit = async (req, res) => {
    try {

        const report = await submitReport(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            message: "Report submitted successfully",
            report,
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message,
        });

    }
};

export const getAll = async (req, res) => {

    try {

        const reports = await getAllReports();

        res.status(200).json(reports);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message,
        });

    }
};
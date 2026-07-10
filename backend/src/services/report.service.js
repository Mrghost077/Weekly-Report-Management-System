import prisma from "../config/prisma.js";


export const createReport = async (userId, reportData) => {

    // checking if report already exist for particular user at particular week and project
    const existingReport = await prisma.report.findFirst({
    where: {
        userId,
        projectId: reportData.projectId,
        reportWeek: reportData.reportWeek,
        reportYear: reportData.reportYear,
    },
});

if (existingReport) {
    const error = new Error(
        "A report already exists for this project and week."
    );
    error.statusCode = 409;
    throw error;
}

    const report = await prisma.report.create({
        data: {
            userId,

            projectId: reportData.projectId,

            reportWeek: reportData.reportWeek,
            reportYear: reportData.reportYear,

            tasksCompleted: reportData.tasksCompleted,
            tasksPlanned: reportData.tasksPlanned,

            blockers: reportData.blockers,
            hoursWorked: reportData.hoursWorked,
            notes: reportData.notes,

            submissionStatus: "DRAFT",
        },
    });


    return report;
};



export const getMyReports = async (userId) => {

    const reports = await prisma.report.findMany({

        where: {
            userId,
        },

        include: {
            project: true,
        },

        orderBy: {
            createdAt: "desc",
        },

    });


    return reports;
};

export const getAllReports = async () => {

    const reports = await prisma.report.findMany({

        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },

            project: true,
        },

        orderBy: {
            createdAt: "desc",
        },

    });


    return reports;
};

export const updateReport = async (reportId, userId, reportData) => {

    const report = await prisma.report.findUnique({
        where: {
            id: Number(reportId),
        },
    });

    if (!report) {
        const error = new Error("Report not found.");
        error.statusCode = 404;
        throw error;
    }

    if (report.userId !== userId) {
        const error = new Error("You are not authorized to edit this report.");
        error.statusCode = 403;
        throw error;
    }

    if (report.submissionStatus === "LOCKED") {
        const error = new Error("This report has been locked.");
        error.statusCode = 400;
        throw error;
    }

    const updatedReport = await prisma.report.update({
        where: {
            id: Number(reportId),
        },
        data: {
            projectId: reportData.projectId,
            tasksCompleted: reportData.tasksCompleted,
            tasksPlanned: reportData.tasksPlanned,
            blockers: reportData.blockers,
            hoursWorked: reportData.hoursWorked,
            notes: reportData.notes,
        },
    });

    return updatedReport;
};

export const submitReport = async (reportId, userId) => {

    const report = await prisma.report.findUnique({
        where: {
            id: Number(reportId),
        },
    });

    if (!report) {
        const error = new Error("Report not found.");
        error.statusCode = 404;
        throw error;
    }

    if (report.userId !== userId) {
        const error = new Error("You are not authorized to submit this report.");
        error.statusCode = 403;
        throw error;
    }

    if (report.submissionStatus === "SUBMITTED") {
    const error = new Error("This report has already been submitted.");
    error.statusCode = 400;
    throw error;
}

    if (report.submissionStatus === "LOCKED") {
        const error = new Error("This report has already been locked.");
        error.statusCode = 400;
        throw error;
    }

    const updatedReport = await prisma.report.update({
        where: {
            id: Number(reportId),
        },
        data: {
            submissionStatus: "SUBMITTED",
            submittedAt: new Date(),
        },
    });

    return updatedReport;
};
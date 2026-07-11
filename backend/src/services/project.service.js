import prisma from "../config/prisma.js";

export const createProject = async (projectData) => {
    const { name, description } = projectData;

    const project = await prisma.project.create({
        data: {
            name,
            description,
        },
    });

    return project;
};


export const getProjects = async () => {
    const projects = await prisma.project.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return projects;
};


export const updateProject = async (id, projectData) => {
    const { name, description, isActive } = projectData;

    const project = await prisma.project.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
            description,
            isActive,
        },
    });

    return project;
};


export const deleteProject = async (id) => {
    const project = await prisma.project.update({
        where: {
            id: Number(id),
        },
        data: {
            isActive: false,
        },
    });

    return project;
};
import {createProject,getProjects,updateProject,deleteProject} from "../services/project.service.js";


export const create = async (req, res) => {
    try {
        const project = await createProject(req.body);

        res.status(201).json({
            message: "Project created successfully",
            project,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const getAll = async (req, res) => {
    try {
        const projects = await getProjects();

        res.status(200).json(projects);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const update = async (req, res) => {
    try {
        const project = await updateProject(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Project updated successfully",
            project,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const remove = async (req, res) => {
    try {
        const project = await deleteProject(
            req.params.id
        );

        res.status(200).json({
            message: "Project deleted successfully",
            project,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
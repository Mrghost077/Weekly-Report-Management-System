import { useEffect, useState } from "react";
import projectService from "../../services/projectService";


function Projects() {


    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);


    const [formData, setFormData] = useState({

        name: "",
        description: ""

    });


    const [editingId, setEditingId] = useState(null);



    const fetchProjects = async()=>{

        try {

            const data = await projectService.getProjects();

            setProjects(data);


        } catch(error){

            console.error(
                "Failed to fetch projects:",
                error.response?.data || error.message
            );

        } finally {

            setLoading(false);

        }

    };



    useEffect(()=>{

        fetchProjects();

    },[]);





    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };






    const handleSubmit = async(e)=>{

        e.preventDefault();


        try {


            if(editingId){

                await projectService.updateProject(
                    editingId,
                    formData
                );

            } else {

                await projectService.createProject(
                    formData
                );

            }


            setFormData({

                name:"",
                description:""

            });


            setEditingId(null);


            fetchProjects();


        } catch(error){

            console.error(
                "Failed saving project:",
                error.response?.data || error.message
            );

        }

    };





    const handleEdit = (project)=>{


        setEditingId(project.id);


        setFormData({

            name: project.name,

            description: project.description || ""

        });


    };






    const handleDelete = async(id)=>{


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );


        if(!confirmDelete)
            return;



        try {


            await projectService.deleteProject(id);


            fetchProjects();



        } catch(error){

            console.error(
                "Failed deleting project:",
                error.response?.data || error.message
            );

        }


    };





    if(loading){

        return (

            <div className="p-6">

                Loading projects...

            </div>

        );

    }





    return (

        <div>


            <div className="mb-6">


                <h2 className="text-3xl font-bold text-gray-800">

                    Project Management

                </h2>


                <p className="mt-2 text-gray-600">

                    Create and manage team projects.

                </p>


            </div>





            <div className="grid gap-6 md:grid-cols-3">





                {/* Form */}

                <div className="rounded-lg bg-white p-6 shadow">


                    <h3 className="mb-4 text-xl font-semibold">

                        {
                            editingId
                            ?
                            "Edit Project"
                            :
                            "Add Project"
                        }

                    </h3>



                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >


                        <input

                            type="text"

                            name="name"

                            value={formData.name}

                            onChange={handleChange}

                            placeholder="Project name"

                            className="w-full rounded border p-2"

                            required

                        />



                        <textarea

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                            placeholder="Description"

                            rows="4"

                            className="w-full rounded border p-2"

                        />



                        <button

                            type="submit"

                            className="rounded bg-blue-600 px-5 py-2 text-white"

                        >

                            {
                                editingId
                                ?
                                "Update"
                                :
                                "Create"
                            }


                        </button>



                    </form>


                </div>







                {/* Project List */}

                <div className="md:col-span-2 rounded-lg bg-white shadow">


                    <table className="w-full">


                        <thead className="bg-gray-100">


                            <tr>


                                <th className="p-3 text-left">
                                    Name
                                </th>


                                <th className="p-3 text-left">
                                    Description
                                </th>


                                <th className="p-3 text-left">
                                    Actions
                                </th>


                            </tr>


                        </thead>




                        <tbody>


                            {
                                projects.length === 0

                                ?

                                (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="p-5 text-center text-gray-500"
                                        >

                                            No projects found

                                        </td>

                                    </tr>

                                )


                                :

                                projects.map((project)=>(


                                    <tr
                                        key={project.id}
                                        className="border-t"
                                    >


                                        <td className="p-3">

                                            {project.name}

                                        </td>



                                        <td className="p-3">

                                            {project.description || "-"}

                                        </td>




                                        <td className="p-3">


                                            <div className="flex gap-2">


                                                <button

                                                    onClick={()=>handleEdit(project)}

                                                    className="rounded bg-blue-600 px-3 py-1 text-white"

                                                >

                                                    Edit

                                                </button>




                                                <button

                                                    onClick={()=>handleDelete(project.id)}

                                                    className="rounded bg-red-600 px-3 py-1 text-white"

                                                >

                                                    Delete

                                                </button>



                                            </div>


                                        </td>



                                    </tr>


                                ))

                            }


                        </tbody>


                    </table>


                </div>



            </div>



        </div>


    );


}


export default Projects;
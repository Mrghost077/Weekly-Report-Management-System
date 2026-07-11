import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

import reportService from "../../services/reportService";
import projectService from "../../services/projectService";


function EditReport() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);


    const {
        register,
        handleSubmit,
        reset
    } = useForm();



    useEffect(() => {

        const loadData = async () => {

            try {

                // Fetch projects
                const projectData = await projectService.getProjects();
                setProjects(projectData);


                // Fetch reports
                const reports = await reportService.getMyReports();


                const report = reports.find(
                    (item) => item.id === Number(id)
                );


                if(!report){
                    alert("Report not found");
                    navigate("/member/reports");
                    return;
                }


                // Populate form
                reset({

                    projectId: report.projectId,

                    reportWeek: report.reportWeek,

                    reportYear: report.reportYear,

                    tasksCompleted: report.tasksCompleted,

                    tasksPlanned: report.tasksPlanned,

                    blockers: report.blockers || "",

                    hoursWorked: report.hoursWorked || "",

                    notes: report.notes || ""

                });


            } catch(error){

                console.error(
                    "Failed to load report:",
                    error.response?.data || error.message
                );

            } finally {

                setLoading(false);

            }

        };


        loadData();


    }, [id, navigate, reset]);





    const onSubmit = async(data)=>{

        try {


            await reportService.updateReport(
                id,
                data
            );


            alert("Report updated successfully");


            navigate("/member/reports", {
                replace: true
            });


        } catch(error){

            console.error(
                "Failed to update report:",
                error.response?.data || error.message
            );

        }

    };




    if(loading){

        return (
            <div className="p-6">
                Loading report...
            </div>
        );

    }




    return (

        <div>


            <div className="mb-6">

                <h2 className="text-3xl font-bold text-gray-800">
                    Edit Weekly Report
                </h2>

                <p className="mt-2 text-gray-600">
                    Update your weekly work report.
                </p>

            </div>



            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 rounded-lg bg-white p-6 shadow"
            >


                {/* Project */}

                <div>

                    <label className="block text-sm font-medium text-gray-700">
                        Project
                    </label>


                    <select
                        {...register("projectId")}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    >


                        {
                            projects.map((project)=>(

                                <option
                                    key={project.id}
                                    value={project.id}
                                >
                                    {project.name}
                                </option>

                            ))
                        }


                    </select>

                </div>




                {/* Week Year */}

                <div className="grid gap-4 md:grid-cols-2">


                    <div>

                        <label className="block text-sm font-medium text-gray-700">
                            Report Week
                        </label>


                        <input
                            type="number"
                            {...register("reportWeek")}
                            readOnly
                            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 p-2"
                        />

                    </div>




                    <div>

                        <label className="block text-sm font-medium text-gray-700">
                            Report Year
                        </label>


                        <input
                            type="number"
                            {...register("reportYear")}
                            readOnly
                            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 p-2"
                        />

                    </div>


                </div>





                {/* Tasks Completed */}

                <div>

                    <label className="block text-sm font-medium text-gray-700">
                        Tasks Completed
                    </label>


                    <textarea
                        {...register("tasksCompleted")}
                        rows="4"
                        className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    />


                </div>





                {/* Tasks Planned */}

                <div>

                    <label className="block text-sm font-medium text-gray-700">
                        Tasks Planned
                    </label>


                    <textarea
                        {...register("tasksPlanned")}
                        rows="4"
                        className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    />


                </div>





                {/* Blockers */}

                <div>

                    <label className="block text-sm font-medium text-gray-700">
                        Blockers
                    </label>


                    <textarea
                        {...register("blockers")}
                        rows="3"
                        className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    />

                </div>





                {/* Hours */}

                <div>

                    <label className="block text-sm font-medium text-gray-700">
                        Hours Worked
                    </label>


                    <input
                        type="number"
                        {...register("hoursWorked")}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    />

                </div>





                {/* Notes */}

                <div>

                    <label className="block text-sm font-medium text-gray-700">
                        Notes
                    </label>


                    <textarea
                        {...register("notes")}
                        rows="3"
                        className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    />

                </div>





                <div className="flex gap-3">


                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                    >
                        Update Report
                    </button>



                    <button
                        type="button"
                        onClick={() => navigate("/member/reports")}
                        className="rounded-md bg-gray-500 px-6 py-2 text-white"
                    >
                        Cancel
                    </button>


                </div>



            </form>


        </div>

    );


}


export default EditReport;
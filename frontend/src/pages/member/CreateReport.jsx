import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import projectService from "../../services/projectService";
import reportService from "../../services/reportService";

function CreateReport() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
        try {
            const data = await projectService.getProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
     };

     fetchProjects();
    }, []);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();


  const onSubmit = async (data) => {

    try {

        setLoading(true);


        const reportData = {
            ...data,

            projectId: Number(data.projectId),
            reportWeek: Number(data.reportWeek),
            reportYear: Number(data.reportYear),
            hoursWorked: Number(data.hoursWorked),
        };


        const response = await reportService.createReport(reportData);


        console.log("Report created:", response);


        alert("Report saved successfully");


        reset();


    } catch (error) {

        console.error(
            "Failed to create report:",
            error.response?.data || error.message
        );


        alert(
            error.response?.data?.message ||
            "Failed to create report"
        );


    } finally {

        setLoading(false);

    }

};


  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Create Weekly Report
        </h2>

        <p className="mt-2 text-gray-600">
          Submit your weekly work progress and updates.
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
            <option value="">
              Select Project
            </option>

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


        {/* Week and Year */}
        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Report Week
            </label>

            <input
              type="number"
              {...register("reportWeek")}
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">
              Report Year
            </label>

            <input
              type="number"
              {...register("reportYear")}
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

        </div>


        {/* Text Areas */}

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


        <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
            {
                loading 
                ? "Saving..."
                : "Save Report"
            }
        </button>

      </form>
    </div>
  );
}

export default CreateReport;
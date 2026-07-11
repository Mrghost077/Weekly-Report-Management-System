import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import managerService from "../../services/managerService";

function ViewReport() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchReport = async () => {

            try {

                const reports = await managerService.getAllReports();

                const selectedReport = reports.find(
                    item => item.id === Number(id)
                );

                setReport(selectedReport);

            } catch (error) {

                console.error(
                    error.response?.data || error.message
                );

            } finally {

                setLoading(false);

            }

        };

        fetchReport();

    }, [id]);



    if (loading) {

        return <div className="p-6">Loading report...</div>;

    }

    if (!report) {

        return <div className="p-6">Report not found.</div>;

    }

    return (

        <div>

            <div className="mb-6">

                <h2 className="text-3xl font-bold">
                    Weekly Report
                </h2>

                <p className="text-gray-600 mt-2">
                    View submitted weekly report.
                </p>

            </div>



            <div className="space-y-6 rounded-lg bg-white p-6 shadow">

                <div>

                    <h3 className="font-semibold text-gray-700">
                        Employee
                    </h3>

                    <p>
                        {report.user.firstName} {report.user.lastName}
                    </p>

                    <p className="text-gray-500">
                        {report.user.email}
                    </p>

                </div>



                <div>

                    <h3 className="font-semibold text-gray-700">
                        Project
                    </h3>

                    <p>{report.project.name}</p>

                </div>



                <div className="grid md:grid-cols-2 gap-4">

                    <div>

                        <h3 className="font-semibold">
                            Week
                        </h3>

                        <p>{report.reportWeek}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">
                            Year
                        </h3>

                        <p>{report.reportYear}</p>

                    </div>

                </div>



                <div>

                    <h3 className="font-semibold">
                        Tasks Completed
                    </h3>

                    <p className="whitespace-pre-wrap">
                        {report.tasksCompleted}
                    </p>

                </div>



                <div>

                    <h3 className="font-semibold">
                        Tasks Planned
                    </h3>

                    <p className="whitespace-pre-wrap">
                        {report.tasksPlanned}
                    </p>

                </div>



                <div>

                    <h3 className="font-semibold">
                        Blockers
                    </h3>

                    <p className="whitespace-pre-wrap">
                        {report.blockers || "-"}
                    </p>

                </div>



                <div>

                    <h3 className="font-semibold">
                        Hours Worked
                    </h3>

                    <p>{report.hoursWorked || "-"}</p>

                </div>



                <div>

                    <h3 className="font-semibold">
                        Notes
                    </h3>

                    <p className="whitespace-pre-wrap">
                        {report.notes || "-"}
                    </p>

                </div>



                <div>

                    <h3 className="font-semibold">
                        Status
                    </h3>

                    <p>{report.submissionStatus}</p>

                </div>



                <button
                    onClick={() => navigate("/manager")}
                    className="rounded bg-gray-600 px-5 py-2 text-white"
                >
                    Back
                </button>

            </div>

        </div>

    );

}

export default ViewReport;
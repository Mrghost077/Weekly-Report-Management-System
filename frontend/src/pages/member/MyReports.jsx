import { useEffect, useState } from "react";
import reportService from "../../services/reportService";
import { useNavigate } from "react-router-dom";

function MyReports() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

useEffect(() => {

        fetchReports();

    }, []);


    const fetchReports = async () => {

        try {

            const data = await reportService.getMyReports();

            setReports(data);

        } catch(error) {

            console.error(
                "Failed to fetch reports:",
                error.response?.data || error.message
            );

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async (id) => {

            try {

                await reportService.submitReport(id);

                // refresh table after submit
                const updatedReports = await reportService.getMyReports();

                setReports(updatedReports);


            } catch(error) {

                console.error(
                    "Failed to submit report:",
                    error.response?.data || error.message
                );

            }

    };



    if(loading){

        return (
            <div className="p-6">
                Loading reports...
            </div>
        );

    }



    return (

        <div>

            <div className="mb-6">

                <h2 className="text-3xl font-bold text-gray-800">
                    My Reports
                </h2>

                <p className="text-gray-600 mt-2">
                    View and manage your weekly work reports.
                </p>

            </div>



            <div className="bg-white rounded-lg shadow overflow-hidden">


                <table className="w-full">


                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3 text-left">
                                Project
                            </th>

                            <th className="p-3 text-left">
                                Week
                            </th>


                            <th className="p-3 text-left">
                                Year
                            </th>


                            <th className="p-3 text-left">
                                Status
                            </th>


                            <th className="p-3 text-left">
                                Actions
                            </th>


                        </tr>

                    </thead>



                    <tbody>


                    {
                        reports.length === 0 ? (

                            <tr>

                                <td 
                                colSpan="5"
                                className="text-center p-5 text-gray-500"
                                >
                                    No reports found
                                </td>

                            </tr>


                        ) : (

                            reports.map((report)=>(


                                <tr 
                                key={report.id}
                                className="border-t"
                                >


                                    <td className="p-3">
                                        {report.project.name}
                                    </td>


                                    <td className="p-3">
                                        {report.reportWeek}
                                    </td>


                                    <td className="p-3">
                                        {report.reportYear}
                                    </td>


                                    <td className="p-3">

                                        <span
                                        className={
                                            report.submissionStatus === "SUBMITTED"
                                            ?
                                            "rounded bg-green-100 px-3 py-1 text-green-700"
                                            :
                                            "rounded bg-yellow-100 px-3 py-1 text-yellow-700"
                                        }
                                        >

                                            {report.submissionStatus}

                                        </span>

                                    </td>


                                    <td className="p-3">

                                        {
                                            report.submissionStatus === "DRAFT"
                                            &&
                                            (
                                                <div className="space-x-2">

                                                   <button
                                                        onClick={() => navigate(`/member/reports/${report.id}/edit`)}
                                                        className="rounded bg-blue-600 px-3 py-1 text-white"
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        onClick={() => handleSubmit(report.id)}
                                                        className="rounded bg-green-600 px-3 py-1 text-white"
                                                        >
                                                            Submit
                                                    </button>


                                                </div>
                                            )
                                        }


                                    </td>


                                </tr>


                            ))

                        )
                    }


                    </tbody>


                </table>


            </div>


        </div>

    );

}


export default MyReports;
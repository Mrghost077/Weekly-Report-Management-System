import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import managerService from "../../services/managerService";


function ManagerDashboard() {


    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(true);


    const [selectedMember, setSelectedMember] = useState("");

    const [selectedProject, setSelectedProject] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("");



    const navigate = useNavigate();



    const fetchReports = async()=>{

        try{

            const data = await managerService.getAllReports();

            setReports(data);


        }catch(error){

            console.error(
                error.response?.data || error.message
            );

        }

    };



    useEffect(()=>{


        const load = async()=>{

            await fetchReports();

            setLoading(false);

        };


        load();


    },[]);




    const handleLock = async(id)=>{


        const confirmLock = window.confirm(
            "Lock this report?\nLocked reports cannot be edited."
        );


        if(!confirmLock)
            return;



        try{


            await managerService.lockReport(id);


            alert(
                "Report locked successfully"
            );


            fetchReports();



        }catch(error){


            alert(
                error.response?.data?.message ||
                "Failed to lock report"
            );


        }


    };




    const stats = useMemo(()=>{


        const submitted = reports.filter(
            report =>
            report.submissionStatus === "SUBMITTED"
        ).length;



        return {

            total: reports.length,


            draft:
            reports.filter(
                report =>
                report.submissionStatus==="DRAFT"
            ).length,


            submitted,


            locked:
            reports.filter(
                report =>
                report.submissionStatus==="LOCKED"
            ).length,



            blockers:
            reports.filter(
                report =>
                report.blockers &&
                report.blockers.trim() !== ""
            ).length,



            compliance:
            reports.length === 0
            ?
            0
            :
            Math.round(
                (submitted/reports.length)*100
            )

        };


    },[reports]);





    const members = [
        ...new Map(
            reports.map(report=>[
                report.user.email,
                report.user
            ])
        ).values()
    ];



    const projects = [
        ...new Map(
            reports.map(report=>[
                report.project.id,
                report.project
            ])
        ).values()
    ];




    const filteredReports = reports.filter(report=>{


        return (

            (selectedMember === "" ||
             report.user.email === selectedMember)


            &&


            (selectedProject === "" ||
             report.project.id === Number(selectedProject))


            &&


            (selectedStatus === "" ||
             report.submissionStatus === selectedStatus)

        );


    });






    if(loading){

        return (
            <div className="p-6">
                Loading dashboard...
            </div>
        );

    }







return (

<div>



<div className="mb-8">

<h2 className="text-3xl font-bold">
Manager Dashboard
</h2>


<p className="text-gray-600 mt-2">
Monitor team weekly reports and submission status.
</p>


</div>






{/* Statistics */}

<div className="grid md:grid-cols-5 gap-4 mb-8">


<div className="bg-white shadow rounded p-5">

<p>Total Reports</p>

<h3 className="text-3xl font-bold">
{stats.total}
</h3>

</div>



<div className="bg-white shadow rounded p-5">

<p>Submitted</p>

<h3 className="text-3xl font-bold text-green-600">
{stats.submitted}
</h3>

</div>




<div className="bg-white shadow rounded p-5">

<p>Pending</p>

<h3 className="text-3xl font-bold text-yellow-600">
{stats.draft}
</h3>

</div>





<div className="bg-white shadow rounded p-5">

<p>Compliance</p>

<h3 className="text-3xl font-bold">
{stats.compliance}%
</h3>

</div>





<div className="bg-white shadow rounded p-5">

<p>Open Blockers</p>

<h3 className="text-3xl font-bold text-red-600">
{stats.blockers}
</h3>

</div>


</div>







{/* Filters */}

<div className="bg-white shadow rounded p-5 mb-6 flex gap-4">


<select
className="border p-2 rounded"
value={selectedMember}
onChange={(e)=>setSelectedMember(e.target.value)}
>

<option value="">
All Members
</option>


{
members.map(member=>(

<option
key={member.email}
value={member.email}
>

{member.firstName} {member.lastName}

</option>

))
}


</select>






<select
className="border p-2 rounded"
value={selectedProject}
onChange={(e)=>setSelectedProject(e.target.value)}
>

<option value="">
All Projects
</option>


{
projects.map(project=>(

<option
key={project.id}
value={project.id}
>

{project.name}

</option>

))
}


</select>





<select
className="border p-2 rounded"
value={selectedStatus}
onChange={(e)=>setSelectedStatus(e.target.value)}
>


<option value="">
All Status
</option>


<option value="DRAFT">
Draft
</option>


<option value="SUBMITTED">
Submitted
</option>


<option value="LOCKED">
Locked
</option>


</select>



</div>








<div className="bg-white shadow rounded overflow-hidden">


<table className="w-full">


<thead className="bg-gray-100">

<tr>

<th className="p-3 text-left">
Member
</th>


<th className="p-3 text-left">
Project
</th>


<th className="p-3 text-left">
Week
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

filteredReports.length===0 ?

<tr>

<td
colSpan="5"
className="text-center p-5"
>

No reports found

</td>

</tr>


:


filteredReports.map(report=>(


<tr
key={report.id}
className="border-t"
>


<td className="p-3">

{report.user.firstName}
{" "}
{report.user.lastName}

</td>



<td className="p-3">

{report.project.name}

</td>



<td className="p-3">

Week {report.reportWeek}

</td>




<td className="p-3">

{report.submissionStatus}

</td>




<td className="p-3 flex gap-2">


<button

onClick={()=>
navigate(`/manager/reports/${report.id}`)
}

className="bg-gray-600 text-white px-3 py-1 rounded"

>

View

</button>




{
report.submissionStatus==="SUBMITTED"

&&

<button

onClick={()=>
handleLock(report.id)
}

className="bg-blue-600 text-white px-3 py-1 rounded"

>

Lock

</button>

}



</td>


</tr>


))


}



</tbody>


</table>


</div>



</div>


);


}


export default ManagerDashboard;
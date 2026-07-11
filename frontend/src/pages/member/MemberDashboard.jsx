import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function MemberDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.firstName}! 👋
        </h2>
        <p className="mt-2 text-gray-600">
          Manage your weekly reports and keep track of your submissions.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Create Report */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-xl font-semibold text-gray-800">
            Create Weekly Report
          </h3>

          <p className="mt-2 text-gray-600">
            Create a new weekly report and save it as a draft or submit it.
          </p>

          <Link
            to="/member/reports/new"
            className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            + New Report
          </Link>
        </div>

        {/* My Reports */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-xl font-semibold text-gray-800">
            My Reports
          </h3>

          <p className="mt-2 text-gray-600">
            View, edit, and manage your previously created reports.
          </p>

          <Link
            to="/member/reports"
            className="mt-6 inline-block rounded-md border border-gray-300 px-5 py-2 transition hover:bg-gray-100"
          >
            View Reports
          </Link>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Quick Tips
        </h3>

        <ul className="list-disc space-y-2 pl-5 text-gray-600">
          <li>Reports are initially saved as Drafts.</li>
          <li>Submitted reports cannot be edited.</li>
          <li>Submit your report before the weekly deadline.</li>
        </ul>
      </div>
    </div>
  );
}

export default MemberDashboard;
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function ManagerLayout() {


    const { user, logout } = useAuth();

    const navigate = useNavigate();



    const handleLogout = () => {

        logout();

        navigate("/login");

    };



    return (

        <div className="min-h-screen bg-gray-100">


            <header className="bg-white shadow">


                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">


                    <div>


                        <h1 className="text-xl font-bold">

                            Weekly Report Management System

                        </h1>


                        <p className="text-sm text-gray-600">

                            Manager Panel - Welcome, {user?.firstName}

                        </p>


                    </div>




                    <nav className="flex items-center gap-6">


                        <NavLink
                            to="/manager"
                            className={({isActive}) =>
                                isActive
                                ?
                                "font-bold text-blue-600"
                                :
                                "text-gray-700"
                            }
                        >

                            Dashboard

                        </NavLink>




                        <NavLink
                            to="/manager/projects"
                            className={({isActive}) =>
                                isActive
                                ?
                                "font-bold text-blue-600"
                                :
                                "text-gray-700"
                            }
                        >

                            Projects

                        </NavLink>





                        <button
                            onClick={handleLogout}
                            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >

                            Logout

                        </button>


                    </nav>


                </div>


            </header>





            <main className="mx-auto max-w-7xl p-6">


                <Outlet />


            </main>



        </div>

    );


}


export default ManagerLayout;
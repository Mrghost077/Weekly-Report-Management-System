import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";


function Login() {

  const {
    register,
    handleSubmit,
  } = useForm();


  const navigate = useNavigate();

  const { login } = useAuth();


  const onSubmit = async (data) => {

    try {

      const response = await authService.login(data);

      login(response);


      if (response.user.role === "MANAGER") {
        navigate("/manager");
      } 
      else {
        navigate("/member");
      }


    } catch (error) {

      console.error(error);

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >

        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>


        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          type="email"
          {...register("email", {
            required: true
          })}
        />


        <input
          className="border p-2 w-full mb-3"
          placeholder="Password"
          type="password"
          {...register("password", {
            required: true
          })}
        />


        <button
          className="bg-blue-600 text-white w-full py-2 rounded"
          type="submit"
        >
          Login
        </button>


      </form>

    </div>

  );
}


export default Login;
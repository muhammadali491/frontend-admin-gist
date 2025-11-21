import { FaRegCircleUser } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import "./SignIn.css";
import { useRef, useState } from "react";
import { login } from "../features/Admins/AdminSlice";
import Swal from "sweetalert2";

const SignIn = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.admin);

  let usernameRef = useRef();
  let passwordRef = useRef();

  const handleSubmit = (e) => {
    console.log("SignIn CLICKED");
    e.preventDefault();
    dispatch(
      login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  console.log(status);

  const alert = {
    loading: () =>
      Swal.fire({
        title: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      }),
    success: () =>
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your message has been sent successfully",
        confirmButtonText: "OK",
      }),
    error: () =>
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to Login, check creadintials",
        confirmButtonText: "OK",
      }),
  };

  if (status === "loading") {
    alert.loading();
  }
  if (status === "failed") {
    alert.error();
  }

  return (
    <>
      <div className="parent">
        <form
          className="fluid-container  margin card-4 light-grey text-blue margin"
          style={{ maxWidth: "50%", minWidth: "400px", padding: "0px" }}
        >
          <h2 className="center red">Sign In to Access CMS</h2>
          <div className="row section  " style={{ padding: 10 }}>
            <div className="col " style={{ width: 50 }}>
              <FaRegCircleUser className="xxlarge" />
            </div>
            <div className="rest ">
              <input
                ref={usernameRef}
                className="input border"
                name="username"
                type="text"
                placeholder="username"
                required
              />
            </div>
          </div>
          <div className="row section " style={{ padding: 10 }}>
            <div className="col" style={{ width: 50 }}>
              <IoKeyOutline className="xxlarge" />
            </div>
            <div className="rest">
              <input
                ref={passwordRef}
                required
                className="input border"
                name="password"
                type="text"
                placeholder="password"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="button block  red ripple padding"
          >
            SignIn
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;

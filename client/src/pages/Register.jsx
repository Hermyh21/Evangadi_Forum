import React, { useRef } from "react";
import axios from "../axiosConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !lastnameValue ||
      !firstnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("please fill in all fields");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      alert("registered successsfully, please login");
      // const history = useHistory();
      // history.push("/login");
      navigate("/login");
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="rows">
          <span>Username: </span>
          <input type="text" placeholder="username" ref={usernameDom} />
        </div>
        <br />
        <div className="rows">
          <span>First name: </span>
          <input type="text" placeholder="first name" ref={firstnameDom} />
        </div>
        <br />
        <div className="rows">
          <span>Last name: </span>
          <input type="text" placeholder="last name" ref={lastnameDom} />
        </div>
        <br />
        <div className="rows">
          <span>Email: </span>
          <input type="email" placeholder="email" ref={emailDom} />
        </div>
        <br />
        <div className="rows">
          <span>Password: </span>
          <input type="password" placeholder="password" ref={passwordDom} />
        </div>
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;

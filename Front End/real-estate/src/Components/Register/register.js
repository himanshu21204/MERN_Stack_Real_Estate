import "../../loginregister.css";
import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // User to broker Register Switch
  const [isBroker, setIsBroker] = useState(false);
  const [borderInput, setBorderInput] = useState("");
  const handleCheckboxChange = () => {
    setIsBroker(!isBroker);
  };

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    repassword: "",
    addresh: "",
    aboutBroker: "",
    profilePhoto: "",
    isbroker: isBroker,
  });
  const [error, setError] = useState("");
  // console.log(data)
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, phoneNumber, password, repassword, profilePhoto } =
      data;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("password", password);
      formData.append("repassword", repassword);
      formData.append("profilePhoto", profilePhoto);
      const { data } = await axios.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.error) {
        setError(data.error);
        setBorderInput("1px solid red");
      } else {
        setData({});
        setError("");
        setBorderInput("")
        toast.success("Register Success!!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Broker Appplied
  const appliedBroker = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
      repassword,
      addresh,
      aboutBroker,
      profilePhoto,
      isbroker,
    } = data;
    console.log(name)
    try {
      var formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("password", password);
      formData.append("repassword", repassword);
      formData.append("addresh", addresh);
      formData.append("aboutBroker", aboutBroker);
      formData.append("isbroker", isbroker);
      formData.append("profilePhoto", profilePhoto);
      const { data } = await axios.post("/broker-applied", 
        formData,
      );
      if (data.error) {
        setError(data.error);
        setBorderInput("1px solid red");
      } else {
        setError("")
        setBorderInput("")
        setData({});
        toast.success("Broker Applied Success!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        {isBroker ? (
          <section className="containerlogin forms" style={{ height: "130vh" }}>
            <div className="form signup" style={{ maxWidth: "700px" }}>
              <div className="form-content">
                <header className="headerlogin">Broker Applied form</header>
                <form action="#">
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      Name:
                    </lable>
                    <input
                      type="text"
                      style={
                        error && error.includes("Name")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="UserName"
                      className="input col"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Name") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      Email:
                    </lable>
                    <input
                      type="email"
                      style={
                        error && error.includes("Email")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Email"
                      className="input col"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Email") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      Contact:
                    </lable>
                    <input
                      type="number"
                      style={
                        error && error.includes("Phone")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Phone Number"
                      className="phone col"
                      value={data.phoneNumber}
                      onChange={(e) =>
                        setData({ ...data, phoneNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Phone") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      FirstName:
                    </lable>
                    <input
                      type="text"
                      style={
                        error && error.includes("First")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="First Name"
                      className="input col"
                      value={data.firstName}
                      onChange={(e) =>
                        setData({ ...data, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("First") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      LastName:
                    </lable>
                    <input
                      type="text"
                      style={
                        error && error.includes("Last")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Last Name"
                      className="input col"
                      value={data.lastName}
                      onChange={(e) =>
                        setData({ ...data, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Last") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      Password:
                    </lable>
                    <input
                      type="password"
                      style={
                        error && error.includes("Password")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Create password"
                      className="password col"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Password") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      RePassword:
                    </lable>
                    <input
                      type="password"
                      style={
                        error && error.includes("Match")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Confirm password"
                      className="password col"
                      value={data.repassword}
                      onChange={(e) =>
                        setData({ ...data, repassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Match") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div
                    className="field input-field row"
                    style={{  }}
                  >
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      Profile Photo:
                    </lable>
                    <input
                      type="file"
                      style={error && error.includes('Photo') ? { border: borderInput, paddingTop: "10px" } : {paddingTop: "10px"}}
                      className="col"
                      accept="image/*"
                      onChange={(e) =>
                        setData({ ...data,profilePhoto: e.target.files[0] })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Photo") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div
                    className="field input-field row"
                    style={{ marginBottom: "60px" }}
                  >
                    <lable
                      style={{ marginTop: "0px" }}
                      className="col-2 text-center"
                    >
                      Addresh:
                    </lable>
                    <textarea
                      rows={3}
                      type="txet"
                      style={
                        error && error.includes("Addresh")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Enter your Address"
                      className="input col"
                      value={data.addresh}
                      onChange={(e) =>
                        setData({ ...data, addresh: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Addresh") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div
                    className="field input-field row"
                    style={{ marginBottom: "60px" }}
                  >
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      About:
                    </lable>
                    <textarea
                      rows={3}
                      type="txet"
                      style={
                        error && error.includes("About")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Tell us about yourself as a broker"
                      className="input col"
                      value={data.aboutBroker}
                      onChange={(e) =>
                        setData({ ...data, aboutBroker: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("About") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="form-check" style={{ marginTop: "17px" }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      name="isBroker"
                      checked={isBroker}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      I am a Borker
                    </label>
                  </div>
                  <div className="field button-field">
                    <button type="submit" onClick={appliedBroker}>
                      Applied
                    </button>
                  </div>
                </form>
                <div className="form-link">
                  <span>
                    Already have an account?{" "}
                    <Link to="/login" className="link signup-link">
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="containerlogin forms">
            <div className="form signup">
              <div className="form-content">
                <header className="headerlogin">Signup</header>
                <form action="#">
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      Name:
                    </lable>
                    <input
                      type="text"
                      style={
                        error && error.includes("Name")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Name"
                      className="input col"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Name") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      Email:
                    </lable>
                    <input
                      type="email"
                      style={
                        error && error.includes("Email")
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Email"
                      className="input col"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Email") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className='row mb-4'>
                                <div className='col-2'></div>
                                {error && error.includes('email') && <div className="error-msg col" style={{color:"red"}}>{error}</div>}    
                            </div> 
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      Contact:
                    </lable>
                    <input
                      type="number"
                      style={
                        error && (error.includes("Phone-Number") || error.includes("Invalid"))
                          ? { border: borderInput }
                          : null
                      }
                      placeholder="Phone Number"
                      className="phone col"
                      value={data.phoneNumber}
                      onChange={(e) =>
                        setData({ ...data, phoneNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Phone-Number") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Invalid") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      Password:
                    </lable>
                    <input
                      type="password"
                      style={error && error.includes('Password') ? { border: borderInput } : null}
                      placeholder="Create password"
                      className="password col"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Password") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="field input-field row">
                    <lable
                      style={{ marginTop: "11px" }}
                      className="col-2 text-center"
                    >
                      RePassword:
                    </lable>
                    <input
                      type="password"
                      style={error && error.includes('Match') ? { border: borderInput } : null}
                      placeholder="Confirm password"
                      className="password col"
                      value={data.repassword}
                      onChange={(e) =>
                        setData({ ...data, repassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Match") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div
                    className="field input-field row"
                    style={{ marginBottom: "0" }}
                  >
                    <lable className="col-2 text-center">
                      Profile Photo:
                    </lable>
                    <input
                      type="file"
                      style={error && error.includes('Photo') ? { border: borderInput, paddingTop: "10px" } : {paddingTop: "10px"}}
                      className="col"
                      onChange={(e) =>
                        setData({ ...data, profilePhoto: e.target.files[0] })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-2"></div>
                    {error && error.includes("Photo") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="form-check" style={{ marginTop: "17px" }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      name="isBroker"
                      checked={isBroker}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      I am a Borker
                    </label>
                  </div>
                  <div className="field button-field">
                    <button type="submit" onClick={registerUser}>
                      Signup
                    </button>
                  </div>
                </form>
                <div className="form-link">
                  <span>
                    Already have an account?{" "}
                    <Link to="/login" className="link signup-link">
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Register;

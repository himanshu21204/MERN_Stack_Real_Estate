import { useState, useEffect } from "react";
import "./contact.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const Contact = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  const [borderInput, setBorderInput] = useState("");
  useEffect(() => {
    setLogin(localStorage.getItem("isLogin"));
  }, []);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const contactUSSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const { firstName, lastName, email, message } = data;
      try {
        const {data} = await axios.post("/contact-US", {
          firstName,
          lastName,
          email,
          message,
        });

        if(data.error) {
          setError(data.error);
          setBorderInput("1px solid red");
        } else {
          setData({ firstName: "", lastName: "", email: "", message: "" })
          setError("")
          toast.success("Message sent successfully!");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "First Login!",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="bodyform row">
          <div>
            <section
              style={{ backgroundColor: "none" }}
              className="containerloginc forms"
            >
              <div className="form signup">
                <div className="form-content">
                  <header className="headerlogin">Contact US</header>
                  <form action="#">
                    <div className="field input-field">
                      <input
                        type="text"
                        style={error && error.includes('First') ? { border: borderInput } : null}
                        placeholder="First Name"
                        className="input"
                        value={data.firstName}
                        onChange={(e) =>
                          setData({ ...data, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="row">
                      {error && error.includes("First") && (
                        <div className="error-msg col" style={{ color: "red" }}>
                          {error}
                        </div>
                      )}
                    </div>
                    <div className="field input-field">
                      <input
                        type="text"
                        style={error && error.includes('Last') ? { border: borderInput } : null}
                        placeholder="Last Name"
                        className="input"
                        value={data.lastName}
                        onChange={(e) =>
                          setData({ ...data, lastName: e.target.value })
                        }
                      />
                      <div className="row">
                      {error && error.includes("Last") && (
                        <div className="error-msg col" style={{ color: "red" }}>
                          {error}
                        </div>
                      )}
                    </div>
                    </div>
                    <div className="field input-field mb-4">
                      <input
                        type="email"
                        style={error && error.includes('Email') ? { border: borderInput } : null}
                        placeholder="Email"
                        className="phone"
                        value={data.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                      />
                      <div className="row">
                      {error && error.includes("Email") && (
                        <div className="error-msg col" style={{ color: "red" }}>
                          {error}
                        </div>
                      )}
                    </div>
                    </div>
                    <div
                      style={{ marginBottom: "70px" }}
                      className="field input-field"
                    >
                      <textarea
                        rows={4}
                        className="form-control"
                        type="text"
                        style={error && error.includes('Message') ? { border: borderInput } : null}
                        placeholder="Your Massege"
                        value={data.message}
                        onChange={(e) =>
                          setData({ ...data, message: e.target.value })
                        }
                      ></textarea>
                      <div className="row">
                      {error && error.includes("Message") && (
                        <div className="error-msg col" style={{ color: "red" }}>
                          {error}
                        </div>
                      )}
                    </div>
                    </div>
                    <div className="field button-field">
                      <button type="submit" onClick={contactUSSubmit}>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="body row">
          <div
            className="col"
            style={{ textAlign: "center", fontSize: "42px", fontWeight: "600" }}
          >
            Visit Our Office
          </div>
        </div>
        <div className="body row">
          <div className="col" style={{ textAlign: "center" }}>
            Realton has more than 9,000 offices of all sizes and all potential
            of session.
          </div>
        </div>
        <div className="row body ">
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Rajkot</h5>
                <p className="card-text" style={{ paddingTop: "20px" }}>
                  {" "}
                  City Gold, Trikon Baug, Circle, Rajkot, Gujarat 360001
                </p>
                <p
                  className="card-text"
                  style={{ fontWeight: "bold", color: "black" }}
                >
                  +91 8692662728
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Jamnagar</h5>
                <p className="card-text" style={{ paddingTop: "20px" }}>
                  {" "}
                  City Gold, Trikon Baug, Circle, Rajkot, Gujarat 360001
                </p>
                <p
                  className="card-text"
                  style={{ fontWeight: "bold", color: "black" }}
                >
                  +91 8692662728
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Morbi</h5>
                <p className="card-text" style={{ paddingTop: "20px" }}>
                  {" "}
                  City Gold, Trikon Baug, Circle, Rajkot, Gujarat 360001
                </p>
                <p
                  className="card-text"
                  style={{ fontWeight: "bold", color: "black" }}
                >
                  +91 8692662728
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

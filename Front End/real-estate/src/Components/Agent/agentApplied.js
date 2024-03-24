import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const AgentApplied = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    addresh: "",
    aboutBroker: "",
    isBroker: true,
  });
  const handlePhotoChange = (e) => {
    setData({ ...data, photo: e.target.files[0] });
  };

  const brokerlogin = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      phoneNumber,
      addresh,
      aboutBroker,
      isBroker = true,
    } = data;
    try {
      const { data } = await axios.post("/agent-applied", {
        name,
        email,
        phoneNumber,
        addresh,
        aboutBroker,
        isBroker,
      });
      if (data.error) {
        console.log(data.error);
        toast.error(data.error);
      } else {
        console.log(data.name);
        setData({});
        toast.success("Broker Applied Success!!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <section className="containerlogin forms">
          <div className="form signup" style={{ maxWidth: "750px" }}>
            <div className="form-content">
              <header className="headerlogin">Broker Registration Form</header>
              <form>
                <div className="field input-field">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="input"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </div>
                <div className="field input-field">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="input"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <div className="field input-field">
                  <input
                    type="number"
                    placeholder="Enter Your Phone Number"
                    className="phone"
                    value={data.phoneNumber}
                    onChange={(e) =>
                      setData({ ...data, phoneNumber: e.target.value })
                    }
                  />
                </div>
                <div className="field input-field" style={{ marginBottom: "60px" }}>
                  <textarea
                    rows={3}
                    type="txet"
                    placeholder="Enter your Address"
                    className="input"
                    value={data.addresh}
                    onChange={(e) =>
                      setData({ ...data, addresh: e.target.value })
                    }
                  ></textarea>
                </div>
                <div
                  className="input-field row"
                  style={{ marginBottom: "25px" }}
                >
                  <label
                    className="col-1"
                    htmlFor="photo"
                    style={{ marginTop: "5px" }}
                  >
                    Photo:
                  </label>
                  <input
                    className="col form-control"
                    type="file"
                    id="formFile"
                    onChange={handlePhotoChange}
                  />
                </div>
                <div className="field input-field" style={{ marginBottom: "60px" }}>
                  <textarea
                    rows={3}
                    type="txet"
                    placeholder="Tell us about yourself as a broker"
                    className="input"
                    value={data.aboutBroker}
                    onChange={(e) =>
                      setData({ ...data, aboutBroker: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="field button-field">
                  <button type="submit" onClick={brokerlogin}>
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AgentApplied;

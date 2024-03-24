import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isagent,setAgent] = useState(false);
  const [isCreater, setCreater] = useState(false);
  const params = useParams();
  useEffect(() => {
    getData();
    if (localStorage.getItem('isCreater')) {
        setCreater(true);
    }
  }, []);
  const getData = async () => {
    try {
      const result = await axios.get(`/users/${params._id}`);
      setData(result.data);
      if(result.data.isbroker === true || isCreater){
        setAgent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    try {
      await axios.put(`/users/${params._id}`, data);
      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
    navigate("/profile");
  };

  return (
    <div className="container" style={{ width: "60%", margin: "55px auto" }}>
    {isagent ? (
          <div>
            <div className="row">
            <div className="col-2" style={{ margin: "10px 0" }}>
            Name:
            </div>
            <div className="col">
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="form-control"
                style={{
                  outline: "none",
                  border: "1px solid #CACACA",
                  margin: "5px 0",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2" style={{ margin: "10px 0" }}>
              First Name:
            </div>
            <div className="col">
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => setData({ ...data, firstName: e.target.value })}
                className="form-control"
                style={{
                  outline: "none",
                  border: "1px solid #CACACA",
                  margin: "5px 0",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2" style={{ margin: "10px 0" }}>
              Last Name:
            </div>
            <div className="col">
              <input
                type="email"
                value={data.lastName || ""}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                className="form-control"
                style={{
                  outline: "none",
                  border: "1px solid #CACACA",
                  margin: "5px 0",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2" style={{ margin: "10px 0" }}>
              Email:
            </div>
            <div className="col">
              <input
                type="text"
                value={data.email || ""}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="form-control"
                style={{
                  outline: "none",
                  border: "1px solid #CACACA",
                  margin: "5px 0",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2" style={{ margin: "10px 0" }}>
              Phone Number:
            </div>
            <div className="col">
              <input
                type="text"
                value={data.phoneNumber || ""}
                onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                className="form-control"
                style={{
                  outline: "none",
                  border: "1px solid #CACACA",
                  margin: "5px 0",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2" style={{ margin: "10px 0" }}>
              Addresh:
            </div>
            <div className="col">
              <input
                type="text"
                value={data.addresh || ""}
                onChange={(e) => setData({ ...data, addresh: e.target.value })}
                className="form-control"
                style={{
                  outline: "none",
                  border: "1px solid #CACACA",
                  margin: "5px 0",
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2" style={{ margin: "10px 0" }}>
              About Broker:
            </div>
            <div className="col">
              <input
                type="tel"
                value={data.aboutBroker || ""}
                onChange={(e) =>
                  setData({ ...data, aboutBroker: e.target.value })
                }
                className="form-control"
                style={{
                  outline: "none",
                  border: "1px solid #CACACA",
                  margin: "5px 0",
                }}
              />
            </div>
          </div>
        </div>
        ):(
          <div>
            <div className="row">
              <div className="col-2" style={{ margin: "10px 0" }}>
                Name:
              </div>
              <div className="col">
                <input
                  type="text"
                  value={data.name || ""}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="form-control"
                  style={{
                    outline: "none",
                    border: "1px solid #CACACA",
                    margin: "5px 0",
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2" style={{ margin: "10px 0" }}>
                Email:
              </div>
              <div className="col">
                <input
                  type="email"
                  value={data.email || ""}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="form-control"
                  style={{
                    outline: "none",
                    border: "1px solid #CACACA",
                    margin: "5px 0",
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2" style={{ margin: "10px 0" }}>
                Phone Number:
              </div>
              <div className="col">
                <input
                  type="tel"
                  value={data.phoneNumber || ""}
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  className="form-control"
                  style={{
                    outline: "none",
                    border: "1px solid #CACACA",
                    margin: "5px 0",
                  }}
                />
              </div>
            </div>
          </div>
        ) }
      <div className="row" style={{ margin: "20px" }}>
        <div className="col-2"></div>
        <div className="col-1 btn btn-primary" onClick={handleSave}>
          Save
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

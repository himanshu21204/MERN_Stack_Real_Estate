import { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import profileImage from "../../assets/img/profilephoto.png";

const Profile = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isBrokerIn, setisBrokerIn] = useState(false);
  const dataEdit = () => {
    navigate("/editProfile/" + userId);
  };
  useEffect(() => {
    getData();
    if(data.isbroker){
      setisBrokerIn(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await axios
      .get("/users")
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
    await setUserId(localStorage.getItem("userId"));
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        axios
          .delete(`/property-detail/+${userId}`)
          .then((result) => {
            console.log(result);
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            localStorage.removeItem("isLogin");
            navigate("/");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  var result = data.map((f) => {
    if (
      (f._id === userId && !("isbroker" in f)) ||
      (f._id === userId && f.isbroker === false)
    ) {
      return (
        <>
          <div
            className="container"
            style={{ marginTop: "50px", marginLeft: "90px" }}
          >
            <div class="row gutters-sm">
              <div class="col-md-3 mb-1">
                <div class="cardagentD">
                  <div class="card-bodyagent">
                    <div class="d-flex flex-column align-items-center text-center mt-1">
                      {f.profilePhoto !== undefined ? (
                        <img
                          class="shadow-4-strong img-fluid"
                          alt="profilePhoto"
                          style={{
                            height: "180px",
                            width: "180px",
                            borderRadius: "50%",
                          }}
                          src={require(`D:/DU-DIET/Project/Codes/Back End/uploads/${f.profilePhoto}`)}
                        />
                      ) : (
                        <img src={profileImage}></img>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          <div className="col-md-7">
            <div className="cardagentD mb-3">
              <div className="card-bodyagent">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {f.name}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <div>{f.email}</div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{f.phoneNumber}</div>
                </div>
                <div className="row d-flex justify-content-start align-items-start" style={{ marginTop: "10px" }}>
                      <div className="col-1 btn btn-primary" onClick={dataEdit}>
                        Edit
                      </div>
                      </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </>
      );
    } else if (f._id == userId && f.isbroker == true) {
      return (
        <>
          <div className="container bodya">
            <div className="row">
              <h5 style={{ fontWeight: "bold", fontSize: "40px" }}>
                My Profile
              </h5>
            </div>
            <div
              className="row"
              style={{ marginTop: "25px", marginLeft: "10px" }}
            >
              <div className="col-3">
                <img
                  class="shadow-4-strong img-fluid"
                  alt="profilePhoto"
                  style={{
                    height: "150px",
                    width: "150px",
                    borderRadius: "50%",
                  }}
                  src={require(`D:/DU-DIET/Project/Codes/Back End/uploads/${f.profilePhoto}`)}
                />
              </div>
              <div className="col" style={{ padding: "10px" }}>
                <div
                  className="row"
                  style={{ fontSize: "20px", marginTop: "6px" }}
                >
                  <div className="col-3">Username:</div>
                  <div className="col fw-bold">{f.name}</div>
                </div>
                <div
                  className="row"
                  style={{ fontSize: "20px", marginTop: "8px" }}
                >
                  <div className="col-3">Email:</div>
                  <div className="col fw-bold">{f.email}</div>
                </div>
                <div
                  className="row"
                  style={{ fontSize: "20px", marginTop: "8px" }}
                >
                  <div className="col-3">Phone Number:</div>
                  <div className="col fw-bold">{f.phoneNumber}</div>
                </div>
              </div>
            </div>
            <div className="row" style={{ margin: "15px", fontSize: "20px" }}>
              <div className="col">
                <div className="col">
                  <div>First Name:</div>
                  <div className="fw-bold">{f.firstName}</div>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div>Last Name:</div>
                  <div className="fw-bold">{f.lastName}</div>
                </div>
              </div>
              <div className="col-4"></div>
            </div>
            <div className="row" style={{ margin: "15px", fontSize: "20px" }}>
              <div className="col">
                <div>Addresh:</div>
                <div className="fw-bold">{f.addresh}</div>
              </div>
            </div>
            <div className="row" style={{ margin: "15px", fontSize: "20px" }}>
              <div className="row">About me:</div>
              <div className="row fw-bold">{f.aboutBroker}</div>
            </div>
            <div className="row" style={{ marginTop: "35px" }}>
              <div className="col-1"></div>
              <div className="col-1 btn btn-primary" onClick={dataEdit}>
                Edit
              </div>
              <div className="col-1"></div>
              {/* <div className="col-1 btn btn-danger" onClick={handleDelete}>Delete</div> */}
            </div>
          </div>
        </>
      );
    }
  });

  return (
    <>
      {isBrokerIn ? (
        <div className="container bodya">{result}</div>
      ) : (
        <div className=" container" style={{ margin: "auto" }}>
          {result}
        </div>
      )}
    </>
  );
};

export default Profile;

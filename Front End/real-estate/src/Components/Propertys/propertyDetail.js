import "./propertyDetail.css";
import { MdCircle } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const [brokerID, setbrokerID] = useState("");
  useEffect(() => {
    getData();
    setLogin(localStorage.getItem("isLogin"));
    setbrokerID(localStorage.getItem("userId"));
  }, []);

  const getData = async () => {
    await axios
      .get("/property-detail/" + params._id)
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    navigate("/add-property/" + data._id);
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
          .delete(`/property-detail/` + data._id)
          .then((result) => {
            navigate("/agentdetail/" + data.brokerID);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // console.log(data)
  return (
    <>
      <div className="bodypd container">
        <div className="row fw-bold" style={{ fontSize: "25px" }}>
          <div className="col-9">{data.homeTitle}</div>
          {isLogin && data.brokerID == brokerID ? (
            <>
              <div
                style={{ marginLeft: "60px" }}
                className="col-1 btn btn-primary"
                onClick={handleEdit}
              >
                Edit
              </div>
              <div
                style={{ marginLeft: "20px" }}
                className="col-1 btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </div>
            </>
          ) : (
            <div className="col"></div>
          )}
          {isLogin && !(data.brokerID == brokerID) && (
            <div className="col btn btn-primary">Contact Agent</div>
          )}
        </div>
        <div className="row mt-3">
          <div className="col-2 me-3">{data.homeAddress}</div>
          <div className="col-1 text-danger">
            <MdCircle /> For {data.homePropertyType}
          </div>
          <div className="col" style={{ textAlign: "right", fontSize: "25px" }}>
            {data.homePropertyType=='Rent' &&  <div>${data.homePrice}/mo</div>}
            {data.homePropertyType!=='Rent' &&  <div>${data.homePrice}</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-1">
            <span
              style={{ fontSize: "15.5px" }}
              className="material-symbols-outlined"
            >
              bed{" "}
            </span>{" "}
            {data.homeBedrooms} bed
          </div>
          <div className="col-1">
            <span
              style={{ fontSize: "15.5px" }}
              className="material-symbols-outlined"
            >
              shower{" "}
            </span>{" "}
            {data.homeBathrooms} bath
          </div>
          <div className="col-1">
            <span
              style={{ fontSize: "15.5px" }}
              className="material-symbols-outlined"
            >
              aspect_ratio{" "}
            </span>{" "}
            {data.homeSizeinft} sqft
          </div>
          <div className="col" style={{ textAlign: "right" }}>
            $
            {data.homePrice && data.homeSizeinft
              ? `${(
                  parseInt(data.homePrice.replace(/,/g, "")) /
                  parseInt(data.homeSizeinft)
                ).toFixed(2)} /sq ft`
              : "N/A"}
          </div>
        </div>
        {data.photos!=null && <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src={data.photos[0]} style={{height:"70vh",objectFit:"fill"}} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={data.photos[1]} style={{height:"70vh",objectFit:"fill"}} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={data.photos[2]} style={{height:"70vh",objectFit:"fill"}} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>}
        <div
          className="row"
          style={{
            backgroundColor: "#fff",
            display: "block",
            marginTop: "35px",
            borderRadius: "15px",
            height: "150px",
            width: "100%",
          }}
        >
          <div
            className="row"
            style={{
              paddingLeft: "40px",
              paddingTop: "20px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Overview
          </div>
          <div className="row pt-4 fw-bold">
            <div className="col-2 ps-5">Bedroom</div>
            <div className="col-2">Bath</div>
            <div className="col-2">Year Build</div>
            <div className="col-2">Garage</div>
            <div className="col-2">Sqft</div>
            <div className="col-2">Property Type</div>
          </div>
          <div className="row">
            <div className="col-2 ps-5">{data.homeBedrooms}</div>
            <div className="col-2">{data.homeBedrooms}</div>
            <div className="col-2">{data.homeYearbuilt}</div>
            <div className="col-2">{data.homeGarages}</div>
            <div className="col-2">{data.homeSizeinft} sqft</div>
            <div className="col-2">{data.homePropertyType}</div>
          </div>
        </div>
        <div
          className="row"
          style={{
            backgroundColor: "#fff",
            display: "block",
            marginTop: "35px",
            borderRadius: "15px",
            height: "420px",
            width: "100%",
          }}
        >
          <div
            className="row"
            style={{
              paddingLeft: "40px",
              paddingTop: "20px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Property Description
          </div>
          <div
            className="row"
            style={{
              paddingLeft: "4%",
              paddingTop: "10px",
              paddingRight: "15px",
            }}
          >
            {data.homeDescription}
          </div>
          <div
            className="row"
            style={{
              paddingLeft: "40px",
              paddingTop: "30px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Property Details
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-2 fw-bold" style={{ marginLeft: "4%" }}>
              Property ID
            </div>
            <div className="col-2" style={{ textAlign: "right" }}>
              {data.homePropertyID}
            </div>
            <div className="col-2 fw-bold" style={{ marginLeft: "15%" }}>
              Garage
            </div>
            <div className="col-1" style={{ textAlign: "right" }}>
              {data.homeGarages}
            </div>
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-2 fw-bold" style={{ marginLeft: "4%" }}>
              Price
            </div>
            <div className="col-2" style={{ textAlign: "right" }}>
              ${data.homePrice}
            </div>
            <div className="col-2 fw-bold" style={{ marginLeft: "15%" }}>
              Garage Size
            </div>
            <div className="col-1" style={{ textAlign: "right" }}>
              {data.homeGaragesize} sqft
            </div>
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-2 fw-bold" style={{ marginLeft: "4%" }}>
              Property Size
            </div>
            <div className="col-2" style={{ textAlign: "right" }}>
              {data.homeSizeinft} sqft
            </div>
            <div className="col-2 fw-bold" style={{ marginLeft: "15%" }}>
              Year Built
            </div>
            <div className="col-1" style={{ textAlign: "right" }}>
              {data.homeYearbuilt}
            </div>
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-2 fw-bold" style={{ marginLeft: "4%" }}>
              Bathrooms
            </div>
            <div className="col-2" style={{ textAlign: "right" }}>
              {data.homeBathrooms}
            </div>
            <div className="col-2 fw-bold" style={{ marginLeft: "15%" }}>
              Bedrooms
            </div>
            <div className="col-1" style={{ textAlign: "right" }}>
              {data.homeBedrooms}
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{
            backgroundColor: "#fff",
            display: "block",
            marginTop: "35px",
            borderRadius: "15px",
            height: "230px",
            width: "100%",
          }}
        >
          <div
            className="row"
            style={{
              paddingLeft: "40px",
              paddingTop: "30px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Property Addresh
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-2 fw-bold" style={{ marginLeft: "4%" }}>
              Address
            </div>
            <div className="col-8" style={{ textAlign: "center" }}>
              {data.homeAddress}
            </div>
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-2 fw-bold" style={{ marginLeft: "4%" }}>
              State
            </div>
            <div className="col-2" style={{ textAlign: "right" }}>
              {data.homeCountry_State}
            </div>
            <div className="col-2 fw-bold" style={{ marginLeft: "15%" }}>
              City
            </div>
            <div className="col-1" style={{ textAlign: "right" }}>
              {data.homeCity}
            </div>
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-2 fw-bold" style={{ marginLeft: "4%" }}>
              Country
            </div>
            <div className="col-2" style={{ textAlign: "right" }}>
              {data.homeCountry}
            </div>
            <div className="col-2 fw-bold" style={{ marginLeft: "15%" }}>
              Zip Code
            </div>
            <div className="col-1" style={{ textAlign: "right" }}>
              {data.homeZip}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;

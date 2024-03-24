import { useParams } from "react-router-dom";
import "./propertyAdd.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PropertyAdd = () => {
  const navigate = useNavigate();
  const [borderInput, setBorderInput] = useState("");
  const [error, setError] = useState("");
  const { _id } = useParams();
  const parmas = useParams();
  const [postImages, setPostImages] = useState([]);
  const [data, setData] = useState({
    homeTitle: "",
    homeDescription: "",
    homePrice: "",
    homeAddress: "",
    homeCountry_State: "",
    homeCity: "",
    homeCountry: "",
    homeZip: "",
    homeSizeinft: "",
    homeRooms: "",
    homeBedrooms: "",
    homeBathrooms: "",
    homeGarages: "",
    homeGaragesize: "",
    homeYearbuilt: "",
    homeBasement: "",
    homePropertyType: "",
    homePropertyID: "",
    homePropertyStatus: "",
    brokerID: "",
  });

  const [BrokerID, setBrokerID] = useState("");
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    setBrokerID(localStorage.getItem("userId"));
    if (_id) {
      axios.get(`/add-property/${_id}`).then((response) => {
        const propertyData = response.data;
        setData(propertyData);
        setEdit(true); 
      });
    }
  }, [_id]);

  const generateID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let firstPart = '';
    for (let i = 0; i < 2; i++) {
      firstPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const randomNumber = Math.floor(Math.random() * 100);

    return firstPart + randomNumber;
  };
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    const newImages = await Promise.all(Array.from(files).map(async (file) => {
      const base64 = await convertToBase64(file);
      return base64;
    }));
    setPostImages([...newImages]);
  }
  const propertyAdd = async (e) => {
    e.preventDefault();
    var generatedID = _id ? data.homePropertyID : generateID();
    const {
      homeTitle,
      homeDescription,
      homePrice,
      homeAddress,
      homeCountry_State,
      homeCity,
      homeCountry,
      homeZip,
      homeSizeinft,
      homeRooms,
      homeBedrooms,
      homeBathrooms,
      homeGarages,
      homeGaragesize,
      homeYearbuilt,
      homeBasement,
      homePropertyType,
      homePropertyStatus,
      brokerID = BrokerID,
      homePropertyID=generatedID,
      photos=postImages,
    } = data;

    try {
      if (isEdit) {
        // Edit mode
        const { data } = await axios.put(`/add-property/${_id}`, {
          homeTitle,
          homeDescription,
          homePrice,
          homeAddress,
          homeCountry_State,
          homeCity,
          homeCountry,
          homeZip,
          homeSizeinft,
          homeRooms,
          homeBedrooms,
          homeBathrooms,
          homeGarages,
          homeGaragesize,
          homeYearbuilt,
          homeBasement,
          homePropertyType,
          homePropertyID:generatedID,
          homePropertyStatus,
          brokerID: BrokerID,
          photos:postImages
        });
        if (data.error) {
          setError(data.error);
          setBorderInput("1px solid red");
        } else {
          setError("");
          setBorderInput("")
          setData({});
          toast.success("Property Edit Success!!");
          navigate("/property-detail/"+parmas._id);
        }
      } else {
        // Add mode
        const { data } = await axios.post("/add-property", {
          homeTitle,
          homeDescription,
          homePrice,
          homeAddress,
          homeCountry_State,
          homeCity,
          homeCountry,
          homeZip,
          homeSizeinft,
          homeRooms,
          homeBedrooms,
          homeBathrooms,
          homeGarages,
          homeGaragesize,
          homeYearbuilt,
          homeBasement,
          homePropertyType,
          homePropertyID: generatedID,
          homePropertyStatus,
          brokerID: BrokerID,
          photos:postImages
        });

        if (data.error) {
          setError(data.error);
          setBorderInput("1px solid red");
        } else {
          setData({});
          setError("");
          setBorderInput("")
          toast.success("Property Add Success!!");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container bodyadd">
        <div className="row fw-bold h2">Add New Property</div>
        <div
          className="row"
          style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}
        >
          <div>
            <section
              className="containerlogin forms"
              style={{ height: "180vh", position: "static", marginTop: "10px" }}
            >
              <div className="form signup" style={{ maxWidth: "1050px" }}>
                <div className="form-content">
                  <header className="headerlogin">Property Details</header>
                  <div className="ms-4 mt-4 fs-5">Property Description</div>
                  <form action="#">
                    <div
                      className="field input-field"
                      style={{ marginBottom: "40px" }}
                    >
                      <label
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        style={
                          error && error.includes("Title")
                            ? { border: borderInput }
                            : null
                        }
                        placeholder="House Title/Name"
                        className="input"
                        value={data.homeTitle}
                        onChange={(e) =>
                          {setData({ ...data, homeTitle: e.target.value }),
                          setError("")}
                        }
                      />
                    </div>
                    <div className="row">
                    {error && error.includes("Title") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                    <div
                      className="field input-field"
                      style={{ marginBottom: "85px" }}
                    >
                      <label
                        style={{ marginBottom: "5px", marginLeft: "10px" }}
                      >
                        Description
                      </label>
                      <textarea
                        rows={4}
                        type="txet"
                        style={
                          error && error.includes("description")
                            ? { border: borderInput }
                            : null
                        }
                        placeholder="Enter Description About House"
                        className="input"
                        value={data.homeDescription}
                        onChange={(e) =>
                          {setData({ ...data, homeDescription: e.target.value }),
                          setError("")}
                        }
                      ></textarea>
                    </div>
                    <div className="row">
                    {error && error.includes("description") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                    <div
                      className="field input-field"
                      style={{ marginBottom: "40px" }}
                    >
                      <label
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                      >
                        Price
                      </label>
                      <input
                        type="type"
                        style={
                          error && error.includes("Price")
                            ? { border: borderInput }
                            : null
                        }
                        placeholder="Enter House Price"
                        className="input"
                        value={data.homePrice}
                        onChange={(e) =>
                          {setData({ ...data, homePrice: e.target.value }),
                          setError("")}
                        }
                      />
                    </div>
                    <div className="row">
                    {error && error.includes("Price") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="row">
                  <div className="ms-4 mt-4 fs-5">Property Images</div>
                  <div className="">
                    <input type="file" multiple={3} 
          accept='.jpeg, .png, .jpg'
          onChange={(e) => {handleFileUpload(e)}}
className="field input-field"></input>
                  </div> 
                  </div>
                    <div className="ms-4 mt-4 fs-5">Property Location</div>
                    <div
                      className="field input-field"
                      style={{ marginBottom: "40px" }}
                    >
                      <label
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                      >
                        Addresh
                      </label>
                      <input
                        type="text"
                        style={
                          error && error.includes("Addresh")
                            ? { border: borderInput }
                            : null
                        }
                        placeholder="Enter House Addresh"
                        className="input"
                        value={data.homeAddress}
                        onChange={(e) =>
                          {setData({ ...data, homeAddress: e.target.value }),
                          setError("")}
                        }
                      />
                    </div>
                    <div className="row">
                    {error && error.includes("Addresh") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                    <div className="row" style={{ marginBottom: "40px" }}>
                      <div className="col" style={{ marginRight: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            State
                          </label>
                          <input
                            type="text"
                            style={
                              error && error.includes("State")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House State"
                            className="input"
                            value={data.homeCountry_State}
                            onChange={(e) =>
                              {setData({
                                ...data,
                                homeCountry_State: e.target.value,
                              }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                      <div className="col" style={{ marginLeft: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            City
                          </label>
                          <input
                            type="text"
                            style={
                              error && error.includes("City")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House City"
                            className="input"
                            value={data.homeCity}
                            onChange={(e) =>
                              {setData({ ...data, homeCity: e.target.value }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {error && error.includes("State") && (
                      <div className="error-msg col-6" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                      <div className="col-6"></div>
                    {error && error.includes("City") && (
                      <div className="error-msg col-6" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                    <div className="row" style={{ marginBottom: "40px" }}>
                      <div className="col" style={{ marginRight: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            style={
                              error && error.includes("Country")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Country"
                            className="password"
                            value={data.homeCountry}
                            onChange={(e) =>
                              {setData({ ...data, homeCountry: e.target.value }),setError("")}
                            }
                          />
                        </div>
                      </div>
                      <div className="col" style={{ marginLeft: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Zip Code
                          </label>
                          <input
                            type="type"
                            style={
                              error && error.includes("Zip")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Zip code"
                            className="input"
                            value={data.homeZip}
                            onChange={(e) =>
                              {setData({ ...data, homeZip: e.target.value }),setError("")}
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {error && error.includes("Country") && (
                      <div className="error-msg col-6" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                      <div className="col-6"></div>
                    {error && error.includes("Zip") && (
                      <div className="error-msg col-6" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                    <div className="ms-4 mt-4 fs-5">Property Details</div>
                    <div className="row" style={{ marginBottom: "40px" }}>
                      <div className="col" style={{ marginRight: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Size in ft
                          </label>
                          <input
                            type="type"
                            style={
                              error && error.includes("Size")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Size in ft"
                            className="input"
                            value={data.homeSizeinft}
                            onChange={(e) =>
                              {setData({ ...data, homeSizeinft: e.target.value }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="col"
                        style={{ marginRight: "5px", marginLeft: "5px" }}
                      >
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Rooms
                          </label>
                          <input
                            type="type"
                            style={
                              error && error.includes("Rooms")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Room"
                            className="input"
                            value={data.homeRooms}
                            onChange={(e) =>
                              {setData({ ...data, homeRooms: e.target.value }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                      <div className="col" style={{ marginLeft: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Bedrooms
                          </label>
                          <input
                            type="type"
                            style={
                              error && error.includes("bedrooms")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Bedroom"
                            className="input"
                            value={data.homeBedrooms}
                            onChange={(e) =>
                              {setData({ ...data, homeBedrooms: e.target.value }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {error && error.includes("Size") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                      <div className="col"></div>
                    {error && error.includes("Rooms") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                    <div className="col"></div>
                    {error && error.includes("bedrooms") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                    <div className="row" style={{ marginBottom: "40px" }}>
                      <div className="col" style={{ marginRight: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Bathrooms
                          </label>
                          <input
                            type="type"
                            style={
                              error && error.includes("bathrooms")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Bathrooms"
                            className="input"
                            value={data.homeBathrooms}
                            onChange={(e) =>
                             { setData({
                                ...data,
                                homeBathrooms: e.target.value,
                              }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="col"
                        style={{ marginRight: "5px", marginLeft: "5px" }}
                      >
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Basements
                          </label>
                          <input
                            type="type"
                            style={
                              error && error.includes("basement")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Basement"
                            className="input"
                            value={data.homeBasement}
                            onChange={(e) =>
                              {setData({ ...data, homeBasement: e.target.value }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                      
                      <div className="col" style={{ marginLeft: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Garages
                          </label>
                          <input
                            type="type"
                            style={
                              error && error.includes("garages")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Garages"
                            className="input"
                            value={data.homeGarages}
                            onChange={(e) =>
                              {setData({ ...data, homeGarages: e.target.value }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {error && error.includes("bathrooms") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                      <div className="col"></div>
                    {error && error.includes("basement") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                    <div className="col"></div>
                    {error && error.includes("garages") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                    <div className="row" style={{ marginBottom: "40px" }}>
                      <div className="col" style={{ marginRight: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Garage Size
                          </label>
                          <input
                            type="type"
                            style={
                              error && error.includes("Garage")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Garages Size"
                            className="input"
                            value={data.homeGaragesize}
                            onChange={(e) =>
                              {setData({
                                ...data,
                                homeGaragesize: e.target.value,
                              }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="col"
                        style={{ marginRight: "5px", marginLeft: "5px" }}
                      >
                        <div className="field input-field">
                          <label
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                          >
                            Build Year
                          </label>
                          <input
                            type="type"
                            style={
                              error && error.includes("year")
                                ? { border: borderInput }
                                : null
                            }
                            placeholder="Enter House Build Year"
                            className="input"
                            value={data.homeYearbuilt}
                            onChange={(e) =>
                              {setData({
                                ...data,
                                homeYearbuilt: e.target.value,
                              }),
                              setError("")}
                            }
                          />
                        </div>
                      </div>
                      <div className="col" style={{ marginLeft: "5px" }}>
                        <div className="field input-field">
                          <label
                            style={{marginLeft: "10px" }}
                          >
                            Property Type
                          </label>
                          <select
                            className="form-select"
                            style={
                              error && error.includes("type")
                                ? { border: borderInput,marginTop: "10px", marginLeft:"0px" ,height:"100%",width:"100%" }
                                : {marginTop: "10px", marginLeft:"0px" ,height:"100%",width:"100%"}
                            }
                            aria-label="Default select example"
                            value={data.homePropertyType}
                            onChange={(e) => {setData({ ...data, homePropertyType: e.target.value }),setError("")}}
                          >
                            <option value="All">All</option>
                            <option value="Buy">Buy</option>
                            <option value="Sell">Sell</option>
                            <option value="Rent">Rent</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {error && error.includes("Garage") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                      <div className="col"></div>
                    {error && error.includes("year") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                    <div className="col"></div>
                    {error && error.includes("type") && (
                      <div className="error-msg col" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </div>
                    <div className="field button-field">
                      {isEdit?
                      <button type="submit" onClick={propertyAdd}>
                      Save
                    </button>:
                      <button type="submit" onClick={propertyAdd}>
                        Add Property
                      </button>}
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyAdd;


function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
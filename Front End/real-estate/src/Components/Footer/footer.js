import { Link } from "react-router-dom";
import "./footer.css";
import Facebook from "../../assets/img/Footer/facebook-logo.png";
import Twitter from "../../assets/img/Footer/twitter.png";
import Google from "../../assets/img/Footer/google-plus.png";
import Linkedin from "../../assets/img/Footer/linkedin.png";


const Footer = () => {
  return (
    <>
      <div className="bodyF">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div>
              <div className='fw-bold mb-2 me-5' style={{fontFamily:"Azedo",textAlign:"center",fontSize:"25px"}}>Real Estate</div>
              </div>
              <div style={{ fontSize: "13px", paddingRight: "15px" }}>
                {" "}
                Flr, Administrative Bldg, Central Rd, Chakala Wicel , Midc,
                Andheri (west) Mumbai, Maharashtra, 400093
              </div>
            </div>
            <div className="col-3">
              <div
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  paddingBottom: "8px",
                  paddingLeft: "25px",
                }}
              >
                Explore
              </div>
              <div style={{ paddingTop: "5px", paddingLeft: "25px" }}>
                <Link className="footerlink" to="/">
                  Home
                </Link>
              </div>
              <div style={{ paddingTop: "5px", paddingLeft: "25px" }}>
                <Link className="footerlink" to="/buy">
                  Buy
                </Link>
              </div>
              <div style={{ paddingTop: "5px", paddingLeft: "25px" }}>
                <Link className="footerlink" to="/agent">
                  Agent
                </Link>
              </div>
              <div style={{ paddingTop: "5px", paddingLeft: "25px" }}>
                <Link className="footerlink" to="/about-us">
                  About
                </Link>
              </div>
            </div>
            <div className="col-3">
              <div>
                <Link className="footerlink" to="/contact">
                  Contact US
                </Link>
              </div>
              <hr style={{ width: "250px" }} />
              <div>
                <Link className="footerlink" to="/faq">
                  FAQs
                </Link>
              </div>
            </div>
            <div className="col-2">
              <div className="row">
                <Link className="col" to="#">
                  <img
                    style={{
                      height: "25px",
                      width: "25px",
                      marginRight: "12px",
                    }}
                    src={Facebook}
                  />
                </Link>
                <Link className="col" to="#">
                  <img
                    style={{
                      height: "25px",
                      width: "25px",
                      marginRight: "12px",
                    }}
                    src={Twitter}
                  />
                </Link>
                <Link className="col" to="#">
                  <img
                    style={{
                      height: "25px",
                      width: "25px",
                      marginRight: "12px",
                    }}
                    src={Linkedin}
                  />
                </Link>
                <Link className="col" to="#">
                  <img
                    style={{
                      height: "25px",
                      width: "25px",
                      marginRight: "12px",
                    }}
                    src={Facebook}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

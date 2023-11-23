import React, { Component } from "react";
export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="text-uppercase text-center mb-5" style={{ marginTop: "80px" }}>
          This is Home page of my website
        </h1>
        <div className="container-fluid" >
          <div className="row">
            <div className="col">
              <img src={"https://images.adsttc.com/media/images/5d76/ec54/284d/d17f/7400/007c/slideshow/feature_-_190208_Oltermannintie_6_034.jpg?1568074804"} alt="..." style={{ width: "100%",height:"400px" }} />
            </div>
          </div>
          <div>
            <h1 style={{ color: "rgba(127,17,70,1)", fontFamily: "Lato, sansSerif", marginBottom: "50px" }}><em>Technologies</em></h1>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 font-4">
              <img style={{ width: '100%', height: '400px' }} src={'https://images.adsttc.com/media/images/5d76/ec2f/284d/d17f/6400/0139/slideshow/190208_Oltermannintie_6_047.jpg?1568074763'} alt="..." />
            </div>
            <div className="col-md-6">
              <p>
                Technologies is premium Corporate Training and Placement
                company. It is providing training on cutting-edge technologies
                like AI, Machine Learning, Spring, Angular, React, Java, Python,
                Automated Testing, etc. After IIT and NIT, Rays is one of the
                leading institute in India from where IT Engineers are getting
                highest packages in multinational companies.
              </p>
              <p>
                Technologies is an ISO 9001:2015 certified Company. It was
                established in 2006 and is active in multiple cities in India.
                We started our company with ‘BRANDNAME’ brand name that was later
                renamed Technologies in 2015. We primarily deal in
                Information Technology Services, Staffing Solutions, Corporate
                Training, and Career Consultancy. We aim at providing highly
                trained cutting-edge IT professionals to the IT Industry.
              </p>
              <p>
                We provide training to Corporate Employees and Professionals in
                end-to-end enterprise solutions. Our training contents are
                designed and developed in accordance with the current industry
                standards and future requirements. Our courses are highly valued
                in the corporate IT world. Our courses cover the most
                comprehensive portfolio of IT.{" "}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 style={{ color: "rgba(127,17,70,1)", fontFamily: "Lato, sansSerif" }}><em>Our Recruiters</em></h1>
        </div>
        <h6 style={{ color: "blue", textAlign: "center" }}>...<i>ooo</i>...</h6>
      </div>
    );
  }
}

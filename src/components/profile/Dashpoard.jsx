import React from "react";
import ava from "../../../public/images/ava.jpg";
import hammer from "../../../public/images/hammer.svg";
import cup from "../../../public/images/cup.svg";
import celender from "../../../public/images/celender.svg";

const Dashpoard = () => {
  return (
    <section className="Dashpoard_section">
      <div className="container">
        <div className="Dashpoard_content">
          <div className="Profile_info">
            <div className="img">
              <img src={ava} alt="profile" />
            </div>
            <div className="name">
              <h1>Ahmed Ali</h1>
              <p>
                You Have Complete 10 Auction In Last Month. Start Your auction
                Today.
              </p>
            </div>
          </div>

          <div className="Profile_Rate">
            <div className="Box_rate">
              <div className="icon_rate">
                <p>Auction Attend</p>

                <img src={hammer} alt="" />
              </div>
              <h2>280</h2>
            </div>

            <div className="Box_rate">
              <div className="icon_rate">
                <p>Auction win</p>
                <img src={cup} alt="" />
              </div>
              <h2>200</h2>
            </div>

            <div className="Box_rate">
              <div className="icon_rate">
                <p>Cancel Auction</p>
                <img src={celender} alt="" />
              </div>
              <h2>12</h2>
            </div>
          </div>

          <div className="profile_Tabel">tabel</div>
        </div>
      </div>
    </section>
  );
};

export default Dashpoard;

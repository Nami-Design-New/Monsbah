

export default function About() {
  return (
    <section className="aboutus_section">
      
      <div className="Head_image">
        <img src="/images/s2.jpg" alt="" />
      </div>
      <div className="Who_we_are">
        <div className="container we">
          <div className="Logo">
            <img
              loading="lazy"
              className="bg-img"
              alt="auth-banner"
              src="/images/branding/logo.svg"
            />
          </div>

          <div className="content">
            <h2 className="name">What is Monsabah Website ?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
              voluptates natus assumenda dolores qui tenetur modi saepe sed
              magnam optio necessitatibus obcaecati quasi autem exercitationem
              soluta nostrum aut ex rem!
            </p>
          </div>
        </div>
      </div>

      {/* <div className="Get_In_Know">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6">
              <div className="image_know">
                <img src="/images/auth-benner.png" alt="" />
              </div>
            </div>

            <div className="col-md-6 col-lg-6">
              <div className="content_know">
                <h2>Get in know</h2>
                <p>
                  Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar
                  commodo orci, suscipit porttitor velit elementum non. Fusce
                  nec pellentesque erat, id lobortis nunc. Donec dui leo,
                  ultrices quis turpis nec, sollicitudin sodales tortor. Aenean
                  dapibus magna quam, id tincidunt quam placerat consequat.{" "}
                </p>
                <div className="Box_Know">
                  <div className="Box">
                    <i className="fa-solid fa-users-gear"></i>
                    <div className="Content_Box">
                      <h3>280</h3>
                      <p>Customer</p>
                    </div>
                  </div>

                  <div className="Box">
                    <i className="fa-solid fa-car-rear"></i>
                    <div className="Content_Box">
                      <h3>280</h3>
                      <p>Cars</p>
                    </div>
                  </div>

                  <div className="Box">
                    <i className="fa-solid fa-gavel"></i>
                    <div className="Content_Box">
                      <h3>280</h3>
                      <p>Bidders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}

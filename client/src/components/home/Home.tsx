import React from "react";
import Nav from "./../nav";
import Footer from "./../footer";

import style from "./Home.module.scss";

const Home = () => {
  return (
    <div>
      <Nav />

      <div className={`${style.home}`}>
        <div className={`${style.home_content}`}>
          <div className="container">
            <h2>
              Our goal is to connect companies with tech talent in a little
              different way
            </h2>
          </div>
        </div>
      </div>

      <section className={`${style.mid_section} container`}>
        <div className={`row ${style.centre_content}`}>
          <div className="col-12 col-md-6">
            <iframe
              title="s"
              className={style.video_container}
              src="https://www.youtube.com/embed/qNnmqEYjrT8?controls=0"
            ></iframe>
          </div>
          <div className="col-12 col-md-6">
            <div className={style.right_text}>
              <div className={`${style.flex_contents} container`}>
                <h3>
                  <span style={{ color: "#FF001C" }}>i</span>CENTRE
                </h3>
                <hr className={style.hor_rule} />
                <p className={style.flex_para}>
                  We believe in matching freelance app developers and software
                  engineers with the right company after they’ve gone through
                  technical and screening interviews. They put candidates
                  through career coaching to prepare them to integrate with a
                  company. And, they provide them with a network of support to
                  ensure on-the-job success after placement
                </p>
                <hr className={style.last_hr} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

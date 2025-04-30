import { useEffect } from "react";
import "../../css/home.css";
function About() {
  useEffect(() => {
    document.title = "About";
  });
  return (
    <div style={{ margin: 0 }}>
      <div className="banner">
        <div className="banner-text">
          <h1>Personal financing app</h1>
          <p>Something about managing your finances and other related stuff</p>
        </div>
      </div>

      <div className="home-content">
        <div className="home-row info-block">
          <div className="content-col">
            <img src={image} alt="finance image" />
          </div>
          <div className="content-col col-block">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              veniam consequatur fugit neque dolorem commodi beatae numquam
              quibusdam obcaecati? Iure nobis, vero veniam eius doloremque odio
              magni placeat nemo minima. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Nemo eius facilis alias minima officiis omnis
              assumenda qui, rerum aliquam ipsam cupiditate, ullam explicabo
              nesciunt, suscipit quis praesentium dolorem odit. Atque. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Sequi,
              reiciendis nihil harum veniam odio ipsa similique eveniet vitae
              aliquam delectus! Quasi optio, alias illo cumque debitis dolorum
              ea? Laborum, impedit.
            </p>
          </div>
        </div>
        <div className="home-row info-block">
          <div className="content-col col-block reverse-txt">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              veniam consequatur fugit neque dolorem commodi beatae numquam
              quibusdam obcaecati? Iure nobis, vero veniam eius doloremque odio
              magni placeat nemo minima. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Nemo eius facilis alias minima officiis omnis
              assumenda qui, rerum aliquam ipsam cupiditate, ullam explicabo
              nesciunt, suscipit quis praesentium dolorem odit. Atque. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Sequi,
              reiciendis nihil harum veniam odio ipsa similique eveniet vitae
              aliquam delectus! Quasi optio, alias illo cumque debitis dolorum
              ea? Laborum, impedit.
            </p>
          </div>
          <div className="content-col reverse-img">
            <img src={image} alt="finance image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

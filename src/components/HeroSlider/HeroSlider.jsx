import { Component } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./HeroSlider.css";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };

    return (
      <div>
        <Slider {...settings}>
          {this.props.movies.map((movie) => (
            <div key={movie.id}>
              <img
                className=""
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                }
                alt=""
                style={{
                  width: "100%",
                  maxHeight: "600px",
                  objectFit: "cover",
                }}
              ></img>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
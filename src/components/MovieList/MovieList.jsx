import { Component } from "react";
import MovieListItem from "../MovieListItem/MovieListItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieList.css";

export default class Responsive extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      autoplay: true,
		variableWidth: true,
		
      slidesToShow: 6,
      slidesToScroll: 2,
      initialSlide: 6,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    return (
      <div>
        <Slider {...settings}>
          {this.props.movies.map((movie) => (
            <MovieListItem
              key={movie.id}
              movies={this.props.movies}
              allGenres={this.props.genres}
              genres={movie.genres}
              backdrop_path={movie.backdrop_path}
              id={movie.id}
              title={movie.title}
              genre_ids={movie.genre_ids}
              release_date={movie.release_date}
            />
          ))}
        </Slider>
      </div>
    );
  }
}

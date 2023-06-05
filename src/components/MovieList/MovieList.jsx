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
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0,
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

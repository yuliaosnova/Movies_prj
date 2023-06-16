import { Component } from "react";
import ReactPlayer from "react-player";
import css from "./Player.module.css";

export class Player extends Component {

  render() {
    const { traillerKey } = this.props;

    return (
      <>
        {traillerKey && (
          <div className={css.PlayerWrapper}>
            <ReactPlayer
              className={css.Player}
              url={`https://www.youtube.com/watch?v=${traillerKey}`}
              onReady={() => this.setState({ isVideoLoaded: true })}
              controls
              width="50%"
              height="200%"
              loop={true}
            />
          </div>
        )}
      </>
    );
  }
}

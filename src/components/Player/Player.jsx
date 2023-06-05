import { Component } from "react";
import ReactPlayer from "react-player";
import css from "./Player.module.css";

export class Player extends Component {
  state = {
    isVideoLoaded: false,
  };

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.traillerKey !== this.props.traillerKey) {
  //       this.setState({ isVideoLoaded: false });
  //     }
  //   }

  render() {
    const { isVideoLoaded } = this.state;
    const { traillerKey } = this.props;
    //  const { url } = this.props;
    //  const showLoader = this.props.traillerKey && !isVideoLoaded;
    const playerSize = isVideoLoaded ? "100%" : 0;

    return (
      <>
        {traillerKey && (
          <div className={css.PlayerWrapper}>
            <ReactPlayer
              className={css.Player}
              url={`https://www.youtube.com/watch?v=${traillerKey}`}
              //   width={playerSize}
              //   height={playerSize}
              onReady={() => this.setState({ isVideoLoaded: true })}
              controls
              width="35%"
              height="35%"

              loop={true}
            />
          </div>
        )}
      </>
    );
  }
}

import { ArrowBackOutlined } from "@material-ui/icons";
import { Link,useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  console.log("LOCATION=",location);
  const movie = location.movie;
  console.log("MOVIES=",movie);
  console.log("MOVIES-VIDEO=",movie.video);

  return (
    <div className="watch">
      <div className="back">
        <Link to="/" className="link">
          <ArrowBackOutlined />
          Home
        </Link>
      </div>
      <video
        className="video"
        autoPlay
        progress
        controls
        src={movie.video}
      />
    </div>
  );
}
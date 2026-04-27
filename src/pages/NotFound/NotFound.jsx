import pikaSad from "../../assets/pikachu-sad.mp3";

import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <audio src={pikaSad} autoPlay />
      <div className="not-found-img">
        <img
          fetchPriority="high"
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWeDuxtiLLUTcZNehK9C1GTLt5KYInWYvAvZHYxCWpup7opJOZXOtq-SibZ_UHy6ey06xFVlNswtfO50fiGWXZ5UMNiLc8HHafrWEgtVO2yyff3Ioi4Af6gU8pi25rN2-ylhuLb5MusJy4/s1600/Pikachu+Confused+1.jpg"
          alt="404"
        />
      </div>
      <h1>PAGE NOT FOUND</h1>
    </div>
  );
}

export default NotFound;

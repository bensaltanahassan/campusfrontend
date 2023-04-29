import { TypeAnimation } from "react-type-animation";
import { orange } from "../../utils/colors";

function AnimatedTextHeroSection() {
  return (
    <div className="hero">
      <TypeAnimation
        sequence={[
          // Same String at the start will only be typed once, initially
          "Libérez le potentiel des apprenants de demain.",
          1000,
          "Rejoignez la révolution des salles de classe en ligne dès aujourd'hui.",
          1000,
          "Commencer gratuitement...",
          1000,
        ]}
        speed={60}
        style={{
          fontSize: "2em",
          color: orange,
        }}
        repeat={Infinity}
      />
    </div>
  );
}

export default AnimatedTextHeroSection;

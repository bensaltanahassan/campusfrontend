import Lottie from "lottie-react";

import loading from "../static/lotties/loading.json";

function Loading() {
  return <Lottie animationData={loading} loop={true} />;
}

export default Loading;

import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function NoPage(props) {
  const [redirectUser, setRedirectUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirectUser(true);
    }, 1000);
    return () => clearTimeout(timer);
  });

  const spinner = (
    <ThreeCircles
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );

  return <div>{redirectUser ? navigate("/") : spinner}</div>;
}

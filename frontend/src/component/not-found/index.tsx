import React from "react";
import Loading from "../loading";

const NotFound: React.FC = () => {
  return (
    <div className="container flex flex-col text-center">
      <Loading />
      <div className="my-40 ">

        <h1 className="text-4xl">404</h1>
        <p className="text-xl">Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;

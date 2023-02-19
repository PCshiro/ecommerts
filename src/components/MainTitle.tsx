import React from "react";
type MainTitleProps = {
  title: string;
};
const MainTitle = ({ title }: MainTitleProps) => {
  return (
    <div className="mainTitle">
      <h1>{title}</h1>
    </div>
  );
};

export default MainTitle;

import React from "react";
import Card from "./Card";

function CardList() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} />
      ))}
    </>
  );
}

export default CardList;

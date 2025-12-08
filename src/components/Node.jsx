import React from "react";

export default function Node({ node, onMouseDown, onMouseEnter, onMouseUp }) {
  const classes = ["node"];
  if (node.isWall) classes.push("wall");
  if (node.isStart) classes.push("start");
  if (node.isEnd) classes.push("end");
  if (node.isVisited) classes.push("visited");
  if (node.isPath) classes.push("path");

  return (
    <div
      className={classes.join(" ")}
      onMouseDown={() => onMouseDown(node)}
      onMouseEnter={() => onMouseEnter(node)}
      onMouseUp={onMouseUp}
    />
  );
}

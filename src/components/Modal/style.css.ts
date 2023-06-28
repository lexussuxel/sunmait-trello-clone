import { style } from "@vanilla-extract/css";

export const modalBackground = style({
  position: "absolute",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#00000040",
  top: 0,
  left: 0,
});

export const modalWrapper = style({
  maxWidth: "50vh",
  backgroundColor: "white",
  display: "flex",
  borderRadius: 20,
  margin: "40px auto",
  flexDirection: "column",
  padding: 20,
  rowGap: 10,
});

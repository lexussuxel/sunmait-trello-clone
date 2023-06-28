import { style } from "@vanilla-extract/css";

export const taskWrapper = style({
  display: "flex",
  backgroundColor: "white",
  padding: 5,
  borderRadius: 5,
  boxShadow: "0 1px 1px #091e4240,0 0 1px #091e424f",
  justifyContent: "space-between",
});

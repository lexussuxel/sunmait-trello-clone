import { style } from "@vanilla-extract/css";

export const addButton = style({
  border: "none",
  borderRadius: 4,
  ":hover": {
    backgroundColor: "lightgray",
  },
});

export const title = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  cursor: "unset",
});

export const tableWrapper = style({
  rowGap: 5,
  display: "flex",
  flexDirection: "column",
});

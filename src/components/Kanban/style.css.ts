import { style } from "@vanilla-extract/css";

export const wrapperTables = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  minHeight: "80vh",
  columnGap: "5px",
  marginTop: "10vh"
});

export const card = style({
  fontSize: "12px",
  display: "flex",
  backgroundColor: "#f1f2f4",
  padding: "8px",
  cursor: "pointer",
  margin: "0 4px",
  minHeight: "32px",
  borderRadius: "12px",
  flexDirection: "column",
  color: "#172B4D",
  rowGap: "4px",
  height: "max-content",
  boxShadow: "0 1px 1px #091e4240,0 0 1px #091e424f",
  width: "20vw",
});

export const addButton = style([
  card,
  {
    backgroundColor: "#00000014",
    height: "min-content",
    minHeight: "unset",
    ":hover": {
      backgroundColor: "#00000020",
    },
  },
]);

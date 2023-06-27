import { style } from "@vanilla-extract/css";

export const wrapperTables = style({
  display: "flex",
  flexDirection: "row",
  columnGap: "5px",
  margin: "20px 10px 0 0",
});

export const wrapperKanban = style({
  overflow: "auto",
  width: "-webkit-fill-available",
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
  minWidth: "20vw",
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

export const messageWrapper = style({
    backgroundColor:"#ffffff7d",
    margin: "20vh auto",
    borderRadius: 8,
    fontSize: 32,
    padding: 20,
    width: "max-content",
    color: "white"
})

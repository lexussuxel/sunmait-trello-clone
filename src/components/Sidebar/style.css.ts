import { style, styleVariants } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "20vw",
  height: "100%",
  position: "fixed",
  backgroundColor: "hsla(205,29.7%,85.5%,0.9)",
  color: "#172B4D",
  fontSize: 14,
  padding: "5px 0",
});

const base_padding = {
  padding: "5px 8px",
};

export const title = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottom: "1px solid #172B4D",
  ...base_padding,
});

export const board_item = style({
  ...base_padding,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  selectors: {
    "&:active": {
      backgroundColor: "#091E4224",
    },
    "&:hover": {
      backgroundColor: "#091E420F",
    },
  },
});

export const tooltip = styleVariants({
  selected: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "10px",
    minWidth: "150px",
    boxShadow: "0px 8px 12px #091E4226, 0px 0px 1px #091E424F",
    top: "30px",
    left: "80%",
    rowGap: 5,
    padding: 8,
  },
  hidden: {
    display: "none",
  },
});

export const button = style({
  backgroundColor: "transparent",
  outline: "none",
  border: "none",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      color: "darkgrey",
    },
  },
});

export const buttonsWraper = style({
  display: "flex",
  columnGap: 4,
});

export const helperButton = style({
  ":hover": {
    borderRadius: 5,
    backgroundColor: "lightgray",
  },
  padding: "0 3px",
});

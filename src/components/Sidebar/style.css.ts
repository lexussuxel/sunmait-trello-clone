import { style, styleVariants } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  minWidth: "20vw",
  position: "sticky",
  backgroundColor: "#b4b9bae3",
  color: "#f6f7f8",
  fontSize: 16,
  padding: "5px 0",
  top: 0,
  left: 0,
  zIndex: 1,
});

const base_padding = {
  padding: "5px 8px",
};

export const title = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottom: "1px solid #f6f7f8",
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
    borderRadius: "5px",
    minWidth: "150px",
    boxShadow: "0px 8px 12px #091E4226, 0px 0px 1px #091E424F",
    top: "30px",
    left: "80%",
    rowGap: 5,
    padding: 8,
    color: "#4f4f4f",
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

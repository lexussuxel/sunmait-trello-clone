import { style, styleVariants } from "@vanilla-extract/css";

export const headerWrapper = style({
  backgroundColor: "hsl(0deg 0% 50.94% / 60%)",
  padding: 8,
  position: "sticky",
  top: 0,
  display: "flex",
  justifyContent: "space-between",
  width: "-webkit-fill-available",
});

export const title = style({
  ":hover": {
    backgroundColor: "hsl(0deg 0% 50.94% / 60%)",
    borderRadius: 4,
  },
  padding: 4,
  color: "white",
  width: "max-content",
  cursor: "pointer",
});

export const logBarWrapper = styleVariants({
  disabled: {
    display: "none",
  },
  primary: {
    position: "fixed",
    minHeight: "100vh",
    width: "20vw",
    top: 0,
    right: 0,
    padding: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
  },
});

export const logWrapper = style({
  padding: 5,
  border: "1px solid lightgray",
  borderRadius: 5,
});

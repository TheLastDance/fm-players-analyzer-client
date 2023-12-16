
export const selectStyles = {
  color: "var(--maincFontColor)",
  fontWeight: '700',
  '&.MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: "var(--maincFontColor)", // Set your desired color here
    },
    '&:hover fieldset': {
      borderColor: "var(--maincFontColor)", // Set your desired hover color here
    },
    '&.Mui-focused fieldset': {
      borderColor: "var(--maincFontColor)", // Set your desired focus color here
    },
    '& svg': {
      fill: "var(--maincFontColor)", // Set your desired arrow color here
    },
  },
}

export const dropDownStyles = {
  background: "var(--maincFontColor)",
  '& .MuiMenuItem-root': {
    backgroundColor: "var(--maincFontColor)", // Set your desired background color here
    padding: "5px 13px",
  },
  menu: {
    '& .MuiPaper-root': {
      backgroundColor: "var(--maincFontColor)", // Set your desired background color here
    },
  }
}
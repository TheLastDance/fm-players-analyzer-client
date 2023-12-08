export const textFieldStyle = {
  '& .MuiFormLabel-root': {
    color: 'var(--maincFontColor)',
    opacity: 0.8,
  },
  '& label.Mui-focused': {
    color: 'var(--maincFontColor)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'var(--maincFontColor)',
  },
  '& .MuiOutlinedInput-root': {
    color: 'var(--maincFontColor)',
    '& fieldset': {
      borderColor: 'var(--maincFontColor)',
    },
    '&:hover fieldset': {
      borderColor: '#a8aa9e',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--maincFontColor)',
    },
  },
}

export const buttonDisabled = {
  "&.MuiButton-root": {
    "&.Mui-disabled": {
      color: "rgba(25,118,210,0.3)",
      border: "1px solid rgba(25,118,210,0.3)",
    }
  }
}

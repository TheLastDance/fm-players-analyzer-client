import { styled } from "@mui/material"

export const BpIcon = styled('span')(() => ({
  borderRadius: 3,
  width: 20,
  height: 20,
  backgroundColor: 'rgb(201, 193, 193)',
}));

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#2e7d32',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#2e7d32',
  },
});

export const textFieldStyle = {
  marginRight: '20px',
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

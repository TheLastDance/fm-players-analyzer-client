import './Nav.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { languages } from '../../data/langueages';
import { Language } from '../../types';
import { selectStyles, dropDownStyles } from './MuiStyles';
//import { styled } from '@mui/material';

interface INav {
  lang: string,
  setLang: React.Dispatch<React.SetStateAction<Language['lang']>>,
}

// const Header = styled('header')(({ theme }) => ({
//   ...theme.typography.button,
// }));

const Nav = ({ lang, setLang }: INav) => {

  const handleChange = (e: SelectChangeEvent) => {
    const language = e.target.value as Language['lang'];
    setLang(language);
    localStorage.setItem('lang', language);
  }

  return (
    <header>
      <h1>FM Players Analyzer</h1>
      <Box sx={{ width: 200 }}>
        <FormControl className='Form-Control' fullWidth>
          <InputLabel id="demo-simple-select-label" sx={selectStyles} >Choose language of your file</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang}
            label="Choose language of your file"
            onChange={handleChange}
            sx={selectStyles}
            MenuProps={{
              PaperProps: {
                sx: dropDownStyles
              }
            }
            }
          >
            {languages.map((item, index) => <MenuItem key={index} value={item.lang}>
              <div className='language-list'>
                {item.lang}
                <img className='img_flags' src={item.img} alt={`${item.lang}-flag`} />
              </div>
            </MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    </header>
  )
}

export default Nav;



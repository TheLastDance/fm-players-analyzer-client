import './Form.css'
import { buttonStyles } from './MuiStyles';
import Button from '@mui/material/Button';

interface IForm {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Form = ({ handleSubmit, handleFileChange }: IForm) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <div>Select html file to upload:</div>
        <input type="file" accept="text/html" onChange={handleFileChange} />
      </label>
      <Button sx={buttonStyles} variant='outlined' type='submit'>Submit</Button>
    </form>
  )
}

export default Form;
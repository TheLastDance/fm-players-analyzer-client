import { useState } from "react";


export function useToggle(isToggled: boolean = false): [boolean, () => void, () => void, () => void] {
  const [toggle, setToggle] = useState(isToggled);

  const handleToggle = () => {
    setToggle(prev => !prev);
  }

  const handleFalse = () => {
    if (toggle) setToggle(false);
  }

  const handleTrue = () => {
    if (!toggle) setToggle(true);
  }

  return [toggle, handleToggle, handleFalse, handleTrue];
}
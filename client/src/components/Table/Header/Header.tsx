import { titles } from "../../../data/positionsTitles";
import { useToggle } from "../../../customHooks/useToggle";

interface IHeader {
  item: string,
  handleSort: (item: keyof typeof titles, toggle?: boolean) => void,
  handleTitles: (item: keyof typeof titles) => string,
}

const Header = ({ item, handleSort, handleTitles }: IHeader) => {
  const [toggle, handleToggle] = useToggle();

  return (
    <th
      title={handleTitles(item as keyof typeof titles)}
      onClick={() => { handleSort(item as keyof typeof titles, toggle); handleToggle() }}
    >
      {item}
    </th>
  )
}

export default Header;
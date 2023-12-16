import "./Rules.css";
import { tutorial, rules } from "../../data/rules";
import { useToggle } from "../../customHooks/useToggle";
import arrow_down_icon from "../../assets/arrow_down.svg";

const Rules = () => {
  const [toggled, handleToggle] = useToggle();

  return (
    <section className="rules_section">
      <button
        type="button"
        onClick={handleToggle}
        className={toggled ? "focused_button" : ""}
      >
        <h2>Tutorial and Rules</h2>
        <img className={toggled ? "rotate_arrow" : ""} src={arrow_down_icon} alt="arrow_icon" />
      </button>
      {toggled && <ul className="rules_ul">
        {tutorial.map((item, index) => <li key={index}>
          {item}
        </li>)}
        {rules.map((item, index) => <li key={index} className="rules_li">
          {item}
        </li>)}
      </ul>
      }
    </section>
  )
}

export default Rules;
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>To Do List</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/items" activeClassName={classes.active}>
              All Items
            </NavLink>
          </li>

          <li>
            <NavLink to="/new-item" activeClassName={classes.active}>
              Add an item
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>

  );
};

export default MainNavigation;

import { Link } from "react-router-dom";
import classes from "./NoItemsFound.module.css";

const NoQuotesFound = () => {
  return (
    <div className={classes.noitems}>
      <p>No items found!</p>
      <Link className="btn" to="/new-item">
        Add an Item
      </Link>
    </div>
  );
};

export default NoQuotesFound;

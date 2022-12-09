/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Card from "../components/items/Card";
import NoItemsFound from "../components/items/NoItemsFound";
import styles from "../components/items/card.module.css";

const AllItems = () => {
    const { itemId } = useParams();
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pending, setPending] = useState(true);

    const getItems = () => {
        var queryString = "?";
        if (itemId) {
            queryString += `id=${itemId}`;
        }
        var apiUrl = `http://localhost:5000/items${queryString}`;
        axios.get(apiUrl).then(i => {
            console.log(i.data);
            setIsLoaded(true);
            setItems(i.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getItems();
    }, [])

    if (!isLoaded) {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    // if (isLoaded && (items.length === 0 || items.filter((item, idx) => item.isCompleted === false))) {
    //     return <NoItemsFound />;
    // }

    return <>
        <div className="btn-div">
            <button className="btn" onClick={(e) => { e.preventDefault(); setPending(true) }}>
                Pending
            </button>

            {items.filter((item, idx) => item.isCompleted === true).length > 0 && <button className="btn" onClick={(e) => { e.preventDefault(); setPending(false) }}>
                Completed
            </button>}
        </div>
        <hr />
        <h2 className="centered">{pending ? "Pending" : "Completed"}</h2>

        {(isLoaded && (items.length === 0 || items.filter((item, idx) => item.isCompleted === false).length === 0) && pending) ?
            <NoItemsFound />
            :
            <div className={styles["cards-container"]}>
                {(pending ? items.filter((item, idx) => item.isCompleted === false) : items.filter((item, idx) => item.isCompleted))?.map((item, idx) => <Card key={idx} refreshList={getItems} id={item._id} title={item.title} description={item.description} isCompleted={item.isCompleted} />)}
            </div>}
    </>
}

export default AllItems;
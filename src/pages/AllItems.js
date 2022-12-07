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

    if (isLoaded && items.length === 0) {
        return <NoItemsFound />;
    }

    return <>

        <div className={styles["cards-container"]}>
            {items?.map((item, idx) => <Card key={idx} refreshList={getItems} id={item._id} title={item.title} description={item.description} isCompleted={item.isCompleted} />)}
        </div>
    </>
}

export default AllItems;
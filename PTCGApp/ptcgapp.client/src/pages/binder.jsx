import { useEffect, useState } from "react";

function Binder() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //specific data
    const [image, setImage] = useState(null);

    //search bar data
    const [query, setQuery] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [searchImage, setSearchImage] = useState(null);

    //all cards
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(' https://api.pokemontcg.io/v2/cards/xy1-1');
                const cardsResponse = await fetch(' https://api.pokemontcg.io/v2/cards');
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                const cardsResult = await cardsResponse.json();
                setData(result);
                setImage(result.data.images.small);

                setCards(cardsResult);
                //console.log(result);
                //console.log(cardsResult);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    if (loading) {
        <div>Loading...</div>;
    }

    if (error) {
        <div>Error: {error.message}</div>;
    }

    const handleSearch = (query) => {
        setQuery(query);
        const searchCard = async () => {
            try {
                const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${query}*`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setSearchData(result);
                setSearchImage(result.data.images.small);
                console.log(searchData);
                console.log(searchImage);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        searchCard();
    }

    return (
        <div>
            
            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
            />
            <h1>Card Search</h1>
            {Array.isArray(cards) && cards.length > 0 ? (
                cards.map((item, index) => (
                    <div key={index}>
                        <p>{item.name}</p>
                    </div>
                ))
            ) : (
                <p>No data found</p>
            )}
            <h1>Data:</h1>
            {image ? <img src={image} alt="Fetched from API" /> : <div>No image available</div>}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Binder;
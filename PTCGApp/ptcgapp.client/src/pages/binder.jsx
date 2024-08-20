import { useEffect, useState } from "react";

function Binder() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //specific data
    const [image, setImage] = useState(null);

    //search bar data
    const [query, setQuery] = useState('');
    const [searchData, setSearchData] = useState(null);
    const [searchImage, setSearchImage] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(' https://api.pokemontcg.io/v2/cards/xy1-1');
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(result);
                setImage(result.data.images.small);
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
                const response = await fetch(`https://api.pokemontcg.io/v2/cards/${query}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setSearchData(result);
                setSearchImage(result.data.images.small);
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
            <h1>Data:</h1>
            {image ? <img src={image} alt="Fetched from API" /> : <div>No image available</div>}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Binder;
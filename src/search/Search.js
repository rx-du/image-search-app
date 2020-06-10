import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SearchCard from './SearchCard';
import './Search.scss';
import link from '../assets/link.svg';

const API_KEY = '13136421-266c28a6d61717bc2e4e6a83e';
const CATEGORY_OPTIONS = [
    'fashion', 'nature', 'backgrounds', 'science', 'education', 'people', 'feelings', 'religion', 'health', 'places',
    'animals', 'industry', 'food', 'computer', 'sports', 'transportation', 'travel', 'buildings', 'business', 'music'
];

function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [savedResults, setSavedResults] = useState([]);

    const handleSearch = (event) => {
        makeApiCall(searchInput, searchCategory !== 'Category...' ? searchCategory : '');
        event.preventDefault();
    };

    const makeApiCall = (input, category) => {
        var searchUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${input}&image_type=photo&per_page=10` + (category ? `&category=${category}` : '');
        fetch(searchUrl).then(response => {
            return response.json();
        }).then(data => {
            setSearched(true);
            setSearchResults(data.hits);
        });
    };

    const handleSaveResult = (result) => {
        const item = {
            id: result.id,
            largeImageURL: result.largeImageURL
        }
        setSavedResults([...savedResults, item]);
    }

    return (
        <div className="container-fluid search" data-testid="search">
            <div className="row">
                <div className="col-lg-10 col-sm-9 col-8 mt-lg-4 mb-lg-4 search-container">
                    <form className="row" onSubmit={event => handleSearch(event)}>
                        <div className="col-lg-7 col-md-6 col-12 mt-2 mb-2 input-container">
                            <input className="btn" name="text" type="text" placeholder="Keyword..." onChange={event => setSearchInput(event.target.value)} value={searchInput}/>
                        </div>
                        <div className={'col-lg-3 col-md-4 pl-md-0 col-12 mt-2 mb-2 dropdown-container' + (searchCategory ? '' : ' default-dropdown')}>
                            <DropdownButton className="default-dropdown" title={searchCategory ? searchCategory : 'Category...'}>
                                {CATEGORY_OPTIONS.map(value => <Dropdown.Item key={value} onClick={event => setSearchCategory(value)}>{value}</Dropdown.Item>)}
                                <Dropdown.Item key="none" onClick={event => setSearchCategory('')}>none</Dropdown.Item>
                            </DropdownButton>
                        </div>

                        <div className="col-md-2 pl-md-0 col-12 mt-2 mb-2 button-container">
                            <button className="btn" type="submit">Search</button>
                        </div>
                    </form>
                    {searchResults.length > 0 ? searchResults.map((result, index) => (
                        <SearchCard key={index} result={result} isSaved={savedResults.some(e => e.id === result.id)} saveResult={handleSaveResult}></SearchCard>
                    )) :
                        searched ? <div className="mt-5 mb-5 no-results">No Results</div> : null
                    }
                </div>
                <div className="col-lg-2 col-sm-3 col-4 mt-lg-4 mb-lg-4 mt-2 mb-2 saved-container">
                    <div className="pl-sm-3 pr-0 pl-0 saved-result">
                        <div className="mb-4 saved-header">Saved</div>
                        {savedResults.map(value => (
                            <a key={value.id} className="mt-2 mb-2" target="_blank" rel="noopener noreferrer" href={value.largeImageURL}>#{value.id}<img className="icon" src={link} alt="link" /></a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
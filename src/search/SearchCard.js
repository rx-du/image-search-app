import React from 'react';
import './SearchCard.scss';
import star from '../assets/star.svg';
import thumbsUp from '../assets/thumbs_up.svg';


function SearchCard(props) {
    const handleImageClick = () => {
        if (!props.isSaved) {
            props.saveResult(props.result);
        }
    };

    return (
        <div className="row result-container mt-lg-4 mb-lg-4 mt-3 mb-3" data-testid="result">
            <div className="col-lg-8 col-6 pr-lg-3 pr-0 image-container">
                <div className={'image' + (props.isSaved ? ' saved' : '')} onClick={event => handleImageClick()} data-testid="result-image">
                    <img src={props.result.largeImageURL} alt="thumbnail" />
                </div>
            </div>
            <div className="col-lg-4 col-6 image-info">
                <div className="tags">
                    {props.result.tags.split(', ').map((value, index) => <span key={index} className="tag">{value}</span>)}
                </div>
                <div className="spacer"></div>
                <div className="likes-favs">
                    <span className="likes">{props.result.likes} <img className="icon" src={thumbsUp} alt="thumbs_up" /></span>
                    <span className="favorites">{props.result.favorites} <img className="icon" src={star} alt="star" /></span>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;
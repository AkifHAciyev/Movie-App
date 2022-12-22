import React, { useEffect, useState } from 'react';
import './main.css';

const Main = () => {
	const [films, setFilms] = useState([]);
	const [addFavourite, setAddFavourite] = useState([]);
	const [searchedVal, setSearchedVal] = useState('harry');
	const [loading, setLoading] = useState(false);
	const [showFavourite, setShowFavourite] = useState(false);

	useEffect(() => {
		loadData();
	}, [searchedVal]);

	const loadData = () => {
		setLoading(true);
		fetch(`http://www.omdbapi.com/?s=${searchedVal || 'harry'}&apikey=ba719b52`)
			.then((res) => res.json())
			.then((data) => {
				setFilms(data.Search);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	};

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const handleAddFavourite = (film) => {
		const newFavouriteList = [...addFavourite, film];
		setAddFavourite(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const handleShowFavourite = () => {
		setShowFavourite((e) => !e);
	};

	const removeFavourite = (film) => {
		const newFavouriteList = addFavourite.filter((favourite) => favourite.imdbID !== film.imdbID);

		setAddFavourite(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<>
			<form className="form" action="">
				<i className="fa fa-search" aria-hidden="true"></i>
				<input onChange={(e) => setSearchedVal(e.target.value)} type="text" placeholder="search by name" />
				<button onClick={handleShowFavourite} className="favourite">
					{(!showFavourite && 'Favourite') || 'Close Favourite'}
				</button>
			</form>
			{showFavourite && <h2>Favourite</h2>}
			<div className="wrapper">
				{showFavourite &&
					addFavourite.map((film) => {
						return (
							<div key={film.imdbID} className="film-box">
								<img className="poster" src={film.Poster} alt="" />
								<div className="box-title">
									<div className="title">{film.Title}</div>
									<button onClick={() => removeFavourite(film)} className="favouriteBtn">
										<i className="fa fa-trash" aria-hidden="true"></i>
									</button>
								</div>

								<div className="footer-box">
									<p className="year">{film.Year}</p>
									<p className="reting">9/10</p>
								</div>
							</div>
						);
					})}
			</div>

			<div className="wrapper">
				{loading && <h1>Loading...</h1>}
				{films &&
					films.map((film) => {
						return (
							<div key={film.imdbID} className="film-box">
								<img className="poster" src={film.Poster} alt="" />
								<div className="box-title">
									<div className="title">{film.Title}</div>
									<button onClick={() => handleAddFavourite(film)} className="favouriteBtn">
										<i className="fa-solid fa-heart"></i>
									</button>
								</div>

								<div className="footer-box">
									<p className="year">{film.Year}</p>
									<p className="reting">9/10</p>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default Main;

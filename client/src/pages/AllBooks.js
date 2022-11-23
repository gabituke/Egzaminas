import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import axios from 'axios';

const AllBooks = () => {
	const [ books , setBooks  ] = useState([]);
	const [post, setPost] = useState({})
	const { setAlert } = useContext(MainContext);

	useEffect(
		() => {
			let url = '/api/books/';

			axios.get(url).then((resp) => setBooks (resp.data)).catch((error) => {
				console.log(error);
				setAlert({
					message: error.response.data,
					status: 'danger'
				});
			});
		},
		[ setAlert ]
	);

	return (
		<div className="album py-5 bg-light">
			<div className="container">
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
					{books.length > 0 &&
						books.map((article) => {
							return (
								<div className="col" key={article.id}>





									<div className="card shadow-sm container-img">
										<Link to={'/books/single/' + article.id}>
											<img
											
												src={article.image}
												alt={article.title}
												className="bd-placeholder-img card-img-top"
												width="100%"
												height="225"
												focusable="false"
											/>
											<div className="overlay">
												<div className="text">{article.title}</div>
											</div>
											
										</Link>
									</div>
						
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default AllBooks;

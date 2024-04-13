import React from 'react';
import './ViewAsideMenu.css';
import ReactPaginate from 'react-paginate';

type Action<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
	page: number;
	perPage: number;
	totalPage: number;
	actionPage: Action<number>;
	actionPerPage: Action<number>;
}

export const ViewAsideMenu: React.FC<Props> = ({
	page,
	perPage,
	totalPage,
	actionPage,
	actionPerPage,
}) => {
	return (
		<main className="aside-menu__container">
			<h3>Earthquake watcher</h3>
			<section>
				<h5>features ask: {perPage}</h5>
				<p>{page} papa</p>
			</section>
			<ReactPaginate
				containerClassName="pagination"
				activeClassName="active-page"
				pageClassName="page-item"
				breakLabel="..."
				nextLabel={<button className="pagination-button"> {' > '} </button>}
				onPageChange={(e) => actionPage(e.selected + 1)}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={totalPage}
				previousLabel={<button className="pagination-button"> {' < '} </button>}
			/>
		</main>
	);
};

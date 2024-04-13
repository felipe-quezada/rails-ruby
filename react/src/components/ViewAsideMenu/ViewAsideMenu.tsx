import React from 'react';
import './ViewAsideMenu.css';
import ReactPaginate from 'react-paginate';
import { Earthquake } from '../../interfaces/earthquakes';
import { AccordionFeature } from '..';

type Action<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
	items: Earthquake[];
	page: number;
	perPage: number;
	totalPage: number;
	actionPage: Action<number>;
	actionPerPage: Action<number>;
}

export const ViewAsideMenu: React.FC<Props> = ({
	items,
	page,
	perPage,
	totalPage,
	actionPage,
	actionPerPage,
}) => {
	return (
		<main className="aside-menu__container">
			<h3>Earthquake watcher</h3>
			{/* TODO: aun no programadas */}
			<p style={{ display: 'none' }}>
				{page}
				{perPage}
			</p>
			<button
				style={{ display: 'none' }}
				onClick={() => actionPerPage(2)}
			></button>
			{/* ------------------------ */}
			<section className="aside-menu__display-features">
				<AccordionFeature items={items} />
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

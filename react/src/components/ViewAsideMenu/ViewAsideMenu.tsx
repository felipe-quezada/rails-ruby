import React from 'react';
import './ViewAsideMenu.css';
import ReactPaginate from 'react-paginate';
import { Earthquake } from '../../interfaces/earthquakes';
import { AccordionFeature, PopOverControll } from '..';
import {
	CaretLeftIcon,
	CaretRightIcon,
	Cross2Icon,
} from '@radix-ui/react-icons';
import { ActionAsideFn, ControllerEnum } from '../../interfaces';

interface ShowDispley {
	showAside: boolean;
	showComments: boolean;
}

interface Props {
	items: Earthquake[];
	page: number;
	perPage: number;
	totalPage: number;
	show: ShowDispley;
	action: ActionAsideFn;
}

export const ViewAsideMenu: React.FC<Props> = ({
	items,
	show,
	page,
	perPage,
	totalPage,
	action,
}) => {
	return (
		<main
			className={`aside-menu__container ${show.showAside ? 'show-aside' : ''}`}
		>
			<div className="aside-menu__header-menu">
				<h2>Earthquake watcher</h2>
				<div className="icons-container">
					<PopOverControll action={action} perPage={perPage} />
					<Cross2Icon
						className="cross-icon"
						onClick={() => action(ControllerEnum.SHOW_ASIDE)}
					/>
				</div>
			</div>
			{/* TODO: aun no programadas */}
			<p style={{ display: 'none' }}>
				{page}
				{perPage}
			</p>
			<button
				style={{ display: 'none' }}
				onClick={() => action(ControllerEnum.PER_PAGE, 2)}
			></button>
			{/* ------------------------ */}
			<section className="aside-menu__display-features">
				<AccordionFeature items={items} action={action} />
			</section>
			<ReactPaginate
				containerClassName="pagination"
				activeClassName="active-page"
				pageClassName="page-item"
				breakLabel="..."
				nextLabel={
					<button className="pagination-button">
						<CaretRightIcon />
					</button>
				}
				onPageChange={(e) => action(ControllerEnum.PAGE, e.selected + 1)}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={totalPage}
				previousLabel={
					<button className="pagination-button">
						<CaretLeftIcon />
					</button>
				}
			/>
		</main>
	);
};

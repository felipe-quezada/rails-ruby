import React, { useEffect, useState } from 'react';
import { MapView, ViewAsideMenu, ViewCommentAside } from './components';
import { getEarthcuakesPage } from './services';
import {
	ControllerEnum,
	type ActionAsideFn,
	type ActionAsideFnPayload,
	type Earthquake,
	type Earthquakes,
} from './interfaces';
import './App.css';

//? On dev:
import data from './assets/json/dataServer.json';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export const App: React.FC = () => {
	const [marks, setMarks] = useState<Earthquake[]>([]);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(20);
	const [idComment, setIdComment] = useState<number | undefined>(undefined);
	const [magType, setMagType] = useState<ActionAsideFnPayload | undefined>(
		undefined
	);
	const [numberPages, setNumberPages] = useState<number>(1);
	const [showComments, setShowComment] = useState<boolean>(false);
	const [showAside, setShowAside] = useState<boolean>(true);

	const handleActionAside: ActionAsideFn = (controller, payload) => {
		switch (controller) {
			case ControllerEnum.PAGE:
				setPage(payload as number);
				break;
			case ControllerEnum.PER_PAGE:
				setPerPage(payload as number);
				break;
			case ControllerEnum.MAG_TYPE:
				setMagType(payload as ActionAsideFnPayload | undefined);
				break;
			case ControllerEnum.SHOW_ASIDE:
				setShowAside(!showAside);
				break;
			case ControllerEnum.SHOW_COMMENTS:
				setShowComment(!showComments);
				break;
			case ControllerEnum.ID_COMMENT:
				setIdComment(payload as number);
				break;
			default:
				throw new Error();
		}
	};

	useEffect(() => {
		// ? On product:
		if (import.meta.env.PROD) {
			getEarthcuakesPage(page, perPage, magType).then((features) => {
				setMarks(features.data);
				setNumberPages(features.pagination.total);
			});
		} else {
			// ? On dev:
			const { data: earth, pagination } = data as unknown as Earthquakes;
			setMarks(earth);
			setNumberPages(pagination.total);
		}
	}, [page, perPage, magType]);

	return (
		<>
			{marks.length == 0 ? (
				<div className="loading-screen">
					<h1>Loading</h1>
				</div>
			) : (
				<>
					<button
						className="menu-button"
						onClick={() => {
							setShowAside(!showAside);
						}}
					>
						<HamburgerMenuIcon />
					</button>
					<ViewAsideMenu
						items={marks}
						show={{ showAside, showComments }}
						page={page}
						perPage={perPage}
						totalPage={numberPages}
						action={handleActionAside}
					/>
					<ViewCommentAside
						idComment={idComment}
						showComments={showComments}
						action={handleActionAside}
					/>
					<MapView marks={marks} />
				</>
			)}
		</>
	);
};

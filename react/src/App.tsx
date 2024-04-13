import React, { useEffect, useState } from 'react';
import { MapView, ViewAsideMenu } from './components';
import { getEarthcuakesPage } from './services';
import { Earthquake } from './interfaces/earthquakes';

export const App: React.FC = () => {
	const [marks, setMarks] = useState<Earthquake[]>([]);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(5);
	const [numberPages, setNumberPages] = useState<number>(1000);

	// const page = 1,
	// 	perPage = 100;

	useEffect(() => {
		getEarthcuakesPage(page, perPage).then((features) => {
			setMarks(features.data);
			setNumberPages(features.pagination.total);
		});
	}, []);

	return (
		<>
			{/* {marks.length == 0 ? <h1>cargando</h1> : <MapView marks={marks} />} */}
			<ViewAsideMenu
				page={page}
				perPage={perPage}
				totalPage={numberPages}
				actionPage={setPage}
				actionPerPage={setPerPage}
			/>
			<MapView marks={marks} />
		</>
	);
};

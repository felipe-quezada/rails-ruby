import React, { useEffect, useState } from 'react';
import { MapView, ViewAsideMenu } from './components';
import { getEarthcuakesPage } from './services';
import { Earthquake } from './interfaces/earthquakes';

//? On dev:
//import data from './assets/json/dataServer.json';

export const App: React.FC = () => {
	const [marks, setMarks] = useState<Earthquake[]>([]);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(20);
	const [numberPages, setNumberPages] = useState<number>(1);

	// const page = 1,
	// 	perPage = 100;

	useEffect(() => {
		// ? On product:
		getEarthcuakesPage(page, perPage).then((features) => {
			setMarks(features.data);
			setNumberPages(features.pagination.total);
		});

		// ? On dev:
		// const { data: earth, pagination } = data as unknown as Earthquakes;
		// setMarks(earth);
		// setNumberPages(pagination.total);
	}, []);

	return (
		<>
			{/* {marks.length == 0 ? <h1>cargando</h1> : <MapView marks={marks} />} */}
			<ViewAsideMenu
				items={marks}
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

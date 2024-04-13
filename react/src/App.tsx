import React, { useEffect, useState } from 'react';
import { MapView } from './components';
import { getEarthcuakesPage } from './services';
import { Earthquake } from './interfaces/earthquakes';

export const App: React.FC = () => {
	const [marks, setMarks] = useState<Earthquake[]>([]);
	// const [page, setPage] = useState<number>(1);
	// const [perPage, setPerPage] = useState<number>(100);

	const page = 1,
		perPage = 100;

	useEffect(() => {
		getEarthcuakesPage(page, perPage).then(({ data }) => {
			setMarks(data);
		});
	}, []);
	return (
		<>{marks.length == 0 ? <h1>cargando</h1> : <MapView marks={marks} />}</>
	);
};

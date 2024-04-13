import axios from 'axios';
import { Earthquakes } from '../interfaces/earthquakes';

// 'https://earthquake-hm70.onrender.com/'
axios.defaults.baseURL = 'http://localhost:3000';

export const getEarthcuakesPage = async (
	page: number,
	perPage: number,
	magType?: string
): Promise<Earthquakes> => {
	const { data } = await axios.get(
		`api/features?page=${page}&per_page=${perPage}${
			magType ? `&mag_type%5B%5D=${magType}` : ''
		}`
	);

	return data as Earthquakes;
};

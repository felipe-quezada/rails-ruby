import axios from 'axios';
import { Earthquakes, GetComments, PostComment } from '../interfaces';

axios.defaults.baseURL = import.meta.env.PROD
	? 'https://earthquake-hm70.onrender.com/'
	: 'http://localhost:3000';

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

export const getComments = async (id: number): Promise<GetComments> => {
	const { data } = await axios.get(`api/features/${id}}/comments`);

	return data as GetComments;
};

export const postComment = async (
	id: number,
	comment: string
): Promise<PostComment> => {
	const { data } = await axios.post(`api/features/${id}}/comments`, {
		body: comment,
	});

	return data as PostComment;
};

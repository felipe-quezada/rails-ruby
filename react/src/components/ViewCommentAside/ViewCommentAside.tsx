import React, { useEffect, useState } from 'react';
import './ViewCommentsAside.css';
import {
	ActionAsideFn,
	Comments,
	ControllerEnum,
	Feature,
} from '../../interfaces';
import { getComments } from '../../services';

interface Props {
	idComment: number | undefined;
	showComments: boolean;
	action: ActionAsideFn;
}

export const ViewCommentAside: React.FC<Props> = ({
	showComments,
	idComment,
	action,
}) => {
	const [comments, setComments] = useState<Comments>({
		quantity: 2,
		comment: [
			{
				id: 1,
				content: 'This is a comment',
				feature_id: 9991,
				created_at: '2024-04-14T07:26:07.103Z',
				updated_at: '2024-04-14T07:26:07.103Z',
			},
			{
				id: 2,
				content: 'This is another comment',
				feature_id: 9991,
				created_at: '2024-04-14T07:26:23.657Z',
				updated_at: '2024-04-14T07:26:23.657Z',
			},
		],
	});
	const [feature, setFeature] = useState<Feature>({
		id: 9991,
		id_feature: 'ci40712608',
		magnitude: '2.38',
		place: '21 km N of Ridgecrest, CA',
		time: '1713077256300',
		tsunami: false,
		mag_type: 'ml',
		title: 'M 2.4 - 21 km N of Ridgecrest, CA',
		url: 'https://earthquake.usgs.gov/earthquakes/eventpage/ci40712608',
		longitude: '-117.635498',
		latitude: '35.8031654',
		created_at: '2024-04-14T06:50:17.373Z',
		updated_at: '2024-04-14T06:50:17.373Z',
	});
	useEffect(() => {
		if (idComment !== undefined && import.meta.env.PROD) {
			getComments(idComment).then(({ comments, feature }) => {
				setComments(comments);
				setFeature(feature);
			});
		}
	}, [idComment]);

	return (
		<section
			className={`aside-comments__container ${
				showComments ? 'show-comments' : ''
			}`}
		>
			<h2>
				Comments of <br />
				{feature.title}
			</h2>
			<div>
				<h5>Quantity: {comments.quantity}</h5>
				<ul>
					{comments.comment.map((comment) => {
						return (
							<li>
								<strong>{comment.content}</strong>
								<br />
								<p>{comment.created_at.replace('T', ' ').replace('Z', '')}</p>
							</li>
						);
					})}
				</ul>
			</div>
			<button onClick={() => action(ControllerEnum.SHOW_COMMENTS)}>exit</button>
			<button
				onClick={() => {
					action(ControllerEnum.SHOW_COMMENTS);
					action(ControllerEnum.SHOW_ASIDE);
				}}
			>
				testo
			</button>
		</section>
	);
};

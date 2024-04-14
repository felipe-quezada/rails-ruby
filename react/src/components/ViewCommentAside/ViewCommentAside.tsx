import React, { useEffect, useState } from 'react';
import './ViewCommentsAside.css';
import {
	ActionAsideFn,
	Comments,
	ControllerEnum,
	Feature,
} from '../../interfaces';
import { getComments, postComment } from '../../services';
import { ArrowLeftIcon, Cross2Icon } from '@radix-ui/react-icons';

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
			{
				id: 2,
				content: 'This is another comment',
				feature_id: 9991,
				created_at: '2024-04-14T07:26:23.657Z',
				updated_at: '2024-04-14T07:26:23.657Z',
			},
			{
				id: 2,
				content: 'This is another comment',
				feature_id: 9991,
				created_at: '2024-04-14T07:26:23.657Z',
				updated_at: '2024-04-14T07:26:23.657Z',
			},
			{
				id: 2,
				content: 'This is another comment',
				feature_id: 9991,
				created_at: '2024-04-14T07:26:23.657Z',
				updated_at: '2024-04-14T07:26:23.657Z',
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
	const [createComment, setCreateComment] = useState<string>('');
	const [commentSubmited, setCommentSubmited] = useState<0 | 1>(0);
	useEffect(() => {
		if (idComment !== undefined && import.meta.env.PROD) {
			getComments(idComment).then(({ comments, feature }) => {
				setComments(comments);
				setFeature(feature);
			});
		}
	}, [idComment, commentSubmited]);

	return (
		<section
			className={`aside-comments__container ${
				showComments ? 'show-comments' : ''
			}`}
		>
			<div className="header-container">
				<h2>
					Comments of <br />
					{feature.title}
				</h2>
				<button
					className="exit-button"
					onClick={() => action(ControllerEnum.SHOW_COMMENTS)}
				>
					<Cross2Icon className="icons-button" />
				</button>
				<button
					className="return-button"
					onClick={() => {
						action(ControllerEnum.SHOW_COMMENTS);
						action(ControllerEnum.SHOW_ASIDE);
					}}
				>
					<ArrowLeftIcon className="icons-button" />
				</button>
			</div>
			<section className="display-comments-container">
				<h5>Quantity: {comments.quantity}</h5>
				<ul className="comment-list">
					{comments.comment.map((comment) => {
						return (
							<li>
								<small className="date-comment">
									{new Date(comment.created_at).toLocaleString()}
								</small>
								<p>{comment.content}</p>
							</li>
						);
					})}
				</ul>
			</section>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					postComment(idComment!, createComment).then(() => {
						setCreateComment('');
						setCommentSubmited(commentSubmited === 0 ? 1 : 0);
					});
				}}
				className="comments-form"
			>
				<label className="comments-area-lebel" htmlFor="new-comment">
					Create a new comment:
				</label>
				<textarea
					className="comments-area"
					id="new-comment"
					cols={30}
					rows={10}
					value={createComment}
					onChange={(e) => setCreateComment(e.target.value)}
				></textarea>
				<button className="submit-button" type="submit">
					Save
				</button>
			</form>
		</section>
	);
};

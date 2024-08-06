import React, { useState, useContext } from 'react';
import AuthContext from '../context';

const Media = () => {
	const {state, dispatch} = useContext(AuthContext);
	
	return (
		<div className="media-posts">
			{state.mediaPosts.map((post, idx) => {
				return (
					<div>
						<img className="media-post-img" src="${post.source}" />
						<p className="media-post-user">post.user_id</p>
						<p className="media-post-time">post.crated_at</p>
					</div>
				)
			})}
		</div>
	)
}

export default Media;
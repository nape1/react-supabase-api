import { useState, useEffect } from 'react';
import {supabase} from './client';

import './App.scss';


function App() {
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState({
		title: '',
		content: ''
	});
	const {title, content} = post;

	useEffect(() => {
		fetchPosts()
	},[])
	async function fetchPosts() {
		const {data} = await supabase
			.from('posts')
			.select("*")
		setPosts(data)
		console.log('fetchPosts');
	}

	const createPost = async function () {
		await supabase
		.from('posts')
		.insert({
			title,
			content
		})
		.single()
		setPost({
			title: '',
			content: ''
		})
		console.log('createPost');
		fetchPosts()
	}
	return (
		<div id="App">
			<div className="postInputWrapper">
				<h1>Add Notes</h1>
				<input type="text" value={title} placeholder="title" onChange={e => setPost({...post, title: e.target.value})}/>
				<textarea type="text" value={content} placeholder="content" onChange={e => setPost({...post, content: e.target.value})}/>
				<button onClick={createPost}>Create Post</button>
			</div>
			<div className="postWrapper">
				<h1>Notes</h1>
				{
					posts?.map(post => (
						<div className='post' key={post.id}>
							<h3>{post.title}</h3>
							<div>{post.content}</div>
						</div>
					))
				}
			</div>
		</div>
	);
}

export default App;

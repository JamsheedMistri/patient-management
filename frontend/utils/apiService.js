import axios from 'axios';

export default axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	transformRequest: [
		function (data, headers) {
			const token = localStorage.getItem('token');
			if (token) {
				headers['Authorization'] = `${token}`;
			}
			return JSON.stringify(data);
		},
	],
});

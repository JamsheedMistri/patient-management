import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import apiService from '../utils/apiService';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Login() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (localStorage.getItem('token')) {
			router.push('/');
		}
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await apiService.post('/auth/login', {
				email,
				password,
			});
			localStorage.setItem('token', response.data.token);
			router.push('/');
		} catch (err) {
			setError(`${err.response.data.error}.`);
		}
	};

	return (
		<div>
			<Navbar />
			<div className="flex items-center justify-center h-screen bg-gray-50">
				<div className="w-96 p-8 bg-white rounded shadow">
					<h2 className="mb-8 text-2xl text-center">Log In</h2>
					{error && <p className="mb-4 text-red-500">{error}</p>}
					<form onSubmit={onSubmit}>
						<input
							className="w-full p-2 mb-4 border rounded"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							className="w-full p-2 mb-4 border rounded"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<button
							className="w-full py-2 mb-4 text-white bg-blue-500 rounded"
							type="submit"
						>
							Login
						</button>
					</form>
					<div className="text-center">
						Don't have an account?{' '}
						<Link href="/signup" className="text-blue-400">
							Sign Up &rarr;
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

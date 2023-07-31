import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setIsLoggedIn(!!localStorage.getItem('token'));
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
		router.push('/login');
	};

	return (
		<nav className="p-4 bg-blue-500 text-white">
			<div className="flex justify-between">
				<Link href="/">
					<h1>Patient Management</h1>
				</Link>
				<ul className="flex">
					{isLoggedIn ? (
						<>
							<li className="mr-6">
								<Link href="/">Patients</Link>
							</li>
							<li className="mr-6">
								<Link href="/config">Config</Link>
							</li>
							<li>
								<button onClick={handleLogout}>Log Out</button>
							</li>
						</>
					) : (
						<>
							<li className="mr-6">
								<Link href="/login">Log In</Link>
							</li>
							<li>
								<Link href="/signup">Sign Up</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;

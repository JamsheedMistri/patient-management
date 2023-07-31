import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiService from '../utils/apiService';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
	const router = useRouter();
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			router.push('/login');
		} else {
			fetchPatients();
		}
	}, []);

	async function fetchPatients() {
		const response = await apiService.get('/patients');
		setPatients(response.data);
	}

	const deletePatient = async (id) => {
		await apiService.delete(`/patients/${id}`);
		setPatients(patients.filter((patient) => patient._id !== id));
	};

	const getStatusBackground = (status) => {
		switch (status) {
			case 'Inquiry':
				return 'bg-red-500';
			case 'Onboarding':
				return 'bg-blue-500';
			case 'Active':
				return 'bg-green-500';
			case 'Churned':
				return 'bg-gray-500';
		}
	};

	return (
		<div>
			<Navbar />
			<div className="p-4 flex justify-between">
				<h1 className="text-2xl">Patients</h1>
				<div className="mt-4">
					<Link
						href="/create"
						className="px-4 py-2 bg-blue-500 text-white rounded"
					>
						New Patient &rarr;
					</Link>
				</div>
			</div>
			<div className="p-4">
				{patients.map((patient) => (
					<div
						key={patient._id}
						className="p-4 mt-2 bg-white rounded shadow border border-gray-300 flex justify-between"
					>
						<Link href={`/${patient._id}`}>
							<h2 className="text-lg">
								{patient.firstName} {patient.middleName} {patient.lastName}
							</h2>
						</Link>
						<div className="flex">
							<div
								className={`rounded-full text-white py-1 px-4 ${getStatusBackground(
									patient.status
								)}`}
							>
								{patient.status}
							</div>
							<button
								type="button"
								onClick={() => deletePatient(patient._id)}
								className="px-3 py-1 ml-2 text-white bg-red-500 rounded"
							>
								✕
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

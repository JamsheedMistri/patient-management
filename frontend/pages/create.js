import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import apiService from '../utils/apiService';
import Navbar from '../components/Navbar';

export default function Create() {
	const router = useRouter();
	const [config, setConfig] = useState({});
	const [patientData, setPatientData] = useState({
		firstName: '',
		middleName: '',
		lastName: '',
		dob: '',
		status: '',
		addresses: [''],
	});

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			router.push('/login');
		} else {
			fetchConfig();
		}
	}, []);

	const fetchConfig = async () => {
		const res = await apiService.get('/config');
		setConfig(res.data);
	};

	const handleChange = (e) => {
		setPatientData({ ...patientData, [e.target.name]: e.target.value });
	};

	const handleAdditionalFieldChange = (e) => {
		setPatientData({
			...patientData,
			additionalFields: {
				...patientData.additionalFields,
				[e.target.name]: e.target.value,
			},
		});
	};

	const handleAddressChange = (e, i) => {
		const newAddresses = [...patientData.addresses];
		newAddresses[i] = e.target.value;
		setPatientData({ ...patientData, addresses: newAddresses });
	};

	const handleAddAddress = () => {
		setPatientData({
			...patientData,
			addresses: [...patientData.addresses, ''],
		});
	};

	const handleRemoveAddress = (i) => {
		const addresses = [...patientData.addresses];
		addresses.splice(i, 1);
		setPatientData({ ...patientData, addresses });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await apiService.post('/patients', patientData);
		if (res.status === 200) router.push(`/`);
	};

	return (
		<div>
			<Navbar />
			<div className="p-4">
				<h1 className="text-2xl">Create Patient</h1>
				<form onSubmit={handleSubmit} className="mt-4">
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						value={patientData.firstName}
						onChange={handleChange}
						className="block w-full p-2 mt-1 border border-gray-300 rounded"
						required
					/>
					<input
						type="text"
						name="middleName"
						placeholder="Middle Name"
						value={patientData.middleName}
						onChange={handleChange}
						className="block w-full p-2 mt-1 border border-gray-300 rounded"
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Last Name"
						value={patientData.lastName}
						onChange={handleChange}
						className="block w-full p-2 mt-1 border border-gray-300 rounded"
						required
					/>
					<input
						type="date"
						name="dob"
						placeholder="DOB"
						value={patientData.dob}
						onChange={handleChange}
						className="block w-full p-2 mt-1 border border-gray-300 rounded"
						required
					/>
					<select
						name="status"
						value={patientData.status}
						onChange={handleChange}
						className="block w-full p-2 mt-1 border border-gray-300 rounded"
						required
					>
						<option value="">Select Status</option>
						<option value="Inquiry">Inquiry</option>
						<option value="Onboarding">Onboarding</option>
						<option value="Active">Active</option>
						<option value="Churned">Churned</option>
					</select>
					{config &&
						Object.keys(config).map((key) => (
							<input
								key={key}
								type={config[key].type == 'number' ? 'number' : 'text'}
								name={config[key].key}
								placeholder={config[key].key}
								value={
									patientData.additionalFields
										? patientData.additionalFields[config[key].key] || ''
										: ''
								}
								onChange={handleAdditionalFieldChange}
								className="block w-full p-2 mt-1 border border-gray-300 rounded"
							/>
						))}
					{patientData.addresses.map((address, i) => (
						<div key={i} className="flex items-center">
							<input
								type="text"
								name="address"
								placeholder="Address"
								value={address}
								onChange={(e) => handleAddressChange(e, i)}
								className="block w-full p-2 mt-1 border border-gray-300 rounded"
							/>
							{i > 0 && (
								<button
									onClick={() => handleRemoveAddress(i)}
									className="px-4 py-2 ml-2 mt-1 text-white bg-red-500 rounded"
								>
									✕
								</button>
							)}
						</div>
					))}
					<button
						type="button"
						onClick={handleAddAddress}
						className="px-4 py-2 mt-2 mr-2 text-white bg-orange-400 rounded"
					>
						Add Address
					</button>
					<button
						type="submit"
						className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
					>
						Create
					</button>
				</form>
			</div>
		</div>
	);
}

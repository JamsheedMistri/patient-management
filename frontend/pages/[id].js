import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import apiService from '../utils/apiService';
import Navbar from '../components/Navbar';

export default function Edit() {
	const router = useRouter();
	const { id } = router.query;
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
		if (!id) return;

		const fetchPatientData = async () => {
			const patientResponse = await apiService.get(`/patients/${id}`);
			setPatientData({ ...patientResponse.data });
		};

		const fetchConfig = async () => {
			const configResponse = await apiService.get(`/config`);
			setConfig(configResponse.data);
		};

		fetchPatientData();
		fetchConfig();
	}, [id]);

	const handleChange = (e) => {
		setPatientData({
			...patientData,
			[e.target.name]: e.target.value,
		});
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
		const addresses = [...patientData.addresses];
		addresses[i] = e.target.value;
		setPatientData({ ...patientData, addresses });
	};

	const addAddress = () => {
		setPatientData({
			...patientData,
			addresses: [...patientData.addresses, ''],
		});
	};

	const removeAddress = (i) => {
		const addresses = [...patientData.addresses];
		addresses.splice(i, 1);
		setPatientData({ ...patientData, addresses });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await apiService.put(`/patients/${id}`, patientData);
		router.push('/');
	};

	return (
		<div>
			<Navbar />
			<div className="p-4">
				<h1 className="text-2xl">Edit Patient</h1>
				<form onSubmit={handleSubmit} className="mt-4">
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						value={patientData.firstName}
						onChange={handleChange}
						className="block w-full p-2 mt-1 border border-gray-300 rounded"
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
					/>
					<input
						type="date"
						name="dob"
						placeholder="Date of Birth"
						value={patientData.dob}
						onChange={handleChange}
						className="block w-full p-2 mt-1 border border-gray-300 rounded"
					/>
					<select
						name="status"
						value={patientData.status}
						onChange={handleChange}
						className="block w-full p-2 mt-1 border border-gray-300 rounded"
					>
						<option value="">Select status</option>
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
					<div>
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
										type="button"
										onClick={() => removeAddress(i)}
										className="px-4 py-2 ml-2 mt-1 text-white bg-red-500 rounded"
									>
										✕
									</button>
								)}
							</div>
						))}
					</div>
					<button
						type="button"
						onClick={addAddress}
						className="px-4 py-2 mt-2 mr-2 text-white bg-orange-400 rounded"
					>
						Add Address
					</button>
					<button
						type="submit"
						className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
					>
						Update
					</button>
				</form>
			</div>
		</div>
	);
}

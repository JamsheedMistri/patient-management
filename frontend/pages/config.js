import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import apiService from '../utils/apiService';

export default function Config() {
	const router = useRouter();
	const [configs, setConfigs] = useState([]);
	const [newKey, setNewKey] = useState('');
	const [newType, setNewType] = useState('string');

	useEffect(() => {
		const fetchConfigs = async () => {
			const response = await apiService.get(`/config`);
			setConfigs(response.data);
		};

		fetchConfigs();
	}, []);

	const addConfigOption = async (e) => {
		e.preventDefault();

		const newConfig = {
			key: newKey,
			type: newType,
		};
		setConfigs([...configs, newConfig]);
		setNewKey('');
		setNewType('string');
	};

	const deleteConfigOption = (key) => {
		setConfigs(configs.filter((config) => config.key !== key));
	};

	const saveConfigOptions = async () => {
		const response = await apiService.post(`/config`, configs);
		router.push('/');
	};

	return (
		<div>
			<Navbar />
			<div className="p-4">
				<h1 className="text-2xl">Additional Patient Options</h1>
				<div className="mt-4">
					{configs
						? configs.map((config, i) => (
								<div key={i} className="pb-1">
									<div className="flex justify-between">
										<input
											type="text"
											value={config.key}
											onChange={(e) => {
												const newConfigs = [...configs];
												newConfigs[i].key = e.target.value;
												setConfigs(newConfigs);
											}}
											className="block w-full p-2 mt-1 border border-gray-300 rounded"
										/>
										<select
											value={config.type}
											onChange={(e) => {
												const newConfigs = [...configs];
												newConfigs[i].type = e.target.value;
												setConfigs(newConfigs);
											}}
											className="block w-full p-2 mt-1 ml-2 border border-gray-300 rounded"
										>
											<option value="string">String</option>
											<option value="number">Number</option>
										</select>
										<button
											onClick={() => deleteConfigOption(config.key)}
											className="px-3 py-1 mt-1 ml-2 text-white bg-red-500 rounded"
										>
											✕
										</button>
									</div>
								</div>
						  ))
						: 'No configuration options added. Click the button below to add a new configuration option.'}
					<h3 className="text-xl mt-3">Add New Option</h3>
					<form onSubmit={addConfigOption} className="mt-4">
						<div className="flex">
							<input
								type="text"
								placeholder="Key"
								value={newKey}
								onChange={(e) => setNewKey(e.target.value)}
								className="block w-full p-2 mt-1 border border-gray-300 rounded"
								required
							/>
							<select
								value={newType}
								onChange={(e) => setNewType(e.target.value)}
								className="block w-full p-2 mt-1 ml-2 border border-gray-300 rounded"
							>
								<option value="string">String</option>
								<option value="number">Number</option>
							</select>
						</div>
						<button
							type="submit"
							className="px-4 py-2 mt-4 text-white bg-orange-400 rounded"
						>
							Add option
						</button>
						<button
							type="button"
							onClick={saveConfigOptions}
							className="px-4 py-2 ml-2 text-white bg-blue-500 rounded"
						>
							Save Changes
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

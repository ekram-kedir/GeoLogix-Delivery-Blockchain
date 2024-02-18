import React, { useState } from 'react';

const AddDevice = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle form submission, such as sending the data to a server or storing it locally
        console.log('Device created:', { name, address });
        // Optionally, you can reset the form fields after submission
        setName('');
        setAddress('');
    };

    return (
        <div className="flex text-blue-600 mt-40">
            <h1 className='ml-40'>Create Device</h1>
            <form onSubmit={handleSubmit}>
                <div className="mt-24 ml-[-200px] form-group gap-4">
                    <label htmlFor="name" className="text-blue-600 mr-[20px]">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-blue-600 rounded px-4 py-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="form-group mt-16 ml-[-200px]">
                    <label htmlFor="address" className="text-blue-600 mr-[20px]">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="border border-blue-600 rounded px-4 py-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded ml-[-100px] mt-8  ml-[12px] hover:bg-blue-700 transition duration-300">Create Device</button>
            </form>
        </div>
    );
};

export default AddDevice;

'use client'
import { useState, useEffect, SetStateAction } from 'react';

interface Person {
    id: number;
    name: string;
    age: number;
    city: string;
    email: string;
}

const DataTable = () => {
    const [peopleData, setPeopleData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const itemsPerPage = 10;

    
    const fetchData = async () => {
        const response = await fetch(`/api/test?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
        const data = await response.json();
        setPeopleData(data.data);
        setTotalPages(data.totalPages);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const handlePageChange = (newPage: SetStateAction<number>) => setCurrentPage(newPage);

    
    const handleSearchChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    
    const handleFilterChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setFilterCity(e.target.value);
        setCurrentPage(1); 
    };

    const filteredData = peopleData
        .filter((item: any) => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
            (filterCity === '' || item.city === filterCity)
        );

    return (
        <div className="max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Data Table</h2>
            
            
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="text" 
                    placeholder="Search by name" 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    className="p-2 border border-gray-300 rounded-lg w-1/3"
                />
                <select 
                    value={filterCity} 
                    onChange={handleFilterChange} 
                    className="p-2 border border-gray-300 rounded-lg w-1/4"
                >
                    <option value="">All Cities</option>
                    <option value="City 1">City 1</option>
                    <option value="City 2">City 2</option>
                    <option value="City 3">City 3</option>
                    <option value="City 4">City 4</option>
                    <option value="City 5">City 5</option>
                </select>
            </div>

            
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Age</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">City</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item: Person) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                            <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                            <td className="px-4 py-2 border border-gray-300">{item.age}</td>
                            <td className="px-4 py-2 border border-gray-300">{item.city}</td>
                            <td className="px-4 py-2 border border-gray-300">{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            <div className="flex justify-between items-center mt-4">
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300" 
                    disabled={currentPage === 1} 
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="text-lg font-medium">Page {currentPage} of {totalPages}</span>
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300" 
                    disabled={currentPage === totalPages} 
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataTable;

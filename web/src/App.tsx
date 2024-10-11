import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Subdivision {
    id: number;
    code: string;
    name: string;
    longitude: number;
    latitude: number;
    subdivisionStatusCode: string;
    nearMapImageDate: string;
    county: string;
    marketName: string;
    totalLots: number;
}

const App: React.FC = () => {
    const [subdivisions, setSubdivisions] = useState<Subdivision[]>([]);
    const [filteredSubdivisions, setFilteredSubdivisions] = useState<Subdivision[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');

    useEffect(() => {
        const fetchSubdivisions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/subdivisions');
                setSubdivisions(response.data.subdivisions);
                setFilteredSubdivisions(response.data.subdivisions);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch subdivisions');
                setLoading(false);
            }
        };

        fetchSubdivisions();
    }, []);

    useEffect(() => {
        let filtered = subdivisions;

        // Filter by status
        if (filter) {
            filtered = filtered.filter((s) => s.subdivisionStatusCode === filter);
        }

        // Sort by name or nearMapImageDate
        if (sortKey === 'name') {
            filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortKey === 'nearMapImageDate') {
            filtered = filtered.sort((a, b) => new Date(a.nearMapImageDate).getTime() - new Date(b.nearMapImageDate).getTime());
        }

        setFilteredSubdivisions(filtered);
    }, [filter, sortKey, subdivisions]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="App">
            <h1>Subdivision List</h1>

            {/* Filter by status */}
            <div>
                <label>Status Filter:</label>
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="Active">Active</option>
                    <option value="Future">Future</option>
                    <option value="Builtout">Builtout</option>
                </select>
            </div>

            {/* Sort options */}
            <div>
                <label>Sort by:</label>
                <select onChange={(e) => setSortKey(e.target.value)}>
                    <option value="">None</option>
                    <option value="name">Name</option>
                    <option value="nearMapImageDate">Near Map Image Date</option>
                </select>
            </div>

            {/* Display Subdivision Data */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>County</th>
                        <th>Market</th>
                        <th>Total Lots</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Near Map Image Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubdivisions.map((subdivision) => (
                        <tr key={subdivision.id}>
                            <td>{subdivision.id}</td>
                            <td>{subdivision.code}</td>
                            <td>{subdivision.name}</td>
                            <td>{subdivision.subdivisionStatusCode}</td>
                            <td>{subdivision.county}</td>
                            <td>{subdivision.marketName}</td>
                            <td>{subdivision.totalLots}</td>
                            <td>{subdivision.longitude}</td>
                            <td>{subdivision.latitude}</td>
                            <td>{new Date(subdivision.nearMapImageDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;



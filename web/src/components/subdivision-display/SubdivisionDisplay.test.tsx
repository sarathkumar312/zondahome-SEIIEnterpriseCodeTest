import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../../App';

const mock = new MockAdapter(axios);

test('renders subdivision data', async () => {
    const mockData = [
        {
            id: '1',
            code: "001B3",
            name: 'Subdivision 1',
            "longitude": -115.07067,
            "latitude": 36.233263,
            subdivisionStatusCode: 'Active',
            nearMapImageDate: '2023-05-15',
            "county": "Clark",
            "marketName": "Las Vegas",
            "totalLots": 237,
        },
    ];

    mock.onGet('http://localhost:5000/api/subdivisions').reply(200, mockData);

    render(<App />);

    const nameElement = await screen.findByText('Subdivision 1');
    expect(nameElement).toBeInTheDocument();
});

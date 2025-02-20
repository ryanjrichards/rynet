import { useEffect, useState } from 'react';

// Import API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error('API_URL environment variable is not defined');
}

console.log('Using API URL:', API_URL);

const Standings = () => {
    const [standings, setStandings] = useState<any[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        console.log('Fetching standings from:', `${API_URL}/api/standings`);
        fetch(`${API_URL}/api/standings`)  // ✅ Use full API URL
            .then(response => {
                // Log the response to see what is being returned
                console.log('API Response:', response);
                return response.json();
            })
            .then(data => {
                console.log('Full API Response:', data); // Debugging log

                if (!data.standings || typeof data.standings !== 'object') {
                    throw new Error('Missing or invalid "standings" object in response');
                }

                // Extract the nested array inside standings
                const standingsArray = data.standings.standings;

                if (!standingsArray || !Array.isArray(standingsArray) || standingsArray.length === 0) {
                    throw new Error('"standings.standings" is not a valid array');
                }

                if (!standingsArray[0]?.table) {
                    console.error('Standings structure:', standingsArray[0]);
                    throw new Error('Missing "table" property in standings');
                }

                setStandings(standingsArray[0].table);
            })
            .catch(error => {
                console.error('Error fetching standings:', error);
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error fetching standings: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {standings.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-left">Position</th>
                            <th className="py-2 px-4 border-b text-left">Team</th>
                            <th className="py-2 px-4 border-b text-left">Played</th>
                            <th className="py-2 px-4 border-b text-left">Won</th>
                            <th className="py-2 px-4 border-b text-left">Drawn</th>
                            <th className="py-2 px-4 border-b text-left">Lost</th>
                            <th className="py-2 px-4 border-b text-left">GF</th>
                            <th className="py-2 px-4 border-b text-left">GA</th>
                            <th className="py-2 px-4 border-b text-left">GD</th>
                            <th className="py-2 px-4 border-b text-left">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((team, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b text-center">{team.position}</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex items-center">
                                        <img src={team.team.crest} alt={team.team.name} className="w-6 h-6 mr-2" />
                                        <span>{team.team.name}</span>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b text-center">{team.playedGames}</td>
                                <td className="py-2 px-4 border-b text-center">{team.won}</td>
                                <td className="py-2 px-4 border-b text-center">{team.draw}</td>
                                <td className="py-2 px-4 border-b text-center">{team.lost}</td>
                                <td className="py-2 px-4 border-b text-center">{team.goalsFor}</td>
                                <td className="py-2 px-4 border-b text-center">{team.goalsAgainst}</td>
                                <td className="py-2 px-4 border-b text-center">{team.goalDifference}</td>
                                <td className="py-2 px-4 border-b text-center">{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Standings;

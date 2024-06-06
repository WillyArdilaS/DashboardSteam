import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import axios from 'axios';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MostPlayedCountryGraph = ({countryCode}) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        setGames([]);
      
        axios.get(`http://127.0.0.1:5000/juegos/mas-jugados-por-pais`, {params: {pais: countryCode}})
        .then((res) => {
            console.log(res.data)
            const gamesData = res.data.map(item => ({ gameName: item.game_name, totalTime: item.total_jugado }));
            setGames(element => [...element, ...gamesData]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [countryCode]);      

    const labels = games.map((item) => item.gameName);
    const totalTime = games.map((item) => item.totalTime);

    const customPastelColors = [
        '#b1d4e6'
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'Tiempo (s)',
            data: totalTime,
            backgroundColor: customPastelColors,
            borderColor: customPastelColors,
            borderWidth: 1,
        }]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'JUEGOS MÁS JUGADOS POR PAÍS',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default MostPlayedCountryGraph;

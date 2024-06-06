import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import axios from 'axios';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TimeCategoryGraph = () => {
    const [gamesTime, setGamesTime] = useState([]);

    useEffect(() => {
        setGamesTime([]);
      
        axios.get(`http://127.0.0.1:5000/juegos/tiempo-jugado-por-categoria`)
        .then((res) => {
            const gamesTimeData = res.data.map(item => ({ category: item.category, totalTime: item.total_jugado }));
            setGamesTime(element => [...element, ...gamesTimeData]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);      

    const labels = gamesTime.map((item) => item.category);
    const totalTime = gamesTime.map((item) => item.totalTime);

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
                text: 'TIEMPO TOTAL DE JUEGO POR CATEGORÍA',
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

export default TimeCategoryGraph;

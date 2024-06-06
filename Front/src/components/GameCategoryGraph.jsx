import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

const GameCategoryGraph = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        setGames([]);
      
        axios.get(`http://127.0.0.1:5000/juegos/cantidad-por-categoria`)
        .then((res) => {
            const gamesData = res.data.map(item => ({ category: item.category, gamesTotal: item.total_games }));
            setGames(element => [...element, ...gamesData]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);      

    const labels = games.map((item) => item.category);
    const gamesTotal = games.map((item) => item.gamesTotal);

    const customPastelColors = [
        '#C3E8FA',
        '#B1D4E6',
        '#85D6FF',
        '#B0EBFF',
        '#1A7691', 
        '#95D6F0', 
        '#76AFCC',
        '#AEE0EB', 
        '#99C8E0', 
        '#ADD9E8', 
        '#96E0ED', 
        '#48AADB', 
        '#7EBEDE',
        '#2d6a88', 
        '#77BBDB',
        '#7DBED4',
        '#448EB3',
        '#C0DDEB',
        '#A2CADE',
        '#1A4B63', 
        '#4C839E',
        '#87B3C9',
        '#5D94B0',
        '#205d7b' 
    ];

    const data = {
        labels: labels,
        datasets: [{
            data: gamesTotal,
            backgroundColor: customPastelColors,
            borderColor: customPastelColors,
            borderWidth: 1,
        }]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'NÚMERO DE JUEGOS POR CATEGORÍA',
            },
        }
    };

    return <Pie data={data} options={options} />;
};

export default GameCategoryGraph;

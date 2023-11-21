import { Line } from 'react-chartjs-2';
import {
    Chart as chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
var values = [];
var years = [];

var myoptions = {

};
export default function LineChart({ queryResults }){
    console.log(queryResults);
    values = [];
    years = [];
    queryResults.forEach(function(item) {
        values.push(item.value);
        years.push(item.year);
    });

    var midata = {
        labels: years,
        datasets: [ //Cada una de las lineas del grafico
        {
            label: 'USD',
            data: values,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255,99,132)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255,99,132)',
            pointBackgroundColor: 'rgba(255,99,132)',
        },
    
        ],
    };

    return <Line data={midata} options={myoptions}/>;
}
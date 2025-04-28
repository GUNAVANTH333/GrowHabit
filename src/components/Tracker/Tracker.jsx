import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './Tracker.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Tracker = () => {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
        setHabits(storedHabits);

        const handleHabitsUpdate = (event) => {
            setHabits(event.detail);
        };

        window.addEventListener('habitsUpdated', handleHabitsUpdate);

        return () => {
            window.removeEventListener('habitsUpdated', handleHabitsUpdate);
        };
    }, []);

    const chartData = {
        labels: habits.map(habit => habit.name),
        datasets: [
            {
                label: 'Current Streak',
                data: habits.map(habit => habit.streak || 0),
                backgroundColor: 'rgba(244, 177, 131, 0.6)',
                borderColor: 'rgba(244, 177, 131, 1)',
                borderWidth: 1,
                borderRadius: 4,
                barThickness: 20,
                maxBarThickness: 25
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    color: '#333'
                }
            },
            title: {
                display: true,
                text: 'Habit Streaks',
                font: {
                    size: 14,
                    weight: 'bold'
                },
                color: '#333',
                padding: {
                    top: 5,
                    bottom: 10
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const habit = habits[context.dataIndex];
                        return `${habit.name}: ${habit.streak || 0} day${habit.streak !== 1 ? 's' : ''} streak`;
                    }
                },
                backgroundColor: 'rgba(244, 177, 131, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(244, 177, 131, 1)',
                borderWidth: 1,
                padding: 8,
                cornerRadius: 6
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    font: {
                        size: 10
                    }
                },
                title: {
                    display: true,
                    text: 'Days Streak',
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    color: '#333'
                },
                grid: {
                    color: 'rgba(244, 177, 131, 0.1)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Habits',
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    color: '#333'
                },
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 10
                    }
                }
            }
        }
    };

    return (
        <div className="tracker-container">
            <div className="tracker-header">
                <h2>Habit Tracker</h2>
            </div>
            <div className="tracker-content">
                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Tracker;

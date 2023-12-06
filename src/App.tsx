import './App.css';
import { year2023Day1 } from './events/2023/day1/year2023Day1';

function App() {
    return (
        <button
            onClick={() => {
                console.log(year2023Day1());
            }}
        >
            Day 1
        </button>
    );
}

export default App;

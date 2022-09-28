import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./Cell";

function App() {
    const NUM_ROWS = 3;
    const NUM_COLS = 3;
    const WINNING_COMBINATION = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ];

    // const initialState = [
    //     ["", "", ""],
    //     ["", "", ""],
    //     ["", "", ""],
    // ];

    const [state, setState] = useState(
        // Array(NUM_ROWS)
        //     .fill()
        //     .map(() => Array(NUM_COLS).fill(""))
        Array(NUM_ROWS * NUM_COLS)
            .fill("")
            .map((_, i) => "")
    );

    const getUsersTurn = () => {
        return Math.random() >= 0.5 ? "X" : "O";
    };

    const [usersTurn, setUserTurn] = useState(getUsersTurn());
    const [isGameOver, setGameOver] = useState(false);

    const handleCellClick = (index) => {
        if (state[index]) return;

        const _tempState = [...state];
        _tempState[index] = usersTurn;

        setState(_tempState);
    };

    useEffect(() => {
        let gameOver = false;
        for (let i = 0; i < WINNING_COMBINATION.length; i++) {
            const [a, b, c] = WINNING_COMBINATION[i];

            if (state[a] && state[a] === state[b] && state[b] === state[c]) {
                gameOver = true;
                break;
            }
        }

        setGameOver(gameOver);

        if (!gameOver) setUserTurn(usersTurn === "X" ? "O" : "X");
    }, [state]);

    return (
        <div className="App">
            <h2>Tic-Tac-Toe</h2>
            <h4>User's turn : {usersTurn}</h4>

            <div className="playground">
                {isGameOver ? (
                    <div>Game Over ... refresh the page to play again </div>
                ) : (
                    state.map((item, cellIndex) => {
                        return (
                            <Cell
                                key={`cell_${cellIndex}`}
                                text={item}
                                onClick={() => handleCellClick(cellIndex)}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import "./CRUD.css";

function CRUD() {
    const [selectedRow, setSelectedRow] = useState(undefined);
    const [rows, setRows] = useState([]);
    const inputEl = useRef(null);

    useEffect(() => {
        const tarefas = localStorage.getItem("tarefas");
        if (tarefas !== null) setRows(JSON.parse(tarefas));
        else setRows([]);
    }, []);

    const createRow = () => {
        const newRows = [...rows, inputEl.current.value];
        setRows(newRows);
        localStorage.setItem('tarefas', JSON.stringify(newRows));
        inputEl.current.value = "";
    };

    const selectRow = (index) => {
        setSelectedRow(index);
        inputEl.current.value = rows[index];
    };

    const editRow = () => {
        if (selectedRow !== undefined && inputEl.current.value !== "") {
            const newRows = [...rows];
            newRows[selectedRow] = inputEl.current.value;
            setRows(newRows);
            localStorage.setItem('tarefas', JSON.stringify(newRows));
        }
    };

    const deleteRow = () => {
        if (selectedRow !== undefined) {
            if (window.confirm("Você realmente deseja deletar essa tarefa?")) {
                const newRows = [...rows];
                newRows.splice(selectedRow, 1);
                setRows(newRows)
                localStorage.setItem('tarefas', JSON.stringify(newRows));
            }
        }
    }

    return (
        <div>
            <h1>CRUD - Lista de Tarefas com React</h1>
            <div className="controls">
                <input ref={inputEl} id="tarefa_input" type='text' placeholder={"Tarefa"} />
                <button className="btn" onClick={createRow}><i className="material-icons">add</i></button>
                <button className="btn" onClick={editRow}><i className="material-icons">edit</i></button>
                <button className="btn" onClick={deleteRow}><i className="material-icons">delete</i></button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Tarefas</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr
                        key={index}
                        onClick={() => selectRow(index)}
                        className={index === selectedRow ? "selected" : ""}
                    >
                        <td>{row}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CRUD;
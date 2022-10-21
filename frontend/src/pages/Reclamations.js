import React, { useState, useEffect } from "react";
import { colors, StyledFormArea, StyledTitle, ButtonGroup, StyledFormButton } from "../componants/Styles";
import { Formik, Form } from 'formik';
import Alert from "./Alerts";
import List from "./List";

import Axios from 'axios';

const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return (list = JSON.parse(localStorage.getItem('list')));
    } else {
        return [];
    }
};


const Reclamation = () => {
    const [name, setName] = useState('');
    const [pavNumber, setPavNumber] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [problem, setProblem] = useState('');
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            showAlert(true, 'danger', 'please enter value');
        } else if ((name || pavNumber || roomNumber || problem) && isEditing) {
            setList(
                list.map((item) => {
                    if (item.id === editID) {
                        return { ...item, Name: name, PavNumber: pavNumber, RoomNumber: roomNumber, Problem: problem };
                    }
                    return item;
                })
            );
            setName('');
            setPavNumber('');
            setRoomNumber('');
            setProblem('');
            setEditID(null);
            setIsEditing(false);
            showAlert(true, 'success', 'value changed');
        } else {
            showAlert(true, 'success', 'item added to the list');
            const newItem = { id: new Date().getTime().toString(), Name: name, PavNumber: pavNumber, RoomNumber: roomNumber, Problem: problem };

            setList([...list, newItem]);
            setName('');
            setPavNumber('');
            setRoomNumber('');
            setProblem('');

        }
    };

    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({ show, type, msg });
    };
    const clearList = () => {
        showAlert(true, 'danger', 'empty list');
        setList([]);
    };
    const removeItem = (id) => {
        showAlert(true, 'danger', 'item removed');
        setList(list.filter((item) => item.id !== id));
    };
    const editItem = (id) => {
        const specificItem = list.find((item) => item.id === id);
        setIsEditing(true);
        setEditID(id);
        setName(specificItem.Name);
        setPavNumber(specificItem.PavNumber);
        setRoomNumber(specificItem.RoomNumber);
        setProblem(specificItem.Problem);
    };
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    const Envoyer = () => {
        console.log();
        Axios.post("http://localhost:3001/Envoyer", {
            name: name,
            pavNumber: pavNumber,
            roomNumber: roomNumber,
            problem: problem,

        })
    }
    return (
        <div className="complaint-div" >
            <div className="img-div">
                <img src='./../assets/maintenance.png' alt="prblm" />
            </div>
            <div className="contact">
                <div className="title">
                    <StyledTitle size={20} color="#277BC0"> Faire votre réclamations ici </StyledTitle>
                </div>
                <div className="form-div">
                    {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
                    <form onSubmit={handleSubmit}>
                        <input
                            name="setName"
                            type="text"
                            placeholder="Votre Nom Complet?"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <select name="setPavNumber" placeholder="Votre Pavillon ?" value={pavNumber} onChange={(e) => setPavNumber(e.target.value)}>
                            <option value="Pavillon 1">Pavillon 1</option>
                            <option value="Pavillon 2">Pavillon 2</option>
                            <option value="Pavillon 3">Pavillon 3</option>
                        </select>
                        <input
                            name="setRoomNumber"
                            type="number"
                            placeholder="Le nombre de la chambre ?"
                            onChange={(e) => {
                                setRoomNumber(e.target.value);
                            }}
                        />
                        <textarea name="setProblem" placeholder="Quelle- est votre probleme...?"
                            onChange={(e) => {
                                setProblem(e.target.value);
                            }}
                        ></textarea>

                        <button type='submit' className='submit-btn' onClick={Envoyer} >
                            {isEditing ? 'Modifier' : 'Envoyer'}
                        </button>

                    </form>
                    {list.length > 0 && (
                        <div className='grocery-container'>
                            <h3>Mes Demandes</h3>
                            <List items={list} removeItem={removeItem} editItem={editItem} />
                            <button className='clear-btn' onClick={clearList}>
                                clear reclamations
                            </button>
                        </div>
                    )}
                </div>
            </div>


        </div >
    );
}

export default Reclamation;

// import React, { useState, useEffect } from 'react';
// import List from './List';
// import Alert from './Alert';
// const getLocalStorage = () => {
//     let list = localStorage.getItem('list');
//     if (list) {
//         return (list = JSON.parse(localStorage.getItem('list')));
//     } else {
//         return [];
//     }
// };
// function App() {
//

//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!name || !pavNumber || !roomNumber || !problem) {
//             showAlert(true, 'danger', 'please enter value');
//         } else if ((name || pavNumber || roomNumber || problem) && isEditing) {
//             setList(
//                 list.map((item) => {
//                     if (item.id === editID) {
//                         return { ...item, Name: name, PavNumber: pavNumber, RoomNumber: roomNumber, Problem: problem };
//                     }
//                     return item;
//                 })
//             );
//             setName('');
//             setPavNumber('');
//             setRoomNumber('');
//             setProblem('');
//             setEditID(null);
//             setIsEditing(false);
//             showAlert(true, 'success', 'value changed');
//         } else {
//             showAlert(true, 'success', 'item added to the list');
//             const newItem = { id: new Date().getTime().toString(), Name: name, PavNumber: pavNumber, RoomNumber: roomNumber, Problem: problem };

//             setList([...list, newItem]);
//             setName('');
//             setPavNumber('');
//             setRoomNumber('');
//             setProblem('');

//         }
//     };

//     const showAlert = (show = false, type = '', msg = '') => {
//         setAlert({ show, type, msg });
//     };
//     const clearList = () => {
//         showAlert(true, 'danger', 'empty list');
//         setList([]);
//     };
//     const removeItem = (id) => {
//         showAlert(true, 'danger', 'item removed');
//         setList(list.filter((item) => item.id !== id));
//     };
//     const editItem = (id) => {
//         const specificItem = list.find((item) => item.id === id);
//         setIsEditing(true);
//         setEditID(id);
//         setName(specificItem.Name);
//         setPavNumber(specificItem.PavNumber);
//         setRoomNumber(specificItem.RoomNumber);
//         setProblem(specificItem.Problem);
//     };
//     useEffect(() => {
//         localStorage.setItem('list', JSON.stringify(list));
//     }, [list]);
//     return (
//         <section className='section-center'>
//             <form className='grocery-form' onSubmit={handleSubmit}>
//                 {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

//                 <h3>grocery bud</h3>
//                 <div className='form-control'>
//                     <input
//                         type='text'
//                         className='grocery'
//                         placeholder='e.g. eggs'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <button type='submit' className='submit-btn'>
//                         {isEditing ? 'Modifier' : 'Envoyer'}
//                     </button>
//                 </div>
//             </form>
//             {list.length > 0 && (
//                 <div className='grocery-container'>
//                     <List items={list} removeItem={removeItem} editItem={editItem} />
//                     <button className='clear-btn' onClick={clearList}>
//                         clear items
//                     </button>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default App;

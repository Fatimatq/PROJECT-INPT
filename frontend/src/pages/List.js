import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const List = ({ items, removeItem, editItem }) => {
    const [readMore, setReadMore] = useState(false);
    return (
        <div className='grocery-list'>
            {items.map((item) => {
                const { id, Name, PavNumber, RoomNumber, Problem } = item;
                return (
                    <article className='grocery-item' key={id}>
                        <p className='title'>Votre Nom: {Name}</p>
                        <p className='title'>Votre Pavillon: {PavNumber}</p>
                        <p className='title'>Numero de la chambre: {RoomNumber}</p>
                        <p>
                            {readMore ? Problem : `${Problem.substring(0, 50)}...`}
                            <button onClick={() => setReadMore(!readMore)}>
                                {readMore ? 'show less' : '  read more'}
                            </button>
                        </p>


                        <div className='btn-container'>
                            <button
                                type='button'
                                className='edit-btn'
                                onClick={() => editItem(id)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                type='button'
                                className='delete-btn'
                                onClick={() => removeItem(id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default List;
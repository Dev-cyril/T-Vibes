import React, { useState, useContext } from 'react'
import '../../styles/pages/preference.css'
import { AppContext } from '../../context/context';

export default function SetPreference() {
    const genres = [
        "Rock", "Pop", "Hip Hop",  "Jazz", "Blues", "Country", "Classical", "Electronic", "R&B",
        "Reggae", "Folk", "Metal", "Punk", "Soul", "Funk", "Alternative", "Rap", "Dance", "Indie", "Gospel", "EDM",
        "Classical", "Ska", "Disco", "Techno", "Opera", "World", "New Age", "Instrumental", "Experimental", "Acoustic", "Ambient",
    ];
    const [query, setQuery] = useState('')
    const [filteredQuery, setFilteredQuery] = useState([])
    const { selected, setSelected } = useContext(AppContext)

    const search = event => {
        setQuery(event.target.value)
        const filtered = genres.filter(item => item.toLowerCase().includes(query.toLowerCase()))
        setFilteredQuery(filtered)
    }

    const add = (item) => {
        setSelected([...selected, item]);
        setFilteredQuery([]);
        setQuery('');
    }
    const remove = (index) => {
        const newSelected = [...selected];
        newSelected.splice(index, 1);
        setSelected(newSelected);
    }

  return (
    <>
        <section className='searchBar'>
            <div className='searchWrapper'>
                <input type='text'onChange={search} placeholder='search...'/>
            </div>
            <ul>
                {filteredQuery.map((item, index) => (
                    <li key={index} onClick={() => add(item)}>{item}</li>
                ))}
            </ul>
        </section>
        <section className='choices'>
            {
                selected.map((item, index) => (
                    <div key={index} className='item'>{item}   <span onClick={() => remove(index)}>x</span> </div>
                ))
            }
        </section>
    </>
  )
}

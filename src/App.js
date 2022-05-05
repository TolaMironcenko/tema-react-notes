import React, { useState, useEffect } from 'react'
import './App.css'
import {v4} from 'uuid'
import {randomColor} from 'randomcolor'
import Note from './components/Note/Note'

function App() {

  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )
  console.log(items)

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if(item.trim() !== ''){
      const newItem = {
        id: v4(),
        item: item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        },
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else{
      alert('Ошибка: Пустое поле ввода!')
    }
  }

  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id ))
  }

  const updatePos = (data, index, seak) => {
    let newArray = [...items]
    newArray[index].defaultPos ={x: data.x, y: data.y}
    newArray[index].see = seak
    setItems(newArray)
  }

  const updateNote  = (e) => {
    let upNote = [...items]
    for (var i = 0; i < upNote.length; i++) {
      if (upNote[i].id === e.target.id) {
        upNote[i].item = e.target.value
      }
    }

    setItems(upNote)
  }

  return (
    <div className="App">
     <div className='wrapper'>
       <textarea 
       className='textarea'
       placeholder='Текст заметки...'
       onChange={(e) => setItem(e.target.value)}
       value={item}
       />
       <button className='enter' onClick={newItem}>СОЗДАТЬ</button>
     </div>
      {
        items.map((item, index) => {
          return(
            <Note 
              item={item} 
              index={index} 
              updatePos={updatePos} 
              deleteNote={deleteNote} 
              updateNote={updateNote}
              key={item.id}
            />
          )
        })
      }
    </div>
  );
}

export default App;



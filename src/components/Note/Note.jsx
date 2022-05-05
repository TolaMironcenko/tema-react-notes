import React, { useState } from 'react';
import Draggable from 'react-draggable'
import styles from './Note.module.css'

const Note = ({item, index, updatePos, deleteNote, updateNote}) => {

    const [seak, setseak] = useState(1)

    


    return(
        <Draggable key={index} defaultPosition = {item.defaultPos} onStop={(_, data) =>{
            updatePos(data, index)
          }}>
            <div>
            <div className='tabNote'>
            <button className='delete' 
              onClick={(() => deleteNote(item.id))}>
                X
              </button>
              <button 
                id={item.id}
                className='sick_note'
                onClick={(e) => {
                        if (seak) {
                            setseak(0);
                        }else{
                            setseak(1);
                        }
                    }
                }
              >
                \\
              </button>
            </div>
            <textarea 
              className={seak?styles.todo_item:styles.seak} 
              id={item.id}  
              style={{backgroundColor: item.color}}
              onChange={e=>{updateNote(e)}}
              value={item.item}
            />
              {/* {`${item.item}`} */}
              
            {/* </div> */}
            </div>
          </Draggable>
    )
};

export default Note;
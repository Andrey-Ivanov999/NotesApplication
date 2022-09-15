import React from "react";
import { useState } from "react";
import env from "../env.json"


function Create() {

    const [url,setUrl] = useState('');
    const [lineClass,setLineClass] = useState('hide');
    const [formClass,setFormClass] = useState('');

    let sendData = (obj) => {
        setFormClass('hide');
        setLineClass('');
        fetch(env.urlBackend, {
            method : "POST",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
            },
            body:JSON.stringify(obj)
        })
        .then(response =>response.json())
        .then(response => {
            console.log(response);
            if(response.result){
                setUrl( env.url + '/' + response.url);
            }
        })
    }
    let loadDataFromForm = (event) => {
        event.preventDefault();
        let note = event.target.elements.note.value;
        note = note.trim();
        if (note === '') {
            alert('Заполните поля');
            return false;
        }
        sendData({"note": note});
    }
    
    return (
        <div className="block-create">
            <form onSubmit={loadDataFromForm} className = {formClass} id ="createForm">
                <div className="layer">
                    <label htmlFor="">Input the note</label>
                    <textarea name = "note" id= "note" placeholder="Input"></textarea>
                    <button type="submit" className="btn-create">Create note</button>
                </div>
            </form>
            <div className="block-hash">
                <div className={lineClass}></div>
                <div className="hashline">{url}</div>
                <div className={lineClass}><button onClick={function(){window.location.reload()}}>New note</button></div>
            </div>
        </div>
    );
}

export default Create;
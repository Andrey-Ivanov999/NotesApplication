import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import env from "../env.json";

function Note() {

    let {noteURL} = useParams();
    const [noteText,setNoteText ] = useState("");
    const [lineClass,setLineClass ] = useState("hide");
    const [formClass,setFormClass ] = useState("hide");
    const [errorClass,setErrorClass ] = useState("hide");

    useEffect(()=>{
        if(noteURL !== undefined){
            fetch(env.urlBackend, {
                method : "POST",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                },
                body:JSON.stringify({"url":noteURL})
            })
            .then(response =>response.json())
            .then(response => {
                console.log(response);
                if(response.result){
                    setNoteText(response.note);
                    setLineClass("");
                    setFormClass("hide")
                    setErrorClass('hide');
                }
                else if (!response.result) {
                    setLineClass('hide'); 
                    setFormClass('hide');
                    setErrorClass('');
                }
            })
        
        }
        else {
            setLineClass('hide'); 
            setFormClass('');
            setErrorClass("hide");
        }
    },[]);

    function getNote(event){
        event.preventDefault();
        let url =event.target.elements.url.value;
        url.trim();
        if (url === '') {
            alert('Заполните поля');
            return false;
        }
        noteURL = url;
        window.location.href = env.url + "/" + url;
    }
    function searchNote () {
        window.location.href =env.url;
    }

    return (
        <div>
            <div className={lineClass} id ="note-show">
                <h4>Note</h4>
                <div className="output">{noteText}</div>
                <div className="note-button"><button onClick={searchNote}>Watch one more note</button></div>
            </div>
            <div className={errorClass} id="error"><p>Something wrong! Try again</p></div>
            <div className={formClass}>
                <form action="" onSubmit={getNote} id="note-form">
            <label htmlFor="url">Input hash note</label>
            <input type= "text" name="url" id="url" className="form-control" />
            <button type="submit" className="btn btn-primary">Find a Note</button>
            </form>
            </div>
        </div>
    );
}
export default Note;
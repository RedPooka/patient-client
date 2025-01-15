import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
function DiseaseList (){
    const [diseases, setDiseases]=useState([])
    const navigate = useNavigate();
    useEffect(() => {
        getDiseases();
    }, []);
    const getDiseases = async ()=>{
        console.log ("getDiseases")
        const resp = await fetch ("http://localhost:8080/diseases");
        const data = await resp.json();
        console.log ("get disease data:", data);
        setDiseases(data)
    }

    if(diseases.length===0)
    {
        return (<div>Loading...</div>);
    }
    const diseaseListClick=(e)=>{
        const val =e.target.value;
        console.log("diseaseListClick:",val);
        //window.location.replace("/disease/"+val);
        navigate("/disease/"+val)
    }
    return (
        <div>
            <select id="diseaseList" onChange={diseaseListClick}>
                <option key="0" value="0">Select from list</option>
                {diseases.map((d)=>(
                    <option key={d.diseaseId} value={d.diseaseId}>
                        {d.diseaseName}</option>
                ))}
            </select>

        </div>

    )
}
export default DiseaseList;
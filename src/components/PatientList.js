import React, {useState, useEffect} from 'react'

function PatientList (){
    const [patients, setPatients]=useState([])

    useEffect(() => {
        getPatients();
    }, []);
    const getPatients = async ()=>{
        console.log ("getPatients")
        const resp = await fetch ("http://localhost:8080/patients");
        const data = await resp.json();
        console.log ("get patient data:", data);
        setPatients(data)
    }

    if(patients.length===0)
    {
        return (<div>Loading...</div>);
    }
    return (
        <div>
            <ul>
                {patients.map((pat)=>(
                    <li key={pat.id}><a href={"/patient/"+pat.id}>{pat.lastName}, {pat.firstName}</a></li>
                ))}
            </ul>

        </div>

    )
}
export default PatientList;
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';

function PatientForm ()
{
    const [id, setId]=useState(0)
    const [lastName, setLastName]=useState("")
    const [firstName, setFirstName]=useState("")
    const [patientData, setPatientData]=useState({id:0})
    const {patId} = useParams();
    useEffect(() => {
        if(patId)
        {
            getPatient(patId)
        }
    }, []);
    const getPatient = async (id)=>{
        const resp =await fetch ("http://localhost:8080/patient/"+id);
        const data = await resp.json();
        console.log("get patient:", data);
        setPatientData(data)
        setId(data.id);
        setLastName(data.lastName);
        setFirstName(data.firstName);

    }
    const lastNameChange = (e)=>{
        const val = e.target.value;
        console.log ("lastNameChange:",val)
        setLastName(val);
    }
    const firstNameChange = (e)=>{
        const val = e.target.value;
        console.log ("firstNameChange:",val)
        setFirstName(val);
    }
    const send = async() =>{
        try {
            const data = {
                id:id,
                lastName:lastName,
                firstName:firstName
            }
            console.log ("send patient:", data)
            let url = "http://localhost:8080/patient"
            if (id>0)
            {
                url+="/"+id;
            }
            const resp = await fetch (url,
                {
                    method:(id===0?"POST":"PUT"),
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                })
            const json = await resp.json()
            console.log(json);


        }catch (ex){
            console.log("Post Error:",ex);
        }
    }

    return (
        <div>
            <form>
                <div>
                    Last Name:<br/>
                    <input type="text" value={lastName} onChange={lastNameChange}/>
                </div>
                <div>
                    First Name:<br/>
                    <input type="text" value={firstName} onChange={firstNameChange}/>
                </div>
                <div>
                    <input type="button" value="submit" onClick={send}/>
                </div>
            </form>
            <div>Diseases</div>

            <ol>
            {patientData.id===0||patientData.diseases===null?<div/>:

                patientData.diseases.map((d)=>(
                    <li key={d.disease.diseaseId}>{d.disease.diseaseName}</li>
                    ))

            }
            </ol>
        </div>

    )
}
export default PatientForm

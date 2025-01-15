import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import DiseaseCodeForm from './DiseaseCodeForm'
function DiseaseForm ()
{
    const [diseaseId, setDiseaseId]=useState(0)
    const [diseaseName, setDiseaseName]=useState("")
    const [summary, setSummary]=useState("")
    const [summaryOfUrgency, setSummaryOrUrgency]=useState("")
    const [resourceURL, setResourceURL]=useState("")
    const {id} = useParams();
    useEffect(() => {
        if(id)
        {
            console.log ("get disease:",id);
            getDisease(id)
        }
    }, [id]);
    const getDisease = async (id)=>{
        const resp =await fetch ("http://localhost:8080/disease/"+id);
        const data = await resp.json();
        console.log("get patient:", data);
        setDiseaseId(id);
        setDiseaseName(data.diseaseName);
        setSummary(data.summary);
        setSummaryOrUrgency(data.summaryOfUrgency);
        setResourceURL(data.resourceURL);

    }
    const diseaseNameChange = (e)=>{
        const val = e.target.value;
        console.log ("diseaseNameChange:",val)
        setDiseaseName(val);
    }
    const summaryChange = (e)=>{
        const val = e.target.value;
        console.log ("summaryChange:",val)
        setSummary(val);
    }
    const summaryOrUrgencyChange = (e)=>{
        const val = e.target.value;
        console.log ("summaryOrUrgencyChange:",val)
        setSummaryOrUrgency(val);
    }
    const resourceURLChange = (e)=>{
        const val = e.target.value;
        console.log ("resourceURLChange:",val)
        setResourceURL(val);
    }
    const send = async() =>{
        try {
            const data = {
                diseaseId:diseaseId,
                diseaseName:diseaseName,
                summary:summary,
                summaryOfUrgency:summaryOfUrgency,
                resourceURL:resourceURL,
            }
            console.log ("send diseaser:", data)
            let url = "http://localhost:8080/disease"
            if (diseaseId>0)
            {
                url+="/"+diseaseId;
            }
            const resp = await fetch (url,
                {
                    method:(diseaseId===0?"POST":"PUT"),
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                })
            const json = await resp.json()

            const tempId = json.diseaseId;
            console.log("tempId",tempId);
            setDiseaseId(tempId);


        }catch (ex){
            console.log("Post Error:",ex);
        }
    }

    return (
        <div>
            {diseaseId>0?<DiseaseCodeForm id={diseaseId}/>:<div/>}
            <hr/>
            <form>
                <div>
                    Disease Name:<br/>
                    <input type="text" value={diseaseName} onChange={diseaseNameChange}/>
                </div>
                <div>
                    Resource URL:<br/>
                    <input type="text" value={resourceURL} onChange={resourceURLChange}/>
                </div>
                <div>
                    Summary:<br/>
                    <textarea value={summary} onChange={summaryChange}  rows={10} cols={60}></textarea>
                </div>
                <div>
                    Summary of Urgency:<br/>
                    <textarea value={summaryOfUrgency} onChange={summaryOrUrgencyChange} rows={10} cols={60}></textarea>
                </div>
                <div>
                    <input type="button" value="submit" onClick={send}/>
                </div>
            </form>

        </div>

    )
}

export default DiseaseForm

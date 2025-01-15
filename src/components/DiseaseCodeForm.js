import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import SearchCodes from './SearchCodes'
function DiseaseCodeForm (props)
{
    const [id, setId]=useState(0)
    const [diseaseId, setDiseaseId]=useState(props.id)
    const [diseaseCodeId, setDiseaseCodeId]=useState(0)
    const [code, setCode]=useState({code:"", description:""})
    const [summary, setSummary]=useState("")
    const [description, setDescription]=useState("")
    const {pid,dcid} = useParams();
    //setDiseaseId(props.id);
    useEffect(() => {

        console.log ("DiseaseCodeForm.id:",diseaseId)

        //setDiseaseId(id);
/*
        if(dcid)
        {
            getDiseaseCode(dcid);
        }
        */

    }, [id]);
    const getDiseaseCode = async (id)=>{
        const resp =await fetch ("http://localhost:8080/disease/"+id);
        const data = await resp.json();
        console.log("get patient:", data);
        setDiseaseCodeId(dcid);
        setDescription(data.description);
        setSummary(data.summary);
        setCode(data.code);

    }
    const summaryChange=(e)=>{
        const val = e.target.value;
        setSummary(val);
    }

    const send = async() =>{
        try {
            const data = {
                diseaseId:diseaseId,
                code:code.code,
                summary:summary,
                description:code.description,
            }
            console.log ("send disease code:", data)
            let url = "http://localhost:8080/disease/code"
            if (diseaseCodeId>0)
            {
                url+="/"+diseaseCodeId;
            }

            const resp = await fetch (url,
                {
                    method:(diseaseCodeId===0?"POST":"PUT"),
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                })
            const json = await resp.json()
            console.log("RESP from Server:",json);


        }catch (ex){
            console.log("Post Error:",ex);
        }
    }
    const setICDCode=(code)=>{
        console.log ("setICDCode:",code)
        setCode(code)
    }
    if(!diseaseId)
    {
        return <div>Code missing</div>
    }
    return (
        <div>
            <SearchCodes setICDCode={setICDCode}/>
            <form>
                <div>
                    Summary:<br/>
                    <textarea value={summary} onChange={summaryChange}  rows={10} cols={60}></textarea>
                </div>
                <div>
                    <p>{code.code} - {code.description}</p>
                </div>
                <div>
                    <input type="button" value="Save Code" onClick={send}/>
                </div>
            </form>

        </div>

    )
}

export default DiseaseCodeForm

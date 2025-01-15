import React, {useState, useEffect} from 'react'

const SearchCodes=({ setICDCode })=>
{
    const [code, setCode]=useState("")
    const [searchInput, setSearchInput]=useState("")
    const [description, setDescription]=useState("")
    const [codes, setCodes]=useState([])
    const [codeList, setCodeList]=useState("")
    const searchInputChange=(e)=>{
        setSearchInput(e.target.value);
    }
    const search = async () => {
        const dataList=[]
        const url =
            'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms='
//alert("search")
        const api = `${url}${searchInput}`
        console.log('api: ' + api)
        const response = await fetch(api)
        const data = await response.json()
        //.innerHTML = ''
        console.log("search data",data)

        data[3].forEach(item => {
            const div = document.createElement('div')
            dataList.push({code: item[0], description: item[1]})
        })
        setCodes(dataList);
        let content="<ol>"
        dataList.forEach((item,idx) => {
            const li = `<li key="${idx}"><a href="javascript:selectCode(${idx})">${item.code} - ${item.description}</a></li>`;
            content+=li;

            // resultsDiv.appendChild(div)
        });
        content+="</ol>"
        //setCodeList(content);
        console.log ("codeList", content)

    }
    const selectCode=(e)=>{
        const idx = e.target.value
        console.log ("selectCode:",idx, codes[idx])
        setICDCode(codes[idx])
    }
    return (
        <div>

            <div>
                Search Value:<br/>
                <input type="text" value={searchInput} onChange={searchInputChange}/>
            </div>
            <div>
                <input type='button' onClick={search} value="Search"></input>
            </div>
            <div>
                <ol>
                    {codes.map((item,idx) => (
                        <li key={idx}><button value={idx} onClick={selectCode}>{item.code} - {item.description}</button></li>

                    ))}
                </ol>
            </div>
        </div>
    )
}
export default SearchCodes
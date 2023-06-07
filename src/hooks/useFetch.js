import {useState, useEffect } from "react";
const useFetch=(url,object)=>{
    const [data, setData] = useState(null)
    const [isPending,setIsPending]=useState(true)
    const [isError,setIsError]=useState(null)
          
    useEffect(()=>{
     const abortConst= new AbortController();
      fetch(url,object,{signal: abortConst.signal})
       .then(res=>{
          if(!res.ok){
              throw Error('could not fetch the data for that resource!')
          }
          return res.json()
       }).then(data=>{
          console.log(data);
          setData(data);
          setIsPending(false);
          setIsError(null)
       }).catch((e)=>{
          if(e.name==='AbortError'){
            console.log('fetch aborted')
          }
          else{
            setIsPending(false)
            setIsError(e.message)
          }
       })
      
       return ()=> abortConst.abort();
    },[url])
    return {data,isPending,isError}
}
export default useFetch;
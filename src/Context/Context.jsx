import { createContext, useState } from "react";
import runChat from "../config/gemini"; // Adjust the path as needed

export const Context = createContext();

const ContextProvider = (props) => {
  const [Input, setInput] = useState("");
  const [RecentPrompt, setRecentPrompt] = useState();
  const [PrePrompt, setPrePrompt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState("");4

  const newChat =()=>{
    setLoading(false)
    setShowResult(false)
    setInput("")
  }

   const delayPara =(index,nextword)=>{

    setTimeout(() => {
      setResultData(prev=>prev+nextword);
      
    }, 75*index) 

   }

  const onSent = async (prompt) => {
    setShowResult(true)
    setLoading(true)
    setResultData("")
    let response;
if (prompt!=undefined) {
  response = await runChat(prompt)
  setRecentPrompt(prompt)
  
}
else{
  setPrePrompt( prev=>[...prev ,Input])
  setRecentPrompt(Input)
  response = await runChat(Input)


}

    
   let responseArray = response.split("**")
   let newResponse = "";
   for (let i = 0; i < responseArray.length; i++) {
    if(i===0||i%2 !== 1)
    {
      newResponse += responseArray[i];
    }
    else{
      newResponse += "<b>"+responseArray[1]+"</b>"
    }
    
    
   }
   let newResponse2= newResponse.split("*").join("</br>")
   let newResponseArray = newResponse2.split(" ");
   for (let i = 0; i < newResponseArray.length; i++) {
    const nextWord = newResponseArray[i];
    delayPara(i,nextWord+" ")
    
   }
   
   setLoading(false)
   setInput("")

  };

  

  const contextValue = {
    setRecentPrompt,
    loading,
    PrePrompt,
    setPrePrompt,
    onSent,
    resultData,
    Input,
    setInput,
    showResult,
    RecentPrompt,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;

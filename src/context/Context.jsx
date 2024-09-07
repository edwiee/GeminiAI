// import { createContext, useState } from "react";
// import run from "../config/gemini";


// export const Context = createContext();


// const ContextProvider = (props)=>{


//     const [input, setInput] = useState("");
//     const [recentPrompt, setRecentPrompt] = useState("");
//     const [prevPrompts, setPrevPrompts] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resultData, setResultData] = useState("");

//     const [darkMode, setDarkMode] = useState(false);

//     const toggleDarkMode = () => {
//         setDarkMode(!darkMode);
//         document.body.classList.toggle('dark-mode');
//     }


//     const delayPara = (index, nextWord)=>{
//         setTimeout(function(){
//             setResultData(prev=>prev+nextWord);
//         }, 75 * index)
//     }


//     const newChat = ()=>{
//         setLoading(false);
//         setShowResult(false);
//     }

//     const onSent = async(prompt)=>{

//         setResultData("")
//         setLoading(true)
//         setShowResult(true)
//         let response;
//         if(prompt !== undefined){
//             response = await run(prompt);
//             setRecentPrompt(prompt)
//         }
//         else{
//             setPrevPrompts(prev=>[...prev, input])
//             setRecentPrompt(input)
//             response = await run(input)
//         }
//         let responseArray = response.split("**");
//         let newResponse="";
//         for(let i =0; i< responseArray.length; i++)
//             {
//                 if(i==0 || i%2 !== 1){
//                     newResponse += responseArray[i];
//                 }
//                 else{
//                     newResponse += "<b>" +responseArray[i]+"</b>";
//                 }
//             } 
//         let newResponse2 = newResponse.split("*").join("<br />")
//         let newResponseArray = newResponse2.split(" ");
//         for(let i=0; i<newResponseArray.length; i++)
//         {
//             const nextWord = newResponseArray[i];
//             delayPara(i, nextWord + " ");
//         }

//         setLoading(false)
//         setInput("")
//     }

//     const contextValue = {
//         prevPrompts,
//         setPrevPrompts,
//         onSent,
//         setRecentPrompt, 
//         recentPrompt,
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput,
//         newChat,

//         darkMode,
//         toggleDarkMode,
//     }

//     return(
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider;


// import { createContext, useState, useEffect } from "react";
// import run from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState(() => {
//     const storedRecentPrompt = localStorage.getItem("recentPrompt");
//     return storedRecentPrompt !== null ? storedRecentPrompt : "";
//   });

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setRecentPrompt(" ");
//       localStorage.removeItem("recentPrompt");
//     }, 5 * 60 * 1000); 
  
//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [recentPrompt]);

//   const [prevPrompts, setPrevPrompts] = useState(() => {
//     const storedPrevPrompts = localStorage.getItem("prevPrompts");
//     return storedPrevPrompts !== null ? JSON.parse(storedPrevPrompts) : [];
//   });
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");
//   const [darkMode, setDarkMode] = useState(() => {
//     const storedDarkMode = localStorage.getItem("darkMode");
//     return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
//   });

//   useEffect(() => {
//     localStorage.setItem("recentPrompt", recentPrompt);
//   }, [recentPrompt]);

//   useEffect(() => {
//     localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
//   }, [prevPrompts]);

//   useEffect(() => {
//     localStorage.setItem("darkMode", JSON.stringify(darkMode));
//     document.body.classList.toggle("dark-mode", darkMode);
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const delayPara = (index, nextWord) => {
//     setTimeout(function () {
//       setResultData((prev) => prev + nextWord);
//     }, 75 * index);
//   };

//   const newChat = () => {
//     setLoading(false);
//     setShowResult(false);
//   };

//   const onSent = async (prompt) => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     let response;
//     if (prompt !== undefined) {
//       response = await run(prompt);
//       setRecentPrompt(prompt);
//     } else {
//       setPrevPrompts((prev) => [...prev, input]);
//       setRecentPrompt(input);
//       response = await run(input);
//     }
//     let responseArray = response.split("**");
//     let newResponse = "";
//     for (let i = 0; i < responseArray.length; i++) {
//       if (i === 0 || i % 2 !== 1) {
//         newResponse += responseArray[i];
//       } else {
//         newResponse += "<b>" + responseArray[i] + "</b>";
//       }
//     }
//     let newResponse2 = newResponse.split("*").join("<br />");
//     let newResponseArray = newResponse2.split(" ");
//     for (let i = 0; i < newResponseArray.length; i++) {
//       const nextWord = newResponseArray[i];
//       delayPara(i, nextWord + " ");
//     }

//     setLoading(false);
//     setInput("");
//   };

//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setRecentPrompt,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//     newChat,

//     darkMode,
//     toggleDarkMode,
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;



import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState(() => {
    const storedRecentPrompt = localStorage.getItem("recentPrompt");
    return storedRecentPrompt !== null ? storedRecentPrompt : "";
  });

  const [prevPrompts, setPrevPrompts] = useState(() => {
    const storedPrevPrompts = localStorage.getItem("prevPrompts");
    return storedPrevPrompts !== null ? JSON.parse(storedPrevPrompts) : [];
  });
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("recentPrompt", recentPrompt);
  }, [recentPrompt]);

  useEffect(() => {
    localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRecentPrompt("");
      localStorage.removeItem("recentPrompt");
    }, 5 * 60 * 1000); // 5 minutes
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [recentPrompt]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br />");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,

    darkMode,
    toggleDarkMode,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
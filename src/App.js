import "./App.css";
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
//import file from "./files";
import arrfiles from "./arrfiles";
//import Navbar from "./Components/Navbar";
import axios from "axios";
//import { statuses } from "./Compiler-statuses";

function App() {
  //const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const theme = "lvs-dark";
  const [langData, setLangData] = useState({});
  console.log(langData);
  const [processing, setProcessing] = useState();
  const [customInput, setCustomInput] = useState();
  const [outputDetails, setOutputDetails] = useState({}); //Stored output object received from /submissions/token
  const [token, setToken] = useState({});
  const [isToken, setIsToken] = useState(false);
  const [codeInput, setCodeInput] = useState({});
  console.log(token.token);
  console.log(outputDetails);

  async function postData() {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { fields: "*" },
      headers: {
        "x-rapidapi-key": "7fd753af33mshc5e994addad73f5p1607d4jsn773611765d50",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        language_id: langData,
        source_code: value,
        stdin: customInput,
      },
    };

    try {
      setCodeInput(options.data);
      const response = await axios.request(options);
      setToken(response.data);
      setIsToken(true);
      console.log(response.data);
      /*if(isToken===true){
        checkStatus()
      }
      else{
        console.log("No Token Generated")
      }*/
      //checkStatus()
    } catch (error) {
      console.error(error);
    }
  }

  let handleLangChange = (e) => {
    setLangData(e.target.value);
  };

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  const handleCompile = async (e) => {
    //COMPILATION PROCESS Working
    e.preventDefault();
    setProcessing(true);
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { fields: "*" },
      headers: {
        "x-rapidapi-key": "7fd753af33mshc5e994addad73f5p1607d4jsn773611765d50",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        language_id: langData,
        source_code: value,
        stdin: customInput,
      },
    };

    try {
      setCodeInput(options.data);
      const responseone = await axios.request(options);
      setToken(responseone.data);
      setIsToken(true);

      const isTokenThere = Object.hasOwn(responseone.data, "token");

      console.log({ isTokenThere });
      console.log(responseone.data);
      if (isTokenThere) {
        // checkStatus()
        const firstResponse = responseone.data;
        const inputToken = firstResponse.token;
        console.log(inputToken);
        const optionss = {
          method: "GET",
          url: `https://judge0-ce.p.rapidapi.com/submissions/${inputToken}`,
          params: {
            base64_encoded: "true",
            fields: "*",
          },
          headers: {
            "x-rapidapi-key":
              "7fd753af33mshc5e994addad73f5p1607d4jsn773611765d50",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        };
        try {
          const response = await axios.get(optionss.url, {
            headers: {
              "x-rapidapi-key":
                "7fd753af33mshc5e994addad73f5p1607d4jsn773611765d50",
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "Content-Type": "application/json",
            },
          });
          console.log(response.data);
          setOutputDetails(response.data);
        } catch (error) {
          //setProcessing(false);
          console.error(error);
        }
      } else {
        console.log("No Token Generated");
      }
      //checkStatus()
    } catch (error) {
      console.error(error);
    }
  };

  /*async function checkStatus() {
    //TAKES THE TOKEN GENERATED BY THE /submission API AND SEND IT TO THIS FN AS ARGUMENT FOR THE OUTPUT PROCESS.
    let inputToken = token.token;
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${inputToken}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "7fd753af33mshc5e994addad73f5p1607d4jsn773611765d50",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setOutputDetails(response.data)
      //let statusId = response.data.status?.id;
      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        console.log("Still Processing")
        // still processing
        //setTimeout(() => {
        //  checkStatus(token);
        //}, 2000);
        //return;
      } else {
        setProcessing(false);
        //showSuccessToast(`Compiled Successfully!`)
        console.log("Compiled Successfully");
        console.log("response.data", response.data);
        setOutputDetails(response.data)
      }
      if (statusId === 6) {
        // compilation error
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {outputDetails?.stderr}
          </pre>
        );
      } else if (statusId === 3) {
        return (
          <pre className="px-2 py-1 font-normal text-xs text-green-500">
            {outputDetails.stdout !== null ? `${outputDetails.stdout}` : null}
          </pre>
        );
      } else if (statusId === 5) {
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {`Time Limit Exceeded`}
          </pre>
        );
      } else {
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {outputDetails?.stderr}
          </pre>
        );
      }
    } catch (error) {
      //setProcessing(false);
      console.error(error);
    }
  }*/

  /*const getOutput = () => {
    //let statusId = statuses?.id;
    let statusId = outputDetails?.status_id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {outputDetails?.stderr}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {outputDetails.stdout !== null ? `${outputDetails.stdout}` : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {outputDetails?.stderr}
        </pre>
      );
    }
  };*/

  useEffect(() => {}, []);
  return (
    <>
      <div className="App" style={{ paddingLeft: "1450px" }}>
        <br />
        <span style={{ paddingRight: "30px" }}>Select a language</span>
        <select onChange={handleLangChange}>
          <option value="⬇️ Select a language  ⬇️">Select a language </option>
          {arrfiles.map((el) => (
            <option value={el.id}>{el.name}</option>
          ))}
        </select>
      </div>
      <div style={{ width: "250px" }}></div>
      <Editor
        height="80vh"
        width={`100%`}
        theme={theme}
        defaultValue="//code"
        value={value}
        language={langData.name}
        onChange={(newVal) => setValue(newVal)}
        onValidate={handleEditorValidation}
      />
      <button
        style={{
          padding: "20px",
          backgroundColor: "green",
          zIndex: "2",
          marginLeft: "1600px",
        }}
        onClick={handleCompile}
      >
        Compile and Run
      </button>
      <h1>Output</h1>
      <div
        style={{
          backgroundColor: "whitesmoke",
          height: "150px",
          color: "white",
        }}
      >
        {outputDetails && outputDetails?.stdout}
        {outputDetails && outputDetails?.stderr}
      </div>
    </>
  );
}

export default App;

//<Navbar style={{marginLeft:"120px"}}/>//
/*<button
disabled={fileName === "script.js"}
onClick={() => setFileName("script.js")}
>
script.js
</button>*/

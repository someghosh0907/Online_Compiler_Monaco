import React, { useState } from "react";
import arrfiles from "../arrfiles";

const Navbar = () => {
  const theme = "light";
  let [language, setLang] = useState("⬇️ Select a language ⬇️")

// Using this function to update the state of fruit
// whenever a new option is selected from the dropdown
let handleLangChange = (e) => {
  setLang(e.target.value)
}

  return (
    <div className="App" style={{"paddingLeft":"1610px"}}>
    {language}
    <br />
    <select onChange={handleLangChange}> 
      <option value="⬇️ Select a language  ⬇️" >Select a language </option>
      {arrfiles.map((el)=> <option  value={el.language}>{el.language}</option>)}
    </select>
    </div>
  );
}

export default Navbar;

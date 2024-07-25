import React, {useEffect, useState} from 'react';

function Form(props) {
    const {purpose, type, detail, handleSubmit, disableList} = props;
    const [fieldData, setFieldData] = useState("");
    const [isError, setIsError] = useState(false);
    const errorMessage = "Name not available!";
    useEffect(() => {
        const trimmedValue = fieldData.trim();
        if(disableList.includes(trimmedValue)){
            setIsError(true);
        }else{
            setIsError(false);
        }
    }, [disableList]);
    function handleClick(event){
        handleSubmit(fieldData.trim());
        event.preventDefault();
    }
    function handleChange(event){
        const {name, value} = event.target;
        setFieldData(value);
        const trimmedValue = value.trim();
        console.log("Disable list: \n", disableList);
        console.log("Value: ", trimmedValue);
        if(disableList.includes(trimmedValue)){
            setIsError(true);
        }else{
            setIsError(false);
        }
    }
  return (
    <form onSubmit={handleClick}>
        <div className="formGroup">
            <label htmlFor={detail}>Enter your {detail}:</label>
            <input onChange={handleChange} type={type} id={detail} name={detail} value={fieldData} autoComplete='off'/>
        </div>
        <div>
            {isError && errorMessage}
        </div>
        <button disabled={isError || (fieldData === "")} type="submit">Enter</button>
    </form>
  )
}

export default Form;
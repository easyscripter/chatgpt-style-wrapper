import { Box, TextField } from "@mui/material";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [imgSrc, setImgSrc] = useState<string>('../dist/assets/images.png');
  return (
    <div className="App">
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <img src={imgSrc} className='logo-preview'/>
        <TextField
          sx={{mt: 5}}
          onChange={(event) => setImgSrc(event.target.value)}
          label="Image URL:"
          placeholder='https://i.ibb.co/Sf4VqXY/Boxberry-logo.png'
          variant="outlined"
        />
      </Box>
    </div>
  );
};

export default App;

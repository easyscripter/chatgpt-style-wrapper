import { Box, Button, TextField } from "@mui/material";
import "./App.css";
import { useState } from "react";
import { ImagePositionType, StylesType } from "./types";

const App = () => {
  const [imgSrc, setImgSrc] = useState<string>("images.png");
  const [imagePosition, setImagePosition] = useState<ImagePositionType>({
    top: 0,
    right: 0,
  });
  const [primaryBackgroundColor, setPrimaryBackgroundColor] = useState<string>("#00e3ca");
  const [secondaryBackgroundColor, setSecondaryBackgroundColor] = useState<string>("#ff0000");
  const [textColor, setTextColor] = useState<string>("#6495ED");
  const [inputColor, setInputColor] = useState<string>("#00ff97");
  const [headColor, setHeadColor] = useState<string>("#76ff03");

  const handleChangeImagePosition = (name: string, value: number) => {
    setImagePosition(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleCiick = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      const currentTabId = tabs.length === 0 ? 0 : tabs[0].id!;
      const styles: StylesType = {
        imagePosition,
        imageSrc: imgSrc,
        primaryBackgroundColor,
        secondaryBackgroundColor,
        textColor,
        inputColor,
        headColor,
      }
      chrome.tabs.sendMessage(currentTabId, styles);
    });
  }

  return (
      <div className="App">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <img src={imgSrc} className='logo-preview' />
          <TextField
              sx={{ mt: 5 }}
              onChange={(event) => setImgSrc(event.target.value)}
              label="Image URL:"
              placeholder='https://i.ibb.co/Sf4VqXY/Boxberry-logo.png'
              variant="outlined"
          />
          <TextField
              sx={{ mt: 5 }}
              onChange={(event) => handleChangeImagePosition('top', +event.target.value)}
              label="Top Image Position (px):"
              placeholder='12'
              variant="outlined"
          />
          <TextField
              sx={{ mt: 5 }}
              onChange={(event) => handleChangeImagePosition('right', +event.target.value)}
              label="Right Image Position (px):"
              placeholder='12'
              variant="outlined"
          />
          <div className="color-pallet-container">
            <label htmlFor="priamryBackgroundColor">Primary Background Color:</label>
            <input name="priamryBackgroundColor" value={primaryBackgroundColor} type="color" onChange={(event) => setPrimaryBackgroundColor(event.target.value)} />
          </div>
          <div className="color-pallet-container">
            <label htmlFor="secondaryBackgroundColor">back Color For GPT:</label>
            <input name="secondaryBackgroundColor" value={secondaryBackgroundColor} type="color" onChange={(event) => setSecondaryBackgroundColor(event.target.value)} />
          </div>
          <div className="color-pallet-container">
            <label htmlFor="textColor">back Color For User:</label>
            <input name="textColor" value={textColor} type="color" onChange={(event) => setTextColor(event.target.value)} />
          </div>
          <div className="color-pallet-container">
            <label htmlFor="inputColor">input Color:</label>
            <input name="inputColor" value={inputColor} type="color" onChange={(event) => setInputColor(event.target.value)} />
          </div>
          <div className="color-pallet-container">
            <label htmlFor="headColor">headColor:</label>
            <input name="headColor" value={headColor} type="color" onChange={(event) => setHeadColor(event.target.value)} />
          </div>
          <Button sx={{ mt: 5 }} onClick={handleCiick} variant="contained">Apply Styles</Button>
        </Box>
      </div>
  );
};

export default App;

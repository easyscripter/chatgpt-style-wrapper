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
  const [primaryBackgroundColor, setPrimaryBackgroundColor] = useState<string>("#000");
  const [secondaryBackgroundColor, setSecondaryBackgroundColor] = useState<string>("#FFF");

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
          <label htmlFor="secondaryBackgroundColor">Secondary Background Color:</label>
          <input name="secondaryBackgroundColor" value={secondaryBackgroundColor} type="color" onChange={(event) => setSecondaryBackgroundColor(event.target.value)} />
        </div>
        <Button sx={{ mt: 5 }} onClick={handleCiick} variant="contained">Apply Styles</Button>
      </Box>
    </div>
  );
};

export default App;

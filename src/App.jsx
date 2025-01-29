import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { motion } from "motion/react";
import { handleSearchVideo } from "./api/APIRequest";
import { toast } from "sonner";
import YoutubeScreen from "./components/YoutubeScreen";

import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);



  const handleDownload = async () => {
    setLoading(true);
    if (!url) {
      setLoading(false);
      return;
    }

    try {
      const videoId = url.split("=")[1];
      if (videoId) {
        const response = await handleSearchVideo(videoId)
        setData(response)
        toast.success(response.msg)
        if (response.link) {
          window.location.href = response.link;
        }
        setLoading(false);
      } else {
        toast.error("ID do vídeo inválido!")
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Ocorreu um erro de conexão. Tente novamente!")
    }
  };

  return (
    <div className="container">
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "80%",
            "& input": {
              height: "25px",
            },
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
      >
        <div className="inicial">
          <motion.div
            className="text"
            animate={{
              scale: 1.5,
              transition: { duration: 2 },
            }}
          >
            <h1 className="title">BAIXE ÁUDIOS DE VÍDEOS AQUI</h1>
          </motion.div>
        </div>
        <TextField
          id="outlined-basic"
          label="Link do Vídeo"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Box>
      <motion.button
        whileTap={{ scale: 0.9, rotate: 3 }}
        whileHover={{ scale: 1.1 }}
        style={{
          backgroundColor: "#ff7f50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? "Baixando..." : "Baixar Áudio"}
      </motion.button>

      {data && <YoutubeScreen url={url} />}
    </div>
  );
}

export default App;

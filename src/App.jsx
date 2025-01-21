import { useState, useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { motion } from "motion/react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { fetch } from "./api/APIRequest";

function App() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = () => {
        let interval = setInterval(async function () {
          setLoading(true);
          const res = await fetch(id); // Chamando a API externa para pegar o link de download

          if (res.status === 200 && res.data.status === "ok") {
            setLoading(false);
            setResponse(res.data);
            clearInterval(interval);
          } else if (res.status === 200 && res.data.status === "falhou") {
            setMessage("ID do vídeo inválido");
            setLoading(false);
            clearInterval(interval);
          }
        }, 1000);
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      window.location.href = response.link;
    }
  }, [response]);

  // To fazendo download
  const handleDownload = async () => {
    setLoading(true); // Ativando o loading
    setMessage("");
    if (!url) {
      setMessage("Por favor, insira um link válido.");
      setLoading(false);
      return;
    }

    try {
      const videoId = url.split("=")[1];
      if (videoId) {
        setId(videoId);
      } else {
        setMessage("ID do vídeo inválido.");
        setLoading(false);
      }
    } catch {
      setMessage("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "70ch",
            "& input": {
              height: "25px",
            },
          },
        }}
        noValidate
        autoComplete="off"
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

      {message && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity={message.includes("sucesso") ? "success" : "error"}>
            {message}
          </Alert>
        </Stack>
      )}
    </>
  );
}

export default App;

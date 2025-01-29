import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { handleSearchVideo } from "../api/APIRequest"; // Removendo requestOptions da importação

const mock = new MockAdapter(axios);

describe("handleSearchVideo function", () => {
  afterEach(() => {
    mock.reset();
  });

  it("deve retornar os dados corretamente quando a resposta for bem-sucedida", async () => {
    const mockData = { status: "ok", data: { title: "Vídeo de teste" } };

    mock.onGet(/./).reply(200, mockData); // Corrigindo o mock para capturar qualquer URL

    const result = await handleSearchVideo("123");
    expect(result).toEqual(mockData);
  });

  it("deve lançar um erro quando a API retorna um status diferente de 200", async () => {
    mock.onGet(/./).reply(500, { message: "Erro interno" });

    await expect(handleSearchVideo("123")).rejects.toThrow("Request failed with status code 500");
  });

  it("deve lançar um erro quando a API não retorna status 'ok'", async () => {
    mock.onGet(/./).reply(200, { status: "error", message: "Vídeo não encontrado" });

    await expect(handleSearchVideo("123")).rejects.toThrow("Error handleSearchVideoing YouTube video: undefined");
  });
  
});

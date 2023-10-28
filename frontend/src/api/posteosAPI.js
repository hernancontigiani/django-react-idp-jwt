import { client } from "./client"

export const posteosAPI = {
  get: async function () {
    const response = await client.request({
      url: `/posteos/`,
      method: "GET",
    })
    if(response) {
      return response.data
    }
  },
  post: async function (titulo, texto) {
    const response = await client.request({
      url: `/posteos/`,
      method: "POST",
      data: {
        titulo: titulo,
        texto: texto
      }
    })
    if(response) {
      return response.data
    }
  },
}
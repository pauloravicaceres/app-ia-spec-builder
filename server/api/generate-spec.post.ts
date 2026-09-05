import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'

const pitchSchema = z.object({
  pitch: z.string().min(10, "La descripción es demasiado corta para ser analizada.")
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const validation = pitchSchema.safeParse(body)
  
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: validation.error.issues[0].message
    })
  }

  const { pitch } = validation.data
  const config = useRuntimeConfig(event)
  
  if (!config.geminiApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'La clave GEMINI_API_KEY no está configurada en el servidor.'
    })
  }

  try {
    const genAI = new GoogleGenerativeAI(config.geminiApiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' })
    
    const prompt = `
Eres un Analista de Producto Técnico Experto y un Arquitecto de Software.
Tu tarea es analizar la siguiente idea de negocio (pitch) y estructurarla en un Documento de Requerimientos de Producto (PRD) inicial.
Si encuentras vacíos funcionales o alta ambigüedad, en lugar del PRD completo, devuelve preguntas de desambiguación para el usuario.

IDEA DEL USUARIO:
"${pitch}"

Por favor, responde en formato Markdown bien estructurado, siguiendo convenciones de Ingeniería de Software.
`
    
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    
    return {
      success: true,
      data: text
    }
  } catch (error: any) {
    console.error('Error con Gemini API:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'AI Service Error',
      message: 'Hubo un error al comunicarse con la Inteligencia Artificial.'
    })
  }
})

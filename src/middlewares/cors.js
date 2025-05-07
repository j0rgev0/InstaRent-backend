import cors from 'cors'

// const ACCEPTED_ORIGINS = [
//   'http://localhost:8080',
//   'http://localhost:8081',
//   'http://localhost:19006',
//   'http://127.0.0.1:8081',
//   'http://172.22.32.1:8081', // Para el emulador móvil
//   'https://ujbt1l8-j0rgev-8081.exp.direct' // Tu URL de Expo Tunnel
// ]

export const corsMiddleware = () =>
  cors({
    origin: '*', // Permite todas las solicitudes (solo para depuración)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    credentials: true,
    exposedHeaders: ['Content-Type', 'Authorization']
  })

// export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
//   cors({
//     origin: (origin, callback) => {
//       if (acceptedOrigins.includes(origin)) {
//         return callback(null, true)
//       }

//       if (!origin) {
//         return callback(null, true) // Permitir solicitudes sin origen (como desde el mismo servidor)
//       }

//       console.log(`CORS Error: Origin ${origin} not allowed`) // Añadir log para ver el origen
//       return callback(new Error('Not allowed by CORS'))
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     preflightContinue: false,
//     credentials: true,
//     exposedHeaders: ['Content-Type', 'Authorization']
//   })

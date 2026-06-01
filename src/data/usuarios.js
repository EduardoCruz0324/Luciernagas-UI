export const usuarios = [
  {
    id: 1,
    nombre: "Alan Contreras",
    email: "alan@gmail.com",
    password: "1234",
    foto: null,
    reservaciones: [
      {
        id: "RES-001",
        parqueId: 1,
        parqueNombre: "Bosque Esmeralda",
        fecha: "2026-06-19",
        hospedaje: "Cabaña",
        personas: 2,
        total: 700,
        status: "confirmada"
      }
    ]
  },
  {
    id: 2,
    nombre: "María López",
    email: "maria@gmail.com",
    password: "1234",
    reservaciones: []
  }
]
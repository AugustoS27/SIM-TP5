"use client"

import { useEffect } from "react"




const DynamicTable = () => {
    useEffect(() => {
    fetch("http://localhost:3000/api/simular", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cantidadAGenerar: 10,
            primeroAMostrar: 0,
            cantidadAMostrar: 10,
            paso: 0.1,
            mediaLlegadaLavado: 5,
            mediaLlegadaLimpieza: 3,
            mediaFinLavado: 4,
            mediaFinLimpieza: 2
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error en fetch:", error);
        });
}, []);

  
}

export default DynamicTable

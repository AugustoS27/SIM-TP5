export async function simular(formData) {
    const parsedData = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, parseFloat(v)])
    );

    const response = await fetch("http://localhost:3000/api/simular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
    });

    if (!response.ok) {
        throw new Error("Error en la petición");
    }
    return response.json();
}
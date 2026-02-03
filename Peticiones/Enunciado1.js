// Define una función asíncrona para recuperar información de dos puntos finales distintos:
const UsuariosActivosConPublicaciones = async () => {
    // Establecemos un bloque try-catch para gestionar posibles errores
    try {
        // Ejecutamos las dos peticiones fetch de manera simultánea
        const [responseUsers, responsePosts] = await Promise.all([ // empleamos Promise.all para procesar las dos promesas al mismo tiempo
        fetch('http://localhost:3000/users'), // Punto final para adquirir usuarios
        fetch('http://localhost:3000/posts') // Punto final para adquirir publicaciones
        ]);

        const users = await responseUsers.json(); // Convertimos la respuesta de usuarios a formato JSON
        const posts = await responsePosts.json(); // Convertimos la respuesta de publicaciones a formato JSON

        // Seleccionamos los usuarios activos y calculamos sus publicaciones
        const resultado = users
        .filter(user => user.active === true)
        .map(user => ({
            name: user.name,
            postCount: posts.filter(post => post.userId == user.id).length // Calculamos el número de publicaciones del usuario
        }));

        return resultado; // Retornamos el arreglo obtenido
    } 
    catch (error) {
        console.error('Error:', error); // Gestionamos cualquier fallo que surja en las peticiones
    }
};

// Invocamos la función y exhibimos el resultado en la consola
UsuariosActivosConPublicaciones().then(data => {
    console.log(data); 
});
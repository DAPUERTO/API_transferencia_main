 // Define una función asíncrona para adquirir información de dos puntos finales distintos:
const PublicacionesConYSinComentarios = async () => {
    // Establecemos un bloque try-catch para gestionar posibles fallos
    try {
        // Ejecutamos las dos peticiones fetch de forma simultánea
        const [responsePosts, responseComments] = await Promise.all([ // empleamos Promise.all para procesar las dos promesas al mismo tiempo
        fetch('http://localhost:3000/posts'), // Punto final para adquirir publicaciones
        fetch('http://localhost:3000/comments') // Punto final para adquirir comentarios
        ]);

        const posts = await responsePosts.json(); // Convertimos la respuesta de publicaciones a formato JSON
        const comments = await responseComments.json(); // Convertimos la respuesta de comentarios a formato JSON

        // Calculamos los comentarios por publicación y categorizamos
        const resultado = posts.map(post => {
        const commentCount = comments.filter(comment => comment.postId == post.id).length; 
        
        // Devolvemos un objeto con el título, cantidad de comentarios y condición
        return {
            title: post.title, 
            commentCount: commentCount,
            status: commentCount > 0 ? "Con comentarios" : "Sin comentarios"
        };
        });
        
        // Seleccionamos y calculamos publicaciones con y sin comentarios
        const conComentarios = resultado.filter(post => post.status === "Con comentarios"); // Publicaciones que tienen comentarios
        const sinComentarios = resultado.filter(post => post.status === "Sin comentarios"); // Publicaciones que no tienen comentarios

        // Exhibimos las estadísticas en la consola

        console.log(`Estadísticas:`);
        console.log(`Publicaciones con comentarios: ${conComentarios.length}`); // Publicaciones que incluyen comentarios
        console.log(`Publicaciones sin comentarios: ${sinComentarios.length}`); // Publicaciones que carecen de comentarios
        console.log(`Total de publicaciones: ${resultado.length}`); // Número total de publicaciones

        return resultado; // Retornamos el arreglo obtenido
    } catch (error) {
        console.error('Error:', error); // Gestionamos cualquier fallo que surja en las peticiones
    }
};

// Invocamos la función y exhibimos el resultado en la consola
PublicacionesConYSinComentarios().then(data => {
    console.log('\nPublicaciones con y sin comentarios:', data);
});
// Define una función asíncrona para adquirir información de dos puntos finales distintos:
const BusquedaEspecificaPublicacion = async (postId) => {
    // Establecemos un bloque try-catch para gestionar posibles fallos
    try {
        // Ejecutamos las dos peticiones fetch de forma simultánea
        const [responsePosts, responseComments] = await Promise.all([ // empleamos Promise.all para procesar las dos promesas al mismo tiempo
        fetch('http://localhost:3000/posts'), // Punto final para adquirir publicaciones
        fetch('http://localhost:3000/comments') // Punto final para adquirir comentarios
        ]);
        
        // Convertimos las respuestas a formato JSON
        const posts = await responsePosts.json(); // Convertimos la respuesta de publicaciones a formato JSON
        const comments = await responseComments.json(); // Convertimos la respuesta de comentarios a formato JSON

        // Localizamos la publicación específica mediante el ID

        const publicacion = posts.find(post => post.id == postId); // Identificamos la publicación con el ID proporcionado

        // Si no se localiza la publicación, devolvemos null
        if (!publicacion) {
        return null; // Devolvemos null si no se identifica la publicación
        }

        // Calculamos los comentarios relacionados con la publicación
        const comentariosAsociados = comments.filter(comment => comment.postId == postId);

        // Devolvemos el objeto con los datos solicitados
        return {
        title: publicacion.title,
        body: publicacion.body,
        commentCount: comentariosAsociados.length
        };
    } catch (error) {
        console.error('Error:', error); // Gestionamos cualquier fallo que surja en las peticiones
    }
};

// Invocamos la función y exhibimos el resultado en la consola
BusquedaEspecificaPublicacion(1).then(data => {
    console.log(data); 
});
// Define una función asíncrona que suprima una publicación por su ID únicamente si carece de comentarios relacionados
const EliminarPublicacionConValidacion = async (postId) => {
    // Establecemos un bloque try-catch para gestionar posibles fallos
    try {
        // Ejecutamos las dos peticiones fetch de forma simultánea
        const [responsePosts, responseComments] = await Promise.all([ // empleamos Promise.all para procesar las dos promesas al mismo tiempo
        fetch('http://localhost:3000/posts'), // Punto final para adquirir publicaciones
        fetch('http://localhost:3000/comments') // Punto final para adquirir comentarios
        ]);

        const posts = await responsePosts.json(); // Convertimos la respuesta de publicaciones a formato JSON
        const comments = await responseComments.json(); // Convertimos la respuesta de comentarios a formato JSON

        // Localizamos la publicación específica mediante el ID
        const publicacion = posts.find(post => post.id == postId);

        // Si no se localiza la publicación, devolvemos un mensaje
        if (!publicacion) {
        console.log(`No existe una publicación con ID: ${postId}`); // Notificación de no localizado
        return { success: false, message: `No existe una publicación con ID: ${postId}` }; // Devolvemos notificación de no localizado
        }

        const tieneComentarios = comments.some(comment => comment.postId == postId); // Comprobamos si la publicación posee comentarios relacionados

        // Si posee comentarios, no autorizamos la supresión
        if (tieneComentarios) {
        console.log(`No se puede eliminar la publicación porque tiene comentarios`);
        return { 
            success: false, 
            message: "No se puede eliminar la publicación porque tiene comentarios" // Devolvemos notificación de no supresión
        };
        }

        // Si carece de comentarios, avanzamos a suprimir la publicación
        const deleteResponse = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE' // Método DELETE para suprimir la publicación
        });

        // Comprobamos si la supresión resultó exitosa
        if (deleteResponse.ok) {
        const validacionResponse = await fetch(`http://localhost:3000/posts/${postId}`); // Confirmamos si la publicación todavía existe
        
        // comprobamos si la publicación fue suprimida adecuadamente
        if (validacionResponse.status === 404) {
            console.log(`Publicación eliminada correctamente`);
            return { 
            success: true, 
            message: "Publicación eliminada correctamente" 
            };
        }
        }

        // Si la supresión no resultó exitosa, devolvemos un mensaje de fallo
        console.log(`Error al eliminar la publicación`);
        return { success: false, message: "Error al eliminar la publicación" }; // Devolvemos notificación de fallo

    } catch (error) {
        console.error('Error:', error); // Gestionamos cualquier fallo que surja en las peticiones
        return { success: false, message: `Error: ${error.message}` }; // Devolvemos notificación de fallo
    }
};

// Invocamos la función y exhibimos el resultado en la consola
EliminarPublicacionConValidacion(5).then(resultado => {
  console.log('\nResultado:', resultado); // Exhibimos el resultado en la consola
});
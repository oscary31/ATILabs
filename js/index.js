// Redirección forzada a /ATI/index.py si la ruta es diferente
if (!window.location.pathname.endsWith('/ATI/index.py')) {
    const params = window.location.search;
    const hash = window.location.hash;
    window.location.replace('/ATI/index.py' + params + hash);
}

// Variable global para almacenar los estudiantes cargados
let estudiantesGlobal = [];

// Función para cargar los estudiantes y mostrarlos en la lista
async function cargarEstudiantes() {
    try {
        // Obtener los datos de estudiantes desde el JSON externo
        const response = await fetch('/ATI/datos/index.json');
        const estudiantes = await response.json();
        estudiantesGlobal = estudiantes; // Guardar globalmente para el filtro

        // Seleccionar el contenedor de la lista
        const section = document.getElementById('vista-lista');
        section.innerHTML = ''; // Limpiar el contenido previo
        const ul = document.createElement('ul');

        // Generar dinámicamente los elementos de la lista
        estudiantes.forEach(estudiante => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img class="persona" src="/ATI/${estudiante.imagen}" alt="${estudiante.nombre}" fetchpriority="high">
                <span>${estudiante.nombre}</span>
            `;
            
            // Agregar un evento de clic para redirigir al perfil del estudiante
            li.onclick = (e) => {
                e.preventDefault();
                mostrarPerfil(estudiante.ci);
            };
            ul.appendChild(li);
        });
        // Agregar la lista al HTML
        section.appendChild(ul);
    } catch (error) {
        console.error('Error al cargar los estudiantes:', error);
    }
}

// Función para cargar y mostrar el perfil en perfil.html
async function cargarPerfil(ci) {
    try {
        if (!ci) {
            // Intentar obtener el parámetro de la URL si no se pasa
            const params = new URLSearchParams(window.location.search);
            ci = params.get('ci');
        }
        if (!ci) {
            throw new Error('No se proporcionó un CI');
        }
        // Obtener los datos del perfil desde el JSON externo
        const response = await fetch(`/ATI/${ci}/perfil.json`);
        const perfil = await response.json();
        const contenedor = document.getElementById('contenedor');
        // Eliminar imagen previa si existe
        const imgPrev = contenedor.querySelector('img.img_persona, picture');
        if (imgPrev) imgPrev.remove();
        let imagenPerfil;
        if(ci === "30697617") {
            const picture = document.createElement('picture');
            const imgGrande = document.createElement('source');
            imgGrande.media = '(min-width: 769px)';
            imgGrande.srcset = '/ATI/30697617/30697617Grande.jpg';
            imgGrande.type = 'image/jpeg';
            const imgPequena = document.createElement('source');
            imgPequena.media = '(max-width: 768px)';
            imgPequena.srcset = '/ATI/30697617/30697617Pequena.jpg';
            imgPequena.type = 'image/jpeg';
            const img = document.createElement('img');
            img.id = 'foto';
            img.className = 'img_persona';
            img.src = '/ATI/30697617/30697617Grande.jpg';
            img.alt = 'Oscary Arocha';
            picture.appendChild(imgGrande);
            picture.appendChild(imgPequena);
            picture.appendChild(img);
            contenedor.insertBefore(picture, document.getElementById('perfil'));
        }else{
            imagenPerfil = document.createElement('img');
            imagenPerfil.className = 'img_persona';
            imagenPerfil.src = `/ATI/${ci}/${ci}.jpg`;
            imagenPerfil.alt = `Imagen de ${perfil.nombre}`;
            contenedor.insertBefore(imagenPerfil, document.getElementById('perfil'));
        }
        // Actualizar el contenido del HTML con los datos del perfil
        document.querySelector('title').textContent = perfil.nombre;
        document.getElementById('nombre').textContent = perfil.nombre;
        document.getElementById('presentacion').textContent = perfil.descripcion;
        // Crear la tabla de detalles
        const detalles = document.getElementById('detalles');
        const detallesData = [
            { titulo: "Color favorito", valor: Array.isArray(perfil.color) ? perfil.color.join(", ") : perfil.color },
            { titulo: "Libro favorito", valor: Array.isArray(perfil.libro) ? perfil.libro.join(", ") : perfil.libro },
            { titulo: "Estilo de música preferida", valor: Array.isArray(perfil.musica) ? perfil.musica.join(", ") : perfil.musica },
            { titulo: "Videojuegos favoritos", valor: Array.isArray(perfil.video_juego) ? perfil.video_juego.join(", ") : perfil.video_juego },
            { titulo: "Lenguajes aprendidos", valor: Array.isArray(perfil.lenguajes) ? perfil.lenguajes.join(", ") : perfil.lenguajes },
            { titulo: "Género", valor: perfil.genero },
            { titulo: "Fecha de nacimiento", valor: perfil.fecha_nacimiento }
        ];
        detalles.innerHTML = '';
        detallesData.forEach(detalle => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${detalle.titulo}:</td>
                <td>${detalle.valor}</td>
            `;
            detalles.appendChild(fila);
        });
        // Agregar el contacto
        document.getElementById('contacto').innerHTML = `
            Si necesitan comunicarse conmigo me pueden escribir a: 
            <a href="mailto:${perfil.email}" title="Enviar correo a ${perfil.nombre}">${perfil.email}</a>
        `;
        
        await traducirTodo();
    } catch (error) {
        console.error('Error al cargar el perfil:', error);
        document.getElementById('perfil').innerHTML = '<p>Error al cargar el perfil.</p>';
    }


}

// Función para obtener el idioma del URL y cargar el JSON externo
async function obtenerIdioma() {
    const params = new URLSearchParams(window.location.search);
    let lang = params.get('lang');
    
    // Si no hay parámetro lang o no es válido, usar ES por defecto
    if (!lang || !['ES', 'EN', 'PT'].includes(lang)) {
        lang = 'ES';
        // Solo actualizar la URL si realmente necesitamos cambiar el idioma
        if (params.get('lang') !== lang) {
            params.set('lang', lang);
            const newUrl = window.location.pathname + '?' + params.toString();
            window.history.replaceState({}, '', newUrl);
        }
    }
    
    const langConfig = {
        ES: 'configES.json',
        EN: 'configEN.json',
        PT: 'configPT.json'
    };
    
    try {
        const response = await fetch(`/ATI/conf/${langConfig[lang]}`);
        return await response.json();
    } catch (error) {
        console.error('Error al cargar el archivo de idioma:', error);
        return {};
    }
}

// Función para aplicar las traducciones en index.html y perfil.html
async function traducirTodo() {
    const config = await obtenerIdioma();
    // Traducción general (index)
    document.title = `${config.sitio?.[0] || ''} ${config.sitio?.[1] || ''} ${config.sitio?.[2] || ''}`;
    const sitio = document.getElementById('ati');
    if (sitio && config.sitio) sitio.innerHTML = `${config.sitio[0]} <span id="ucv">${config.sitio[1]}</span> ${config.sitio[2]}`;
    const saludo = document.getElementById('saludo');
    if (saludo && config.saludo) saludo.textContent = `${config.saludo}, Oscary Arocha`;
    const inputBuscar = document.querySelector('input[type="text"]');
    if (inputBuscar && config.nombre) inputBuscar.placeholder = `${config.nombre}...`;
    const botonBuscar = document.querySelector('button[type="submit"]');
    if (botonBuscar && config.buscar) botonBuscar.textContent = config.buscar;
    const footer = document.querySelector('footer p');
    if (footer && config.copyRight) footer.textContent = config.copyRight;
    // Traducción de perfil
    const detalles = document.getElementById('detalles');
    if (detalles && config) {
        detalles.querySelectorAll('tr').forEach((fila, index) => {
            const keys = ["color", "libro", "musica", "video_juego", "lenguajes", "genero", "fecha_nacimiento"];
            if (keys[index] && config[keys[index]]) fila.querySelector('td:first-child').textContent = config[keys[index]];
        });
    }
    const contacto = document.getElementById('contacto');
    if (contacto && config.email) {
        const email = contacto.querySelector('a')?.getAttribute('href')?.replace('mailto:', '');
        if (email) {
            contacto.innerHTML = config.email.replace('[email]', `<a href="mailto:${email}">${email}</a>`);
        }
    }
}

// Función para mostrar la vista de lista y ocultar la de perfil
function mostrarLista(lang) {
    document.getElementById('vista-lista').style.display = '';
    document.getElementById('vista-perfil').style.display = 'none';
    document.querySelector('header').style.display = '';
    document.querySelector('footer').style.display = '';
    
    const params = new URLSearchParams(window.location.search);
    params.delete('ci');
    if (lang) params.set('lang', lang);
    
    history.pushState({vista: 'lista'}, '', '?' + params.toString());
}

async function mostrarPerfil(ci) {
    document.getElementById('vista-lista').style.display = 'none';
    document.getElementById('vista-perfil').style.display = '';
    document.querySelector('header').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    
    const params = new URLSearchParams(window.location.search);
    params.set('ci', ci);
    
    await cargarPerfil(ci);
    history.pushState({vista: 'perfil', ci: ci}, '', '?' + params.toString());
}
// Función para filtrar la lista de estudiantes
function filtrarEstudiantes() {
    const input = document.getElementById('buscar');
    const filter = input.value.toLowerCase();
    const section = document.getElementById('vista-lista');
    const ul = section.querySelector('ul');
    ul.innerHTML = ''; // Limpiar la lista antes de mostrar los resultados filtrados
    let found = false;

    estudiantesGlobal.forEach(estudiante => {
        if (estudiante.nombre.toLowerCase().includes(filter)) {
            const li = document.createElement('li');
            li.innerHTML = `
                <img class="persona" src="/ATI/${estudiante.imagen}" alt="${estudiante.nombre}">
                <span>${estudiante.nombre}</span>
            `;
            li.onclick = (e) => {
                e.preventDefault();
                mostrarPerfil(estudiante.ci);
            };
            ul.appendChild(li);
            found = true;
        }
    });

    // Crear contenedor para el mensaje si no existe
    let mensaje = document.getElementById('no-encontrado');
    if (!mensaje) {
        mensaje = document.createElement('p');
        mensaje.id = 'no-encontrado';
        section.appendChild(mensaje);
    }

    // Mostrar mensaje si no se encuentra ningún estudiante
    obtenerIdioma().then(config => {
        if (found === false && filter) {
            mensaje.textContent = config.mensaje.replace('[nombre]', `"${filter}"`);
            mensaje.style.display = 'block';
            mensaje.style.fontFamily = 'Arial, Helvetica, sans-serif';
        } else {
            mensaje.style.display = 'none';
        }
    });
}

// Llamar a las funciones de traducción al cargar la página y agregar evento al campo de búsqueda
document.addEventListener('DOMContentLoaded', async () => {
    // Primero aplicar el idioma
    await traducirTodo();
    
    // Luego cargar la vista adecuada
    const params = new URLSearchParams(window.location.search);
    const ci = params.get('ci');
    
    if (ci) {
        await mostrarPerfil(ci);
    } else {
        mostrarLista();
        await cargarEstudiantes();
    }
    
    // Configurar el buscador
    const inputBuscar = document.getElementById('buscar');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', filtrarEstudiantes);
    }
    
    const formBuscar = document.getElementById('form-buscar');
    if (formBuscar) {
        formBuscar.addEventListener('submit', (e) => {
            e.preventDefault();
            filtrarEstudiantes();
        });
    }
});

// Manejo de cambios en la URL (idioma o perfil)
window.addEventListener('popstate', async () => {
    const params = new URLSearchParams(window.location.search);
    const ci = params.get('ci');
    
    if (ci) {
        await mostrarPerfil(ci);
    } else {
        mostrarLista();
    }
    
    await traducirTodo();
});


// SPA: Manejo de navegación y eventos
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.vista === 'perfil') {
        document.querySelector('header').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
        mostrarPerfil(event.state.ci);
    } else {
        document.querySelector('header').style.display = '';
        document.querySelector('footer').style.display = '';
        mostrarLista();
    }
});







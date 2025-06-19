// Variable global para almacenar los estudiantes cargados
let estudiantesGlobal = [];

// Función para cargar los estudiantes y mostrarlos en la lista
async function cargarEstudiantes() {
    try {
        // Obtener los datos de estudiantes desde el JSON externo
        const response = await fetch('/datos/index.json');
        const estudiantes = await response.json();
        estudiantesGlobal = estudiantes; // Guardar globalmente para el filtro

        // Seleccionar el contenedor de la lista
        const section = document.querySelector('section');
        section.innerHTML = ''; // Limpiar el contenido previo
        const ul = document.createElement('ul');

        // Generar dinámicamente los elementos de la lista
        estudiantes.forEach(estudiante => {
            const li = document.createElement('li');
            if(estudiante.ci === "20117857") {
                li.innerHTML = `
                <img class="persona" src="/20117857/20117857.png" alt="${estudiante.nombre}" fetchpriority="high">
                <span>${estudiante.nombre}</span>
                `;
            }else if(estudiante.ci === "18009154") {
                li.innerHTML = `
                <img class="persona" src="/18009154/18009154.jpg" alt="${estudiante.nombre}" fetchpriority="high">
                <span>${estudiante.nombre}</span>
                `;
            }else{
                li.innerHTML = `
                <img class="persona" src="/${estudiante.imagen}" alt="${estudiante.nombre}" fetchpriority="high">
                <span>${estudiante.nombre}</span>
                `;
            }
            
            // Agregar un evento de clic para redirigir al perfil del estudiante
            li.onclick = () => {
                window.location.href = `perfil.html?ci=${estudiante.ci}`;
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
async function cargarPerfil() {
    try {
        // Obtener el parámetro 'ci' del URL
        const params = new URLSearchParams(window.location.search);
        const ci = params.get('ci');
        if (!ci) {
            throw new Error('No se proporcionó un CI en el URL');
        }
        // Obtener los datos del perfil desde el JSON externo
        const response = await fetch(`/${ci}/perfil.json`);
        const perfil = await response.json();

        // Agregar la imagen del perfil en el contenedor
        const contenedor = document.getElementById('contenedor');
        const imagenPerfil = document.createElement('img');
        imagenPerfil.className = 'img_persona';
        if(ci === "30697617") {
            const picture = document.createElement('picture');
            const imgGrande = document.createElement('source');
            imgGrande.media = '(min-width: 769px)';
            imgGrande.srcset = '/30697617/30697617Grande.jpg';
            imgGrande.type = 'image/jpeg';
            const imgPequena = document.createElement('source');
            imgPequena.media = '(max-width: 768px)';
            imgPequena.srcset = '/30697617/30697617Pequena.jpg';
            imgPequena.type = 'image/jpeg';
            const img = document.createElement('img');
            img.id = 'foto';
            img.src = '/30697617/30697617Grande.jpg';
            img.alt = 'Oscary Arocha';
            picture.appendChild(imgGrande);
            picture.appendChild(imgPequena);
            picture.appendChild(img);
            contenedor.insertBefore(picture, document.getElementById('perfil'));
        }else{
            imagenPerfil.src = `/${ci}/${ci}.jpg`;
            imagenPerfil.onerror = () => {
                imagenPerfil.src = `/${ci}/${ci}.png`;
            };
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
    } catch (error) {
        console.error('Error al cargar el perfil:', error);
        document.getElementById('perfil').innerHTML = '<p>Error al cargar el perfil.</p>';
    }
}

// Función para obtener el idioma del URL y cargar el JSON externo
async function obtenerIdioma() {
    const params = new URLSearchParams(window.location.search);
    let lang = params.get('lang');
    if (!lang || !['ES', 'EN', 'PT'].includes(lang)) {
        lang = 'ES'; // Idioma por defecto: Español
        params.set('lang', lang);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
    const langConfig = {
        ES: 'configES.json',
        EN: 'configEN.json',
        PT: 'configPT.json'
    };
    try {
        const response = await fetch(`/conf/${langConfig[lang]}`);
        return await response.json();
    } catch (error) {
        console.error('Error al cargar el archivo de idioma:', error);
        return {};
    }
}

// Función para aplicar las traducciones en index.html
async function traducirIndex() {
    const config = await obtenerIdioma();
    // Actualizar el título del sitio
    document.title = `${config.sitio?.[0] || ''} ${config.sitio?.[1] || ''} ${config.sitio?.[2] || ''}`;
    // Actualizar titulo del nav
    const sitio = document.getElementById('ati');
    if (sitio && config.sitio) sitio.innerHTML = `${config.sitio[0]} <span id="ucv">${config.sitio[1]}</span> ${config.sitio[2]}`;
    // Actualizar el saludo
    const saludo = document.getElementById('saludo');
    if (saludo && config.saludo) saludo.textContent = `${config.saludo}, Oscary Arocha`;
    // Actualizar el placeholder del input de búsqueda
    const inputBuscar = document.querySelector('input[type="text"]');
    if (inputBuscar && config.nombre) inputBuscar.placeholder = `${config.nombre}...`;
    // Actualizar el texto del botón de búsqueda
    const botonBuscar = document.querySelector('button[type="submit"]');
    if (botonBuscar && config.buscar) botonBuscar.textContent = config.buscar;
    // Actualizar el texto del footer
    const footer = document.querySelector('footer p');
    if (footer && config.copyRight) footer.textContent = config.copyRight;
}

// Función para aplicar las traducciones en perfil.html
async function traducirPerfil() {
    const config = await obtenerIdioma();
    // Actualizar los textos de los detalles del perfil
    const detalles = document.getElementById('detalles');
    if (detalles && config) {
        detalles.querySelectorAll('tr').forEach((fila, index) => {
            const keys = ["color", "libro", "musica", "video_juego", "lenguajes", "genero", "fecha_nacimiento"];
            if (keys[index] && config[keys[index]]) fila.querySelector('td:first-child').textContent = config[keys[index]];
        });
    }
    // Actualizar el texto del contacto
    const contacto = document.getElementById('contacto');
    if (contacto && config.email) {
        const email = contacto.querySelector('a')?.getAttribute('href')?.replace('mailto:', '');
        if (email) {
            contacto.innerHTML = config.email.replace('[email]', `<a href="mailto:${email}">${email}</a>`);
        }
    }
}

// Función para filtrar la lista de estudiantes
function filtrarEstudiantes() {
    const input = document.getElementById('buscar');
    const filter = input.value.toLowerCase();
    const section = document.querySelector('section');
    const ul = section.querySelector('ul');
    ul.innerHTML = ''; // Limpiar la lista antes de mostrar los resultados filtrados
    let found = false;

    estudiantesGlobal.forEach(estudiante => {
        if (estudiante.nombre.toLowerCase().includes(filter)) {
            const li = document.createElement('li');
            li.innerHTML = `
                <img class="persona" src="/${estudiante.imagen}" alt="${estudiante.nombre}">
                <span>${estudiante.nombre}</span>
            `;
            li.onclick = () => {
                window.location.href = `perfil.html?ci=${estudiante.ci}`;
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
    if (document.querySelector('section')) {
        await cargarEstudiantes();
        await traducirIndex();
        const inputBuscar = document.getElementById('buscar');
        if (inputBuscar) {
            inputBuscar.addEventListener('input', filtrarEstudiantes);
        }
    } else if (document.getElementById('perfil')) {
        await cargarPerfil();
        await traducirPerfil();
    }
});







// Datos del JSON incrustados en el código
const estudiantes = [
    {
        "ci": "30697617",
        "imagen": "30697617/30697617Grande.jpg",
        "nombre": "Oscary Arocha"
    },
    {
        "ci": "19371273",
        "imagen": "19371273/19371273.jpg",
        "nombre": "Raquel Escalante Salazar"
    },
    {
        "ci": "18829705",
        "imagen": "18829705/18829705.jpg",
        "nombre": "Leopoldo Enrique Izquierdo Carias"
    },
    {
        "ci": "18819509",
        "imagen": "18819509/18819509.jpg",
        "nombre": "Darwin R. Guaimacuto N."
    },
    {
        "ci": "14444733",
        "imagen": "14444733/14444733.jpg",
        "nombre": "María Paula Herrero"
    },
    {
        "ci": "18443368",
        "imagen": "18443368/18443368.jpg",
        "nombre": "Diego Branco"
    },
    {
        "ci": "19267152",
        "imagen": "19267152/19267152.jpg",
        "nombre": "Zulay Pineda"
    },
    {
        "ci": "18487832",
        "imagen": "18487832/18487832.jpg",
        "nombre": "Hector Palomino"
    },
    {
        "ci": "20117857",
        "imagen": "20117857/20117857.PNG",
        "nombre": "Angel Acosta"
    },
    {
        "ci": "19558625",
        "imagen": "19558625/19558625.jpg",
        "nombre": "Jhonny Morales"
    },
    {
        "ci": "19932730",
        "imagen": "19932730/19932730.jpg",
        "nombre": "Yesenia del Carmen Gil Casique"
    },
    {
        "ci": "18009154",
        "imagen": "18009154/18009154.JPG",
        "nombre": "Jimmy E. Espino B."
    },
    {
        "ci": "18110561",
        "imagen": "18110561/18110561.jpg",
        "nombre": "Karl Correa"
    },
    {
        "ci": "19334139",
        "imagen": "19334139/19334139.jpg",
        "nombre": "Adrian Montes de Oca"
    },
    {
        "ci": "13852255",
        "imagen": "13852255/13852255.png",
        "nombre": "Betty Torres"
    },
    {
        "ci": "19499302",
        "imagen": "19499302/19499302.jpg",
        "nombre": "Katherine Colina"
    },
    {
        "ci": "18002106",
        "imagen": "18002106/18002106.jpg",
        "nombre": "Abelardo José Moreno Carballeda"
    },
    {
        "ci": "19379860",
        "imagen": "19379860/19379860.jpg",
        "nombre": "Gabriel Restrepo"
    },
    {
        "ci": "18938455",
        "imagen": "18938455/18938455.jpg",
        "nombre": "Felix Garcia"
    },
    {
        "ci": "18836874",
        "imagen": "18836874/18836874.jpg",
        "nombre": "Jorge Gavidia"
    }
];

// Función para cargar los estudiantes y mostrarlos en la lista
function cargarEstudiantes() {
    try {

        // Seleccionar el contenedor de la lista
        const section = document.querySelector('section');
        section.innerHTML = ''; // Limpiar el contenido previo
        const ul = document.createElement('ul');

        // Generar dinámicamente los elementos de la lista
        estudiantes.forEach(estudiante => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img class="persona" src="${estudiante.imagen}" alt="${estudiante.nombre}" fetchpriority="high">
                <span>${estudiante.nombre}</span>
            `;

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
function cargarPerfil() {
    try {
        // Obtener el parámetro 'ci' del URL
        const params = new URLSearchParams(window.location.search);
        const ci = params.get('ci');
        if (!ci) {
            throw new Error('No se proporcionó un CI en el URL');
        }

        // Datos incrustados en el código
        const perfiles = {
            "30697617": {	
            "nombre":"Oscary Arocha",
            "descripcion":"Soy estudiante de la escuela de computación de la Universidad Central de Venezuela. Estoy en 6to semestre de la carrera, estoy interesada en el área de bases de datos y desarrollo web. En mi tiempo libre me gusta jugar videojuegos y escuchar música.",
            "color": "Rosa",
            "libro": ["Yo antes de ti"],
            "musica": ["Pop y kpop"],
            "video_juego": ["Genshin Impact y Honkai: Star Rail"],
            "lenguajes": ["C++", "C", "Python", "PHP", "JavaScript"],
            "email":"floressoscary@gmail.com",
            "ci": "30697617",
            "genero":"femenino",
            "fecha_nacimiento":"31/10/2002"
            },
            "20117857": {	
            "nombre":"Angel Acosta",
            "descripcion":"Soy estudiante de Licenciatura en Computación en la Universidad Central de Venezuela. Vivo en San Antonio de los Altos. Soy preparador de Matemáticas Discretas I.",
            "color": "Azul",
            "libro": ["El Nombre del Viento"],
            "musica": ["Jazz"],
            "video_juego": ["Super Smash Bros."],
            "lenguajes": ["Java", "C", "C++", "Python"],
            "email":"angelxob@hotmail.com",
            "ci": "20117857",
            "genero":"masculino",
            "fecha_nacimiento":"28/05/1991"
            },
            "19932730": {
            "nombre":"Yesenia del Carmen Gil Casique",
            "descripcion": "Soy estudiante de la Facultad de Ciencias,trabaje hasta hace poco, en el area de BPM y BI, y actualmente me dedico a trabajar freelacer en la desarrollo de pagina web y community manager",
            "color": "rosado",
            "libro" : ["Actualmente leo la biblia"],
            "musica" : ["balada"],
            "video_juego": ["no tengo"],
            "lenguajes":["c++","java","python"],
            "email":"yesenia@gmail.com",
            "ci": "9932730",
            "genero":"femenino", 
            "fecha_nacimiento":"13/09/1990"
            },
            "19558625": {
            "nombre":"Jhonny Morales",
            "descripcion":"Soy estudiante de Licenciatura en Computación en la UCV, mis áreas de interés en la carrera son Bases de Datos y Aplicaciones con la Tecnología Internet. Al mismo tiempo estoy estudiando Contabilidad y al culminar está estudiaré Diseño Gráfico.",
            "color": "Turquesa",
            "libro": ["La máquina del tiempo"],
            "musica": ["Electrónica"],
            "video_juego":["DOOM"],
            "lenguajes":["Java","C++","Python"],
            "email":"jhonw.109@gmail.com",
            "ci":"19558625",
            "genero":"masculino",
            "fecha_nacimiento":"29/09/1991"
            },
            "19499302": {
            "nombre": "Katherine Colina",
            "descripcion": "Soy estudiante del 7mo semestre de la Licenciatura en computación de la UCV. Me gusta el area de Bases de Datos y la Mineria de Datos por lo cual me interesa especializarme en ambas areas, aprendiendo cada dia algo nuevo y en este caso HTML. Apasionada por el senderismo,el excursionismo y las acampadas.",
            "color": "Naranja",
            "libro": ["Muerte en el Nilo"],
            "musica": ["Rock de los 80"],
            "video_juego": ["Need for Speed"],
            "lenguajes":["C/C++","SQL","Java"],
            "ci":"19499302",
            "genero":"femenino",
            "fecha_nacimiento":"28/11/1990",
            "email":"kathymcolina@gmail.com"
            },
            "19379860": {
            "nombre":"Gabriel Restrepo",
            "descripcion": "Soy bachiller técnico medio en electrónica. Actualmente me encuentro en el 8º semestre de la licenciatura en computación en la gloriosa UNIVERSIDAD CENTRAL DE VENEZUELA. Me gusta el desarrollo web y las redes. Quiero aprender cada día más.",
            "color": "Gris",
            "libro": ["Harry Potter"],
            "musica": ["Todo menos Vallenato"],
            "video_juego":["Fifa"],
            "lenguajes":["C", "C++", "Java", "MySql", "Oracle"],
            "email":"gabo1gara@gmail.com",
            "ci":"19379860",
            "genero":"Masculino",
            "fecha_nacimiento":"25/05/1989"
            },
            "19371273": {
            "nombre":"Raquel Escalante Salazar",
            "descripcion":"Soy estudiante de Licenciatura en Computación, interesada en las áreas de Desarrollo Web, Redes e Inteligencia Artificial. Siempre he tenido cierta pasión por el diseño gráfico y como hobby, me gusta practicarlo con manipulación de imágenes, lo cual me ha impulsado a ver el desarrollo en el área visual e interactiva como una profesión viable y que podría disfrutar muchísimo.",
            "color": "Magenta",
            "libro": ["El Conde de Montecristo"],
            "musica":["Rock", "Chillstep", "Soundtracks"],
            "video_juego":["Halo","Ace Attorney"],
            "lenguajes":["Python","JavaScript","C++","R"],
            "email":"escalante.raquelj@gmail.com",
            "ci":"19371273",
            "genero":"femenino",
            "fecha_nacimiento":"16/08/1990"
            },
            "13852255": {
            "nombre": "Betty Torres",
            "descripcion": "Ingeniero de Sistemas, experiencia en sistemas para recursos humanos, áreas contables, administrativas, industria de telecomunicaciones, de atención al cliente y electorales. Años de desempeño en planificación de proyectos, coordinación de equipos de desarrollo,  seguimiento con metodologías ágiles y puesta en producción de soluciones tecnológicas.",
            "color": "Naranja y Negro",
            "libro": ["Ilusiones de Richard Bach"],
            "musica": ["Romantica y Salsa"],
            "video_juego": ["Call of Duty","Minecraft"],
            "lenguajes": ["PL/SQL", "Java", "JavaScript"],
            "email": "bettytores@gmail.com",
            "ci": "13852255",
            "genero": "femenino",
            "fecha_nacimiento": "17/11/1979",
            "imagen": "13852255.png"
            },
            "19334139": {
            "nombre": "Adrian Montes de Oca",
            "descripcion": "Soy bachiller y actualmente estudiante de la escuela de Computación de la UCV. Además, trabajo desde hace unos meses como desarrollador web para una empresa con la cual he logrado adquirir experiencia en el área. Por otro lado, estoy haciendo un curso para dominar el idioma ingles el cual estaré culminando próximamente, y un curso para el desarrollo de aplicaciones en Android.",
            "color": "Verde Manzana",
            "libro": ["El Principito"],
            "musica": ["Varios"],
            "video_juego": ["Counter Strike", "FIFA"],
            "lenguajes": [ "C++","Java","Javascript", "PHP", "HTML","CSS","Bootstrap"],
            "email": "adrian.a.montesdeoca.m@gmail.com",
            "ci": "19334139",
            "genero": "Masculino",
            "fecha_nacimiento": "11/01/1989"
            },
            "19267152": {
            "nombre":"Zulay Pineda",
            "descripcion":"Soy estudiante de la Licenciatura en Computación de las menciones de Inteligencia Artificial y Bases de Datos, practico los idiomas ingles y frances y en mi tiempo libre me gusta leer.",
            "color": "morado",
            "libro": ["Ogullo y Prejuicio"],
            "musica": ["pop-rock"],
            "video_juego": ["The sims y simcity"],
            "lenguajes":["Java", "C++", "Javascript", "PHP"],
            "email":"zulay.pineda.19@gmail.com",
            "ci":"19267152",
            "genero":"femenino",
            "fecha_nacimiento":"16/01/1990"
            },
            "18938455": {	
            "nombre":"Felix Garcia",
            "descripcion":"Estudiante de la escuela de computación de la Universidad Central de Venezuela. Preparador del laboratorio de Comunicación de Datos. Gocho de San Cristoche, criado toda mi vida en Caracas, nunca falta un buen avilazo.",
            "color": "Azul",
            "libro": ["Canción de hielo y Fuego"],
            "musica": ["Rock y Pop (80's)"],
            "video_juego": ["Rocket League", "Dota2", "Counter Strike Global Offensive"],
            "lenguajes":  ["C","C++","Html","Phyton","Java","php"],
            "email":"FG.SOS.STORE@gmail.com",
            "ci":"18938455",
            "genero":"masculino",
            "fecha_nacimiento":"26/07/1989"
            },
            "18836874": {
            "nombre": "Jorge Gavidia",  
            "descripcion":"Soy estudiante de la licenciatura de Computación de la UCV. Me especializo en el área de Redes de comunicaciones, servidores y VoIp, trabajo en la empresa Gare Network Developed como analista de redes y sistemas. Combino mi tiempo libre con actividades de deportes extremo como la Escalada, Canyoning, adicionalmente practico el montañismo y excursionismo.",
            "color": "Azul", 
            "libro":["El Principito"], 
            "musica":["En realidad es variado, no me límito a uno solo"], 
            "video_juego":["Counter Strike"], 
            "lenguajes":["C", "C++", "Java", "Haskell", "Prolog"],
            "email":"jorgega99@hotmail.com",
            "ci":"18836874",    
            "genero":"masculino",
            "fecha_nacimiento":"24/04/1989"
            },
            "18819509": {
            "nombre": "Darwin R. Guaimacuto N.",
            "descripcion": "Soy estudiante de Licenciatura en Computación de la UCV, estoy interesado en el área de Big Data, Minería de Datos e Inteligencia de Negocios. Me gusta Jugar Videojuegos, Leer, Hacer Ejercicio, Estudiar, Aprender cosas nuevas, entre otras.",
            "color": "Negro",
            "libro": ["Me gustan varios"],
            "serie": ["Breaking Bad"],
            "musica": ["Rock"],
            "video_juego": ["Super Mario", "The Legend of Zelda", "The Last of Us", "Gears of War", "RE", "Silent Hill", "entre otros"],
            "lenguajes": ["C++", "HTML", "R", "Phyton", "Java", "PL/SQL"],
            "email": "dguaima@gmail.com",
            "ci": "18819509",
            "genero": "Masculino",
            "fecha_nacimiento": "31/03/1990"
            },
            "18487832": {	
            "nombre":"Hector Palomino",
            "descripcion":"Soy estudiante de la Licenciatura en Computación de la UCV. Interesado en la Ciencia de Datos y en el desarrollo web. Me gusta leer,estudiar,hacer deporte,escuchar musica, compartir con amigos, la playa, etc.",
            "color": "Azul",
            "libro": ["Cien Años de Soledad"],
            "musica": ["Cualquiera"],
            "video_juego": ["Super Mario", "FIFA", "PES", "Resident Evil"],
            "lenguajes":["Java", "C", "C++", "R","SQL"],
            "email":"hectorjosepalomino@gmail.com",
            "ci":"18487832",
            "genero": "masculino",
            "fecha_nacimiento":"28/04/1990"
            },
            "18443368": {
            "nombre": "Diego Branco",
            "descripcion": "Soy un estudiante de computación de la facultad de Ciencias de la Universidad Central de Venezuela, y me planeo graduar con la mención \"Ingeniería de Software\".",
            "color": "Verde",
            "libro": ["La Isla Misteriosa, Julio Verne"],
            "musica": ["Soundtracks", "Rock", "Metal"],
            "video_juego": ["Final Fantasy", "Pokémon", "Shin Megami Tensei", "etc)"],
            "lenguajes": ["C","C++","Python","Java"],
            "email": "diegoh89@gmail.com",
            "ci": "18443368",
            "genero": "masculino",
            "fecha_nacimiento": "14/06/1989"
            },
            "18110561": {	
            "nombre":"Karl Correa",
            "descripcion":"Soy estudiante de Computación en la UCV. Me interesa el área de innovación tecnológica en el ámbito web. Trabajo en el área de educación a distancia dando soporte a los usuarios del Campus Virtual UCV.",
            "color": "Verde",
            "libro": ["Guardianes de la noche"],
            "musica": ["Cualquiera a excepción del vallenato, cumbia y regueton"],
            "video_juego": ["Final fantasy's series", "TES: Skyrim", "League of Legends", "Archeage"],
            "lenguajes": ["java", "c/c++", "python"],
            "email":"karl.correa.88@gmail.com",
            "ci":"18110561",
            "genero": "masculino",
            "fecha_nacimiento":"23/04/1988"
            },
            "18009154": {	
            "nombre":"Jimmy E. Espino B.",
            "descripcion":"Soy estudiante de licenciatura de computación de la UCV. Trabajo en el departamento de servicio técnico de una compañía de ventas. Presto trabajo social en un centro juvenil en donde se trabaja con niñ@s de 8 a 17 años, el cual es llevado por la congregación salesiana.Tengo como hobbie el futbol, la animación y el trabajo con material de sonido.",
            "color": "Azul",
            "libro": ["Símbolo Perdido"],
            "musica": ["Electrónica"],
            "video_juego":["Assasin Creed"],
            "lenguajes": ["Java","C", "HTML"],
            "email":"jimmyespino415@gmail.com",
            "ci":"18009154",
            "genero":"Masculino",
            "fecha_nacimiento":"28/12/1990"
            },
            "18002106": {	
            "nombre":"Abelardo José Moreno Carballeda",
            "descripcion":"Soy estudiante de computación en el último semestre de la carrera. Me interesa el área de Inteligencia de Negocios y actualmente trabajo en el Fondo de Valores Inmobiliarios.",
            "color": "Verde",
            "libro": ["The Hitchhiker's Guide to the Galaxy."],
            "musica": ["Retro."],
            "video_juego": ["Punch-Out","Dark Souls"],
            "lenguajes": ["Java", "C", "C++", "Python", "SQL", "Haskell", "Prolog", "Ensamblador"],
            "email":"abelardo.moreno@gmail.com",
            "ci":"18002106",
            "genero":"masculino",
            "fecha_nacimiento":"19/12/1988"
            },

            "14444733": {	
            "nombre":"María Paula Herrero",
            "descripcion":"Soy licenciada en Computación de la UCV. Me desempeño en el área de ingeniería web y actualmente doy clases en la Escuela de Computación de la UCV. Además, desde el 2007 he venido desarrollando una segunda carrera como escritora e ilustradora. He participado en diversos talleres de escritura y actualmente estudio diseño gráfico en Prodiseño.",
            "color": "Azul",
            "libro": ["El Señor de los Anillos"],
            "musica": ["Cualquiera menos regueton"],
            "video_juego": ["Pokemón Go"],
            "lenguajes":["java", "php", "perl", "ruby", "python", "c++"],
            "email":"mpaulaherrero@gmail.com",
            "ci":"14444733",
            "genero": "femenino",
            "fecha_nacimiento":"18/08/1972",
            "imagen": "14444733.jpg"
            },

            "18829705": {	
            "nombre":"Leopoldo Enrique Izquierdo Carias",
            "descripcion":"Soy estudiante de computacion en la Universidad Central de Venezuela. Tengo inclinacion por la rama de computacion grafica, y espero adquirir los suficientes conocimientos de esa área para lograr emprender por mi cuenta desarrollando aplicaciones moviles que hagan uso del API grafico.",
            "color": "Verde",
            "libro": ["El caballero de la armadura oxidada"],
            "musica": ["Reggae"],
            "video_juego": ["Zelda: Ocarina Of Time"],
            "lenguajes":["Java", "C/C++", "Javascript", "Python"],
            "email":"leopoldo.izquierdo.xyz@gmail.com",
            "ci":"18829705",
            "genero":"masculino",
            "fecha_nacimiento":"12/09/1988"
            }
        };

        const perfil = perfiles[ci];
        if (!perfil) {
            throw new Error('No se encontró el perfil para el CI proporcionado');
        }

        // Agregar la imagen del perfil en el contenedor
        const contenedor = document.getElementById('contenedor');
        const imagenPerfil = document.createElement('img');
        imagenPerfil.className = 'img_persona';
        if(ci === "30697617") {
            const picture = document.createElement('picture');

            const imgGrande = document.createElement('source');
            imgGrande.media = '(min-width: 769px)';
            imgGrande.srcset = '30697617/30697617Grande.jpg';
            imgGrande.type = 'image/jpeg';

            const imgPequena = document.createElement('source');
            imgPequena.media = '(max-width: 768px)';
            imgPequena.srcset = '30697617/30697617Pequena.jpg';
            imgPequena.type = 'image/jpeg';

            const img = document.createElement('img');
            img.id = 'foto';
            img.src = '30697617/30697617Grande.jpg';
            img.alt = 'Oscary Arocha';

            picture.appendChild(imgGrande);
            picture.appendChild(imgPequena);
            picture.appendChild(img);

            contenedor.insertBefore(picture, document.getElementById('perfil'));
        }else{
            imagenPerfil.src = `${ci}/${ci}.jpg`;
            imagenPerfil.onerror = () => {
                imagenPerfil.src = `${ci}/${ci}.png`;
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
            { titulo: "Color favorito", valor: perfil.color },
            { titulo: "Libro favorito", valor: perfil.libro.join(", ") },
            { titulo: "Estilo de música preferida", valor: perfil.musica.join(", ") },
            { titulo: "Videojuegos favoritos", valor: perfil.video_juego.join(", ") },
            { titulo: "Lenguajes aprendidos", valor: perfil.lenguajes.join(", ") },
            { titulo: "Género", valor: perfil.genero },
            { titulo: "Fecha de nacimiento", valor: perfil.fecha_nacimiento }
            
        ];

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


// Datos de estudiantes
// JSON de idiomas
const idioma = {
    "configES": {
        "sitio": ["ATI", "[UCV]", "2025-1"],
        "home": "Inicio",
        "login": "Entrar",
        "copyRight": "Copyright © 2025 Escuela de computación - ATI. Todos los derechos reservados",
        "nombre": "Nombre",
        "descripcion": "",
        "color": "Mi color favorito es:",
        "libro": "Mi libro favorito es:",
        "musica": "Mi estilo de música preferida:",
        "video_juego": "Vídeo juegos favoritos:",
        "lenguajes": "Lenguajes aprendidos:",
        "genero": "Género:",
        "fecha_nacimiento": "Fecha de nacimiento:",
        "email": "Si necesitan comunicarse conmigo me pueden escribir a [email]",
        "buscar": "Buscar",
        "saludo": "Hola",
        "mensaje": "No se encontró ningún estudiante con el nombre: [nombre]"
    },
    "configEN": {
        "sitio": ["ITA", "[UCV]", "2025-1"],
        "home": "Home",
        "login": "Login",
        "copyRight": "Copyright © 2025 Computer school - ITA. All rights reserved",
        "nombre": "Name",
        "descripcion": "",
        "color": "My favorite color is:",
        "libro": "My favorite book is:",
        "musica": "My favorite music style:",
        "video_juego": "Favorite video games:",
        "lenguajes": "Languages learned:",
        "genero": "Gender:",
        "fecha_nacimiento": "Date of birth:",
        "email": "please send me a email to [email], if you need to contact me",
        "buscar": "Search",
        "saludo": "Hi",
        "mensaje": "No student found with the name: [nombre]"
    },
    "configPT": {
        "sitio": ["ATI", "[UCV]", "2025-1"],
        "home": "Início",
        "login": "Sessão",
        "copyRight": "Copyright © 2025 Escola de informática - ATI. Todos os direitos reservados",
        "nombre": "Nome",
        "descripcion": "",
        "color": "Minha cor favorita é:",
        "libro": "Meu livro favorito é:",
        "musica": "Meu estilo de música favorita:",
        "video_juego": "Jogos de vídeo favoritos:",
        "lenguajes": "Linguagems aprendidas:",
        "genero": "Gênero:",
        "fecha_nacimiento": "Data de nascimento:",
        "email": "Se precisar me contatar pode me escrever em [email]",
        "buscar": "Procurar",
        "saludo": "Olá",
        "mensaje": "Nenhum aluno encontrado com o nome: [nombre]"
    }
};

// Función para obtener el idioma del URL
function obtenerIdioma() {
    const params = new URLSearchParams(window.location.search);
    let lang = params.get('lang');
    if (!lang || !['ES', 'EN', 'PT'].includes(lang)) {
        lang = 'ES'; // Idioma por defecto: Español
        params.set('lang', lang);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }

    const langConfig = {
        ES: 'configES',
        EN: 'configEN',
        PT: 'configPT'
    };

    return idioma[langConfig[lang]];
}

// Función para aplicar las traducciones en index.html
function traducirIndex() {
    const config = obtenerIdioma();

    // Actualizar el título del sitio
    document.title = `${config.sitio[0]} ${config.sitio[1]} ${config.sitio[2]}`;

    // Actualizar titulo del nav
    const sitio = document.getElementById('ati');
    sitio.innerHTML = `${config.sitio[0]} <span id="ucv">${config.sitio[1]}</span> ${config.sitio[2]}`;

    // Actualizar el saludo
    const saludo = document.getElementById('saludo');
    if (saludo) saludo.textContent = `${config.saludo}, Oscary Arocha`;

    // Actualizar el placeholder del input de búsqueda
    const inputBuscar = document.querySelector('input[type="text"]');
    if (inputBuscar) inputBuscar.placeholder = `${config.nombre}...`;

    // Actualizar el texto del botón de búsqueda
    const botonBuscar = document.querySelector('button[type="submit"]');
    if (botonBuscar) botonBuscar.textContent = config.buscar;

    // Actualizar el texto del footer
    const footer = document.querySelector('footer p');
    if (footer) footer.textContent = config.copyRight;
}

// Función para aplicar las traducciones en perfil.html
function traducirPerfil() {
    const config = obtenerIdioma();

    // Actualizar los textos de los detalles del perfil
    const detalles = document.getElementById('detalles');
    if (detalles) {
        detalles.querySelectorAll('tr').forEach((fila, index) => {
            const keys = ["color", "libro", "musica", "video_juego", "lenguajes", "genero", "fecha_nacimiento"];
            if (keys[index]) fila.querySelector('td:first-child').textContent = config[keys[index]];
        });
    }

    // Actualizar el texto del contacto
    const contacto = document.getElementById('contacto');
    if (contacto) {
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
    const ul = document.querySelector('section ul');
    ul.innerHTML = ''; // Limpiar la lista antes de mostrar los resultados filtrados
    let found = false;

    estudiantes.forEach(estudiante => {
        if (estudiante.nombre.toLowerCase().includes(filter)) {
            const li = document.createElement('li');
            li.innerHTML = `
                <img class="persona" src="${estudiante.imagen}" alt="${estudiante.nombre}">
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
    const section = document.querySelector('section');
    if (!mensaje) {
        mensaje = document.createElement('p');
        mensaje.id = 'no-encontrado';
        section.appendChild(mensaje);
    }

    // Mostrar mensaje si no se encuentra ningún estudiante
    const config = obtenerIdioma(); // Obtener configuraciones del idioma actual
    if (found === false && filter) {
        mensaje.textContent = config.mensaje.replace('[nombre]', `"${filter}"`);
        mensaje.style.display = 'block';
        mensaje.style.fontFamily = 'Arial, Helvetica, sans-serif';
    } else {
        mensaje.style.display = 'none';
    }
}


// Llamar a las funciones de traducción al cargar la página y agregar evento al campo de búsqueda
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('section')) {
        cargarEstudiantes();
        traducirIndex();
        const inputBuscar = document.getElementById('buscar');
        if (inputBuscar) {
            inputBuscar.addEventListener('input', filtrarEstudiantes);
        }
    } else if (document.getElementById('perfil')) {
        cargarPerfil();
        traducirPerfil();
    }
});







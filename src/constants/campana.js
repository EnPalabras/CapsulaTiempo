// Textos y constantes de la landing. Lou manda los definitivos: cuando lleguen,
// se cambian acá y no hay que tocar componentes.

export const MAX_MENSAJE = 2000

// Solo para el copy. El cupo de verdad lo controla LIMITE_PAPEL en el backend
// (server_en_palabras, src/lib/carta-futuro/campana.ts). Si cambia uno,
// cambiar el otro o los textos van a mentir.
export const CUPO_PAPEL = 100

export const PROVINCIAS = [
  'Buenos Aires',
  'Ciudad Autónoma de Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
]

// Todo entra bajo la misma campaña, así los tres orígenes suman juntos en
// analytics y se pueden comparar entre sí.
export const CAMPANA = 'carta-futuro'

// Orígenes válidos para /c/[origen]. Cualquier otro da 404, así no se indexa
// basura ni se inventan URLs.
//
// La regla es que el origen se llame igual en los tres lugares: en la URL, en
// el utm_source y en la columna `origen` de la base. Sin tabla de traducción no
// hay nada que se pueda desincronizar.
//
//   /c/web         el link en la web, el perfil, la bio
//   /c/qr-diseno   el QR metido en una pieza diseñada (afiche, flyer, vidriera)
//   /c/qr-simple   el QR solo, sin pieza alrededor
//
// El utm_content queda libre a propósito: es el que distingue puntos de pegado
// (/c/qr-diseno?utm_content=palermo) y por eso no se usa para nada más.
// Atajos para los QR: la misma entrada con una URL más corta, que entra en un
// QR con menos módulos y por lo tanto más grandes y más fáciles de escanear
// chico. Se resuelven al origen de verdad antes de cualquier otra cosa, así que
// en las UTM y en la base queda `qr-simple`, nunca `qs`: usar el atajo no parte
// los datos en dos.
export const ALIAS = {
  qd: 'qr-diseno',
  qs: 'qr-simple',
}

export const ORIGENES = {
  web: {
    utm_source: 'web',
    utm_medium: 'web',
    utm_campaign: CAMPANA,
  },
  'qr-diseno': {
    utm_source: 'qr-diseno',
    utm_medium: 'qr',
    utm_campaign: CAMPANA,
  },
  'qr-simple': {
    utm_source: 'qr-simple',
    utm_medium: 'qr',
    utm_campaign: CAMPANA,
  },
}

// Portada. El titular va en IvyBodoni y el resto en Gotham; los tamaños viven
// en el componente, acá solo el texto.
export const PORTADA = {
  intro:
    'Los días pasan tan rápido que es muy fácil perder de vista nuestros ' +
    'deseos personales, aprendizajes y el camino recorrido.',
  titulo: '¿Qué te gustaría decirle a tu “yo del futuro”?',
  invitacion:
    'Te invitamos a escribirte una carta contándote eso que creés que a tu ' +
    '“yo del futuro” le gustaría recordar.',
  cta: 'Escribir carta',
  // Dos renglones a propósito: se renderizan como dos líneas, no como un
  // párrafo que corta donde le toque.
  aviso: [
    `Solo las primeras ${CUPO_PAPEL} cartas se envían impresas por correo.`,
    'El resto también llega, pero por mail. Todas, en Enero de 2027.',
  ],
}

// Un e-mail con forma de e-mail. Mismo criterio que el backend: alcanza con
// que tenga arroba y un punto después.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Los pasos de datos, en orden. Todos se ven igual —pregunta, input, botón—
// así que cambian solo estos textos. La clave es además la del valor guardado.
export const CAMPOS = {
  nombre: {
    clave: 'nombre',
    tipo: 'text',
    autoComplete: 'given-name',
    pregunta: '¿Cómo te llamás?',
    placeholder: 'Ingresá tu nombre o apodo',
    cta: 'Siguiente',
    valido: (v) => v.trim().length > 0,
    error: 'Contanos cómo te llamás',
  },
  email: {
    clave: 'email',
    tipo: 'email',
    autoComplete: 'email',
    pregunta: 'Tu e-mail',
    placeholder: 'Ingresá tu e-mail',
    cta: 'Comenzá a escribir',
    // Sin esto, un "asdasd" pasa de largo y el error recién aparece al final,
    // en una pantalla donde ya no se puede corregir.
    valido: (v) => EMAIL.test(v.trim()),
    error: 'Revisá el e-mail, parece incompleto',
  },
}

// Lo que se escribe sobre el sobre y al costado de la carta.
export const ETIQUETAS = {
  para: 'Para:',
  nombre: 'Nombre:',
  email: 'Email:',
}

// Último paso: la carta.
export const PASO_CARTA = {
  titulo: 'Escribí tu carta',
  cta: 'Enviar',
}

// Y el cierre: cómo la quiere recibir.
export const PASO_ENTREGA = {
  titulo: '¿Cómo querés recibir tu carta?',
  cta: 'Enviar mi carta al futuro',
  enviando: 'Enviando…',
}

export const OPCIONES_FORMATO = [
  {
    valor: 'PAPEL',
    label: `Quiero ser una de las ${CUPO_PAPEL} personas que la reciben impresa, por correo, en su casa.`,
  },
  {
    valor: 'ONLINE',
    label: 'Prefiero recibirla por mail, sin compartir mi dirección.',
  },
]

// Cuando el cupo de papel ya se completó, la opción de la carta impresa no se
// ofrece: en su lugar va esto.
export const CUPO_COMPLETO =
  `Las ${CUPO_PAPEL} cartas impresas ya están reservadas, así que esta vez la ` +
  'tuya viaja por mail. Llega en enero igual.'

// Lo que ve en el lugar del bloque de dirección quien eligió recibirla por mail.
export const CONFIRMACION_ONLINE =
  'Perfecto. Tu carta te va a llegar a tu email en los primeros días de enero.'

export const MICROTEXTO_DIRECCION =
  `Pedimos tu dirección porque elegiste ser una de las ${CUPO_PAPEL} personas ` +
  'que reciben la carta impresa. Si el cupo se completa antes de que termines ' +
  'de enviarla, no te quedás sin carta: te llega igual, pero por mail.'

// Poner en false el 05/09 para mostrar la pantalla de cerrado.
// El backend tiene su propia constante: esta decide qué se ve, la del server
// decide qué se acepta.
export const RECIBIENDO_CARTAS = true

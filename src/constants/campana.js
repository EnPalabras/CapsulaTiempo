// Textos y constantes de la landing. Lou manda los definitivos: cuando lleguen,
// se cambian acá y no hay que tocar componentes.

export const MAX_MENSAJE = 2000

// Solo para el copy. El cupo de verdad lo controla LIMITE_PAPEL en el backend
// (server_en_palabras, src/app/api/carta-futuro/route.ts). Si cambia uno,
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

// Orígenes válidos para /c/[origen]. Cualquier otro da 404, así no se indexa
// basura ni se inventan URLs.
export const ORIGENES = {
  qr: { utm_source: 'cartel', utm_medium: 'qr' },
  dm: { utm_source: 'instagram', utm_medium: 'dm' },
}

// PLACEHOLDER — reemplazar por los prompts de los journals que manda Lou.
export const PROMPTS = [
  '¿Qué es lo que más te sorprendería de vos misma en un año?',
  '¿Qué te querés acordar de este momento exacto de tu vida?',
  '¿Qué le agradecerías a la persona que sos hoy?',
  '¿Qué miedo te gustaría haber dejado atrás?',
  '¿Qué estás aprendiendo que no querés olvidar?',
]

export const AVISO_ENTREGA =
  `Solo las primeras ${CUPO_PAPEL} cartas se envían impresas por correo. ` +
  'El resto también llega, pero por mail. Todas, en los primeros días de enero.'

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

export const MICROTEXTO_DIRECCION =
  `Pedimos tu dirección porque elegiste ser una de las ${CUPO_PAPEL} personas ` +
  'que reciben la carta impresa. Si el cupo se completa antes de que termines ' +
  'de enviarla, no te quedás sin carta: te llega igual, pero por mail.'

// Poner en false el 05/09 para mostrar la pantalla de cerrado.
// El backend tiene su propia constante: esta decide qué se ve, la del server
// decide qué se acepta.
export const RECIBIENDO_CARTAS = true

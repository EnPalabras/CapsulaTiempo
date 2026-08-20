// Textos y constantes de la landing. Lou manda los definitivos: cuando lleguen,
// se cambian acá y no hay que tocar componentes.

export const MAX_MENSAJE = 2000

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
  'Tu carta te llega en los primeros días de enero. No se puede elegir la fecha.'

export const MICROTEXTO_DIRECCION =
  'Te pedimos la dirección porque las primeras cartas viajan en papel, por correo. Si entrás en ese grupo, te llega impresa a tu casa. Si no, te llega por mail. Te lo confirmamos al terminar.'

// Poner en false el 05/09 para mostrar la pantalla de cerrado.
// El backend tiene su propia constante: esta decide qué se ve, la del server
// decide qué se acepta.
export const RECIBIENDO_CARTAS = true

export const MAX_MENSAJE = 2000

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

export const CAMPANA = 'carta-futuro'

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

export const PORTADA = {
  titulo: '¿Qué te gustaría decirle a tu “yo del futuro”?',
  invitacion:
    'Escribile hoy una carta a la persona que vas a ser en enero de 2027.',
  cta: 'Escribir carta',

  aviso: [
    `Solo las primeras ${CUPO_PAPEL} cartas se envían impresas por correo.`,
    'El resto también llega, pero por e-mail. Todas, en enero de 2027.',
  ],
}

export const DATOS = {
  nombre: {
    clave: 'nombre',
    tipo: 'text',
    autoComplete: 'name',
    label: '¿Cómo te llamás?',
    placeholder: 'Ingresá tu nombre o apodo',
  },
  email: {
    clave: 'email',
    tipo: 'email',
    autoComplete: 'email',
    label: 'Tu e-mail',
    placeholder: 'Ingresá tu e-mail',
  },
}

export const PASO_CARTA = {
  titulo: 'Escribí tu carta',
  subtitulo: 'Vas a recibirla en enero de 2027',
  cta: 'Enviar carta',
  aviso:
    `Solo las primeras ${CUPO_PAPEL} cartas se envían impresas por correo. ` +
    'El resto también llega, pero por e-mail, todas en enero de 2027.',
  porqueTitulo: '¿Por qué hacemos esto?',
  porque:
    'Poner algo en palabras no es solo contarlo: muchas veces es el primer ' +
    'paso para que empiece a pasar de verdad. La historia que le escribís hoy ' +
    'a tu yo de enero es, un poco, la que vas a terminar viviendo.',
}

export const PASO_LISTO = {
  titulo: '¡En camino!',
  texto:
    '¡Todo listo! Vas a recibir tu carta en enero de 2027. Te enviamos un ' +
    'e-mail con todos los detalles.',
  cierre: '¡Gracias por sumarte!',
  // La invitación a la marca, en el bloque violeta del final.
  marca: {
    texto: 'Mientras esperás tu carta, conocé más de En Palabras.',
    cta: 'Ir a En Palabras',
    href: 'https://enpalabras.com.ar',
  },
}

export const PASO_ENTREGA = {
  titulo: '¿Cómo querés recibir tu carta?',
  cta: 'Enviar mi carta al futuro',
  enviando: 'Enviando…',
}

export const OPCIONES_FORMATO = [
  {
    valor: 'PAPEL',
    label: `En papel, a mi casa por correo`,
  },
  {
    valor: 'ONLINE',
    label: 'Prefiero recibirla por e-mail',
  },
]

// El cartel violeta que corona la opción en papel mientras queda cupo.
export const DESTACADO_PAPEL =
  `Sos de las ${CUPO_PAPEL} personas que pueden recibirla en papel`

export const CUPO_COMPLETO =
  `Las ${CUPO_PAPEL} cartas impresas ya están reservadas, así que esta vez la ` +
  'tuya viaja por e-mail. Llega en enero igual.'

export const CONFIRMACION_ONLINE =
  'Perfecto. Tu carta te va a llegar a tu e-mail en los primeros días de enero.'

export const MICROTEXTO_DIRECCION =
  `Pedimos tu dirección porque elegiste ser una de las ${CUPO_PAPEL} personas ` +
  'que reciben la carta impresa. Si el cupo se completa antes de que termines ' +
  'de enviarla, no te quedás sin carta: te llega igual, pero por e-mail.'

export const CONSENTIMIENTO =
  'Acepto que En Palabras guarde el contenido de mi carta, mi e-mail y, si ' +
  'elegí recibirla impresa, mi nombre y dirección, solo para poder ' +
  'devolvérmela en los primeros días de enero de 2027, y que me escriban para ' +
  'coordinar la entrega. Puedo pedir que borren mis datos cuando quiera. '

export const CONSENTIMIENTO_LINK = 'Ver política de privacidad'

export const RECIBIENDO_CARTAS = true

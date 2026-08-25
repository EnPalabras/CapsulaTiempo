# Carta a tu yo del futuro

Landing de la acción de En Palabras: escribís una carta, elegís si la querés
recibir impresa o por mail, y te llega en enero de 2027.

Es un Next.js (pages router) que no tiene backend propio: el envío va contra
`server_en_palabras` (`POST /api/carta-futuro`). El cupo de cartas impresas y la
validación que manda son del server; lo de acá es espejo, para no hacer viajar
un form que ya sabemos que va a rebotar.

## Correr

    npm install
    npm run dev

`NEXT_PUBLIC_API_URL` solo hace falta para apuntar a otro backend (un localhost,
una preview); por defecto usa el de producción. `NEXT_PUBLIC_GOOGLE_PLACES_KEY`
es la del autocompletado de direcciones.

## Las URLs

Hay tres entradas, y cada origen se llama igual en la URL, en el `utm_source` y
en la columna `origen` de la base:

| URL | Dónde vive | En la base queda |
| --- | --- | --- |
| `/c/web` | el link en la web, el perfil, la bio | `web` |
| `/c/qr-diseno` | el QR dentro de una pieza diseñada | `qr-diseno` |
| `/c/qr-simple` | el QR solo, sin pieza alrededor | `qr-simple` |

Los dos QR tienen además un atajo, `/c/qd` y `/c/qs`, para que la URL entre en
un QR más chico. Se resuelven al mismo origen: usar el atajo no cambia lo que se
guarda.

Cualquier otro `/c/algo` da 404, así nadie inventa orígenes que después ensucian
el tracking. La raíz `/` también sirve la landing, con origen `directo`: es para
los links viejos y para lo que no sabemos de dónde viene.

Para separar puntos de pegado del mismo cartel va `utm_content` en la
querystring, que pisa el default: `/c/qr-diseno?utm_content=palermo`. Los cuatro
utm_* se pueden pisar así.

## Cómo está armado

`Flujo.jsx` es el que manda: guarda en qué paso estás y funde entre pantallas.

    portada → nombre → email → (el sobre se centra y se abre) → carta
            → (el sobre se cierra) → entrega → confirmación

Los textos viven todos en `src/constants/campana.js`, no en los componentes.
`RECIBIENDO_CARTAS` es el interruptor para cerrar la convocatoria (el server
tiene el suyo: este decide qué se ve, el del server qué se acepta).

Los renders del sobre comparten un lienzo de 1232x1700 para poder encadenar
imagen y video sin saltos. Eso deja aire muerto arriba, que la clase `.sobre`
de `globals.css` descuenta del layout.

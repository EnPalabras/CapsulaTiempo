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

## Detalles que muerden

El código no lleva comentarios, así que lo que no se deduce leyéndolo queda acá.

- **Los renders del sobre comparten un lienzo de 1232x1700** para poder
  encadenar imagen y video sin saltos, y eso deja aire muerto arriba y abajo. La
  clase `.sobre` lo descuenta del layout con un margen negativo en porcentaje,
  porque un margen vertical en `%` se resuelve contra el **ancho** y así el
  ajuste escala solo. El valor va en `--aire`: 384 es la diferencia entre el
  aire de arriba y el de abajo, medida sobre todos los frames de las dos
  animaciones (473 y 93 en la de apertura, 487 y 98 en la de cierre), así el
  sobre queda centrado en su caja. Si llegan renders con otro encuadre, hay que
  volver a medirlo.
- **El fondo de la portada tiene dos versiones**, horizontal y vertical, y se
  elige por `matchMedia` en el cliente para bajar una sola. El poster va además
  como `background-image` con media query, así hay fondo desde el primer pintado
  sin esperar al video ni bajar los dos.
- **`.una-pantalla` declara el alto dos veces**, `100vh` y después `100dvh`. En
  un celular `100vh` se mide como si la barra del navegador no existiera, así
  que sin el `dvh` la última línea de la portada queda tapada; el `vh` es el
  respaldo para los navegadores que todavía no lo entienden. No borrar ninguna
  de las dos.
- **En la portada, la imagen es lo único elástico** (`flex-1` + `min-h-0`): la
  sección tiene `overflow-hidden` por los bordes redondeados, así que lo que no
  entra no scrollea, se recorta. Que la imagen ceda primero es lo que evita que
  se coma el título o la letra chica en pantallas bajas.
- **Los videos arrancan con `el.muted = true` a mano.** React no escribe el
  atributo `muted` en el HTML del server, así que al hidratar el video queda con
  sonido y la política de autoplay rechaza el `play()`.
- **Cada video tiene un temporizador de respaldo en `Flujo`.** Si el `play()`
  falla, nadie dispara el `onEnded` y el flujo se queda clavado para siempre.
- **El botón de la portada es `relative z-10`.** Monta sobre la imagen, y sin
  posicionar, una imagen en flujo se dibuja en una etapa posterior al fondo de
  sus hermanos y lo taparía.
- **El input pide `focus:ring-0`.** El plugin de Flowbite le mete un ring azul
  de 1px a todos los campos en foco, que a ojo es indistinguible de un borde.
- **Si el endpoint de cupo no contesta, se ofrecen las dos opciones de entrega.**
  Es mejor pedir una dirección de más que esconder el papel habiendo cupo.

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

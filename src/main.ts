import './style.css'
import { shootingStars } from './stars'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="stars" sylye="#000";></canvas>
`

shootingStars(document.querySelector<HTMLCanvasElement>('#stars')!)

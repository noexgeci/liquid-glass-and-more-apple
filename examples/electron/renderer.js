// Fills the song list and wires the play button. Liquid Glass itself is
// started by dist/liquid-glass.js.
const songs = [
  ['Northern Lights', 'Aurora', '3:58'],
  ['Glass Horizon', 'Liquid Sessions', '4:12'],
  ['Refraction', 'Prism', '3:21'],
  ['Night Drive', 'Neon Coast', '5:02'],
  ['Balaton Blue', 'Summer Tapes', '3:45'],
  ['Specular', 'Highlight', '2:58'],
  ['Soft Focus', 'Bokeh', '4:40'],
  ['Clear Sky', 'Weatherman', '3:09'],
  ['Morning Frost', 'Aurora', '4:27'],
  ['Parallax', 'Depth Field', '3:33'],
];
const list = document.getElementById('songs');
list.innerHTML = songs
  .map(([title, artist, time], i) => {
    const hue = (i * 47) % 360;
    return `<li><a class="lg-row" href="#">
      <i class="song-cover" style="background: linear-gradient(135deg, hsl(${hue} 80% 65%), hsl(${(hue + 60) % 360} 70% 40%))"></i>
      <span class="lg-row-content"><span class="lg-row-title">${title}</span><span class="lg-row-subtitle">${artist}</span></span>
      <span class="lg-row-detail">${time}</span></a></li>`;
  })
  .join('');

const play = document.getElementById('play');
let playing = true;
play.addEventListener('click', () => {
  playing = !playing;
  play.firstElementChild.setAttribute('data-lg-icon', playing ? 'pause.fill' : 'play.fill');
  play.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  window.LiquidGlass.init(play);
});

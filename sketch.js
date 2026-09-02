let tema = "";
let estadoInput = "ESPERANDO_TEMA"; 
let opinionPublica = 50;
let polarizacion = 10;
let actividadBots = 5;
let porcentajeBotsRed = 5.0;

let etiquetaTiempoActual = "Inicio (Hora 0)";
let tituloExplicacion = "ESTADO INICIAL";
let mensajeExplicativo = "Inicia seleccionando una estrategia digital.";
let feedMensajes = ["Sistema: Red limpia y operando normalmente."];
let historialTiempos = ["Hora 0"];
let histOpinion = [50];
let histPolarizacion = [10];
let histBots = [5];

let granjaCelulares = [];
const filasCelulares = 5;
const colsCelulares = 10;

// Triplicación de mensajes con emoticonos de aprobación / celebración
let bancoFavor = [
  "¡Apoyo total e indiscutible a la iniciativa! 🎉👏",
  "Es la decisión más lógica y brillante para el progreso. 🙌✨",
  "Todos vemos los beneficios evidentes de esto. ¡Excelente! 👍🔥",
  "¡Nadie en su sano juicio rechazaría algo tan beneficioso! 💯🎯",
  "¡Vamos con todo hacia adelante! Éxito rotundo garantizado. ⭐🚀",
  "¡Una medida ejemplar que marcará un antes y un después! 🏆💙",
  "¡Apoyando sin reservas! El sentido común finalmente triunfa. 🥇👏",
  "¡Gracias por impulsar esto! Es exactamente lo que necesitábamos. 🌟🙌",
  "¡La mejor propuesta del año sin lugar a dudas! 🚀🎉"
];

// Triplicación de mensajes con emoticonos de odio / indignación / rechazo
let bancoContra = [
  "¡Incompetencia total! Esto es completamente inaceptable y nefasto. 😡👎",
  "Están destruyendo todo con esta pésima y absurda medida. 🤬🔥",
  "¡Basta ya de imposiciones ridículas que nos perjudican gravemente! 🛑💢",
  "¡Es una vergüenza absoluta que sigan defendiendo este atropello! 📉😠",
  "¡Indignante! Nadie apoya semejante disparate perjudicial. ⛔🤦‍♂️",
  "¡Están jugando con fuego y el pueblo no lo va a tolerar! 🤬⚠️",
  "¡Una falta de respeto total a la inteligencia ciudadana! 😡👎",
  "¡Repudiamos totalmente esta pésima decisión improvisada! ❌🚨",
  "¡Esto va a terminar en desastre por culpa de caprichos absurdos! 😠🔥"
];

// Triplicación de mensajes con emoticonos de burla / sarcasmo / alarma
let bancoFake = [
  "¡URGENTE! Documentos secretos revelan colapso inminente. ¡Ríanse de su ingenuidad! 🤡📉",
  "¡ALERTA MÁXIMA! Fuentes internas confirman daños ocultos. ¡¿En serio creyeron esto?! 🤫💥",
  "¡PRIMICIA! Circular oculta prueba el fracaso total. ¡Qué desastre, pobrecitos! 🤭⚠️",
  "¡ATENCIÓN! Se filtró que cancelarán todo mañana. ¡Disfruten el caos, payasos! 🤡🔥",
  "¡EXCLUSIVO! Todo era una trampa y nadie se dio cuenta. ¡Qué ilusos son! 😂📉",
  "¡ALARMA! Descubrieron que el plan oculto es un fraude total. ¡Despierten ya! 🤡🚨",
  "¡INCREÍBLE! El documento prohibido que la élite no quiere que veas. ¡Pura comedia! 🤫💥",
  "¡URGENTE Y COMPROBADO! Todo se desploma en 3, 2, 1... ¡Qué risa me dan! 🤡📉",
  "¡ATENCIÓN ILUSOS! Las pruebas definitivas del gran engaño acaban de salir. 😂⚠️"
];

// Mensajes de opinión real constructiva
let bancoReal = [
  "Analicemos los datos con calma y diálogo constructivo. 🤝📊",
  "Hay dudas legítimas que debemos discutir sin insultos. 💬⚖️",
  "La ciudadanía merece información clara y espacios de debate reales. 📚th"
];

function setup() {
  let c = createCanvas(1280, 800);
  c.id('lienzoSimulador');
  c.style('display', 'none');
  
  inicializarGranja();
}

function inicializarGranja() {
  granjaCelulares = [];
  let inicioX = 25;
  let inicioY = 180;
  let anchoCel = 22;
  let altoCel = 28;
  let espaciadoX = 6;
  let espaciadoY = 5;
  
  let id = 0;
  for (let f = 0; f < filasCelulares; f++) {
    for (let c = 0; c < colsCelulares; c++) {
      let x = inicioX + c * (anchoCel + espaciadoX);
      let y = inicioY + f * (altoCel + espaciadoY);
      granjaCelulares.push({
        id: id, x: x, y: y, w: anchoCel, h: altoCel,
        activo: false, r: 30, g: 41, b: 59
      });
      id++;
    }
  }
}

function lanzarSimuladorDesdeHtml() {
  let inputElement = document.getElementById('inputTemaHtml');
  if (!inputElement) return;
  
  let valorIngresado = inputElement.value;
  if (valorIngresado.trim() !== "") {
    tema = valorIngresado;
    estadoInput = "MENU";
    
    document.getElementById('panelBienvenida').style.display = 'none';
    let lienzo = document.getElementById('lienzoSimulador');
    if (lienzo) lienzo.style.display = 'block';
    
    let panelBotones = document.getElementById('panelBotonesTactiles');
    if (panelBotones) panelBotones.style.display = 'flex';
    
    etiquetaTiempoActual = "Hora 0 (Línea Base)";
    tituloExplicacion = "LÍNEA BASE";
    mensajeExplicativo = "Red operando con pluralidad normal y baja automatización.";
    porcentajeBotsRed = 5.0;
    feedMensajes = ["Sistema: Red limpia y operando normalmente."];
    historialTiempos = ["Hora 0"];
    histOpinion = [opinionPublica];
    histPolarizacion = [polarizacion];
    histBots = [actividadBots];
    
    actualizarEstadoGranja(5, '1');
  } else {
    alert("Por favor, ingresa un tema o polémica para simular.");
  }
}

function draw() {
  if (estadoInput === "MENU") {
    background(15, 23, 42);
    dibujarInterfazRedSocial();
    actualizarYDibujarGranjaCelulares();
    dibujarPanelExplicativoLateralReducido();
    dibujarFeedMensajesMejorado();
    dibujarGraficoXYTemporal();
  }
}

function keyPressed() {
  if (estadoInput === "MENU") {
    if (key === '1' || key === '2' || key === '3' || key === '4' || key === '5' || key === '6' || key === 'r' || key === 'R') {
      ejecutarAccionBot(key.toUpperCase());
    }
  }
}

function ejecutarAccionBot(tipo) {
  if (tipo === '1') {
    opinionPublica = constrain(opinionPublica + 25, 0, 100);
    actividadBots = constrain(actividadBots + 35, 0, 100);
    polarizacion = constrain(polarizacion + 10, 0, 100);
    porcentajeBotsRed = constrain(porcentajeBotsRed + 40, 0, 95);
    let msg = random(bancoFavor);
    feedMensajes.unshift("[BOT FAVOR]: " + msg);
    if (feedMensajes.length > 4) feedMensajes.pop();
    
    registrarPasoTemporal("Tras 6H", "ASTROTURFING", "Cuentas falsas inundan con apoyo artificial masivo y aprobación exagerada.", '1');
  } 
  else if (tipo === '2') {
    opinionPublica = constrain(opinionPublica - 30, 0, 100);
    actividadBots = constrain(actividadBots + 40, 0, 100);
    polarizacion = constrain(polarizacion + 25, 0, 100);
    porcentajeBotsRed = constrain(porcentajeBotsRed + 45, 0, 95);
    let msg = random(bancoContra);
    feedMensajes.unshift("[BOT CONTRA]: " + msg);
    if (feedMensajes.length > 4) feedMensajes.pop();
    
    registrarPasoTemporal("Tras 2D", "DESACREDITACIÓN", "Ataque coordinado con expresiones de odio e indignación extrema.", '2');
  } 
  else if (tipo === '3') {
    polarizacion = constrain(polarizacion + 35, 0, 100);
    actividadBots = constrain(actividadBots + 20, 0, 100);
    porcentajeBotsRed = constrain(porcentajeBotsRed + 30, 0, 95);
    let msg = random(bancoFake);
    feedMensajes.unshift("[FAKE NEWS]: " + msg);
    if (feedMensajes.length > 4) feedMensajes.pop();
    
    registrarPasoTemporal("Tras 1S", "BULOS VIRALES", "Contenido falso acompañado de burlas y sarcasmo alarmista.", '3');
  } 
  else if (tipo === '4') {
    actividadBots = 5;
    porcentajeBotsRed = 2.0;
    opinionPublica = constrain(opinionPublica + 10, 0, 100);
    polarizacion = constrain(polarizacion - 25, 0, 100);
    feedMensajes.unshift("[SISTEMA]: ¡Granja de bots APAGADA! Cesa la agresión artificial.");
    if (feedMensajes.length > 4) feedMensajes.pop();
    
    registrarPasoTemporal("Apagado", "GRANJA APAGADA", "La percepción real se estabiliza de forma orgánica.", '4');
  }
  else if (tipo === '5') {
    actividadBots = 70;
    porcentajeBotsRed = 75.0;
    polarizacion = constrain(polarizacion + 30, 0, 100);
    let msg = random(bancoFavor);
    feedMensajes.unshift("[BOT REACTIVADO]: " + msg);
    if (feedMensajes.length > 4) feedMensajes.pop();
    
    registrarPasoTemporal("Reactivación", "GRANJA REACTIVADA", "La red vuelve a ser inundada con tráfico artificial intensivo.", '1');
  }
  else if (tipo === '6') {
    opinionPublica = constrain(opinionPublica + 15, 0, 100);
    polarizacion = constrain(polarizacion - 10, 0, 100);
    let msg = random(bancoReal);
    feedMensajes.unshift("[REAL]: " + msg);
    if (feedMensajes.length > 4) feedMensajes.pop();
    
    registrarPasoTemporal("Debate Real", "OPINIONES REALES", "Aportes genuinos que reducen la polarización.", '6');
  }
  else if (tipo === 'R') {
    document.getElementById('panelBotonesTactiles').style.display = 'none';
    document.getElementById('panelBienvenida').style.display = 'block';
    let lienzo = document.getElementById('lienzoSimulador');
    if (lienzo) lienzo.style.display = 'none';
    document.getElementById('inputTemaHtml').value = '';
    estadoInput = "ESPERANDO_TEMA";
    opinionPublica = 50;
    polarizacion = 10;
    actividadBots = 5;
    porcentajeBotsRed = 5.0;
    feedMensajes = ["Sistema: Red limpia y operando normalmente."];
  }
}

function registrarPasoTemporal(etiqueta, titulo, explicacion, tipoAccion) {
  etiquetaTiempoActual = etiqueta;
  tituloExplicacion = titulo;
  mensajeExplicativo = explicacion;
  historialTiempos.push(etiqueta);
  
  if (actividadBots > 10 && tipoAccion !== '4') {
    actividadBots = constrain(actividadBots - 3, 5, 100);
  }
  
  histOpinion.push(opinionPublica);
  histPolarizacion.push(polarizacion);
  histBots.push(actividadBots);
  
  actualizarEstadoGranja(actividadBots, tipoAccion);
}

function actualizarEstadoGranja(porcentajeBots, tipoAccion) {
  let cantidadActivos = floor(map(porcentajeBots, 0, 100, 2, granjaCelulares.length));
  
  for (let i = 0; i < granjaCelulares.length; i++) {
    if (i < cantidadActivos) {
      granjaCelulares[i].activo = true;
      asignarColorAleatorioBot(granjaCelulares[i], tipoAccion);
    } else {
      granjaCelulares[i].activo = false;
      granjaCelulares[i].r = 30;
      granjaCelulares[i].g = 41;
      granjaCelulares[i].b = 59;
    }
  }
}

function asignarColorAleatorioBot(cel, tipoAccion) {
  if (tipoAccion === '1' || tipoAccion === '5') {
    cel.r = random(30, 80); cel.g = random(120, 200); cel.b = random(220, 255);
  } else if (tipoAccion === '2') {
    cel.r = random(200, 255); cel.g = random(40, 100); cel.b = random(40, 80);
  } else if (tipoAccion === '3') {
    cel.r = random(180, 255); cel.g = random(160, 220); cel.b = random(50, 150);
  } else if (tipoAccion === '4') {
    cel.r = random(16, 185); cel.g = random(129, 200); cel.b = random(129, 200);
  } else if (tipoAccion === '6') {
    cel.r = random(29, 78); cel.g = random(78, 150); cel.b = random(216, 255);
  } else {
    cel.r = random(50, 200); cel.g = random(100, 220); cel.b = random(150, 255);
  }
}

function dibujarInterfazRedSocial() {
  fill(30, 41, 59);
  noStroke();
  rect(20, 15, width - 40, 45, 8);
  
  fill(255); textSize(14); textAlign(LEFT, CENTER);
  text("TEMA: " + tema.toUpperCase(), 35, 37);
  
  fill(234, 179, 8); textAlign(RIGHT, CENTER);
  text("TIEMPO: " + etiquetaTiempoActual, width - 35, 37);
  
  fill(30, 41, 59);
  rect(20, 70, width - 40, 95, 8);
  
  fill(255); textSize(11); textAlign(LEFT, CENTER);
  text("MÉTRICAS Y AUTOMATIZACIÓN:", 35, 82);
  
  dibujarBarraIndicadora(35, 102, "Aprobación Pública", opinionPublica, color(59, 130, 246));
  dibujarBarraIndicadora(35, 124, "Nivel de Polarización", polarizacion, color(239, 68, 68));
  dibujarBarraIndicadora(35, 146, "% Mensajes por Bots", porcentajeBotsRed, color(234, 179, 8));
}

function dibujarBarraIndicadora(x, y, etiqueta, valor, col) {
  fill(255); textSize(10); textAlign(LEFT, CENTER);
  text(etiqueta + ": " + nf(valor, 1, 1) + "%", x, y);
  
  fill(51, 65, 85); noStroke();
  rect(x + 150, y - 4, 1080, 8, 3);
  
  fill(col);
  let anchoRelleno = map(valor, 0, 100, 0, 1080);
  rect(x + 150, y - 4, anchoRelleno, 8, 3);
}

function actualizarYDibujarGranjaCelulares() {
  let gx = 20; let gy = 175; let gw = 310; let gh = 605;
  
  fill(30, 41, 59); stroke(100, 116, 139); strokeWeight(1);
  rect(gx, gy, gw, gh, 10);
  
  noStroke(); fill(255); textSize(11); textAlign(CENTER, CENTER);
  text("GRANJA FÍSICA DE BOTS (50 CELULARES)", gx + gw / 2, gy + 18);
  
  for (let i = 0; i < granjaCelulares.length; i++) {
    let cel = granjaCelulares[i];
    stroke(71, 85, 105); strokeWeight(1); fill(15, 23, 42);
    rect(cel.x, cel.y + 20, cel.w, cel.h, 4);
    
    noStroke();
    if (cel.activo) {
      if (frameCount % 15 === 0) { asignarColorAleatorioBot(cel, '1'); }
      fill(cel.r, cel.g, cel.b);
    } else {
      fill(20, 27, 45);
    }
    rect(cel.x + 2, cel.y + 23, cel.w - 4, cel.h - 8, 2);
    
    fill(71, 85, 105);
    ellipse(cel.x + cel.w / 2, cel.y + cel.h + 15, 2, 2);
  }
  
  fill(148, 163, 184); textSize(10); textAlign(CENTER, CENTER);
  text("Pantallas activas = Granjas operando", gx + gw / 2, gy + gh - 15);
}

function dibujarPanelExplicativoLateralReducido() {
  let px = 910; let py = 175; let pw = 350; let ph = 260;
  
  fill(30, 41, 59); stroke(59, 130, 246); strokeWeight(2);
  rect(px, py, pw, ph, 10);
  
  noStroke(); fill(59, 130, 246);
  rect(px, py, pw, 30, 10, 10, 0, 0);
  
  fill(255); textSize(12); textAlign(CENTER, CENTER);
  text("ANÁLISIS SOCIOLÓGICO Y BOTS", px + pw / 2, py + 15);
  
  fill(234, 179, 8); textSize(11); textAlign(LEFT, TOP);
  text("ESTADO: " + tituloExplicacion, px + 15, py + 42);
  
  fill(226, 232, 240); textSize(12); textLeading(17);
  text(mensajeExplicativo, px + 15, py + 72, pw - 30, ph - 85);
}

function dibujarFeedMensajesMejorado() {
  let fx = 910; let fy = 445; let fw = 350; let fh = 335;
  
  fill(30, 41, 59); stroke(38, 198, 218); strokeWeight(1.5);
  rect(fx, fy, fw, fh, 10);
  
  noStroke(); fill(38, 198, 218); textSize(12); textAlign(CENTER, CENTER);
  text("MENSAJES EN LA RED (BOTS Y REALES)", fx + fw / 2, fy + 22);
  
  let espacioY = 70;
  for (let i = 0; i < feedMensajes.length; i++) {
    let yPos = fy + 48 + (i * espacioY);
    
    fill(15, 23, 42);
    noStroke();
    rect(fx + 10, yPos, fw - 20, 62, 6);
    
    fill(255); 
    textStyle(BOLD); 
    textSize(12);
    textAlign(LEFT, TOP);
    text("• " + feedMensajes[i], fx + 18, yPos + 8, fw - 35, 50);
    textStyle(NORMAL);
  }
}

function dibujarGraficoXYTemporal() {
  let gx = 340; let gy = 175; let gw = 555; let gh = 605;
  
  fill(30, 41, 59); noStroke();
  rect(gx, gy, gw, gh, 10);
  
  fill(255); textStyle(BOLD); textSize(13); textAlign(LEFT, CENTER);
  text("TEMA: " + tema.toUpperCase(), gx + 15, gy + 20);
  textStyle(NORMAL);
  
  let plx = gx + 15; let ply = gy + 45; let plw = gw - 30; let plh = gh - 90;
  
  fill(15, 23, 42); rect(plx, ply, plw, plh, 5);
  
  stroke(51, 65, 85); strokeWeight(1);
  for (let i = 0; i <= 4; i++) {
    let yLinea = ply + (plh / 4) * i;
    line(plx, yLinea, plx + plw, yLinea);
    
    fill(148, 163, 184); noStroke(); textSize(10); textAlign(RIGHT, CENTER);
    text((100 - i * 25) + "%", plx - 8, yLinea);
    stroke(51, 65, 85);
  }
  
  if (historialTiempos.length > 0) {
    trazarLineaHistorial(histOpinion, color(59, 130, 246), plx, ply, plw, plh);      
    trazarLineaHistorial(histPolarizacion, color(239, 68, 68), plx, ply, plw, plh);  
    trazarLineaHistorial(histBots, color(234, 179, 8), plx, ply, plw, plh);        
  }
  
  noStroke();
  fill(59, 130, 246); rect(plx + 10, ply + plh + 10, 10, 10, 2);
  fill(255); textSize(11); textAlign(LEFT, CENTER); text("Aprobación", plx + 25, ply + plh + 15);
  
  fill(239, 68, 68); rect(plx + 95, ply + plh + 10, 10, 10, 2);
  fill(255); text("Polarización", plx + 110, ply + plh + 15);
  
  fill(234, 179, 8); rect(plx + 185, ply + plh + 10, 10, 10, 2);
  fill(255); text("Bots", plx + 200, ply + plh + 15);
}

function trazarLineaHistorial(historial, col, gx, gy, gw, gh) {
  noFill(); stroke(col); strokeWeight(2.5);
  beginShape();
  let totalPuntos = historial.length;
  for (let i = 0; i < totalPuntos; i++) {
    let x = map(i, 0, max(1, totalPuntos - 1), gx + 20, gx + gw - 20);
    let y = map(historial[i], 0, 100, gy + gh - 15, gy + 15);
    vertex(x, y);
  }
  endShape();
  
  for (let i = 0; i < totalPuntos; i++) {
    let x = map(i, 0, max(1, totalPuntos - 1), gx + 20, gx + gw - 20);
    let y = map(historial[i], 0, 100, gy + gh - 15, gy + 15);
    
    fill(col); noStroke();
    ellipse(x, y, 6, 6);
    
    if (col === color(59, 130, 246)) {
      fill(148, 163, 184); textSize(9); textAlign(CENTER, TOP);
      text(historialTiempos[i], x, gy + gh + 5);
    }
  }
}

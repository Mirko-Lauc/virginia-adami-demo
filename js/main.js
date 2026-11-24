/* =========================================================
   VIRGINIA ADAMI · CENTRO DE ESTÉTICA (DEMO)
   Precios tomados de la lista de depilación láser.
   ========================================================= */
(function () {
  "use strict";

  var WA = "542920523672";
  var MAP = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Dr. Baraja 227, Viedma, Río Negro");

  var GRUPOS = [
    { nombre: "Rostro", zonas: [["Rostro completo", 24000], ["Bozo y mentón", 19000]] },
    { nombre: "Tronco", zonas: [["Axilas", 19000], ["Abdomen", 26000], ["Hombros", 18000], ["Espalda", 34000], ["Media espalda", 24000], ["Pecho", 28000]] },
    { nombre: "Extremidades superiores", zonas: [["Brazo completo", 27000], ["Medio brazo", 18000]] },
    { nombre: "Pelvis", zonas: [["Cavado completo", 28000], ["Cavado simple", 24000], ["Glúteos", 20000]] },
    { nombre: "Extremidades inferiores", zonas: [["Media pierna alta", 32000], ["Media pierna baja", 28000], ["Piernas completas", 46000]] },
    { nombre: "Otras", zonas: [["Zonas pequeñas", 15000]] }
  ];
  var DESC = { 2: 10, 3: 20, 4: 30 }; // 5 o más: 35

  // Horarios: 0 domingo ... 6 sábado. [apertura, cierre] en horas.
  var HORARIOS = {
    1: [12, 20], 2: [9, 17], 3: [12, 20], 4: [9, 17], 5: [9, 17], 6: [9, 14]
  };
  var HOR_TXT = [
    ["Lunes y miércoles", "12:00 a 20:00 h", [1, 3]],
    ["Martes, jueves y viernes", "9:00 a 17:00 h", [2, 4, 5]],
    ["Sábados", "9:00 a 14:00 h", [6]],
    ["Domingos", "Cerrado", [0]]
  ];

  var RESENAS = [
    { autor: "Lucía M.", texto: "Excelente atención, Virginia te explica todo con mucha paciencia. Ya en la tercera sesión se notaba un montón." },
    { autor: "Florencia R.", texto: "Hice piernas completas y axilas. Las sesiones son rápidas y el lugar es súper cálido y limpio." },
    { autor: "Camila B.", texto: "Me armó una rutina de skin care a medida y mi piel cambió muchísimo. ¡La recomiendo siempre!" }
  ];

  var FAQ = [
    ["¿Duele la depilación láser?", "La mayoría siente un leve calor o un pequeño pinchazo. El equipo tiene sistema de enfriamiento, así que es muy tolerable. En la primera consulta probamos juntas cómo lo sentís."],
    ["¿Cuántas sesiones voy a necesitar?", "Depende de cada piel, del tipo de vello y de la zona. En la consulta evaluamos tu caso y te digo una cantidad aproximada."],
    ["¿Cada cuánto tengo que ir?", "Al principio las sesiones se espacian unas semanas, y después cada vez más, a medida que el vello va saliendo menos."],
    ["¿Qué tengo que hacer antes de la sesión?", "Venir con la zona rasurada con maquinita (no con cera ni pinza), sin cremas ni perfumes, y evitar el sol fuerte los días previos."],
    ["¿Se puede hacer en verano?", "Sí, con algunos cuidados: protector solar todos los días y evitar exponer la zona al sol justo antes y después de la sesión."],
    ["¿Cómo funcionan los descuentos?", "Si combinás zonas en la misma sesión tenés 10% con 2 zonas, 20% con 3, 30% con 4 y 35% con 5 o más. Pagando en efectivo sumás un 10% más."]
  ];

  var ICONS = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var money = function (n) { return "$" + Math.round(n).toLocaleString("es-AR"); };
  var waLink = function (t) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t); };
  function toast(t) { var el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove("show"); }, 2600); }

  /* ---------- Menú, links, íconos ---------- */
  var menuBtn = $("#menuBtn"), nav = $("#nav");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$("#nav a").forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }); });
  $$(".js-wa").forEach(function (a) { a.href = waLink(a.dataset.msg || "Hola Virginia"); a.target = "_blank"; a.rel = "noopener"; });
  $(".wa-float").innerHTML = ICONS.wa;
  $$(".ico").forEach(function (s) { s.innerHTML = ICONS[s.dataset.i] || ""; });
  $("#mapBtn").href = MAP;

  /* ---------- Horarios ---------- */
  var hoy = new Date().getDay();
  ["#hoursList", "#hoursList2"].forEach(function (sel) {
    $(sel).innerHTML = HOR_TXT.map(function (h) {
      return '<li' + (h[2].indexOf(hoy) > -1 ? ' class="today"' : "") + "><b>" + h[0] + "</b><span>" + h[1] + "</span></li>";
    }).join("");
  });

  /* ---------- Calculadora de precios ---------- */
  var elegidas = [];
  $("#zones").innerHTML = GRUPOS.map(function (g) {
    return '<div class="zgroup"><h3>' + g.nombre + "</h3>" + g.zonas.map(function (z) {
      return '<label class="zone"><input type="checkbox" value="' + z[0] + '" data-p="' + z[1] + '"><span class="zone__box"></span><span class="zone__name">' + z[0] + '</span><span class="zone__price">' + money(z[1]) + "</span></label>";
    }).join("") + "</div>";
  }).join("");

  function pct(n) { return n >= 5 ? 35 : (DESC[n] || 0); }

  function calc() {
    elegidas = $$("#zones input:checked").map(function (i) { return { nombre: i.value, precio: +i.dataset.p }; });
    var n = elegidas.length;
    var sub = elegidas.reduce(function (a, z) { return a + z.precio; }, 0);
    var p = pct(n), d = sub * p / 100;
    var cash = $("#cash").checked, c = cash ? (sub - d) * 0.10 : 0;
    var total = sub - d - c;
    $("#calcList").innerHTML = n ? elegidas.map(function (z) { return "<li>" + z.nombre + "</li>"; }).join("") : '<li class="empty">Todavía no elegiste zonas.</li>';
    $("#cSub").textContent = money(sub);
    $("#cDiscRow").hidden = !p;
    $("#cDiscLbl").textContent = "Descuento " + n + " zonas (" + p + "%)";
    $("#cDisc").textContent = "−" + money(d);
    $("#cCashRow").hidden = !(cash && n);
    $("#cCash").textContent = "−" + money(c);
    $("#cTotal").textContent = money(total);
    var hint = "";
    if (n === 0) hint = "Elegí 2 zonas o más y tenés descuento.";
    else if (n < 5) hint = "Sumando 1 zona más llegás al " + pct(n + 1) + "% de descuento.";
    else hint = "¡Tenés el descuento máximo del 35%!";
    if (n && sub - d - c < sub) hint = (d + c > 0 ? "Ahorrás " + money(d + c) + ". " : "") + hint;
    $("#cHint").textContent = hint;
    $("#toBook").disabled = !n;
    updatePicked();
    return total;
  }
  $("#zones").addEventListener("change", calc);
  $("#cash").addEventListener("change", calc);
  $("#toBook").addEventListener("click", function () {
    setService("Depilación láser");
    $("#turnos").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Reserva de turno ---------- */
  var SERVICIOS = ["Depilación láser", "Cristal Skin (rejuvenecedor)", "Asesoramiento skin care", "Consulta / evaluación"];
  var state = { service: null, day: null, slot: null };

  $("#serviceSeg").innerHTML = SERVICIOS.map(function (s) {
    return '<button type="button" class="chip" role="radio" aria-checked="false" data-s="' + s + '">' + s + "</button>";
  }).join("");
  $("#serviceSeg").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (b) setService(b.dataset.s);
  });
  function setService(s) {
    state.service = s;
    $$("#serviceSeg .chip").forEach(function (b) { b.setAttribute("aria-checked", b.dataset.s === s); });
    updatePicked();
  }
  function updatePicked() {
    var el = $("#zonesPicked");
    if (state.service !== "Depilación láser") { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = elegidas.length
      ? "Zonas: <b>" + elegidas.map(function (z) { return z.nombre; }).join(", ") + '</b>. <a href="#precios">Cambiar</a>'
      : 'No elegiste zonas todavía. <a href="#precios">Elegilas en la lista de precios</a> o contalas por WhatsApp.';
  }
  $$("[data-service]").forEach(function (a) { a.addEventListener("click", function () { setService(a.dataset.service); }); });

  var DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  var DIAS_L = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  // Turnos ocupados de ejemplo (siempre los mismos para cada fecha)
  function ocupado(d, h) { var k = d.getDate() * 31 + d.getMonth() * 7 + h * 13; return (k * 9301 + 49297) % 233280 / 233280 < 0.35; }

  function slotsDe(d) {
    var hs = HORARIOS[d.getDay()]; if (!hs) return [];
    var out = [], now = new Date();
    for (var m = hs[0] * 60; m < hs[1] * 60; m += 30) {
      var t = new Date(d); t.setHours(0, m, 0, 0);
      out.push({ txt: Math.floor(m / 60) + ":" + (m % 60 ? "30" : "00"), off: t < now || ocupado(d, m) });
    }
    return out;
  }

  var dias = [];
  for (var i = 0; dias.length < 14; i++) {
    var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i);
    dias.push(d);
  }
  $("#days").innerHTML = dias.map(function (d, i) {
    var libres = slotsDe(d).some(function (s) { return !s.off; });
    return '<button type="button" class="day" role="radio" aria-checked="false" data-i="' + i + '"' + (libres ? "" : " disabled") +
      ' aria-label="' + DIAS_L[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()] + '"><small>' + (i === 0 ? "Hoy" : DIAS[d.getDay()]) + "</small><b>" + d.getDate() + "</b></button>";
  }).join("");
  $("#days").addEventListener("click", function (e) {
    var b = e.target.closest(".day"); if (!b || b.disabled) return;
    state.day = dias[+b.dataset.i]; state.slot = null;
    $$("#days .day").forEach(function (x) { x.setAttribute("aria-checked", x === b); });
    $("#slots").innerHTML = slotsDe(state.day).map(function (s) {
      return '<button type="button" class="chip" role="radio" aria-checked="false"' + (s.off ? " disabled" : "") + ">" + s.txt + "</button>";
    }).join("");
  });
  $("#slots").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b || b.disabled) return;
    state.slot = b.textContent;
    $$("#slots .chip").forEach(function (x) { x.setAttribute("aria-checked", x === b); });
  });

  $("#bookForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#bName").value.trim(), err = $("#bError");
    var falta = !state.service ? "Elegí qué te querés hacer." : !state.day ? "Elegí un día." : !state.slot ? "Elegí un horario." : !name ? "Escribí tu nombre." : "";
    if (falta) { err.textContent = falta; err.hidden = false; if (!name && state.slot) $("#bName").focus(); return; }
    err.hidden = true;
    var d = state.day;
    var msg = "Hola Virginia! Soy " + name + " y quiero pedir un turno.\n\n" +
      "• Servicio: " + state.service + "\n";
    if (state.service === "Depilación láser" && elegidas.length) {
      msg += "• Zonas: " + elegidas.map(function (z) { return z.nombre; }).join(", ") + "\n" +
        "• Total estimado: " + money(calc()) + ($("#cash").checked ? " (pago en efectivo)" : "") + "\n";
    }
    msg += "• Día: " + DIAS_L[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()] + "\n" +
      "• Horario: " + state.slot + " h\n" +
      "• " + $("#bFirst").value + "\n\n¿Me lo confirmás? Gracias!";
    window.open(waLink(msg), "_blank", "noopener");
    toast("Listo, te abrimos WhatsApp para confirmar el turno.");
  });

  /* ---------- Reseñas y preguntas ---------- */
  $("#reviews").innerHTML = RESENAS.map(function (r) {
    return '<article class="review"><div class="stars" aria-label="5 estrellas">★★★★★</div><p>“' + r.texto + "”</p><small>" + r.autor + " · Google</small></article>";
  }).join("");
  $("#faq").innerHTML = FAQ.map(function (f, i) {
    return "<details" + (i === 0 ? " open" : "") + "><summary>" + f[0] + "</summary><p>" + f[1] + "</p></details>";
  }).join("");

  calc();
})();

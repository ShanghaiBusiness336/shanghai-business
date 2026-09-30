const API_BASE_URL = 'https://shanghai-business-backend.vercel.app';

// Los textos extensos se editan en asesorias-detalles.js. NO en las tarjetas de index.html.
const details = {
  asesoramiento: {title: "Asesoramiento Previo al Viaje"},
  visa: {title: "Asistencia para la Visa"},
  vuelos: {title: "Reservas de Vuelos"},
  hoteles: {title: "Reservas de Hoteles"},
  traslados: {title: "Traslados desde y hacia el Aeropuerto"},
  soporte: {title: "Soporte de Viaje 24/7"},
  exposicion: {title: "Asistencia en la Exposición"},
  aeropuerto: {title: "Asistencia en el Aeropuerto"},
  divisas: {title: "Cambio de Divisas"},
  factory: {title: "Factory Inspection"},
  acompanamiento: {title: "Acompañamiento en Shanghai"}
};

const modal = document.querySelector('#service-modal');
if (modal) {
  document.querySelectorAll('.service-card').forEach(card => {
    const btn = card.querySelector('.detail-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const d = details[card.dataset.service];
      if (!d) return;
      document.querySelector('#modal-title').textContent = d.title;
      const copy = extendedAdvisoryCopy[card.dataset.service];
      const body = document.querySelector('#modal-text');
      body.replaceChildren();
      (copy?.paragraphs || []).forEach(text => { const p = document.createElement('p'); p.textContent = text; body.appendChild(p); });
      const list = document.querySelector('#modal-list');
      list.replaceChildren();
      (copy?.items || []).forEach(text => { const li = document.createElement('li'); li.textContent = '✓ ' + text; list.appendChild(li); });
      document.querySelector('#modal-request').href = `reserva.html?servicio=${encodeURIComponent(d.title)}`;
      modal.showModal();
    });
  });
  document.querySelector('.modal-x')?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
}

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('#nav');
if (menuBtn && nav) menuBtn.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(open)); });

const form = document.querySelector('#booking-form');
if (form) {
  const params = new URLSearchParams(location.search);
  const svc = params.get('servicio');
  if (svc && form.elements.servicio) [...form.elements.servicio.options].forEach(o => { if (o.textContent.trim() === svc) o.selected = true; });

  const monthLabel = document.querySelector('#calendar-month');
  const grid = document.querySelector('#calendar-grid');
  const prev = document.querySelector('#prev-month');
  const next = document.querySelector('#next-month');
  const fechaHidden = document.querySelector('#fecha-hidden');
  const horaHidden = document.querySelector('#hora-hidden');
  const timeSlots = document.querySelector('#time-slots');
  const selectedDateLabel = document.querySelector('#selected-date-label');
  let viewDate = new Date(2026, 8, 1);
  let selectedDate = '';
  const fullDates = new Set(['2026-09-14','2026-09-21','2026-09-26','2026-09-28']);
  const blockedDates = new Set(['2026-09-06','2026-09-13','2026-09-20','2026-09-27']);
  const schedule = {
  default:['09:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00'],
  saturday:['09:00','10:00','11:00','12:00'],
  '2026-09-15':['09:00','11:00','14:00','16:00'],
  '2026-09-16':['10:00','11:00','15:00'],
  '2026-09-17':['09:00','10:00','14:00','15:00']
};
  const ymd = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const renderTimes = async dateStr => {
    horaHidden.value = '';
    timeSlots.innerHTML = '';
    if (!dateStr) { selectedDateLabel.textContent = 'Seleccione una fecha.'; return; }
    selectedDateLabel.textContent = `Fecha seleccionada: ${dateStr}`;
const selected = new Date(dateStr + 'T00:00:00');

const times =
  schedule[dateStr] ||
  (selected.getDay() === 6 ? schedule.saturday : schedule.default);
let horasOcupadas = [];

try {
  const res = await fetch(
    `${API_BASE_URL}/api/reservas/disponibilidad?fecha=${encodeURIComponent(dateStr)}`
  );

  const json = await res.json();

  if (res.ok && Array.isArray(json.horasOcupadas)) {
    horasOcupadas = json.horasOcupadas.map(h => String(h).slice(0, 5));
  }
} catch (error) {
  console.error('No se pudo consultar la disponibilidad:', error);
}

times.forEach(time => {
  const b = document.createElement('button');

  b.type = 'button';
  b.className = 'time-btn';

  const ocupada = horasOcupadas.includes(time);

  if (ocupada) {
    b.classList.add('occupied');
    b.disabled = true;
    b.innerHTML = `${time}<small>Ocupado</small>`;
  } else {
    b.textContent = time;

    b.addEventListener('click', () => {
      document
        .querySelectorAll('.time-btn')
        .forEach(x => x.classList.remove('selected'));

      b.classList.add('selected');
      horaHidden.value = time;
    });
  }

  timeSlots.appendChild(b);
});


  };
  const renderCalendar = () => {
    const year=viewDate.getFullYear(), month=viewDate.getMonth();
    monthLabel.textContent = new Intl.DateTimeFormat('es',{month:'long',year:'numeric'}).format(viewDate);
    grid.innerHTML='';
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month+1, 0).getDate();
    for(let i=0;i<first;i++){const blank=document.createElement('span');blank.className='calendar-blank';grid.appendChild(blank);}
    for(let day=1; day<=days; day++){
      const date = new Date(year, month, day);
const key = ymd(date);

const b = document.createElement('button');
b.type = 'button';
b.textContent = day;
b.className = 'calendar-day';

const today = new Date();
today.setHours(0, 0, 0, 0);

const currentDate = new Date(year, month, day);
currentDate.setHours(0, 0, 0, 0);

if (currentDate < today) {
  b.disabled = true;
  b.classList.add('unavailable');
}
     if (!b.disabled) {
  if (date.getDay() === 0 || blockedDates.has(key)) {
    b.disabled = true;
    b.classList.add('unavailable');
  } else if (fullDates.has(key)) {
    b.disabled = true;
    b.classList.add('full');
  }
}

      if(key===selectedDate)b.classList.add('selected');
      if(!b.disabled)b.addEventListener('click',()=>{selectedDate=key;fechaHidden.value=key;renderCalendar();renderTimes(key);});
      grid.appendChild(b);
    }
  };
  prev?.addEventListener('click',()=>{viewDate=new Date(viewDate.getFullYear(),viewDate.getMonth()-1,1);renderCalendar();});
  next?.addEventListener('click',()=>{viewDate=new Date(viewDate.getFullYear(),viewDate.getMonth()+1,1);renderCalendar();});
  renderCalendar(); renderTimes('');

  form.addEventListener('submit', async e => {
  e.preventDefault();

  const msg = document.querySelector('#form-message');

  if (!fechaHidden.value || !horaHidden.value) {
    msg.textContent = 'Seleccione una fecha y una hora disponibles.';
    return;
  }

  msg.textContent = 'Enviando solicitud...';

  const data = Object.fromEntries(new FormData(form).entries());

  const industria = data.industria;
  delete data.industria;

  data.motivo = `Industria/Sector: ${industria}${data.motivo ? ` | Motivo: ${data.motivo}` : ''}`;

  try {
    const res = await fetch(`${API_BASE_URL}/api/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(
        json.detail ||
        json.message ||
        'No se pudo completar la reserva.'
      );
    }

    msg.textContent = '';

const successModal = document.querySelector('#success-modal');
const successClose = document.querySelector('#success-close');

const fechaFormateada = new Date(
  `${data.fecha}T00:00:00`
).toLocaleDateString('es-BO', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});

const servicioTexto =
  form.elements.servicio?.selectedOptions?.[0]?.textContent.trim()
  || data.servicio
  || 'Consulta general';

document.querySelector('#success-nombre').textContent =
  data.nombre || '—';

document.querySelector('#success-servicio').textContent =
  servicioTexto;

document.querySelector('#success-fecha').textContent =
  fechaFormateada;

document.querySelector('#success-hora').textContent =
  data.hora || '—';

document.querySelector('#success-correo').textContent =
  data.correo || '—';

successModal.hidden = false;

successClose.onclick = () => {
  successModal.hidden = true;
};

form.reset();
selectedDate = '';
fechaHidden.value = '';
horaHidden.value = '';

renderCalendar();
renderTimes('');

  } catch (err) {
    msg.textContent =
      err.message ||
      'No se pudo conectar con el servidor.';
  }
});

}


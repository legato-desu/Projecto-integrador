function toggleMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('active');
}

//  Menu desplegable
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Abre o cierra el menu al presionar el boton
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Cierra el men automaticamente al hacer clic en una opcion
const navLinks = navMenu.querySelectorAll('a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });
});

//  Animaciones al hacer scroll 
const animatedElements = document.querySelectorAll('.animate');

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  animatedElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

//  Grafico de justificacion 
const ctx = document.getElementById('benefitsChart').getContext('2d');

const benefitsChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [
      'Decisiones más firmes y meditadas',
      'Mejores análisis ad-hoc',
      'Colaboraciones con otras compañías',
      'Capacidades de autoservicio',
      'Incremento del ROI',
      'Ahorro de tiempo',
      'Reducción carga del departamento TI'
    ],
    datasets: [{
      label: 'Porcentaje (%)',
      data: [77, 43, 41, 36, 34, 20, 15],
      backgroundColor: '#0057B7',
      borderRadius: 6
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#2E2E2E',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 4,
        padding: 10
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#2E2E2E',
          font: {
            family: 'Poppins',
            size: 12
          }
        },
        grid: {
          color: '#cccccc'
        }
      },
      y: {
        ticks: {
          color: '#2E2E2E',
          font: {
            family: 'Poppins',
            size: 12
          }
        },
        grid: {
          display: false
        }
      }
    }
  }
});

/* Mostrar modal */
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

/* Cerrar modal */
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

/* Cambiar entre login y registro */
function switchModal() {
  const login = document.getElementById("loginModal");
  const register = document.getElementById("registerModal");

  if (login.style.display === "block") {
    login.style.display = "none";
    register.style.display = "block";
  } else {
    register.style.display = "none";
    login.style.display = "block";
  }
}

/* Cerrar si se hace clic fuera del modal */
window.onclick = function (event) {
  const login = document.getElementById("loginModal");
  const register = document.getElementById("registerModal");
  if (event.target === login) login.style.display = "none";
  if (event.target === register) register.style.display = "none";
};

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// --- Modales ---
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function switchModal(fromId, toId) {
  closeModal(fromId);
  openModal(toId);
}

// Cerrar modal al hacer clic fuera
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

// --- Graficadora de Funciones ---

const funcList = document.getElementById('funcList');
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const plotBtn = document.getElementById('plotBtn');
const clearBtn = document.getElementById('clearBtn');
const plotDiv = document.getElementById('plot');

if (funcList && addBtn && removeBtn && plotBtn && clearBtn && plotDiv) {
  function addFunctionRow(value = '') {
    const row = document.createElement('div');
    row.className = 'func-row';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'y = ... (ej.: sin(x) o x^2)';
    input.value = value;
    row.appendChild(input);
    funcList.appendChild(row);
    input.focus();
  }

  function removeFunctionRow() {
    const rows = funcList.querySelectorAll('.func-row');
    if (rows.length > 1) {
      funcList.removeChild(rows[rows.length - 1]);
    } else {
      rows.querySelector('input').value = '';
    }
  }

  function clearAll() {
    funcList.innerHTML = '';
    addFunctionRow();
    Plotly.purge(plotDiv);
  }

  function getFunctions() {
    const inputs = Array.from(funcList.querySelectorAll('input'));
    return inputs.map(i => i.value.trim()).filter(v => v !== '');
  }

  function evaluateExpression(expr, xValues) {

    const compiled = math.compile(expr);
    const y = [];
    for (let i = 0; i < xValues.length; i++) {
      const x = xValues[i];
      try {
        const scope = { x: x, pi: Math.PI, e: Math.E };
        let val = compiled.evaluate(scope);
        if (Array.isArray(val)) val = val;
        if (typeof val === 'number' && (!isFinite(val) || isNaN(val))) {
          y.push(null);
        } else {
          y.push(val);
        }
      } catch (e) {
        y.push(null);
      }
    }
    return y;
  }

  function plotFunctions(funcExprs) {
    if (!funcExprs || funcExprs.length === 0) {
      alert('Por favor ingresa al menos una función.');
      return;
    }

    const n = 400;
    const xmin = -10, xmax = 10;
    const x = Array.from({ length: n }, (_, i) => xmin + (xmax - xmin) * i / (n - 1));

    const traces = [];
    const colors = ['#111827', '#0ea5e9', '#ef4444', '#10b981', '#f59e0b', '#7c3aed', '#06b6d4', '#f97316'];

    for (let i = 0; i < funcExprs.length; i++) {
      const expr = funcExprs[i];
      if (!/^[0-9a-zA-Z+\-/^().,_\s]$/.test(expr) && !/[a-zA-Z]/.test(expr)) {

      }
      try {
        const exprClean = expr.replace(/\bsen\b/ig, 'sin');
        const y = evaluateExpression(exprClean, x);
        traces.push({
          x: x,
          y: y,
          mode: 'lines',
          name: `${expr}`,
          line: { color: colors[i % colors.length], width: 2 },
          connectgaps: false
        });
      } catch (e) {
        alert(`Error procesando la expresión: ${expr}\n${e}`);
        return;
      }
    }

    const layout = {
      title: 'Gráfica de funciones',
      xaxis: { title: 'x', zeroline: true, showgrid: true, range: [-5, 5] },
      yaxis: { title: 'y', zeroline: true, showgrid: true, range: [-5, 5] },
      legend: { orientation: 'h', x: 0.02, y: -0.15 },
      margin: { t: 40, b: 60, l: 60, r: 20 }
    };

    Plotly.newPlot(plotDiv, traces, layout, { responsive: true });
  }

  addBtn.addEventListener('click', () => addFunctionRow());
  removeBtn.addEventListener('click', () => removeFunctionRow());
  clearBtn.addEventListener('click', () => clearAll());
  plotBtn.addEventListener('click', () => {
    const funcs = getFunctions();
    if (funcs.length === 0) {
      alert('Ingresa al menos una función para graficar.');
      return;
    }
    plotFunctions(funcs);
  });

  addFunctionRow('sin(x)');
  addFunctionRow('x^2');
}
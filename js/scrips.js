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

// Script principal para el portfolio

// Esperamos a que todo el contenido esté listo
window.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filters button');
  const projectArticles = document.querySelectorAll('.projects-grid article');

  // Filtrado de proyectos según categoría
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      projectArticles.forEach(article => {
        if (filter === 'todos' || article.dataset.category === filter) {
          article.style.display = '';
        } else {
          article.style.display = 'none';
        }
      });
    });
  });

  // Manejo del formulario: carga y almacenamiento en localStorage
  const form = document.getElementById('contact-form');
  const fields = ['name', 'email', 'date', 'message'];
  fields.forEach(id => {
    const field = document.getElementById(id);
    const saved = localStorage.getItem('contact-' + id);
    if (saved) {
      field.value = saved;
    }
    field.addEventListener('input', () => {
      localStorage.setItem('contact-' + id, field.value);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje!');
    form.reset();
    // Limpiar almacenamiento
    fields.forEach(id => localStorage.removeItem('contact-' + id));
  });

  // Geolocalización
  const getLocationBtn = document.getElementById('get-location');
  const locationOutput = document.getElementById('location-output');
  if (navigator.geolocation) {
    getLocationBtn.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        locationOutput.textContent = `Tu ubicación: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      }, error => {
        locationOutput.textContent = 'No se pudo obtener la ubicación.';
      });
    });
  } else {
    getLocationBtn.style.display = 'none';
    locationOutput.textContent = 'Geolocalización no soportada por este navegador.';
  }

  // Ejemplos de métodos modernos de Set e Iterator en la consola
  // Estos ejemplos no se muestran en la interfaz, pero demuestran el uso de ECMAScript 2025.
  try {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([3, 4, 5]);
    // Los métodos intersection y difference son parte del estándar ECMAScript 2025
    console.log('Intersección de sets:', setA.intersection(setB));
    console.log('Diferencia de sets:', setA.difference(setB));

    const techs = ['HTML', 'CSS', 'JavaScript', 'Node', 'React'];
    // Uso de Iterator helper methods para procesar datos de forma perezosa
    const lengths = Iterator.from(techs)
      .map(str => str.length)
      .take(3)
      .toArray();
    console.log('Longitudes (Iterator):', lengths);
  } catch (err) {
    // Si el entorno no soporta estas funciones aún, no se lanzará error en UI
    console.warn('Algunas funciones modernas no están soportadas en este entorno:', err.message);
  }
});

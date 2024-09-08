document.addEventListener('DOMContentLoaded', async () => {
  // Función para cargar y renderizar los datos
  async function loadAndRenderData() {
    try {
      // Cargar el archivo JSON local
      const response = await fetch('src/test.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Obtener y compilar la plantilla Handlebars
      const templateSource = document.getElementById('template').innerHTML;
      const template = Handlebars.compile(templateSource);
      
      // Renderizar la plantilla con los datos del JSON
      const html = template(data);
      document.getElementById('app').innerHTML = html;
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function setupAudioButtons() {
    // Selecciona todos los botones que tengan el atributo 'data-audio-id'
    const audioButtons = document.querySelectorAll('button[data-audio-id]');
    
    // Para cada botón encontrado
    audioButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Obtener el ID del audio asociado al botón (almacenado en 'data-audio-id')
        const audioId = button.getAttribute('data-audio-id');
        const audioElement = document.getElementById(audioId);
  
        if (audioElement) {
          // Pausar todos los audios antes de reproducir el actual
          document.querySelectorAll('audio').forEach(audio => audio.pause());
  
          // Reinicia el audio si ya ha terminado
          if (audioElement.currentTime > 0 && audioElement.paused) {
            audioElement.currentTime = 0;
          }
  
          // Reproduce el audio seleccionado
          audioElement.play();
        }
      });
    });
  }
  
  // Ejecutar la función cuando el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', () => {
    setupAudioButtons();
  });
  

  // Llamar a las funciones
  loadAndRenderData();
  
});

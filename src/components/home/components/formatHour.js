const getDisplayDate = (isoDate) => {
    const selectedDate = new Date(isoDate); // Convertir la cadena de fecha ISO a objeto Date
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    const twoHoursLater = new Date(selectedDate.getTime() + 2 * 60 * 60 * 1000);
  
    if (isToday) {
      return `Hoy, ${selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${twoHoursLater.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      const dayOfWeek = selectedDate.toLocaleDateString('es-ES', { weekday: 'long' });
      return `${dayOfWeek}, ${selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${twoHoursLater.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };
  
  export default getDisplayDate;
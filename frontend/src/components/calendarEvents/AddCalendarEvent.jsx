export default function AddCalendarEvent() {

  const addEvent = async () => {

    const event = {
      summary: "Predicted Period Start 💗",
      description: "Reminder from Tarangini",
      start: {
        date: "2026-03-10"
      },
      end: {
        date: "2026-03-11"
      }
    };

    window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event
    }).then(() => {
      alert("Event added to Google Calendar 🎉");
    });
  };

  return (
    <button onClick={addEvent}>
      Add Period Event to Google Calendar
    </button>
  );
}
import { useEffect } from "react";

export default function LoadCalendarApi() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load("client", () => {
        window.gapi.client.init({
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
          ]
        });
      });
    };
    document.body.appendChild(script);
  }, []);

  return null;
}
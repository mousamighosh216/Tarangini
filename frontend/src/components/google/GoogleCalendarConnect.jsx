import { GoogleLogin } from "@react-oauth/google";

export default function GoogleCalendarConnect() {

  const handleSuccess = async (credentialResponse) => {
    console.log("Login Success:", credentialResponse);

    alert("Google account connected 💗");
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div>
      <h3>Sync with Google Calendar</h3>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
      />
    </div>
  );
}
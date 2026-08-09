import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import Topbar from "./components/topbar.jsx";
import Videos from "./components/videos.jsx";
import Calendar from "./components/calendar.jsx";
import "./cognitive-kitchen.css";

Amplify.configure(outputs);

export default function App() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const [activePage, setActivePage] = useState("videos");

  return (
    <div className="ck-app">
      <Topbar onSignOut={signOut} activePage={activePage} onNavigate={setActivePage} />
      {activePage === "videos" ? <Videos /> : <Calendar />}
    </div>
  );
}
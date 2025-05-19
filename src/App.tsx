import "./App.css";
import { useEffect, useState } from "react";
import MoodForm from "./components/MoodForm";
import type { MoodEntry } from "./types";

const LOCAL_STORAGE_KEY = "moodEntries";

function App() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      setEntries(JSON.parse(data));
    }
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const today = new Date().toISOString().split("T")[0];
  const alreadySubmittedToday = entries.some((entry) => entry.date === today);

  const handleMoodSubmit = (entry: MoodEntry) => {
    if (!alreadySubmittedToday) {
      setEntries([...entries, entry]);
    }
  };

  return (
    <div className="App">
      <h1>Mood Tracker</h1>
      {alreadySubmittedToday ? (
        <p>You've already submitted your mood today. Come back tomorrow!</p>
      ) : (
        <MoodForm onSubmit={handleMoodSubmit} />
      )}

      <h2>Past Entries</h2>
      <ul>
        {entries
          .slice()
          .reverse()
          .map((entry, index) => (
            <li key={index}>
              <strong>{entry.date}</strong>: {entry.mood}
              {entry.note && <> — {entry.note}</>}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

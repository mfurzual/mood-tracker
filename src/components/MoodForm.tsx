import { useState } from "react";
import type { Mood, MoodEntry } from "../types";

interface MoodFormProps {
  onSubmit: (entry: MoodEntry) => void;
}

const moods: Mood[] = ["Very Bad", "Bad", "Neutral", "Good", "Very Good"];

export default function MoodForm({ onSubmit }: MoodFormProps) {
  const [mood, setMood] = useState<Mood>("Neutral");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    onSubmit({ date: today, mood, note });
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "100px 1fr",
          columnGap: "1rem",
          rowGap: "1rem",
          alignItems: "start",
          maxWidth: "500px",
        }}
      >
        <label htmlFor="mood">Mood:</label>
        <select
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value as Mood)}
          style={{ width: "100%" }}
        >
          {moods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <label htmlFor="note">Notes:</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional..."
          style={{ width: "100%", resize: "vertical" }}
        />
      </div>

      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

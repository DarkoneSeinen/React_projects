import { useState, useEffect } from 'react';
import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';

// Definimos los valores manualmente ya que son `type`, no `enum`
const weatherOptions: Weather[] = ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'];
const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor'];

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    weather: 'sunny',
    visibility: 'great',
    comment: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>('https://literate-space-trout-979xvx5x4xgwf7vp5-3000.app.github.dev/api/diaries')
      .then(response => setDiaries(response.data))
      .catch(e => {
        console.error(e);
        setError('Error fetching diaries');
      });
  }, []);

  const handleChange = (field: keyof NewDiaryEntry, value: string) => {
    setNewEntry({ ...newEntry, [field]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post<DiaryEntry>('https://literate-space-trout-979xvx5x4xgwf7vp5-3000.app.github.dev/api/diaries', newEntry)
      .then(response => {
        setDiaries(diaries.concat(response.data));
        setNewEntry({
          date: '',
          weather: 'sunny',
          visibility: 'great',
          comment: ''
        });
        setError(null);
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data || 'Unknown error');
        } else {
          setError('Something went wrong');
        }
      });
  };

  return (
    <div>
      <h1>Flight Diary</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={newEntry.date}
            onChange={e => handleChange('date', e.target.value)}
          />
        </div>

        <div>
          <label>Weather:</label>
          {weatherOptions.map(option => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={newEntry.weather === option}
                onChange={() => handleChange('weather', option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div>
          <label>Visibility:</label>
          {visibilityOptions.map(option => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={newEntry.visibility === option}
                onChange={() => handleChange('visibility', option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div>
          <label>Comment:</label>
          <input
            type="text"
            value={newEntry.comment}
            onChange={e => handleChange('comment', e.target.value)}
          />
        </div>

        <button type="submit">Add Entry</button>
      </form>

      <h2>Diary Entries</h2>
      <ul>
        {diaries.map(entry => (
          <li key={entry.id}>
            <strong>{entry.date}</strong> | Weather: {entry.weather} | Visibility: {entry.visibility}
            {entry.comment && <> | Comment: {entry.comment}</>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

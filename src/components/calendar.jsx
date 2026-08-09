import { useState } from "react";

// Same sample data your server.js used to hold in LIVE_SESSIONS.
// Later, this can move into the Amplify data model (like videos will).
const LIVE_SESSIONS = [
  { date: "2026-06-16", time: "2:00 PM ET", title: "Live Session: Knife Skills Basics" },
  { date: "2026-06-30", time: "2:00 PM ET", title: "Live Session: One-Pot Dinners" },
  { date: "2026-07-14", time: "2:00 PM ET", title: "Live Session: Soups & Stocks" },
  { date: "2026-07-28", time: "2:00 PM ET", title: "Live Session: Baking Basics" },
  { date: "2026-08-11", time: "2:00 PM ET", title: "Live Session: Sheet-Pan Suppers" },
  { date: "2026-08-25", time: "2:00 PM ET", title: "Live Session: Q&A with the Chef" },
];

const SESSIONS_BY_DATE = LIVE_SESSIONS.reduce((map, session) => {
  (map[session.date] = map[session.date] || []).push(session);
  return map;
}, {});

function isoDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Same logic as buildMonthGrid() in server.js — just runs in the browser now.
function buildMonthGrid(year, monthIndex0) {
  const firstOfMonth = new Date(year, monthIndex0, 1);
  const startDayOfWeek = firstOfMonth.getDay();
  const cells = [];

  for (let i = 0; i < 42; i++) {
    const dayOffset = i - startDayOfWeek + 1;
    const dateObj = new Date(year, monthIndex0, dayOffset);
    const iso = isoDate(dateObj);
    cells.push({
      day: dateObj.getDate(),
      iso,
      inCurrentMonth: dateObj.getMonth() === monthIndex0 && dateObj.getFullYear() === year,
      sessions: SESSIONS_BY_DATE[iso] || [],
    });
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function Calendar() {
  // Replaces the ?year=&month= URL params — this is just remembered
  // in the browser instead, no page reload needed to change months.
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const monthIndex0 = viewDate.getMonth();
  const todayIso = isoDate(new Date());

  const weeks = buildMonthGrid(year, monthIndex0);
  const monthLabel = viewDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  const monthPrefix = `${year}-${String(monthIndex0 + 1).padStart(2, "0")}`;
  const monthSessions = LIVE_SESSIONS.filter((s) => s.date.startsWith(monthPrefix)).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  function goToPrevMonth() {
    setViewDate(new Date(year, monthIndex0 - 1, 1));
  }

  function goToNextMonth() {
    setViewDate(new Date(year, monthIndex0 + 1, 1));
  }

  return (
    <div className="page">
      <h1>Live Session Calendar</h1>
      <p className="subtitle">Here's when our upcoming live cooking sessions take place.</p>

      <div className="calendar-panel">
        <div className="calendar-nav">
          <button className="cal-nav-btn" aria-label="Show previous month" onClick={goToPrevMonth}>
            &larr; Previous
          </button>
          <div className="calendar-month-label">{monthLabel}</div>
          <button className="cal-nav-btn" aria-label="Show next month" onClick={goToNextMonth}>
            Next &rarr;
          </button>
        </div>

        <table className="calendar-grid">
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((cell) => (
                  <td
                    key={cell.iso}
                    className={[
                      !cell.inCurrentMonth ? "cal-outside" : "",
                      cell.iso === todayIso ? "cal-today" : "",
                    ].join(" ")}
                  >
                    <div className="cal-day-number">{cell.day}</div>
                    {cell.sessions.map((session, i) => (
                      <div className="cal-event" title={`${session.title} — ${session.time}`} key={i}>
                        {session.time}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="section-heading">Sessions This Month</h2>
      {monthSessions.length === 0 ? (
        <p className="subtitle">There are no live sessions scheduled this month.</p>
      ) : (
        <div className="session-list">
          {monthSessions.map((session) => (
            <div className="session-item" key={session.date + session.title}>
              <div className="session-date">
                {new Date(session.date + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="session-details">
                <span className="session-title">{session.title}</span>
                <span className="session-time">{session.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
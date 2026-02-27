import { createContext, useContext, useState } from "react";

const CycleContext = createContext();

export function CycleProvider({ children }) {
  const today = new Date(2026, 1, 24); // Feb 24, 2026
  const periodStart = new Date(2026, 1, 11); // Feb 11 = day 1
  const cycleLength = 28;

  const [selectedDate, setSelectedDate] = useState(today);
  const [loggedSymptoms, setLoggedSymptoms] = useState({});

  const getCycleDay = (date) => {
    const diff = Math.floor((date - periodStart) / (1000 * 60 * 60 * 24));
    return ((diff % cycleLength) + cycleLength) % cycleLength + 1;
  };

  const cycleDay = getCycleDay(today);

  const nextPeriod = new Date(periodStart);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  const ovulationDay = new Date(periodStart);
  ovulationDay.setDate(ovulationDay.getDate() + 14);

  const fertileStart = new Date(ovulationDay);
  fertileStart.setDate(fertileStart.getDate() - 2);
  const fertileEnd = new Date(ovulationDay);
  fertileEnd.setDate(fertileEnd.getDate() + 2);

  const isPeriodDay = (date) => {
    const d = date.getDate();
    const m = date.getMonth();
    // Period days: Feb 3-7, 2026 (last period before current)
    return m === 1 && d >= 3 && d <= 7;
  };

  const isOvulationDay = (date) => {
    const d = date.getDate();
    const m = date.getMonth();
    return m === 1 && d >= 14 && d <= 17;
  };

  const isToday = (date) => {
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const saveSymptoms = (dateKey, data) => {
    setLoggedSymptoms(prev => ({ ...prev, [dateKey]: data }));
  };

  return (
    <CycleContext.Provider value={{
      today,
      selectedDate,
      setSelectedDate,
      cycleDay,
      cycleLength,
      nextPeriod,
      fertileStart,
      fertileEnd,
      ovulationDay,
      isPeriodDay,
      isOvulationDay,
      isToday,
      loggedSymptoms,
      saveSymptoms,
      getCycleDay,
    }}>
      {children}
    </CycleContext.Provider>
  );
}

export function useCycle() {
  return useContext(CycleContext);
}

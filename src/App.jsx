import { useEffect, useMemo, useReducer, useState } from "react";
import "./App.css";
import { STORAGE_KEY } from "./constants";
import { expenseReducer } from "./reducers/expenseReducer";
import ExpenseForm from "./components/ExpenseForm";
import FilterBar from "./components/FilterBar";
import Summary from "./components/Summary";
import ExpenseList from "./components/ExpenseList";

// Read saved expenses once, on the first render. Fall back to an empty list
// if the stored data is missing or corrupted.
function loadExpenses() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export default function App() {
  const [expenses, dispatch] = useReducer(expenseReducer, [], loadExpenses);
  const [filter, setFilter] = useState("All");

  // Save to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  // Derived data: computed from state, never stored separately
  const visible = useMemo(
    () => (filter === "All" ? expenses : expenses.filter((e) => e.category === filter)),
    [expenses, filter]
  );
  const total = useMemo(() => visible.reduce((sum, e) => sum + e.amount, 0), [visible]);

  return (
    <main className="app">
      <div className="panel">
        <h1>Expense Tracker</h1>

        <ExpenseForm onAdd={(expense) => dispatch({ type: "add", expense })} />

        <FilterBar value={filter} onChange={setFilter} />
        <Summary count={visible.length} total={total} />
        <ExpenseList
          expenses={visible}
          onDelete={(id) => dispatch({ type: "delete", id })}
        />
      </div>
    </main>
  );
}
import { useEffect, useMemo, useReducer, useState } from "react";
import "./App.css";
import { STORAGE_KEY } from "./constants";
import { expenseReducer } from "./reducers/expenseReducer";
import ExpenseForm from "./components/ExpenseForm";
import FilterBar from "./components/FilterBar";
import Summary from "./components/Summary";
import ExpenseList from "./components/ExpenseList";

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
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const visible = useMemo(
    () => (filter === "All" ? expenses : expenses.filter((e) => e.category === filter)),
    [expenses, filter]
  );
  const total = useMemo(() => visible.reduce((sum, e) => sum + e.amount, 0), [visible]);
  const editing = expenses.find((e) => e.id === editingId) ?? null;

  function handleSave(expense) {
    dispatch({ type: editingId ? "update" : "add", expense });
    setEditingId(null);
  }

  return (
    <main className="app">
      <div className="panel">
        <h1>Expense Tracker</h1>

        <ExpenseForm
          key={editingId ?? "new"}
          initial={editing}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />

        <FilterBar value={filter} onChange={setFilter} />
        <Summary count={visible.length} total={total} />
        <ExpenseList
          expenses={visible}
          onEdit={(expense) => setEditingId(expense.id)}
          onDelete={(id) => {
            dispatch({ type: "delete", id });
            if (editingId === id) setEditingId(null);
          }}
        />
      </div>
    </main>
  );
}
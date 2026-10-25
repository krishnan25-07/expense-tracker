const formatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function ExpenseList({ expenses, onDelete }) {
    if (expenses.length === 0) {
        return <p className="muted empty">No expenses yet. Add one above.</p>;
    }

    return (
        <ul className="expense-list">
            {expenses.map((expense) => (
                <li key={expense.id} className="expense-item">
                    <div>
                        <strong>{expense.title}</strong>
                        <div className="muted small">
                            {expense.category} · {expense.date}
                        </div>
                    </div>
                    <div className="expense-right">
                        <span>{formatter.format(expense.amount)}</span>
                        <button
                            className="delete"
                            onClick={() => onDelete(expense.id)}
                            aria-label={`Delete ${expense.title}`}
                        >
                            ✕
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
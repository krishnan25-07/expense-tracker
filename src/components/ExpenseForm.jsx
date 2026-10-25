import { useState } from "react";
import { CATEGORIES } from "../constants";

function emptyForm() {
    return {
        title: "",
        amount: "",
        category: CATEGORIES[0],
        date: new Date().toISOString().slice(0, 10),
    };
}

export default function ExpenseForm({ initial, onSave, onCancel }) {
    const isEditing = Boolean(initial);
    const [form, setForm] = useState(initial ?? emptyForm());
    const [errors, setErrors] = useState({});

    function update(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function validate() {
        const next = {};
        const amount = Number(form.amount);
        if (!form.title.trim()) next.title = "Enter a description.";
        if (!form.amount || Number.isNaN(amount) || amount <= 0) {
            next.amount = "Enter an amount greater than 0.";
        }
        if (!form.date) next.date = "Pick a date.";
        return next;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const next = validate();
        setErrors(next);
        if (Object.keys(next).length > 0) return;

        onSave({
            id: initial?.id ?? crypto.randomUUID(),
            title: form.title.trim(),
            amount: Number(form.amount),
            category: form.category,
            date: form.date,
        });

        if (!isEditing) {
            // Clear the text fields but keep date and category for quick repeat entries
            setForm((prev) => ({ ...prev, title: "", amount: "" }));
            setErrors({});
        }
    }

    return (
        <form className="expense-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
                <label htmlFor="title">Description</label>
                <input
                    id="title"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="e.g. Lunch with team"
                />
                {errors.title && <span className="error">{errors.title}</span>}
            </div>

            <div className="field">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.amount}
                    onChange={(e) => update("amount", e.target.value)}
                    placeholder="0.00"
                />
                {errors.amount && <span className="error">{errors.amount}</span>}
            </div>

            <div className="field">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                >
                    {CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                />
                {errors.date && <span className="error">{errors.date}</span>}
            </div>

            <div className="form-actions">
                <button type="submit" className="primary">
                    {isEditing ? "Save changes" : "Add expense"}
                </button>
                {isEditing && (
                    <button type="button" className="ghost" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
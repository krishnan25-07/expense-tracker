import { CATEGORIES } from "../constants";

export default function FilterBar({ value, onChange }) {
    return (
        <div className="filter-bar">
            <label htmlFor="filter">Show</label>
            <select id="filter" value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="All">All categories</option>
                {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                ))}
            </select>
        </div>
    );
}   
const formatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function Summary({ count, total }) {
    return (
        <div className="summary">
            <div>
                <span className="muted">Entries</span>
                <strong>{count}</strong>
            </div>
            <div>
                <span className="muted">Total</span>
                <strong>{formatter.format(total)}</strong>
            </div>
        </div>
    );
}
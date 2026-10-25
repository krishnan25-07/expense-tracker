export function expenseReducer(state, action) {
    switch (action.type) {
        case "add":
            return [action.expense, ...state];
        case "update":
            return state.map((e) => (e.id === action.expense.id ? action.expense : e));
        case "delete":
            return state.filter((e) => e.id !== action.id);
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}
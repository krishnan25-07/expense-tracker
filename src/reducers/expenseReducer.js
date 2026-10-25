export function expenseReducer(state, action) {
    switch (action.type) {
        case "add":
            return [action.expense, ...state];
        case "delete":
            return state.filter((expense) => expense.id !== action.id);
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}
export function formatToXAF(number: number) {
    // Convert the number to string
    const numberStr = number.toString();

    // Split the integer and decimal parts
    const [integerPart, decimalPart] = numberStr.split(".");

    // Add spaces to separate thousands
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    // Format the decimal part (2 digits after the decimal point)
    const formattedDecimalPart = decimalPart ? `.${decimalPart.slice(0, 2)}` : "";

    // Return the formatted number
    return `${formattedIntegerPart} ${formattedDecimalPart} FCFA`;
}

export const loadState = (stateName: string) => {
    try {
        const serializedState = localStorage.getItem(stateName);
        if (!serializedState) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (stateName: string, state: object | Array<string | null | boolean | undefined> | undefined) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(stateName, serializedState);
    } catch (err) {
        console.error("Error saving state to localStorage:", err);
    }
};
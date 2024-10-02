export function rand(min: number, max: number): number {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
};

export function constrain(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
};
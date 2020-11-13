class Structures {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    static get(structure: string) {
        return structures[structure];
    }

    static extend(structure, extender) {
        if (typeof extender !== "function") {
            const received = `(received ${typeof extender})`;
            throw new TypeError(
                `"extender" argument must be a function that returns the extended structure class/prototype ${received}.`,
            );
        }

        const extended = extender(structures[structure]);

        if (typeof extended !== "function") {
            const received = `(received ${typeof extended})`;

            throw new TypeError(`The extender function must return the extended structure class/prototype ${received}.`);
        }

        if (!(extended.prototype instanceof structures[structure])) {
            const prototype = Object.getPrototypeOf(extended);
            const received = `${extended.name || "unnamed"}${prototype.name ? ` extends ${prototype.name}` : ""}`;

            throw new Error(
                "The class/prototype returned from the extender function must extend the existing structure class/prototype" +
                ` (received function ${received}; expected extension of ${structures[structure].name}).`,
            );
        }

        structures[structure] = extended;

        return extended;
    }
}

const structures = {
    User: require("../structures/User").default,
    Paste: require("../structures/Paste").default
};

export default Structures;
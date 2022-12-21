// The max value for Unicode 16
const MAX_ALPHA = 65536;

class Alphabet {

    /** @type {Alphabet} */
    static LOWERCASE = new Alphabet('abcdefghijklmnopqrstuvwxyz');

    /** @type {string[]} */
    #alphabet = [];

    /** @type {number[]} */
    #inverse = []

    /** @type {number} */
    #R;

    /**
     * @param {string} alpha 
     */
    constructor(alpha) {
      if (alpha === void 0 || typeof alpha !== 'string') {
        throw new Error('Alphabet must be instantiated with a string of characters.')
      }
      const unicode = Array(MAX_ALPHA).fill(false);
      for(let i = 0; i < alpha.length; i++) {
        const c = alpha.charCodeAt(i);
        if (unicode[c]) {
          throw new Error(`Alphabet cannot contain duplicate characters (${c})`);
        }
        unicode[c] = true;
      }

      this.#alphabet = alpha.split('');
      this.#R = alpha.length;
      this.#inverse = Array(MAX_ALPHA).fill(-1);
      for (let c = 0; c < this.#R; c++) {
        this.#inverse[this.#alphabet[c].charCodeAt(0)] = c;
      }
    }

    /**
     * 
     * @param {string} c 
     * @returns {boolean}
     */
    contains(c) {
      return this.#inverse[c.charCodeAt(0)] !== -1;
    }

    /**
     * Number of chars in the alphabet
     * @returns {number}
     */
    radix() {
      return this.#R;
    }

    /**
     * Get the index from 0 to R - 1 from a character
     * @param {string} c Character
     * @returns {number} Index
     */
    toIndex(c) {
      const charCode = c.charCodeAt(0);
      if (charCode >= this.#inverse.length || this.#inverse[charCode] === -1) {
        throw new Error(`Character "${c}" is not in the alphabet.`)
      }
      return this.#inverse[charCode];
    }

    /**
     * Get a character from an index in R
     * @param {number} index - A number between 0 and R - 1
     * @returns {string} Character
     */
    toChar(i) {
      if (i < 0 || i >= this.#R) {
        throw new Error(`Index must be between 0 and ${this.#R} (${i})`)
      }
      return this.#alphabet[i];
    }
}

module.exports = Alphabet;
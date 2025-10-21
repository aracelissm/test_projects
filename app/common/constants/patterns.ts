import { getCurrentYear } from '../helpers';

export class RegExpPatterns {
    private constructor() {}
    static readonly Password = new RegExp(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*()_\\-+={}[]|\\:;<,>.?\\/]).{8,25}'
    );
    // static readonly BidLumberPriceCodeOld = /^(?:[A-Za-z]{3}\d{4})(?:-\d+)?$/;
    static readonly BidLumberPriceCode = new RegExp(
        `(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)${getCurrentYear()}`,
        'i'
    );
    static readonly WholeNumbers = /^\d+$/;
    static readonly WholeNumbersAndPositiveDecimalNumbers = /^\d+(\.\d+)?$/;
}

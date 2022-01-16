import Utils from "./utils"

describe('test placePositionOrientation()', () => {

    test('valid test', () => {
        const x = 0;
        const y = 1;
        const result = Utils.placePositionOrientation(`PLACE ${x},${y},NORTH`);
        expect(result.x).toEqual(x);
        expect(result.y).toEqual(y);
    });

    test('incorrect delimiter', () => {
        // command between command and params
        let result = Utils.placePositionOrientation(`PLACE,0,0,NORTH`);
        expect(result).toBeNull();

        // command in params
        result = Utils.placePositionOrientation(`PLACE 0 0 NORTH`);
        expect(result).toBeNull();
    });

    test('x, y not integer', () => {
        // x is string
        let result = Utils.placePositionOrientation(`PLACE x,0,NORTH`);
        expect(result).toBeNull();

        // y is string
        result = Utils.placePositionOrientation(`PLACE 0,y,NORTH`);
        expect(result).toBeNull();

        // x, y are both string
        result = Utils.placePositionOrientation(`PLACE x,y,NORTH`);
        expect(result).toBeNull();
    });

    test('test direction', () => {
        // valid values
        const valid = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
        for (const direction of valid) {
            const result = Utils.placePositionOrientation(`PLACE 0,0,${direction}`);
            expect(result.direction).toEqual(direction);
        }

        // invalid values
        const invalid = [
              'NORTHEAST' // not included
            , 'east' // lowercase
            , 'South' // case
            , '' // empty
        ];
        for (const direction of invalid) {
            const result = Utils.placePositionOrientation(`PLACE 0,0,${direction}`);
            expect(result).toBeNull();
        }        
    });

});

describe('test stringToBool()', () => {

    test('true values', () => {
        const values = ['TRUE', 'true', 'True', 'tRuE'];
        for (const str of values) {
            const result = Utils.stringToBool(str);
            expect(result).toBe(true);
        }
    });

    test('false values', () => {
        const values = [
              'false'
            , 'False'
            , 'FALSE'
            , 'fAlSe'
            , '' // empty string
            , null
            , undefined
            , 'xyz'
        ];
        for (const str of values) {
            const result = Utils.stringToBool(str);
            expect(result).toBe(false);
        }
    });

});
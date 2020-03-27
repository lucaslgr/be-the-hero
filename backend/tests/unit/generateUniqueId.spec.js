const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () =>{
    it('should generate an unique ID', () => {
        const id = generateUniqueId();

        //Fazendo teste unitário da função que gera o ID, se ele está vindo com 8 caracteres
        expect(id).toHaveLength(8);
    });
});
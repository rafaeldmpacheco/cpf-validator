import * as express from "express";

export class ValidateRouter {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.init();
    }

    public init() {
        this.express.route('/').post(function (req, res) {
            let strCPF = req.body.cpf;
            let sum = 0;
            let rest;

            if (strCPF == "00000000000") {
                res.send('CPF Inválido!');
            }

            for (let i = 1; i <= 9; i++) {
                sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
            }

            rest = (sum * 10) % 11;
            if ((rest == 10) || (rest == 11)) {
                rest = 0;
            }

            if (rest != parseInt(strCPF.substring(9, 10))) {
                res.send('CPF Inválido!');
            }

            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
            }

            rest = (sum * 10) % 11;
            if ((rest == 10) || (rest == 11)) {
                rest = 0;
            }

            if (rest != parseInt(strCPF.substring(10, 11))) {
                res.send('CPF Inválido!');
            }

            return res.send('CPF Válido!');
        })
    }

}

const validateRouter = new ValidateRouter();
validateRouter.init();
export default validateRouter.express;

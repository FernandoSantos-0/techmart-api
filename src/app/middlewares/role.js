export default function role(role) {

    return async function (req, res, next) {

        if (req.user.role == role) {
            return next();
        }

        return res.status(403).json({
            error: true,
            mensagem: "Rota inacessível!"
        });

    };

}


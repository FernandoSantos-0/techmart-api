import jwt from 'jsonwebtoken';

export async function authMiddleware(req, res, next){
        
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({
            error: true,
            mensagem: "Necessario login para acessar a rota!"
        });
    };

    const [bearer,token] = authHeader.split(' ');

    if (!token){
        return res.status(401).json({
            error: true,
            mensagem: "Necessario login para acessar a rota!"
        });
    };

    try {
        
        const decoder = jwt.verify(token,process.env.JWT_KEY);
        req.user = decoder;
        return next();

    } catch (error) {
        return res.status(401).json({
            error: true,
            mensagem: "Login Invalido"
        });            
    };
};

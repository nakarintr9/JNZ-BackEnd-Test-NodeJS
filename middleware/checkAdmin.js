const Role = require('../helpers/role');
module.exports.isAdmin = (req, res, next) => {
    const { role } = req.user;

    if ( role === Role.Admin) {
        next();
    } else {
        return res.status(403).json({
            error: {
                message: 'ไม่มีสิทธิ์ใช้งานส่วนนี้ เฉพาะผู้ดูแลระบบเท่านั้น'
            }
        });
    }
}
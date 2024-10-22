const loginQuery = `SELECT * FROM users WHERE email = $1 and password = $2`;
const registerQuery = `INSERT INTO users(username, email, password, role_id) 
VALUES ($1, $2, $3, 1) RETURNING *`;
const findByUsernameQuery = `SELECT * FROM users WHERE username = $1`;
const findByEmailQuery = `SELECT * FROM users WHERE email = $1`;
const verifyUserQuery = `SELECT username, email FROM users WHERE id = $1`;
const verifyUserInformationQuery = `SELECT id, email, password FROM users WHERE id = $1`;
const updateUserPassword = `UPDATE users SET password = $1 WHERE id = $2`;

export {
    loginQuery,
    registerQuery,
    findByEmailQuery,
    findByUsernameQuery,
    verifyUserQuery,
    updateUserPassword,
    verifyUserInformationQuery,
};

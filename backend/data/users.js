import bcrypt from 'bcryptjs'

const user = [
    {
        name: "Admin User",
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: "Jane Doe",
        email: 'Jane@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
]

export default user
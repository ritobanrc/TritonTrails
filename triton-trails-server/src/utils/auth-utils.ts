import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../createTable';

const saltRounds = 10;
const SECRET_KEY = '123'; 

export const registerUser = async (username: string, displayName: string, password: string) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    return await User.create({
        username,
        displayName,
        passwordHash,
        passwordSalt: salt,
    });
};

export const loginUser = async (username: string, password: string) => {
    const user = await User.findOne({ where: { username } });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    return { user, token };
};

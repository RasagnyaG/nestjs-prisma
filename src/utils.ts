import * as bcrypt from 'bcryptjs';

export const salt = bcrypt.genSaltSync(Number(process.env.ITERATIONS));

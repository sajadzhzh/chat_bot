import argon2 from "argon2";

export async function Hash(password: string){
    const hashedPassword = await argon2.hash(password);

    return hashedPassword
}

export async function VerifyPass(oldPass: string, enterdPass: string){
    const isValid = await argon2.verify(oldPass, enterdPass)

    return isValid
}
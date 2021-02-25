import "reflect-metadata";
import {Connection, createConnection, LessThan} from "typeorm";
import { User } from "../models/users";

export const createUser = async (): Promise<void> => {
    console.log("Photo has been saved");
}

const withDatabase = async (funcToExecute: Function) => {
    const connection = await createConnection();
    await funcToExecute(connection)
    await connection.close()
}

const selectExample = async (connection: Connection) => {
    const result = await connection.getRepository(User).createQueryBuilder("user").where("user.id = :id", { id: 1 }).getMany()
    console.log(result)
}

const selectExample2 = async (connection: Connection) => {
    const result = await connection.getRepository(User).find({id: LessThan(33)})
    console.log(result)
}


const insertExample = async (connection: Connection) => {
    let aUser = new User();
    aUser.name = "Me and Bears";
    await connection.manager.save(aUser).catch(e=>{console.log(e)})
}
const updateExample = async (connection: Connection) => {
    await connection.getRepository(User).update(16, {name: "Jonas"} )
}
const deleteExample = async (connection: Connection) => {
    // Delete everything
    await connection.getRepository(User).delete({})
}
// IMPORTANT: TAKE ONLY THE LOGIC AND REPEAT THE CONNECTION THIS TEST OPS AND WITH DATABASE ARE HELPERS TO TEST THE ORM BUT THERE ARE NOT INTENDED TO BE USE ON AN INTERVIEW
export const testOps = async() => {
    await withDatabase(selectExample)
    await withDatabase(selectExample2)
    // await withDatabase(deleteExample)
    await withDatabase(insertExample)
    await withDatabase(updateExample)
    await withDatabase(selectExample2)
}
import { Template } from "./Domain/Entities/_TEMPLATE"
import { AppDataSource } from "./Infrastructure/TypeOrm/data-source"

AppDataSource.initialize().then(async () => {
    console.log("Inserting a new user into the database...")
    const user = new Template()
    user.description = "Timber"
    user.isPublished = true
    user.name = '25'
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(Template)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))

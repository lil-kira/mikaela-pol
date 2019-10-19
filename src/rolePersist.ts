import { GuildMember, Collection, Role } from 'discord.js';
import { IUser } from './db/user';
import { getUser, addUser, updateUser } from './db/userController';
import { PersistantRoles } from './config';

export async function updateMemberRoles(member: GuildMember) {

    const user: IUser = {
        username: member.user.username, tag: member.user.tag, id: member.id, roles: []
    }

    getUser(user.tag).then(userFound => {
        console.log(`found existing user.. ${user.tag}`)
        member.roles.map(rl => user.roles.push({ name: rl.name, id: rl.id }))
        updateUser(user.tag, user)
    }).catch(err => {
        member.roles.map(rl => {
            if (PersistantRoles.find(prole => prole.id === rl.id)) {
                user.roles.push({ name: rl.name, id: rl.id })
            }
        })

        console.log(`user ${user.tag} does not exist, creating user now`)
        addUser(user)
    })
}

//Used to sync left member with their saved roles
export async function setMemberRoles(member: GuildMember) {
    const user: IUser = {
        username: member.user.username, tag: member.user.tag, id: member.id, roles: []
    }

    getUser(user.tag).then(userFound => {
        console.log(`found existing user.. ${user.tag}`)
        const roles: Collection<string, Role> = new Collection()

        if (!(userFound instanceof GuildMember)) return

        userFound.roles.map(rl => {
            roles.set(rl.id, member.guild.roles.get(rl.id))
        })

        member.setRoles(roles)
    }).catch(err => {
        member.roles.map(rl => user.roles.push({ name: rl.name, id: rl.id }))
        console.log(`user ${user.tag} does not exist, creating user now`)
        addUser(user)
    })
}
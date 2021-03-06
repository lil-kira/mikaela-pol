"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Style_1 = require("../util/Style");
const maxPurgeLimit = 15;
exports.command = {
    name: 'purge',
    description: 'purges messages',
    args: true,
    aliases: [],
    perms: ["admin"],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let amount = Number(args.shift());
            if (isNaN(amount))
                return Style_1.QuickEmbed("amount must be a number", message);
            if (amount > maxPurgeLimit)
                return Style_1.QuickEmbed(`Max Limit ${maxPurgeLimit}`, message);
            if (amount <= 0)
                return Style_1.QuickEmbed("amount must be greater then 0", message);
            console.log("purging...");
            message.channel.fetchMessages({ limit: amount + 1 }).then(msg => {
                message.channel.bulkDelete(msg);
            });
        });
    }
};

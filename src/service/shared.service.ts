import { GuildMember, Message } from 'discord.js';
import { injectable } from 'inversify';
import { IGuild, IGuildMember, IMessageReaction} from '../interface/discord.interface';

interface axiosConfig{
    method: string,
    route: string,
    body?: any
}


@injectable()
export class SharedService{

	////Extract users and channel info
	extractGuildInfo(content: Message) {
		const guild = new IGuild(
			content.guildId,
			content.guild.name,
			content.channelId,
			content.id,
			content.author.id,
			content.author.username,
			content.author.avatar,
			content.content,
			content.author.bot,
			content,
			{}
		);

		return guild;
	}
	////Extract users and channel info
	extractGuildFromMember(member: GuildMember) {
		const guild = new IGuildMember(
			member.guild.id,
			member.user.id
		);

		return guild;
	}

	////Extract Info from raw events
	extractGuildFromRaw(event) {
		const isBot = process.env.KITTY_CHAN_ID === event.d.user_id;
		const guild = {
			guildId: event.d.guild_id,
			channelId: event.d.channel_id,
			messageId: event.d.message_id,
			userId: event.d.user_id,
			emoji: event?.d?.emoji,
			isBot
		} as IMessageReaction;

		return guild;
	}

}
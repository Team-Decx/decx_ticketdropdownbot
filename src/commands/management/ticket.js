const discord = require('discord.js');
const { ticketChannelId } = require('../../config/config.json');

module.exports = {
    name: 'ticket',
    description: 'Criar mensagem de ticket.',
    type: discord.ApplicationCommandType.ChatInput,
    adminOnly: true,
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'Você não tem permissões para isso.', ephemeral: true });
        const ticketChannel = client.channels.cache.find(channel => channel.id === ticketChannelId);
        if (interaction.channel.id !== ticketChannelId) return interaction.reply({ content: `Você não pode utilizar esse comando nesse chat. Utilize ${ticketChannel}` });

        const embed = new discord.EmbedBuilder()
            .setAuthor({ name: 'Ticket System' })
            .setDescription(`Selecione uma categoria abaixo para entrar em **CONTATO**`)
            .setColor('#2f3136')

        const ticketRow = new discord.ActionRowBuilder()
            .addComponents(
                new discord.SelectMenuBuilder()
                    .setCustomId('ticketMenu')
                    .setPlaceholder('Selecione aqui o motivo')
                    .addOptions(
                        {
                            label: 'Dúvida',
                            description: 'Clique aqui para tirar sua dúvida.',
                            value: 'questionOption',
                        },
                        {
                            label: 'Compra',
                            description: 'Clique aqui para efetuar uma compra.',
                            value: 'buyOption',
                        },
                    )
            );

        interaction.deferReply();
        interaction.deleteReply();
        return await ticketChannel.send({ embeds: [embed], components: [ticketRow]});
    },
};
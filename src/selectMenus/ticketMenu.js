const discord = require('discord.js');

module.exports = {
    config: {
        customId: 'ticketMenu',
    },
    run: async (client, interaction) => {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const guildChannels = guild.channels.cache;
        const ticketChannelName = `ticket-${interaction.user.username.toLowerCase()}`;

        const errorEmbed = new discord.EmbedBuilder()
            .setDescription('Você já possui um ticket aberto! Encerre o atual para abrir um novo.')
            .setColor('2F3136')

        for (const channel of guildChannels.values()) {
            if (channel.name.startsWith('ticket')) {
                let ticketOwnerId = channel.topic;
                if (ticketOwnerId === interaction.user.id) {
                    return interaction.reply({ ephemeral: true, embeds: [errorEmbed] });
                }
            }
        }

        const ticketChannel = await guild.channels.create({
            name: `${ticketChannelName}`,
            type: discord.ChannelType.GuildText,
            //parent: 'DIDSSD',
            topic: `${interaction.user.id}`,
            permissionsOverwrites: [
                {
                    id: interaction.user.id,
                    allows: [discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.ViewChannel]
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: [discord.PermissionFlagsBits.ViewChannel]
                },
            ],
        });


        let ticketOption = '';

        if (interaction.values[0] === 'questionOption') {
            ticketOption = 'Dúvida.';
        } else if (interaction.values[0] === 'buyOption') {
            ticketOption = 'Compra.';
        }

        const ticketMenuEmbed = new discord.EmbedBuilder()
            .setAuthor({ name: 'Ticket System' })
            .setDescription('Seja bem vindo(a) ao seu **TICKET**, entraremos em contato em breve.')
            .addFields([
                {
                    name: '**MOTIVO**',
                    value: `\`${ticketOption}\``,
                    inline: true,
                }
            ])
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor('#2f3136')

        const ticketButtonsPainel = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder()
                    .setCustomId('endTicket')
                    .setLabel('Encerrar Ticket')
                    .setStyle('Secondary')
            )

        await ticketChannel.send({ embeds: [ticketMenuEmbed], content: `||<@${interaction.user.id}>||`, components: [ticketButtonsPainel] });

        const sucessEmbed = new discord.EmbedBuilder()
            .setDescription('Seu ticket foi criado com sucesso.')
            .setColor('#2f3136')

        const goToTicketChannelButton = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder()
                    .setLabel('Ir para Ticket')
                    .setURL(ticketChannel.url)
                    .setStyle('Link')
            )

        await interaction.reply({embeds: [sucessEmbed], components: [goToTicketChannelButton], ephemeral: true});

    },
}

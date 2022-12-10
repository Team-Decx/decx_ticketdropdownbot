module.exports = async (client) => {
    const status = [
		'🥇 Entre em nosso \n server: https://discord.com/invite/dX5RtYepjp.',
	];
	i = 0;
	client.user.setActivity(status[0]);
	client.user.setStatus('online');
	console.log('😍 ' + client.user.username + ' started working!');
};
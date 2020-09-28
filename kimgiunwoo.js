const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('봇 활성화 완료!');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '/zhelp') {
    return message.reply('```명령어 !전체공지 ```');
  }
  if(message.author.bot) return;

  if(message.content == '견우야 안녕') {
    return message.reply("왜 병신아");
  }
  if(message.author.bot) return;

  if(message.content == '나 잘생겼지') {
    return message.reply("아니 존나 못생겼어 내가 더 잘생긴듯 ");
  }
  if(message.author.bot) return;

  if(message.content == '김견우 병신') {
    return message.reply("그건 인정...");
  }
  if(message.content == '정영록 알아?') {
    return message.reply("아~ 그 멍청이?");
  }
  if(message.content == '임민수 알아?') {
    return message.reply("아~ 그 남고 숙사련ㅋㅋ");
  }
  if(message.content == '임민수 알아?') {
    return message.reply("아~ 그 남고 숙사련ㅋㅋ");
  }
 
 
  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(` ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

client.login(token);

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
  if(message.content == '황우솔 알아?') {
    return message.reply("아~ 그 메이플 충?");
  }
   if(message.content == '이하율 알아?') {
    return message.reply("아~ 그 임민수 따까리?? https://cdn.discordapp.com/attachments/759667844430168074/759995177422684220/image0.jpg");
  }
   if(message.content == '최유민 알아?') {
    return message.reply("이이잉~~~~ 기뭐링~~~\n https://cdn.discordapp.com/attachments/759706035803521054/760156715756290098/image0.jpg");
  }
  if(message.content.startsWith('!전체공지')) {
    if(!message.member.roles.find(role => role.name === '찬진')) return message.channel.send('너는 챌린저가 아니잖아?!?! 아이언 같은놈이 챌린저 찍고 와라!')
     .then(msg => msg.delete(3000));  
    
     message.reply('pong');
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
client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  if(checkPermission(message)) return
  // If the message content starts with "!kick"
  if (message.content.startsWith('!킥')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
});
 if(message.content.startsWith('/cc')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('/cc '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
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

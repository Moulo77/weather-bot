const fetch = require('node-fetch');
const discord = require('discord.js');
const Canvas = require('canvas');
const client = new discord.Client({intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES]});
const token = 'OTE1NTkzMjMxMTcyMDEwMDA0.Yad2pQ._RbJHGH__g69_LZHFXJvKDjK-PM';
const apiKey = '08a95a313addec0be8e31209e7c984a0';
const PREFIX = "!";

client.once('ready', ()=> {
    console.log('Bravo bg ca fonctionne');
});

client.on("messageCreate", message =>{
    if(message.content.startsWith(PREFIX)){
        const [cmd_name, ...args] = message.content.trim().substring(PREFIX.length).split(" ");
        
        if(cmd_name === "w" &&  args.length){
            if(args[0] === "help"){
                message.reply(`use \`!w <city name>\` to know the weather in this city\n__options__ :\n     - **units** as Kelvin, Celsius, Fahrenheit  *optionnal*\n     - **all** to get further informations`);
            }else{
                const city = args[0];
                const units = ["celsius", "kelvin", "fahrenheit"];
                let unit = "metric";
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
                let unitSign = "°C";

                if(args[1] && units.includes(args[1])){
                    unit = args[1];
                    switch(unit.toLowerCase()){
                        case "celsius": break;
                        case "kelvin": unitSign="K";unit="standard";break;
                        case "fahrenheit": unitSign="°F";unit="imperial";break;
                    }
                    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
                }

                fetch(url)
                    .then(response => response.json())
                    .then(data =>{
                        const { main, name, weather, wind, lastupdate} = data;
                        let title = `Weather in ${name}`;

                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(title)
                            .setThumbnail('http://openweathermap.org/img/wn/'+weather[0].icon+'@2x.png')
                            .addFields(
                                { name: 'Temperature', value: `${main.temp}${unitSign}` },
                                { name: 'Wheather', value: `${weather[0].description}`},
                                { name: 'Wind', value: `${wind.speed}m/s`},
                            )
                            .setTimestamp();
                            if(args.includes('all')){
                                exampleEmbed.addFields(
                                    { name: 'Pressure', value: `${main.pressure}hPa`},
                                );
                            }

                        
                        message.reply({embeds: [exampleEmbed]});
                    })
                    .catch((error)=>{
                        message.channel.send(error.message);
                    });
            }
        }else{
            message.reply(`You have to provide an argument \`!w <city name>\`. Type \`!w help\` for further informations`);
        }
    }
});

client.login(token);
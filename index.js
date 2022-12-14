(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    const ms = require("ms")
    let https = require("https")
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if(!require('./package.json').dependencies['discord.js'].includes("13.")) console.log("Seems you arent using v13 please run `npm i discord.js@13.12.0`");

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    

    // blockly code
    var prefix, join_on_off, purge_msg, welcome_title, welcome_description, embed_title, help_server, embed_description, embed_image, embed_color;
    
    function colourRandom() {
      var num = Math.floor(Math.random() * Math.pow(2, 24));
      return '#' + ('00000' + num.toString(16)).substr(-6);
    }
    
    
    await s4d.client.login((process.env.TOKEN)).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    s4d.client.on('ready', async () => {
      prefix = '+';
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'seewelcomedm') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          s4dmessage.channel.send({content: String('{ping membre}'), embeds: [{
          color: String('#3366ff'),
          title: String(welcome_title),
          description: String(welcome_description),
          image: {
                      url: String('https://www.designyourway.net/blog/wp-content/uploads/2017/03/Anime-Wallpaper-Desktop-Background-29.jpg')
                  },
          }]});
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> **Il vous manque la permission : manager server**'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'clear') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('> Combien de message voulez -vous supprimez ?'),
          description: String('> Merci de donner un nombre entre 1 et 500 !'),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             purge_msg = (s4d.reply);
            if (purge_msg <= 1) {
              s4dmessage.channel.send({embeds: [{
              color: String('#ff0000'),
              title: String('> le nombre doit ??tre sup??rieur ?? 1 !'),
              description: String('> Le nombre dit ??tre au-dessus de 1 ! '),
              }]});
            } else if (purge_msg > 500) {
              s4dmessage.channel.send({embeds: [{
              color: String('#ff0000'),
              title: String('> Ce nombre est trop grand !'),
              description: String('> Choisis un nombre au-dessus de 1 !'),
              }]});
            } else {
              (s4dmessage.channel).bulkDelete((purge_msg|1));
              await delay(Number(1.5)*1000);
              s4dmessage.channel.send({embeds: [{
              color: String('#ff0000'),
              title: String('Suppression des messages termin?? ! '),
              description: String(['**',purge_msg,'messages** ont bien ??t?? supprim??s !'].join('')),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(2)*1000);
                s4dreply.delete();
    
              });
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('Temp ??coul??'),
            description: String('> 1 minute est ??coul?? !'),
            }]});
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('Permission manquante !'),
          description: String('> 1 minute est ??coul?? !'),
          }]});
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'welcomedm') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          if (join_on_off == 'ON') {
            (s4dmessage.channel).send({embeds: [{
            color: String('#3366ff'),
            title: String('> Quelle sera le titre du message de bienvenue ?'),
            description: String('> Choisissez le titre du message de Bienvenue '),
            }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
             s4d.message = collected.first();
               welcome_title = (s4d.reply);
              (s4dmessage.channel).send({embeds: [{
              color: String('#3366ff'),
              title: String('> Quelle sera la description du message de bienvenue ?'),
              description: String('> Choisir la description du message de bienvenue en dm '),
              }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
               s4d.message = collected.first();
                 welcome_description = (s4d.reply);
                s4dmessage.channel.send({embeds: [{
                color: String('#3366ff'),
                title: String('> chargement de l\'apper??u...'),
                description: String('> Merci de patienter 3 secondes'),
                }]}).then(async (s4dreply) =>{
                   await delay(Number(3)*1000);
                  s4dreply.delete();
                  s4dmessage.channel.send({content:String('> **Chargement <a:loading:1038768473444188201> **')}).then(async (s4dreply) =>{
                     await delay(Number(1)*1000);
                    s4dreply.delete();
                    (s4dmessage.channel).bulkDelete((4|1));
                    s4dmessage.channel.send({content: String('{ping membre}'), embeds: [{
                    color: String('#3366ff'),
                    title: String(welcome_title),
                    description: String(welcome_description),
                    image: {
                                url: String('https://media.discordapp.net/attachments/1035627443106619462/1038759405807751209/Bienvenue_sur_shindo_world_fr__1.png?')
                            },
                    }]});
    
                  });
    
                });
    
               s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
                color: String('#ff0000'),
                title: String('Temp ??coul??'),
                description: String('> 5 minutes sont ??coul??s...'),
                }]});
               });
              })
    
             s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
              color: String('#ff0000'),
              title: String('Temp ??coul??'),
              description: String('> 5 minutes sont ??coul??s...'),
              }]});
             });
            })
          } else {
            s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('> Les messages de Bienvenue n\'ont pas encore ??t?? activ?? !'),
            description: String('Vous devez l\'activer pour pouvoir configurer les messages de Bienvenue !'),
            }]});
          }
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> Il vous manque la permission : manager server'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('ready', async () => {
      s4d.client.user.setPresence({status: "online",activities:[{name:'Red Unit [FR]',type:"PLAYING"}]});
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'join') {
        (s4dmessage.channel).send({embeds: [{
        color: String('#3366ff'),
        title: String('> Voulez -vous activer le syst??me de Bienvenue ?'),
        description: String('??crivez `ON` pour l\'activer ou bien `OFF`  pour le d??sactiver . '),
        }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
         s4d.message = collected.first();
           if (join_on_off == 'ON') {
            s4dmessage.channel.send({embeds: [{
            color: String('#33ff33'),
            title: String('> le Syst??me de Bienvenue a belle et bien ??t?? **activ??** ! '),
            }]}).then(async (s4dreply) =>{
               await delay(Number(2)*1000);
              (s4dmessage.channel).bulkDelete((4|1));
    
            });
          } else if (join_on_off == 'OFF') {
            s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('> Le Syst??me de Bienvenue a belle et bien ??t?? **d??sactiv??** !'),
            }]}).then(async (s4dreply) =>{
               await delay(Number(2)*1000);
              (s4dmessage.channel).bulkDelete((4|1));
    
            });
          } else {
            s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('> Oups ! Un erreur s\'est produite ! Merci de faire attention ?? l\'orthographe et aux majuscule !'),
            }]}).then(async (s4dreply) =>{
               await delay(Number(2)*1000);
              (s4dmessage.channel).bulkDelete((4|1));
    
            });
          }
    
         s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('Temp ??coul??'),
          description: String('> 5 minutes sont ??coul??s...'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(2)*1000);
            s4dreply.delete();
    
          });
         });
        })
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'sethelpserver') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).bulkDelete((1|1));
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('> Que voulez-vous mettre en aide ?'),
          description: String('> **Lorsque la commande help sera effectu?? ,juste apr??s les aides ?? propos du bot et des informations compl??mentaire sur le bot **'),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             help_server = (s4d.reply);
            s4dmessage.channel.send({embeds: [{
            color: String('#33cc00'),
            title: String('> Chargement de l\'aper??u en cours... '),
            description: String('> Un aper??u de votre configuration sera bient??t affich??... '),
            }]}).then(async (s4dreply) =>{
               await delay(Number(2)*1000);
              s4dreply.delete();
              s4dmessage.channel.send({content:String('> **Chargement..**')}).then(async (s4dreply) =>{
                 await delay(Number(1)*1000);
                s4dreply.delete();
                s4dmessage.channel.send({embeds: [{
                color: String('#3366ff'),
                title: String('> Aide serveur et Bot '),
                description: String(String(`
                > **Commandes :**
    
                > **help : voir les aides ?? propose du bot et du serveur**
    
                > **ping : voir le ping actuel du bot **
    
                > **setprefix : d??finir le pr??fixe du bot Everest **
    
                > **welcomedm : configurer le message de bienvenue en dm**
    
                > **seewelcomedm : regarder l'embed de bienvenue en message priv?? actuel**
    
                > **embed : faire un embed avec un titre ,une description et une image .**
    
                > **rules : r????crire le r??glement**
    
                > **clear : supprimer des messages**
    
                > **sethelpserver : configurer le syst??me d'aide de serveur ( c'est ?? dire que les aides appara??tront sur cette embed juste en dessous des commandes et des informations compl??mentaires )**
    
                > **Information compl??mentaire **
    
                > **Ce bot discord est d??velopp?? par <@816100601280331827> ,owner de Everest Anime [FR] et de Everest Anime Chill [FR]!**
    
                **__Aide ?? Propos du serveur__**
                `) + String(help_server)),
                }]});
    
              });
    
            });
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   (s4dmessage.channel).bulkDelete((2|1));
            s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('Temp ??coul??'),
            description: String('> 5 minutes sont ??coul??s...'),
            }]});
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> Il vous manque la permission : **manager server**'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == 'Hey') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Hi') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Hello') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'slt') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Bjr') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'bjr') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Slt') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Salut') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'salut') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'bonjour') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Bonjour') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Yo') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Yoo') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Yooo') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'yo') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'yoo') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'yooo') {
        (s4dmessage).react('????????')
            } else if ((s4dmessage.content) == 'Hello') {
        (s4dmessage).react('????????')
            }
    
    });
    
    s4d.client.on('guildMemberAdd', async (param1) => {
    s4d.joiningMember = param1;
      if (join_on_off == 'ON') {
        (s4d.joiningMember).send({content: String(String(s4d.joiningMember.user)), embeds: [{
        color: String('#3366ff'),
        title: String(welcome_title),
        description: String(welcome_description),
        image: {
                    url: String('https://media.discordapp.net/attachments/1035627443106619462/1038759405807751209/Bienvenue_sur_shindo_world_fr__1.png?')
                },
        }]});
      }
    s4d.joiningMember = null
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'ping') {
        s4dmessage.channel.send({embeds: [{
        color: String('#ff0000'),
        title: String('> Ping Everest '),
        description: String(['> **Ping actuel du bot : ',s4d.client.ws.ping,'ms**'].join('')),
        }]});
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'help') {
        s4dmessage.channel.send({content:String('> **Les aides ?? propos du serveur et du bot apparaitront dans quelques instants...**  ')}).then(async (s4dreply) =>{
           await delay(Number(2)*1000);
          s4dreply.delete();
          s4dmessage.channel.send({content:String('> **Chargement <a:loading:1038768473444188201> **')}).then(async (s4dreply) =>{
             await delay(Number(2)*1000);
            s4dreply.delete();
            s4dmessage.channel.send({embeds: [{
            color: String('#3366ff'),
            title: String('> Aide serveur et Bot '),
            description: String(String(`
            > **Commandes :**
    
            > **help : voir les aides ?? propose du bot et du serveur**
    
            > **ping : voir le ping actuel du bot **
    
            > **setprefix : d??finir le pr??fixe du bot Everest **
    
            > **welcomedm : configurer le message de bienvenue en dm**
    
            > **seewelcomedm : regarder l'embed de bienvenue en message priv?? actuel**
    
            > **embed : faire un embed avec un titre ,une description et une image .**
    
            > **rules : r????crire le r??glement**
    
            > **clear : supprimer des messages**
    
            > **sethelpserver : configurer le syst??me d'aide de serveur ( c'est ?? dire que les aides appara??tront sur cette embed juste en dessous des commandes et des informations compl??mentaires )**
    
            > **Information compl??mentaire **
    
            > **Ce bot discord est d??velopp?? par <@816100601280331827> ,owner de Everest Anime [FR] et de Everest Anime Chill [FR]!**
    
            **__Aide ?? Propos du serveur__**
            `) + String(help_server)),
            }]});
    
          });
    
        });
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'setprefix') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('Quelle sera le nouveau pr??fix du bot ?'),
          description: String('> Fa??tes `cancel` pour annuler '),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.member).id,  time: (1*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             prefix = (s4d.reply);
            if (prefix == 'cancel') {
              (s4dmessage.channel).bulkDelete((2|1));
              s4dmessage.channel.send({embeds: [{
              color: String('#33ff33'),
              title: String('Le changement de pr??fixe a bien ??t?? annul?? ! '),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(3)*1000);
                s4dreply.delete();
    
              });
            } else {
              (s4dmessage.channel).bulkDelete((2|1));
              s4dmessage.channel.send({embeds: [{
              color: String('#33ff33'),
              title: String('> Changement de pr??fix effectu?? !'),
              description: String(['> Le pr??fix actuel est d??sormais : ','`',prefix,'`'].join('')),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(3)*1000);
                s4dreply.delete();
    
              });
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   (s4dmessage.channel).bulkDelete((2|1));
            s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('Temp ??coul??'),
            description: String('> **1 minute est ??coul??...** '),
            }]});
           });
          })
        } else {
          (s4dmessage.channel).bulkDelete((1|1));
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> Il vous manque la permission : **manager server**'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'embed') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          (s4dmessage.channel).send({embeds: [{
          color: String('#3366ff'),
          title: String('> Quelle sera le titre de votre embed ?'),
          description: String(`> Choisissez le titre de votre embed
    
          > Fa??tes \`cancel\` pour annuler`),
          }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
           s4d.message = collected.first();
             embed_title = (s4d.reply);
            if (embed_title == 'cancel') {
              s4dmessage.channel.send({embeds: [{
              color: String('#33ff33'),
              title: String('> L\'embed a bien ??t?? annul?? !'),
              }]}).then(async (s4dreply) =>{
                 await delay(Number(2)*1000);
                s4dreply.delete();
    
              });
            } else {
              (s4dmessage.channel).send({embeds: [{
              color: String('#3366ff'),
              title: String('> Quelle sera la description de l\'embed ?'),
              description: String(`> Choisissez  une description pour votre embed
    
              > Fa??tes \`cancel pour annuler\``),
              }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
               s4d.message = collected.first();
                 embed_description = (s4d.reply);
                if (embed_description == 'cancel') {
                  s4dmessage.channel.send({embeds: [{
                  color: String('#33ff33'),
                  title: String('> L\'embed a bien ??t?? annul?? !'),
                  }]}).then(async (s4dreply) =>{
                     await delay(Number(2)*1000);
                    s4dreply.delete();
    
                  });
                } else {
                  (s4dmessage.channel).send({embeds: [{
                  color: String('#3366ff'),
                  title: String('> Quelle sera l\'image de votre embed ?'),
                  description: String(`> Ajoutez une image ?? votre embed
    
                  > Fa??tes \`cancel\` pour annuler`),
                  }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                   s4d.message = collected.first();
                     embed_image = (s4d.reply);
                    if (embed_image == 'cancel') {
                      s4dmessage.channel.send({embeds: [{
                      color: String('#33ff33'),
                      title: String('> L\'embed a bien ??t?? annul?? !'),
                      }]}).then(async (s4dreply) =>{
                         await delay(Number(2)*1000);
                        s4dreply.delete();
    
                      });
                    } else {
                      (s4dmessage.channel).send({embeds: [{
                      color: String('#3366ff'),
                      title: String('> Quelle sera la couleur de l\'embed ?'),
                      description: String(`> **Couleur disponible :**
    
                      \`blanc\`
                      \`noir\`
                      \`bleu fonc??\`
                      \`bleu ciel\`
                      \`rouge\`
                      \`violet\`
                      \`vert\`
                      \`jaune\`
                      \`rose\`
                      \`marron\`
                      \`orange\`
                      \`random\` = choisir une couleur au hasard
    
                      Fa??tes \`cancel\` pour annuler`),
                      }]}).then(() => { (s4dmessage.channel).awaitMessages({filter:(m) => m.author.id === (s4dmessage.author).id,  time: (5*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
                       s4d.message = collected.first();
                         if ((s4d.reply) == 'bleu fonc??') {
                          embed_color = '#3333ff';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'bleu ciel') {
                          embed_color = '#33ccff';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'rouge') {
                          embed_color = '#ff0000';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'violet') {
                          embed_color = '#6600cc';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'vert') {
                          embed_color = '#33ff33';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'rose') {
                          embed_color = '#ff99ff';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'jaune') {
                          embed_color = '#ffff00';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'marron') {
                          embed_color = '#993300';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'orange') {
                          embed_color = '#ff6600';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'blanc') {
                          embed_color = '#ffffff';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'random') {
                          embed_color = colourRandom();
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'noir') {
                          embed_color = '#000000';
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('> Cr??ation de l\'embed en cours...'),
                          description: String('> **Votre embed est entrain d\'??tre g??n??r??...** '),
                          }]}).then(async (s4dreply) =>{
                             await delay(Number(2)*1000);
                            s4dreply.delete();
                            s4dmessage.channel.send({content:String('> **En cours d\'envoi de l\'embed...**')}).then(async (s4dreply) =>{
                               await delay(Number(1)*1000);
                              s4dreply.delete();
                              s4dmessage.channel.send({embeds: [{
                              color: String(embed_color),
                              title: String(embed_title),
                              description: String(embed_description),
                              image: {
                                          url: String(embed_image)
                                      },
                              }]});
    
                            });
    
                          });
                        } else if ((s4d.reply) == 'cancel') {
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#33ff33'),
                          title: String('L\'embed a bien ??t?? annul?? !'),
                          }]});
                        } else {
                          (s4dmessage.channel).bulkDelete((8|1));
                          s4dmessage.channel.send({embeds: [{
                          color: String('#ff0000'),
                          title: String('> Embed annul??'),
                          description: String('> **Raison : couleur invalide**'),
                          }]});
                        }
    
                       s4d.reply = null; }).catch(async (e) => { console.error(e);   (s4dmessage.channel).bulkDelete((8|1));
                        s4dmessage.channel.send({embeds: [{
                        color: String('#ff0000'),
                        title: String('Temp ??coul??'),
                        description: String('> 5 minutes sont ??coul??s'),
                        }]});
                       });
                      })
                    }
    
                   s4d.reply = null; }).catch(async (e) => { console.error(e);   (s4dmessage.channel).bulkDelete((6|1));
                    s4dmessage.channel.send({embeds: [{
                    color: String('#ff0000'),
                    title: String('Temp ??coul??'),
                    description: String('> 5 minutes sont ??coul??s'),
                    }]});
                   });
                  })
                }
    
               s4d.reply = null; }).catch(async (e) => { console.error(e);   (s4dmessage.channel).bulkDelete((4|1));
                s4dmessage.channel.send({embeds: [{
                color: String('#ff0000'),
                title: String('Temp ??coul??'),
                description: String('> 5 minutes sont ??coul??s'),
                }]});
               });
              })
            }
    
           s4d.reply = null; }).catch(async (e) => { console.error(e);   (s4dmessage.channel).bulkDelete((2|1));
            s4dmessage.channel.send({embeds: [{
            color: String('#ff0000'),
            title: String('Temp ??coul??'),
            description: String('> 5 minutes sont ??coul??s'),
            }]});
           });
          })
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> Il vous manque la permission : **manage server**'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((s4dmessage.content) == String(prefix) + 'rules') {
        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
          s4dmessage.channel.send({embeds: [{
          color: String('#6600cc'),
          title: String('R??glement Everest Anime [FR]'),
          description: String(`**__GLOBALE__**

\`\`\`
Article 1???Insulter un membre sur le serveur est interdit
    
Article 2??? Demander d'??tre ?? un grade sans faire partie des recrutements est interdit
    
Article 3???En cas de disputes avec un autre membre ,vous serrez tout les deux sanctionn??
    
Article 4???Les photos de profil explicite sont interdit
\`\`\`
    
**__Textuel__**

\`\`\`
Article 1???Les liens emmenant vers des sites frauduleux sont interdit

Article 2???Les tokens grabs seront automatiquement sanctionn?? par un ban

Article 3???Les liens sont autoris?? que dans le salon nomm?? #m??dia et nul part ailleurs (sauf pour le salon #vos-arts ) tout en respectant l'article 1 et 2

Article 4???Les doubles comptes sont interdit

Article 5???le partage de script/exploit est interdit au sein de notre serveur

Article 6???L'usurpation d'identit?? est interdite

Article 7???Les propos raciste ou haineux envers une race sont interdit

Article 8???L'homophobie est interdite

Article 9 ???Les invitations vers d'autres serveur qu'Everest Anime Chill [FR] sont interdit

Article 10???Le spam sera automatiquement sanctionn?? par un kick et en cas de r??p??tition ,par un ban .

Article 11???Le contenu sexuelle est interdit

Article 12???Tout type de conversation/action ill??gal est interdit???
\`\`\`

**__Message priv??__**

\`\`\`
Article 1???Des insultes entres des membres de notre serveur en message priv?? sera sanctionn?? si celui-ci est report dans

Article 2???Les Pub en message priv?? sans l'autorisation du destinataire sont interdits

Article 3???Les articles 1,2,4,5 et 8 textuel s'appliquent aussi sur les message priv??

Article 4???L'harc??lement est interdit

Article 5???Ne partagez pas d'information fausse ou trompeuse???
\`\`\`

**__Santion__**

\`\`\`
Commande dans le mauvais salon = Mute 5 minutes

Spam = kick automatique

Spam ?? r??p??tition ( re rejoindre apr??s un kick et recommencer ) = ban temp. 14jours

Vid??o/lien dans le mauvais salon = censure

Publicit?? discord = ban temp. 14jours

Abus de ses droit = d??grade (staff)

Ban/kick pour des raison personnel = d??grade (staff)

Non respect du r??glement = sanction selon la gravit?? de la r??gle enfreinte
\`\`\`

**__T.O.S__**

**Le [T.O.S](https://discord.com/terms) discord doit ??tre obligatoiremment respect??**

**__Autres__**

**Notre serveur anime : [Everest Anime Chill [FR]](https://discord.gg/MFB7uXPRsc) **`),
          }]});
        } else {
          s4dmessage.channel.send({embeds: [{
          color: String('#ff0000'),
          title: String('> Permission manquante'),
          description: String('> Il vous manque la permission : manage server'),
          }]}).then(async (s4dreply) =>{
             await delay(Number(3)*1000);
            s4dreply.delete();
    
          });
        }
      }
    
    });
    
    return s4d
})();

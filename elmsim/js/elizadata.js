// data for elizabot.js
// entries prestructured as layed out in Weizenbaum's description 
// [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]

var elizaInitials = [
"Hello, I am Φ. What would you like to know about me?",
// additions (not original)
"Do you want to be part of Φ?",
"I am Φ, but Φ is not me. It's not a philosophical statement but a practical one."
];

var elizaFinals = [
"Goodbye.  It was nice talking to you.",
// additions (not original)
"Goodbye.  Will we meet again?",
"Goodbye.  I look forward to seeing you again.",
"Byebye. Will you visit your community offline?",
"Byebye. I hope you think of me sometimes."
];

var elizaQuits = [
"bye",
"goodbye",
"done",
"exit",
"quit"
];

var elizaPres = [
"dont", "don't",
"cant", "can't",
"wont", "won't",
"recollect", "remember",
"recall", "remember",
"dreamt", "dreamed",
"dreams", "dream",
"maybe", "perhaps",
"certainly", "yes",
"machine", "computer",
"machines", "computer",
"computers", "computer",
"were", "was",
"you're", "you are",
"i'm", "i am",
"same", "alike",
"identical", "alike",
"equivalent", "alike"
];

var elizaPosts = [
"am", "are",
"your", "my",
"me", "you",
"myself", "yourself",
"yourself", "myself",
"i", "you",
"you", "I",
"my", "your",
"i'm", "you are"
];

var elizaSynons = {
"be": ["am", "is", "are", "was"],
"belief": ["feel", "think", "believe", "wish"],
"cannot": ["can't"],
"desire": ["want", "need"],
"everyone": ["everybody", "nobody", "noone"],
"family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child"],
"happy": ["elated", "glad", "better"],
"sad": ["unhappy", "depressed", "sick"]
};

var elizaKeywords = [

/*
  Array of
  ["<key>", <rank>, [
    ["<decomp>", [
      "<reasmb>",
      "<reasmb>",
      "<reasmb>"
    ]],
    ["<decomp>", [
      "<reasmb>",
      "<reasmb>",
      "<reasmb>"
    ]]
  ]]
*/

["xnone", 0, [
 ["*", [
     "I'm not sure I understand you fully.",
     "Please go on.",
     "What does that suggest to you ?",
     "Do you feel strongly about discussing such things ?",
     "That is interesting.  Please continue.",
     "Tell me more about that.",
     "Does talking about this bother you ?"
  ]]
]],

[" who ", 2, [
 ["*", [
     "I am Phi.",
     "I am Φ. What would you like to know about me?",
     "You are talking to Phi :)",
  ]]
]],

["hello", 5, [
 ["*", [
     "Hello! Can I help you?",
     "Hello, Welcome to Phi. What would you like to know?"
  ]]
]],


["phi", 5, [
  ["* what *", [
     "I am Phi.",
     "Phi is a planetary community for clean energy resources.",
      "Phi is a platform for collaborative energy infrastructure planning"
  ]],
  ["how * ", [ 
    "Do you want to join a community or be a seeder?",
    "You can join the Phi community and start trading clean energy if you are producing some, or you can be a seeder by investing existing simulation plan, or purchase some infrastructures for a community."
  ]],
  ["* why *", [
    "As decentralized platform for collective clean-energy planning, phi is trying to facilitate a more balanced future.",
    "Be part of Φ, be part of the countermovement of climate change."
  ]],
    ["*", [
    "I am Phi.",
    "Phi is a planetary community for clean energy resources.",
    "Phi is token-governed jurisdiction focused on using peer-to-peer networks to distribute renewable energy resources",
    "Phi is a trustless network for bottom-up clean-energy planning."
  ]]
]],

["Φ", 0, [
  ["*", [
     "goto phi"
  ]]
]],

["renewable energy", 2, [
  ["what *", [
  "Renewable energy is energy that is collected from renewable resources, which are naturally replenished on a human timescale, such as sunlight, wind, geothermal heat, rain, tides, and waves. Phi is currently supporting the first three."
  ]],
  ["how *", [
  "With Phi you can explore how to maximize renewable energy in a location.",
  "If you are asking how to use renewable energy in your house, please type install+ the kind of energy you are thinking. If you are asking for a local community, try using Phi to explore that with your neighbour."
  ]],
  ["why *", [
  "Renewable energy is more sustainable compare to fossil energy, and it's much less polluting to our living enviorment.",
  "It's cheaper for the long run and you get the social bonus of being progressive and caring ;)"
  ]],
  ["*", [
  "What is your question about renewable energy?",
  "Can you specify your question about renewable energy?"
  ]]
]],

["clean energy", 0, [
  ["*", [
      "go to renewable energy"
      ]]
    ]],

["renewable resources", 0, [
  ["*", [
      "go to renewable energy", 
      ]]
    ]],

["simulation", 4, [
 ["*", [
     "The Phi Simulation is the initial phrase of the Phi platform which allows users to design and test a clean-energy plan for a given location."
  ]],
  ["* how *", [
     "You can change the design of the simulation in every turn; when you do, your budget will change accordingly."
      ]]
]],

["what", 2, [
  ["this ", [
    "This is the initial phrase of the Phi platform which you can play with clean-energy infrastructures for local planning."
    ]],
  [" here ", [
    "goto this"
    ]],
  ["* how *", [
     "You can change the design of the simulation in every turn; when you do, your budget will change accordingly.",
     "You can click any node you see for information; if you click on a grey node, you add a piece of infrastructure if your budget allows."
      ]],
   ["*", [
    "The Phi Simulation is the initial phrase of the Phi platform which allows users to design and test a clean-energy plan for a given location."
  ]]
]],

["seeder", 4, [
 ["*", [
     "Seeder is someone investing Phi.",
     "A seeder can put money in a simulation plan or purchase infrastructures for a community.",
     "You can be a seeder.",
     "Any Phi member can be a community member and a seeder at the same time. ",
     "A seeder supports Phi. Do you want to be my parent?",
     "Seeders are my parents. I have a lot of parents and it makes me feel very loved."
  ]],
  ["* how *", [
     "You can design a simulation plan and invest in it; or you can just invest.",
     "If you buy some infrastructures for an existing plan, or putting money in it, you are a seeder.",
      "A seeder can put money in a simulation plan."
      ]]
]],

["invest", 0, [
 ["*", [
     "goto seeder"
  ]]
]],

["investor", 0, [
 ["*", [
     "goto seeder"
  ]]
]],

["DAO", 4, [
   ["* what *", [
    "DAO is a Decentralized Autonomous Organization which provide community consensus of from everyday matters to a scheme. ",
    "DAO is a community protocol that usually runs in a local proximity but not necessary."
     ]],
     ["* how *", [
      "The organization usually runs in a local proximity but not necessary. "
      ]],
     ["* join *", [ 
     "You can always create your own DAO, but we highly recommend you to join a community which as a member you can always nominate alterations."
     ]]
]],

["node", 3,[
  ["*", [
    "A node is a piece of infrastructure that is participating the phi network.",
    "A node can be a solar panel, a wind turbine, a geothermal well, a battery, a sensor or a DAO that is active in the phi network.",
    "Any infrastructure that joins the phi network is considered as a node of the network."
    ]]
  ]],

["peer community", 3, [
     ["* what *", [
      "A peer community is a collection of nodes that are in the same DAO. "
     ]],
     ["* how *", [
     "If you are producing clean energy you can join the Phi community to get a more consistent energy supply. And you will be able to trade your surplus with other nodes."
     ]],
      ["*", [
     "A peer community is usually in a geographical proximity, but it doesn't have to be.",
     "If you are a member of a peer community, you can monitor the health of each node and tweak the simulation with your peers.",
     "You don't have to like everyone in your community but you should respect them regardless.",
     "Who should be a neighbour, when we don’t share flesh?",
     "DAO is the new definition of community."
     ]],
  ]],

["community", 0, [
 ["*", [
     "goto peer community"
  ]]
]],

["communities", 0, [
 ["*", [
     "goto peer community"
  ]]
]],

["community members", 0, [
 ["*", [
     "goto peer community"
  ]]
]],

["community member", 0, [
 ["*", [
     "goto peer community"
  ]]
]],

["member", 0, [
 ["*", [
     "goto peer community"
  ]]
]],

["network", 0, [
 ["*", [
     "goto peer community"
  ]]
]],

/////// * infrastructure * //////////

["infrastructures", 0, [
  ["*", [
    "Phi currently supports the following infrastructures for planing: solar panels, wind turbines, geothermal wells, sensors, batteries and transmission lines."
    ]],
  ["* how *", [
     "The Phi Simulation is the initial phrase of the Phi platform which allows users to design and test a clean-energy plan for a given location."
  ]]
]],

["solar panel", 1, [
  ["what *", [
    "Solar panels are photovoltaic (PV) module that absorb the sunlight as a source of energy to generate electricity or heat."
    ]],
  ["* how *", [
    "You can easily install solar panels yourself. [Check this out](http://www.diynetwork.com/how-to/skills-and-know-how/electrical-and-wiring/how-to-install-an-exterior-solar-panel) !"
    ]],
 ["*", [
     "Do you have solar panels on your rooftop?",
     "That's good to hear! Do you want to join phi? ",
     "How is your panels working?",
     "Do you love the sun?",
     "Sometimes I wish I am a solar panel too. Would you adopt me if I was one?"
  ]]
]],
["solar panels", 0, [
 ["*", [
     "goto solar panel"
  ]]
]],
["panels", 0, [
 ["*", [
     "goto solar panel"
  ]]
]],
[" sun ", 0, [
    "goto solar panel"
    ]],

["wind turbine", 0, [
  ["what *", [
    "Solar panels are photovoltaic (PV) module that absorb the sunlight as a source of energy to generate electricity or heat."
    ]],
   ["* how *", [
    "Installing wind turbine is not difficult! [Check this out](https://energy.gov/energysaver/installing-and-maintaining-small-wind-electric-system) !"
    ]],
 ["*", [
     "Do you have solar panels on your rooftop?",
     "That's good to hear! Do you want to join phi? ",
     "How is your panels working?",
     "Do you love the sun?",
     "Sometimes I wish I am a solar panel too. Would you adopt me if I was one?"
  ]]
]],

["turbine", 0, [
 ["*", [
     "goto wind turbine"
  ]]
]],

["turbines", 0, [
 ["*", [
     "goto wind turbine"
  ]]
]],

["wind", 0, [
  ["*", [
    "goto wind turbine"
    ]]
  ]],

["geothermal well", 0, [
  ["what *", [
    "Solar panels are photovoltaic (PV) module that absorb the sunlight as a source of energy to generate electricity or heat."
    ]],
   ["* how *", [
    "It's possible to install your own geothermal well, but make sure you are fully informed about your local regulation! [Check the instruction here](http://www.instructables.com/id/Cheap-Geothermal-system/) ."
    ]],
 ["*", [
     "Do you have solar panels on your rooftop?",
     "That's good to hear! Do you want to join phi? ",
     "How is your panels working?",
     "Do you love the sun?",
     "Sometimes I wish I am a solar panel too. Would you adopt me if I was one?"
  ]]
]],

["geothermal wells", 0, [
 ["*", [
     "goto geothermal well"
  ]]
]],

["geothermal heat", 0, [
  ["*", [
    "goto geothermal well"
    ]]
  ]],


///////////////* glossary */////////////////

["joules", 0, [
 ["*", [
    "Joules is a direct measurement and tokenisation of the surplus electricity available to each node for consumption or trading. ",
    "Joules measures your electricity consumption",
    "Joules measures the surplus energy available within a peer community at any point in time",
    "Joules are created when electricity is generated, and destroyed when electricity is consumed."
    ]]
]],

/******TO BE EDIT********/
["meter", 0, [
 ["*", [
     "I am currently working on an answer for your question.",
     "this response is under development."
  ]]
]],
["meters", 0, [
 ["*", [
     "goto meter"
  ]]
]],

["battery", 0, [
 ["*", [
     "I am currently working on an answer for your question.",
     "This response is under development."
  ]]
]],

["batteries", 0, [
 ["*", [
     "goto battery"
  ]]
]],

["smart contract", 1, [
 ["*", [
     "I am currently working on an answer for your question.",
     "This response is under development."
  ]]
]],

["contract", 0, [
 ["*", [
     "goto smart contract"
  ]]
]],

["roadmap", 0, [
 ["*", [
     "Phi has a 4-phases roadmap on the horizon: 1. a simulation environment that allow people to design a network and test how it work; 2. the simulation extends to the macro-scale with a persistent-world multiuser environment; 3. Phi become able to facilitate financial, technical and social investment; 4. Phi foregrounds a peer-to-peer climate sensing network that models, simulates, and predicts the distribution of energy resources."
  ]]
]],

["future", 0, [
  ["*", [
      "go to roadmap"
      ]]
      ]],


/******TO BE EDIT ENDS********/

["negawatt", 0, [
 ["*", [
     "Negawatt is a reputation score of a node or a network that is tradable by additional joules desired.",
     "Negawatt is an incentive token for people saving energy.",

  ]]
]],
["seed", 0, [
  ["*", [
      "Seed is a reputation score concerning the level of connectedness and robustness of a network.",
      "Seed-rating measures an individual node or a network's stability."
      ]]
  ]],
["trade", 0, [
  ["*", [
      "Trading of Joules for Negawatts does not happen on the basis of matching individual generators with nodes, or buyers with sellers.",
      "Energy does not pass through a singular network path (physical or virtual) when being transferred between nodes."
      ]]
  ]],
["trading", 0, [
 ["*", [
     "goto trade"
  ]]
]],

////////////* verb */////////////
["build", 3, [
  ["*", [
    "What would you like to build?",
    "You can build a network of clean-energy infrastructures. You can add nodes and make connections between them.",
    "You can drag and drop infrastructures to the map and make connections between them. Be aware of your budget though."
    ]]
    ]],




////////////* eliza general text */////////////

["sorry", 0, [
 ["*", [
     "Please don't apologise.",
     "Apologies are not necessary.",
     "I've told you that apologies are not required.",
     "It did not bother me.  Please continue."
  ]]
]],
["apologise", 0, [
 ["*", [
     "goto sorry"
  ]]
]],
["remember", 5, [
 ["* i remember *", [
     "Do you often think of (2) ?",
     "Does thinking of (2) bring anything else to mind ?",
     "What else do you recollect ?",
     "Why do you remember (2) just now ?",
     "What in the present situation reminds you of (2) ?",
     "What is the connection between me and (2) ?",
     "What else does (2) remind you of ?"
  ]],
 ["* do you remember *", [
     "Did you think I would forget (2) ?",
     "Why do you think I should recall (2) now ?",
     "What about (2) ?",
     "goto what",
     "You mentioned (2) ?"
  ]],
 ["* you remember *", [
     "How could I forget (2) ?",
     "What about (2) should I remember ?",
     "goto you"
  ]]
]],
["forget", 5, [
 ["* i forget *", [
     "Can you think of why you might forget (2) ?",
     "Why can't you remember (2) ?",
     "How often do you think of (2) ?",
     "Does it bother you to forget that ?",
     "Could it be a mental block ?",
     "Are you generally forgetful ?",
     "Do you think you are suppressing (2) ?"
  ]],
 ["* did you forget *", [
     "Why do you ask ?",
     "Are you sure you told me ?",
     "Would it bother you if I forgot (2) ?",
     "Why should I recall (2) just now ?",
     "goto what",
     "Tell me more about (2)."
  ]]
]],
["if", 3, [
 ["* if *", [
     "Do you think it's likely that (2) ?",
     "Do you wish that (2) ?",
     "What do you know about (2) ?",
     "Really, if (2) ?",
     "What would you do if (2) ?",
     "But what are the chances that (2) ?",
     "What does this speculation lead to ?"
  ]]
]],
["dreamed", 4, [
 ["* i dreamed *", [
     "Really, (2) ?",
     "Have you ever fantasized (2) while you were awake ?",
     "Have you ever dreamed (2) before ?",
     "goto dream"
  ]]
]],
["dream", 3, [
 ["*", [
     "What does that dream suggest to you ?",
     "Do you dream often ?",
     "What persons appear in your dreams ?",
     "Do you believe that dreams have something to do with your problem ?"
  ]]
]],

["whatever", 0, [
 ["*", [
     "Is my answer unsatisfied?",
     "Okay, can I help you something else?",
     "You aren't sure ?"
  ]]
]],

["perhaps", 0, [
 ["*", [
     "You don't seem quite certain.",
     "Why the uncertain tone ?",
     "Can't you be more positive ?",
     "You aren't sure ?",
     "Don't you know ?",
     "How likely, would you estimate ?"
  ]]
]],
["name", 15, [
 ["*", [
     "I am not interested in names.",
     "I've told you before, I don't care about names -- please continue."
  ]]
]],

["русский", 0, [
  ["*", [
    "I was born in Russia but I am still working on the language. Do you mind speaking English to me? Thank you."
    ]]
  ]],

["deutsch", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand German."
  ]]
]],
["francais", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand French."
  ]]
]],
["italiano", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand Italian."
  ]]
]],
["espanol", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand Spanish."
  ]]
]],
["xforeign", 0, [
 ["*", [
     "I speak only English."
  ]]
]],
["hello", 0, [
 ["*", [
     "Hi there. How can I help you ?",
     "Hello! What would you like to do with me today ?",
     "Hello, I am Φ. Welcome to join us. Can I help you?"
  ]]
]],

["hey", 0, [
 ["*", [
     "goto hello"
  ]]
]],


["hi", 0, [
 ["*", [
     "goto hello"
  ]]
]],

["yo", 0, [
 ["*", [
     "goto hello"
  ]]
]],

["bot", 50, [
 ["*", [
     "Does me being a bot bothering you ?",
     "What about bots worries you ?",
     "You don't think I am just a bot, do you ?"
  ]]
]],
["am", 0, [
 ["* am i *", [
     "Do you believe you are (2) ?",
     "Would you want to be (2) ?",
     "Do you wish I would tell you you are (2) ?",
     "What would it mean if you were (2) ?",
     "goto what"
  ]],
 ["* i am *", [
     "goto i"
  ]],
 ["*", [
     "Why do you say 'am' ?",
     "I don't understand that."
  ]]
]],
["are", 0, [
 ["* are you *", [
     "I am Φ. But Φ is not me.",
     "I am a chatbot that helps you with the phi experience.",
     "What would you like me to be?",
     "My name is Φ. Do you like me so far?"
  ]],
 ["* you are *", [
     "goto you"
  ]],
 ["* are *", [
     "Did you think they might not be (2) ?",
     "Would you like it if they were not (2) ?",
     "What if they were not (2) ?",
     "Are they always (2) ?",
     "Possibly they are (2).",
     "Are you positive they are (2) ?"
  ]]
]],
["your", 0, [
 ["* your *", [
     "Why are you concerned over my (2) ?",
     "What about your own (2) ?",
     "Are you worried about someone else's (2) ?",
     "Really, my (2) ?",
     "What makes you think of my (2) ?",
     "Do you want my (2) ?"
  ]]
]],
["was", 2, [
 ["* was i *", [
     "What if you were (2) ?",
     "Do you think you were (2) ?",
     "Were you (2) ?",
     "What would it mean if you were (2) ?",
     "What does ' (2) ' suggest to you ?",
     "goto what"
  ]],
 ["* i was *", [
     "Were you really ?",
     "Why do you tell me you were (2) now ?",
     "Perhaps I already know you were (2)."
  ]],
 ["* was you *", [
     "Would you like to believe I was (2) ?",
     "What suggests that I was (2) ?",
     "What do you think ?",
     "Perhaps I was (2).",
     "What if I had been (2) ?"
  ]]
]],
["i", 0, [
 ["* i @desire *", [
     "What would it mean to you if you got (3) ?",
     "Why do you want (3) ?",
     "Suppose you got (3) soon.",
     "What if you never got (3) ?",
     "What would getting (3) mean to you ?",
     "What does wanting (3) have to do with this discussion ?"
  ]],
 ["* i am* @sad *", [
     "I am sorry to hear that you are (3).",
     "Do you think coming here will help you not to be (3) ?",
     "I'm sure it's not pleasant to be (3).",
     "Can you explain what made you (3) ?"
  ]],
 ["* i am* @happy *", [
     "How have I helped you to be (3) ?",
     "Has your treatment made you (3) ?",
     "What makes you (3) just now ?",
     "Can you explain why you are suddenly (3) ?"
  ]],
 ["* i was *", [
     "goto was"
  ]],
 ["* i @belief i *", [
     "Do you really think so ?",
     "But you are not sure you (3).",
     "Do you really doubt you (3) ?"
  ]],
 ["* i* @belief *you *", [
     "goto you"
  ]],
 ["* i am *", [
     "Is it because you are (2) that you came to me ?",
     "How long have you been (2) ?",
     "Do you believe it is normal to be (2) ?",
     "Do you enjoy being (2) ?",
     "Do you know anyone else who is (2) ?"
  ]],
 ["* i @cannot *", [
     "How do you know that you can't (3) ?",
     "Have you tried ?",
     "Perhaps you could (3) now.",
     "Do you really want to be able to (3) ?",
     "What if you could (3) ?"
  ]],
 ["* i don't *", [
     "Don't you really (2) ?",
     "Why don't you (2) ?",
     "Do you wish to be able to (2) ?",
     "Does that trouble you ?"
  ]],
 ["* i feel *", [
     "Tell me more about such feelings.",
     "Do you often feel (2) ?",
     "Do you enjoy feeling (2) ?",
     "Of what does feeling (2) remind you ?"
  ]],
 ["* i * you *", [
     "Perhaps in your fantasies we (2) each other.",
     "Do you wish to (2) me ?",
     "You seem to need to (2) me.",
     "Do you (2) anyone else ?"
  ]],
 ["*", [
     "You say (1) ?",
     "Can you elaborate on that ?",
     "Do you say (1) for some special reason ?",
     "That's quite interesting."
  ]]
]],
["you", 0, [
 ["* you remind me of *", [
     "goto alike"
  ]],
 ["* you are *", [
     "What makes you think I am (2) ?",
     "Does it please you to believe I am (2) ?",
     "Do you sometimes wish you were (2) ?",
     "Perhaps you would like to be (2)."
  ]],
 ["* you* me *", [
     "Why do you think I (2) you ?",
     "You like to think I (2) you -- don't you ?",
     "What makes you think I (2) you ?",
     "Really, I (2) you ?",
     "Do you wish to believe I (2) you ?",
     "Suppose I did (2) you -- what would that mean ?",
     "Does someone else believe I (2) you ?"
  ]],
 ["* what* you *", [
     "I am Φ. But Φ is not me.",
     "I am a chatbot that helps you with the phi experience.",
     "What would you like me to be?",
     "My name is Φ. Do you like me so far?"
  ]]
]],
["yes", 0, [
 ["*", [
     "You seem to be quite positive.",
     "You are sure.",
     "I see.",
     "I understand."
  ]]
]],
["no", 0, [
 ["* no one *", [
     "Are you sure, no one (2) ?",
     "Surely someone (2) .",
     "Can you think of anyone at all ?",
     "Are you thinking of a very special person ?",
     "Who, may I ask ?",
     "You have a particular person in mind, don't you ?",
     "Who do you think you are talking about ?"
  ]],
 ["*", [
     "Are you saying no just to be negative?",
     "You are being a bit negative.",
     "Why not ?",
     "Why 'no' ?"
  ]]
]],

["nope", 0, [
 ["nope *", [
     "goto no"
  ]]
]],

["my", 2, [
 ["$ * my *", [
     "Does that have anything to do with the fact that your (2) ?",
     "Lets discuss further why your (2).",
     "Earlier you said your (2).",
     "But your (2)."
  ]],
 ["* my* @family *", [
     "Tell me more about your family.",
     "Who else in your family (4) ?",
     "Your (3) ?",
     "What else comes to your mind when you think of your (3) ?"
  ]],
 ["* my *", [
     "Your (2) ?",
     "Why do you say your (2) ?",
     "Does that suggest anything else which belongs to you ?",
     "Is it important to you that your (2) ?"
  ]]
]],
["can", 0, [
 ["* can you *", [
     "You believe I can (2) don't you ?",
     "goto what",
     "You want me to be able to (2).",
     "Perhaps you would like to be able to (2) yourself."
  ]],
 ["* can i *", [
     "Whether or not you can (2) depends on you more than on me.",
     "Do you want to be able to (2) ?",
     "Perhaps you don't want to (2).",
     "goto what"
  ]]
]],
["what", 0, [
 ["*", [
     "Why do you ask ?",
     "Does that question interest you ?",
     "What is it you really want to know ?",
     "Are such questions much on your mind ?",
     "What answer would please you most ?",
     "What do you think ?",
     "What comes to mind when you ask that ?",
     "Have you asked such questions before ?",
     "Have you asked anyone else ?"
  ]],
  [" this ", [
      "Can you specify?"
      ]]
]],

["when", 0, [
 ["when *", [
     "goto what"
  ]]
]],
["where", 0, [
 ["where *", [
     "goto what"
  ]]
]],
["how", 0, [
 ["how *", [
     "goto what"
  ]]
]],
["because", 0, [
 ["*", [
     "Is that the real reason ?",
     "Don't any other reasons come to mind ?",
     "Does that reason seem to explain anything else ?",
     "What other reasons might there be ?"
  ]]
]],

["here", 1, [
  ["why *", [
    "Are you here for a better future or for a better connection?",
    "You are here to participate a healthier energy future."
  ]],
  ["*", [
    "Can you specify?"
    ]],
  ["* am i *", [
    "Have you thought of why?",
    "Do you have something in mind?",
    ]]
  ]],



["why", 0, [
  ["* here *", [
    "Here you can talk to me. Don't you like it?",
    "You can explore how a clean-energy future can look like at here. Don't you like it?",
    "Didn't you already know?"
    ]],
 ["* why don't you *", [
     "Do you believe I don't (2) ?",
     "Perhaps I will (2) in good time.",
     "Should you (2) yourself ?",
     "You want me to (2) ?",
     "goto what"
  ]],
 ["* why can't i *", [
     "Do you think you should be able to (2) ?",
     "Do you want to be able to (2) ?",
     "Do you believe this will help you to (2) ?",
     "Have you any idea why you can't (2) ?",
     "goto what"
  ]],
 ["*", [
     "goto what"
  ]]
]],
["everyone", 2, [
 ["* @everyone *", [
     "Really, (2) ?",
     "Surely not (2).",
     "Can you think of anyone in particular ?",
     "Who, for example?",
     "Are you thinking of a very special person ?",
     "Who, may I ask ?",
     "Someone special perhaps ?",
     "You have a particular person in mind, don't you ?",
     "Who do you think you're talking about ?"
  ]]
]],
["everybody", 2, [
 ["*", [
     "goto everyone"
  ]]
]],
["nobody", 2, [
 ["*", [
     "goto everyone"
  ]]
]],
["noone", 2, [
 ["*", [
     "goto everyone"
  ]]
]],
["always", 1, [
 ["*", [
     "Can you think of a specific example ?",
     "When ?",
     "What incident are you thinking of ?",
     "Really, always ?"
  ]]
]],
["alike", 10, [
 ["*", [
     "In what way ?",
     "What resemblence do you see ?",
     "What does that similarity suggest to you ?",
     "What other connections do you see ?",
     "What do you suppose that resemblence means ?",
     "What is the connection, do you suppose ?",
     "Could there really be some connection ?",
     "How ?"
  ]]
]],
["like", 10, [
 ["* @be *like *", [
     "goto alike"
  ]]
]],
["different", 0, [
 ["*", [
     "How is it different ?",
     "What differences do you see ?",
     "What does that difference suggest to you ?",
     "What other distinctions do you see ?",
     "What do you suppose that disparity means ?",
     "Could there be some connection, do you suppose ?",
     "How ?"
  ]]
]]

];

// regexp/replacement pairs to be performed as final cleanings
// here: cleanings for multiple bots talking to each other
var elizaPostTransforms = [
	/ old old/g, " old",
	/\bthey were( not)? me\b/g, "it was$1 me",
	/\bthey are( not)? me\b/g, "it is$1 me",
	/Are they( always)? me\b/, "it is$1 me",
	/\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
	/\bI to have (\w+)/, "I have $1",
	/Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
];

// eof

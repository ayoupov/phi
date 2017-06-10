module Chat.Model exposing (..)

type ChatItem = UserMessage UserChatMessage
              | BotItem BotChatItem

type alias UserChatMessage = String

type BotChatItem = WidgetItem Widget
                 | BotMessage String

type Widget = WeatherWidget | BotMultiQuestion

initChat : ChatItem
initChat =
    BotItem <| BotMessage
        """Welcome to Φ Chat! I only respond to commands for now.
Current available commands are:

/weather (i tell you abt the weather today)
/turn (i move to the next day)
/describe [nodeId] (i tell you some info about a specific node)
"""


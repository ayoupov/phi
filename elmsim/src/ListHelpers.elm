module ListHelpers exposing (..)

-- function helpers


takeFirstElementWithDefault1 list =
    Maybe.withDefault 1 (List.head list)


takeFirstElementWithDefault0 list =
    Maybe.withDefault 0 (List.head list)


takeTailDefaultEmpty list =
    Maybe.withDefault [] (List.tail list)


addToFirstElement list value =
    takeFirstElementWithDefault0 list + value :: takeTailDefaultEmpty list


updateFirstElement list value =
    value :: takeTailDefaultEmpty list

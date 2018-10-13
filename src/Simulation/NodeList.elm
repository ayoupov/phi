module Simulation.NodeList exposing (..)

import Set exposing (Set)


transformTuple : ( Int, Int ) -> ( Int, Int )
transformTuple ( x, y ) =
    ( x, y )


initialHousing : Set ( Int, Int )
initialHousing =
    Set.fromList
        [
          (3684,1529),
          (3868,1550),
          (3905,1489),
          (3962,1484),
          (3943,1377),
          (4092,1414),
          (4115,1367),
          (4170,1354),
          (4131,1269),
          (4202,1315),
          (4509,1426),
          (4364,1225),
          (4391,1192),
          (4453,1206),
          (4460,1157),
          (4510,1168),
          (4597,1121),
          (4639,1097),
          (4442,1104),
          (4465,1076),
          (4334,1094),
          (4388,1144),
          (4371,1088),
          (4357,1026),
          (4439,1045),
          (4435,1008),
          (4404,967),
          (4337,996),
          (4320,948),
          (4310,878),
          (4393,882),
          (4457,907),
          (4494,882),
          (4408,818),
          (4368,752),
          (4356,698),
          (4268,742),
          (4259,696),
          (4249,642),
          (4331,612),
          (4532,1465),
          (4552,1506),
          (4437,1494),
          (4554,1542),
          (4611,1489),
          (4714,1475),
          (4767,1505),
          (4778,1441),
          (4423,1648),
          (4554,1640),
          (4483,1739),
          (4585,1733),
          (4619,1798),
          (4508,1797),
          (4608,1840),
          (4517,1896),
          (4612,1938),
          (4616,1977),
          (4537,2140),
          (4558,2215),
          (4492,2169),
          (4678,2205),
          (4685,2289),
          (4617,2394),
          (4539,2421),
          (4522,2468),
          (4484,2436),
          (4467,2480),
          (4430,2454),
          (4403,2504),
          (4382,2470),
          (4357,2516),
          (4312,2491),
          (4324,2530),
          (4261,2516),
          (4609,2456),
          (4650,2452),
          (4656,2509),
          (4663,2562),
          (4759,2616),
          (4661,2596),
          (4710,2694),
          (4678,2715),
          (4638,2668),
          (4572,2694),
          (4733,2804),
          (4663,2829),
          (4557,2848)
        ]
        |> Set.map transformTuple

initialWPS : Set ( Int, Int )
initialWPS =
    Set.fromList
        [
          (4205,1217),
          (4014,1461),
          (3948,1334),
          (4442,1582),
          (4498,1697),
          (4678,2137),
          (4677,2034)
        ]
        |> Set.map transformTuple


potentialHousingList : Set ( Int, Int )
potentialHousingList =
    Set.diff housingList initialHousing


potentialWPSList : Set ( Int, Int )
potentialWPSList =
    Set.diff wpsList initialWPS


housingList : Set ( Int, Int )
housingList =
    Set.fromList
        [ (3492,1615),
          (3499,1656),
          (3384,1695),
          (3370,1733),
          (3294,1761),
          (3309,1720),
          (3256,1795),
          (3183,1846),
          (3125,1819),
          (3049,1916),
          (2955,1929),
          (2987,1952),
          (2863,1994),
          (2806,2029),
          (2845,2028),
          (2901,2064),
          (2950,2053),
          (3015,1999),
          (3032,2034),
          (3064,1980),
          (3106,1955),
          (3167,1931),
          (3200,1902),
          (3213,1939),
          (3262,1864),
          (3345,1880),
          (3320,1834),
          (3386,1802),
          (3411,1776),
          (3447,1776),
          (3497,1721),
          (3522,1765),
          (3608,1739),
          (3630,1776),
          (3555,1812),
          (3563,1767),
          (3579,1851),
          (3657,1812),
          (3606,1822),
          (3627,1937),
          (3703,1885),
          (3676,1994),
          (3693,1941),
          (3661,1917),
          (3752,1773),
          (3689,1776),
          (3653,1716),
          (3670,1628),
          (3719,1683),
          (3579,1575),
          (3646,1565),
          (3598,1600),
          (3813,1548),
          (3791,1466),
          (3684,1529),
          (3868,1550),
          (3905,1489),
          (3962,1484),
          (3943,1377),
          (4092,1414),
          (4115,1367),
          (4170,1354),
          (4131,1269),
          (4202,1315),
          (4509,1426),
          (4364,1225),
          (4391,1192),
          (4453,1206),
          (4460,1157),
          (4510,1168),
          (4597,1121),
          (4639,1097),
          (4442,1104),
          (4465,1076),
          (4334,1094),
          (4388,1144),
          (4371,1088),
          (4357,1026),
          (4439,1045),
          (4435,1008),
          (4404,967),
          (4337,996),
          (4320,948),
          (4310,878),
          (4393,882),
          (4457,907),
          (4494,882),
          (4408,818),
          (4368,752),
          (4356,698),
          (4268,742),
          (4259,696),
          (4249,642),
          (4331,612),
          (4532,1465),
          (4552,1506),
          (4437,1494),
          (4554,1542),
          (4611,1489),
          (4714,1475),
          (4767,1505),
          (4778,1441),
          (4423,1648),
          (4554,1640),
          (4483,1739),
          (4585,1733),
          (4619,1798),
          (4508,1797),
          (4608,1840),
          (4517,1896),
          (4612,1938),
          (4616,1977),
          (4537,2140),
          (4558,2215),
          (4492,2169),
          (4678,2205),
          (4685,2289),
          (4617,2394),
          (4539,2421),
          (4522,2468),
          (4484,2436),
          (4467,2480),
          (4430,2454),
          (4403,2504),
          (4382,2470),
          (4357,2516),
          (4312,2491),
          (4324,2530),
          (4261,2516),
          (4609,2456),
          (4650,2452),
          (4656,2509),
          (4663,2562),
          (4759,2616),
          (4661,2596),
          (4710,2694),
          (4678,2715),
          (4638,2668),
          (4572,2694),
          (4733,2804),
          (4663,2829),
          (4557,2848),
          (4593,2848),
          (4536,2810),
          (4581,2908),
          (4627,2893),
          (4673,2893),
          (4711,2875),
          (4749,2875),
          (4714,2847),
          (4651,2863),
          (4675,1858),
          (2800,2116),
          (2765,2136),
          (2849,2116),
          (2719,2216),
          (2798,2174),
          (2688,2180),
          (2660,2104),
          (2582,2234),
          (2624,2228),
          (2646,2192),
          (2636,2259),
          (2524,2274),
          (2451,2211),
          (2456,2310),
          (2358,2347),
          (2357,2287),
          (2378,2257),
          (2420,2247),
          (2328,2366),
          (2348,2401),
          (2302,2297),
          (2308,2253),
          (2248,2332),
          (2229,2279),
          (2170,2371),
          (2234,2421),
          (2162,2467),
          (2080,2432),
          (2106,2492),
          (2031,2464),
          (2062,2518),
          (2098,2531),
          (2022,2541),
          (2003,2584),
          (1960,2579),
          (1956,2507),
          (1978,2473),
          (1972,2403),
          (1903,2541),
          (1873,2570),
          (1891,2621),
          (1858,2647),
          (1803,2674),
          (1942,2650),
          (1711,2638),
          (1746,2643),
          (1716,2729),
          (1736,2761),
          (1656,2704),
          (1654,2773),
          (1613,2717),
          (1701,2800),
          (2543,2179),
          (2528,2114)
        ]
        |> Set.map transformTuple


wpsList : Set ( Int, Int )
wpsList =
    Set.fromList
        [ (3198,1802),
          (2809,1972),
          (3006,2115),
          (3431,1954),
          (3210,2010),
          (3030,1873),
          (3779,1601),
          (4103,1474),
          (4205,1217),
          (4014,1461),
          (3948,1334),
          (4442,1582),
          (4618,1690),
          (4556,2004),
          (4522,2219),
          (4498,1697),
          (4678,2137),
          (4677,2034),
          (3900,1641),
          (4519,1039),
          (4292,821),
          (4509,1311),
          (4201,631),
          (4471,855),
          (4310,1048),
          (4580,2547),
          (4272,2455),
          (4736,2352),
          (4699,2772),
          (4484,2820),
          (4774,3021),
          (4646,2962),
          (4780,2561),
          (3695,1481),
          (3481,1575),
          (3363,1670),
          (3737,1825),
          (2577,2152),
          (2760,2193),
          (2267,2484),
          (2367,2499),
          (1618,2825),
          (1902,2698),
          (1879,2515),
          (1537,2769),
          (2124,2660),
          (2427,2176)
        ]
        |> Set.map transformTuple


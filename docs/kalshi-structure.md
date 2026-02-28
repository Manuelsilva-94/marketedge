Investigación 2.2: Events vs Markets (Kalshi)
Objetivo: Mismo que Polymarket
Endpoints:
bash# Events
GET /trade-api/v2/events?status=open

# Markets
//https://api.elections.kalshi.com/trade-api/v2/markets?limit=3&status=open

{
    "cursor": "CgsIyu7szAYQmMDFXhI5S1hNVkVTUE9SVFNNVUxUSUdBTUVFWFRFTkRFRC1TMjAyNjIzOEQ4NzQ1NUZFLTJCMzE2OTQ0ODdB";
    "markets": [
        {
            "can_close_early": true,
            "close_time": "2026-03-08T18:00:00Z",
            "created_time": "2026-02-22T17:05:14.272823Z",
            "custom_strike": {
                "Associated Events": "KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC",
                "Associated Market Sides": "yes,yes,yes,yes,yes,yes,yes,yes,yes",
                "Associated Markets": "KXNBAPTS-26FEB22CLEOKC-CLEDMITCHELL45-20,KXNBAPTS-26FEB22CLEOKC-CLEEMOBLEY4-10,KXNBAPTS-26FEB22CLEOKC-CLEJALLEN31-10,KXNBAPTS-26FEB22CLEOKC-CLEJHARDEN1-15,KXNBAPTS-26FEB22CLEOKC-OKCCHOLMGREN7-15,KXNBAREB-26FEB22CLEOKC-CLEDMITCHELL45-2,KXNBAREB-26FEB22CLEOKC-CLEJALLEN31-6,KXNBAREB-26FEB22CLEOKC-CLEJHARDEN1-2,KXNBAREB-26FEB22CLEOKC-OKCIHARTENSTEIN55-6",
                "Multivariate Event Ticker": "KXMVESPORTSMULTIGAMEEXTENDED-R"
            },
            "event_ticker": "KXMVESPORTSMULTIGAMEEXTENDED-S2026B19A4DFE025",
            "expected_expiration_time": "2026-02-22T21:00:00Z",
            "expiration_time": "2026-03-08T18:00:00Z",
            "expiration_value": "",
            "fractional_trading_enabled": false,
            "is_provisional": true,
            "last_price": 0,
            "last_price_dollars": "0.0000",
            "latest_expiration_time": "2026-03-08T18:00:00Z",
            "liquidity": 0,
            "liquidity_dollars": "0.0000",
            "market_type": "binary",
            "mve_collection_ticker": "KXMVESPORTSMULTIGAMEEXTENDED-R",
            "mve_selected_legs": [
                {
                    "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                    "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEDMITCHELL45-20",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                    "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEEMOBLEY4-10",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                    "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEJALLEN31-10",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                    "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEJHARDEN1-15",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                    "market_ticker": "KXNBAPTS-26FEB22CLEOKC-OKCCHOLMGREN7-15",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                    "market_ticker": "KXNBAREB-26FEB22CLEOKC-CLEDMITCHELL45-2",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                    "market_ticker": "KXNBAREB-26FEB22CLEOKC-CLEJALLEN31-6",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                    "market_ticker": "KXNBAREB-26FEB22CLEOKC-CLEJHARDEN1-2",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                    "market_ticker": "KXNBAREB-26FEB22CLEOKC-OKCIHARTENSTEIN55-6",
                    "side": "yes"
                }
            ],
            "no_ask": 100,
            "no_ask_dollars": "1.0000",
            "no_bid": 100,
            "no_bid_dollars": "1.0000",
            "no_sub_title": "yes Donovan Mitchell: 20+,yes Evan Mobley: 10+,yes Jarrett Allen: 10+,yes James Harden: 15+,yes Chet Holmgren: 15+,yes Donovan Mitchell: 2+,yes Jarrett Allen: 6+,yes James Harden: 2+,yes Isaiah Hartenstein: 6+",
            "notional_value": 100,
            "notional_value_dollars": "1.0000",
            "open_interest": 0,
            "open_interest_fp": "0.00",
            "open_time": "2026-02-22T17:05:14.250049Z",
            "previous_price": 0,
            "previous_price_dollars": "0.0000",
            "previous_yes_ask": 0,
            "previous_yes_ask_dollars": "0.0000",
            "previous_yes_bid": 0,
            "previous_yes_bid_dollars": "0.0000",
            "price_level_structure": "deci_cent",
            "price_ranges": [
                {
                    "end": "1.0000",
                    "start": "0.0000",
                    "step": "0.0010"
                }
            ],
            "response_price_units": "usd_cent",
            "result": "",
            "rules_primary": "",
            "rules_secondary": "",
            "settlement_timer_seconds": 5,
            "status": "active",
            "strike_type": "custom",
            "subtitle": "",
            "tick_size": 1,
            "ticker": "KXMVESPORTSMULTIGAMEEXTENDED-S2026B19A4DFE025-466537E0DD1",
            "title": "yes Donovan Mitchell: 20+,yes Evan Mobley: 10+,yes Jarrett Allen: 10+,yes James Harden: 15+,yes Chet Holmgren: 15+,yes Donovan Mitchell: 2+,yes Jarrett Allen: 6+,yes James Harden: 2+,yes Isaiah Hartenstein: 6+",
            "updated_time": "2026-02-22T17:05:14.493259Z",
            "volume": 0,
            "volume_24h": 0,
            "volume_24h_fp": "0.00",
            "volume_fp": "0.00",
            "yes_ask": 0,
            "yes_ask_dollars": "0.0000",
            "yes_bid": 0,
            "yes_bid_dollars": "0.0000",
            "yes_sub_title": "yes Donovan Mitchell: 20+,yes Evan Mobley: 10+,yes Jarrett Allen: 10+,yes James Harden: 15+,yes Chet Holmgren: 15+,yes Donovan Mitchell: 2+,yes Jarrett Allen: 6+,yes James Harden: 2+,yes Isaiah Hartenstein: 6+"
        },
        {
            "can_close_early": true,
            "close_time": "2026-03-08T23:30:00Z",
            "created_time": "2026-02-22T17:05:14.204096Z",
            "custom_strike": {
                "Associated Events": "KXNBATOTAL-26FEB22BOSLAL,KXNBATOTAL-26FEB22CHAWAS,KXNBATOTAL-26FEB22CLEOKC,KXNBATOTAL-26FEB22PORPHX",
                "Associated Market Sides": "yes,yes,yes,yes",
                "Associated Markets": "KXNBATOTAL-26FEB22BOSLAL-213,KXNBATOTAL-26FEB22CHAWAS-213,KXNBATOTAL-26FEB22CLEOKC-208,KXNBATOTAL-26FEB22PORPHX-207",
                "Multivariate Event Ticker": "KXMVESPORTSMULTIGAMEEXTENDED-R"
            },
            "event_ticker": "KXMVESPORTSMULTIGAMEEXTENDED-S202679A2545CA30",
            "expected_expiration_time": "2026-02-23T04:00:00Z",
            "expiration_time": "2026-03-08T23:30:00Z",
            "expiration_value": "",
            "fractional_trading_enabled": false,
            "is_provisional": true,
            "last_price": 0,
            "last_price_dollars": "0.0000",
            "latest_expiration_time": "2026-03-08T23:30:00Z",
            "liquidity": 0,
            "liquidity_dollars": "0.0000",
            "market_type": "binary",
            "mve_collection_ticker": "KXMVESPORTSMULTIGAMEEXTENDED-R",
            "mve_selected_legs": [
                {
                    "event_ticker": "KXNBATOTAL-26FEB22BOSLAL",
                    "market_ticker": "KXNBATOTAL-26FEB22BOSLAL-213",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBATOTAL-26FEB22CHAWAS",
                    "market_ticker": "KXNBATOTAL-26FEB22CHAWAS-213",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBATOTAL-26FEB22CLEOKC",
                    "market_ticker": "KXNBATOTAL-26FEB22CLEOKC-208",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBATOTAL-26FEB22PORPHX",
                    "market_ticker": "KXNBATOTAL-26FEB22PORPHX-207",
                    "side": "yes"
                }
            ],
            "no_ask": 100,
            "no_ask_dollars": "1.0000",
            "no_bid": 100,
            "no_bid_dollars": "1.0000",
            "no_sub_title": "yes Over 213.5 points scored,yes Over 213.5 points scored,yes Over 208.5 points scored,yes Over 207.5 points scored",
            "notional_value": 100,
            "notional_value_dollars": "1.0000",
            "open_interest": 0,
            "open_interest_fp": "0.00",
            "open_time": "2026-02-22T17:05:14.173674Z",
            "previous_price": 0,
            "previous_price_dollars": "0.0000",
            "previous_yes_ask": 0,
            "previous_yes_ask_dollars": "0.0000",
            "previous_yes_bid": 0,
            "previous_yes_bid_dollars": "0.0000",
            "price_level_structure": "deci_cent",
            "price_ranges": [
                {
                    "end": "1.0000",
                    "start": "0.0000",
                    "step": "0.0010"
                }
            ],
            "response_price_units": "usd_cent",
            "result": "",
            "rules_primary": "",
            "rules_secondary": "",
            "settlement_timer_seconds": 5,
            "status": "active",
            "strike_type": "custom",
            "subtitle": "",
            "tick_size": 1,
            "ticker": "KXMVESPORTSMULTIGAMEEXTENDED-S202679A2545CA30-7816A122C66",
            "title": "yes Over 213.5 points scored,yes Over 213.5 points scored,yes Over 208.5 points scored,yes Over 207.5 points scored",
            "updated_time": "2026-02-22T17:05:14.493259Z",
            "volume": 0,
            "volume_24h": 0,
            "volume_24h_fp": "0.00",
            "volume_fp": "0.00",
            "yes_ask": 0,
            "yes_ask_dollars": "0.0000",
            "yes_bid": 0,
            "yes_bid_dollars": "0.0000",
            "yes_sub_title": "yes Over 213.5 points scored,yes Over 213.5 points scored,yes Over 208.5 points scored,yes Over 207.5 points scored"
        },
        {
            "can_close_early": true,
            "close_time": "2026-03-08T18:00:00Z",
            "created_time": "2026-02-22T17:05:14.198271Z",
            "custom_strike": {
                "Associated Events": "KXNBA3PT-26FEB22CLEOKC,KXNBA3PT-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC,KXNBASPREAD-26FEB22CLEOKC",
                "Associated Market Sides": "yes,yes,yes,yes,yes,yes,yes,yes,yes",
                "Associated Markets": "KXNBA3PT-26FEB22CLEOKC-CLEDMITCHELL45-2,KXNBA3PT-26FEB22CLEOKC-CLEJHARDEN1-2,KXNBAPTS-26FEB22CLEOKC-CLEEMOBLEY4-10,KXNBAPTS-26FEB22CLEOKC-CLEJALLEN31-15,KXNBAPTS-26FEB22CLEOKC-CLEJHARDEN1-15,KXNBAREB-26FEB22CLEOKC-CLEJALLEN31-6,KXNBAREB-26FEB22CLEOKC-CLEJHARDEN1-2,KXNBAREB-26FEB22CLEOKC-OKCIHARTENSTEIN55-6,KXNBASPREAD-26FEB22CLEOKC-CLE1",
                "Multivariate Event Ticker": "KXMVESPORTSMULTIGAMEEXTENDED-R"
            },
            "event_ticker": "KXMVESPORTSMULTIGAMEEXTENDED-S2026238D87455FE",
            "expected_expiration_time": "2026-02-22T21:00:00Z",
            "expiration_time": "2026-03-08T18:00:00Z",
            "expiration_value": "",
            "fractional_trading_enabled": false,
            "is_provisional": true,
            "last_price": 0,
            "last_price_dollars": "0.0000",
            "latest_expiration_time": "2026-03-08T18:00:00Z",
            "liquidity": 0,
            "liquidity_dollars": "0.0000",
            "market_type": "binary",
            "mve_collection_ticker": "KXMVESPORTSMULTIGAMEEXTENDED-R",
            "mve_selected_legs": [
                {
                    "event_ticker": "KXNBA3PT-26FEB22CLEOKC",
                    "market_ticker": "KXNBA3PT-26FEB22CLEOKC-CLEDMITCHELL45-2",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBA3PT-26FEB22CLEOKC",
                    "market_ticker": "KXNBA3PT-26FEB22CLEOKC-CLEJHARDEN1-2",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                    "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEEMOBLEY4-10",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                    "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEJALLEN31-15",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                    "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEJHARDEN1-15",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                    "market_ticker": "KXNBAREB-26FEB22CLEOKC-CLEJALLEN31-6",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                    "market_ticker": "KXNBAREB-26FEB22CLEOKC-CLEJHARDEN1-2",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                    "market_ticker": "KXNBAREB-26FEB22CLEOKC-OKCIHARTENSTEIN55-6",
                    "side": "yes"
                },
                {
                    "event_ticker": "KXNBASPREAD-26FEB22CLEOKC",
                    "market_ticker": "KXNBASPREAD-26FEB22CLEOKC-CLE1",
                    "side": "yes"
                }
            ],
            "no_ask": 100,
            "no_ask_dollars": "1.0000",
            "no_bid": 100,
            "no_bid_dollars": "1.0000",
            "no_sub_title": "yes Donovan Mitchell: 2+,yes James Harden: 2+,yes Evan Mobley: 10+,yes Jarrett Allen: 15+,yes James Harden: 15+,yes Jarrett Allen: 6+,yes James Harden: 2+,yes Isaiah Hartenstein: 6+,yes Cleveland wins by over 1.5 Points",
            "notional_value": 100,
            "notional_value_dollars": "1.0000",
            "open_interest": 0,
            "open_interest_fp": "0.00",
            "open_time": "2026-02-22T17:05:14.108102Z",
            "previous_price": 0,
            "previous_price_dollars": "0.0000",
            "previous_yes_ask": 0,
            "previous_yes_ask_dollars": "0.0000",
            "previous_yes_bid": 0,
            "previous_yes_bid_dollars": "0.0000",
            "price_level_structure": "deci_cent",
            "price_ranges": [
                {
                    "end": "1.0000",
                    "start": "0.0000",
                    "step": "0.0010"
                }
            ],
            "response_price_units": "usd_cent",
            "result": "",
            "rules_primary": "",
            "rules_secondary": "",
            "settlement_timer_seconds": 5,
            "status": "active",
            "strike_type": "custom",
            "subtitle": "",
            "tick_size": 1,
            "ticker": "KXMVESPORTSMULTIGAMEEXTENDED-S2026238D87455FE-2B31694487A",
            "title": "yes Donovan Mitchell: 2+,yes James Harden: 2+,yes Evan Mobley: 10+,yes Jarrett Allen: 15+,yes James Harden: 15+,yes Jarrett Allen: 6+,yes James Harden: 2+,yes Isaiah Hartenstein: 6+,yes Cleveland wins by over 1.5 Points",
            "updated_time": "2026-02-22T17:05:14.493259Z",
            "volume": 0,
            "volume_24h": 0,
            "volume_24h_fp": "0.00",
            "volume_fp": "0.00",
            "yes_ask": 0,
            "yes_ask_dollars": "0.0000",
            "yes_bid": 0,
            "yes_bid_dollars": "0.0000",
            "yes_sub_title": "yes Donovan Mitchell: 2+,yes James Harden: 2+,yes Evan Mobley: 10+,yes Jarrett Allen: 15+,yes James Harden: 15+,yes Jarrett Allen: 6+,yes James Harden: 2+,yes Isaiah Hartenstein: 6+,yes Cleveland wins by over 1.5 Points"
        }
    ]
}

//https://api.elections.kalshi.com/trade-api/v2/events?limit=3&status=open&with_nested_markets=true

{
    "cursor": "CgYI8JHtswkSDEtYV0FSTUlORy01MA",
    "events": [
        {
            "available_on_brokers": true,
            "category": "World",
            "collateral_return_type": "",
            "event_ticker": "KXELONMARS-99",
            "markets": [
                {
                    "can_close_early": true,
                    "close_time": "2099-08-01T04:59:00Z",
                    "created_time": "0001-01-01T00:00:00Z",
                    "early_close_condition": "This market will close and expire early if the event occurs.",
                    "event_ticker": "KXELONMARS-99",
                    "expected_expiration_time": "2099-08-01T15:00:00Z",
                    "expiration_time": "2099-08-08T15:00:00Z",
                    "expiration_value": "",
                    "fractional_trading_enabled": false,
                    "last_price": 10,
                    "last_price_dollars": "0.1000",
                    "latest_expiration_time": "2099-08-08T15:00:00Z",
                    "liquidity": 0,
                    "liquidity_dollars": "0.0000",
                    "market_type": "binary",
                    "no_ask": 90,
                    "no_ask_dollars": "0.9000",
                    "no_bid": 89,
                    "no_bid_dollars": "0.8900",
                    "no_sub_title": "Mars",
                    "notional_value": 100,
                    "notional_value_dollars": "1.0000",
                    "open_interest": 16241,
                    "open_interest_fp": "16241.00",
                    "open_time": "2025-08-28T20:45:00Z",
                    "previous_price": 0,
                    "previous_price_dollars": "0.0000",
                    "previous_yes_ask": 0,
                    "previous_yes_ask_dollars": "0.0000",
                    "previous_yes_bid": 0,
                    "previous_yes_bid_dollars": "0.0000",
                    "price_level_structure": "linear_cent",
                    "price_ranges": [
                        {
                            "end": "1.0000",
                            "start": "0.0000",
                            "step": "0.0100"
                        }
                    ],
                    "response_price_units": "usd_cent",
                    "result": "",
                    "rules_primary": "If Elon Musk visits Mars before the earlier of his death or Aug 1, 2099, then the market resolves to Yes.",
                    "rules_secondary": "",
                    "settlement_timer_seconds": 1800,
                    "status": "active",
                    "subtitle": "",
                    "tick_size": 1,
                    "ticker": "KXELONMARS-99",
                    "title": "Will Elon Musk visit Mars before Aug 1, 2099?",
                    "updated_time": "0001-01-01T00:00:00Z",
                    "volume": 47194,
                    "volume_24h": 173,
                    "volume_24h_fp": "173.00",
                    "volume_fp": "47194.00",
                    "yes_ask": 11,
                    "yes_ask_dollars": "0.1100",
                    "yes_bid": 10,
                    "yes_bid_dollars": "0.1000",
                    "yes_sub_title": "Mars"
                }
            ],
            "mutually_exclusive": false,
            "series_ticker": "KXELONMARS",
            "strike_period": "",
            "sub_title": "Before 2099",
            "title": "Will Elon Musk visit Mars in his lifetime?"
        },
    ],
    "milestones": []
}


# Event individual
https://api.elections.kalshi.com/trade-api/v2/events/KXELONMARS-99
{
    "event": {
        "available_on_brokers": true,
        "category": "World",
        "collateral_return_type": "",
        "event_ticker": "KXELONMARS-99",
        "mutually_exclusive": false,
        "series_ticker": "KXELONMARS",
        "strike_period": "",
        "sub_title": "Before 2099",
        "title": "Will Elon Musk visit Mars in his lifetime?"
    },
    "markets": [
        {
            "can_close_early": true,
            "close_time": "2099-08-01T04:59:00Z",
            "created_time": "0001-01-01T00:00:00Z",
            "early_close_condition": "This market will close and expire early if the event occurs.",
            "event_ticker": "KXELONMARS-99",
            "expected_expiration_time": "2099-08-01T15:00:00Z",
            "expiration_time": "2099-08-08T15:00:00Z",
            "expiration_value": "",
            "fractional_trading_enabled": false,
            "last_price": 11,
            "last_price_dollars": "0.1100",
            "latest_expiration_time": "2099-08-08T15:00:00Z",
            "liquidity": 0,
            "liquidity_dollars": "0.0000",
            "market_type": "binary",
            "no_ask": 90,
            "no_ask_dollars": "0.9000",
            "no_bid": 89,
            "no_bid_dollars": "0.8900",
            "no_sub_title": "Mars",
            "notional_value": 100,
            "notional_value_dollars": "1.0000",
            "open_interest": 16316,
            "open_interest_fp": "16316.00",
            "open_time": "2025-08-28T20:45:00Z",
            "previous_price": 0,
            "previous_price_dollars": "0.0000",
            "previous_yes_ask": 0,
            "previous_yes_ask_dollars": "0.0000",
            "previous_yes_bid": 0,
            "previous_yes_bid_dollars": "0.0000",
            "price_level_structure": "linear_cent",
            "price_ranges": [
                {
                    "end": "1.0000",
                    "start": "0.0000",
                    "step": "0.0100"
                }
            ],
            "response_price_units": "usd_cent",
            "result": "",
            "rules_primary": "If Elon Musk visits Mars before the earlier of his death or Aug 1, 2099, then the market resolves to Yes.",
            "rules_secondary": "",
            "settlement_timer_seconds": 1800,
            "status": "active",
            "subtitle": "",
            "tick_size": 1,
            "ticker": "KXELONMARS-99",
            "title": "Will Elon Musk visit Mars before Aug 1, 2099?",
            "updated_time": "0001-01-01T00:00:00Z",
            "volume": 47699,
            "volume_24h": 108,
            "volume_24h_fp": "108.00",
            "volume_fp": "47699.00",
            "yes_ask": 11,
            "yes_ask_dollars": "0.1100",
            "yes_bid": 10,
            "yes_bid_dollars": "0.1000",
            "yes_sub_title": "Mars"
        }
    ]
}

# Market individual
https://api.elections.kalshi.com/trade-api/v2/markets/KXMVESPORTSMULTIGAMEEXTENDED-S2026B19A4DFE025-466537E0DD1
{
    "market": {
        "can_close_early": true,
        "close_time": "2026-02-22T20:57:55Z",
        "created_time": "2026-02-22T17:05:14.272823Z",
        "custom_strike": {
            "Associated Events": "KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAPTS-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC,KXNBAREB-26FEB22CLEOKC",
            "Associated Market Sides": "yes,yes,yes,yes,yes,yes,yes,yes,yes",
            "Associated Markets": "KXNBAPTS-26FEB22CLEOKC-CLEDMITCHELL45-20,KXNBAPTS-26FEB22CLEOKC-CLEEMOBLEY4-10,KXNBAPTS-26FEB22CLEOKC-CLEJALLEN31-10,KXNBAPTS-26FEB22CLEOKC-CLEJHARDEN1-15,KXNBAPTS-26FEB22CLEOKC-OKCCHOLMGREN7-15,KXNBAREB-26FEB22CLEOKC-CLEDMITCHELL45-2,KXNBAREB-26FEB22CLEOKC-CLEJALLEN31-6,KXNBAREB-26FEB22CLEOKC-CLEJHARDEN1-2,KXNBAREB-26FEB22CLEOKC-OKCIHARTENSTEIN55-6",
            "Multivariate Event Ticker": "KXMVESPORTSMULTIGAMEEXTENDED-R"
        },
        "event_ticker": "KXMVESPORTSMULTIGAMEEXTENDED-S2026B19A4DFE025",
        "expected_expiration_time": "2026-02-22T21:00:00Z",
        "expiration_time": "2026-03-08T18:00:00Z",
        "expiration_value": "",
        "fractional_trading_enabled": false,
        "is_provisional": true,
        "last_price": 0,
        "last_price_dollars": "0.0000",
        "latest_expiration_time": "2026-03-08T18:00:00Z",
        "liquidity": 0,
        "liquidity_dollars": "0.0000",
        "market_type": "binary",
        "mve_collection_ticker": "KXMVESPORTSMULTIGAMEEXTENDED-R",
        "mve_selected_legs": [
            {
                "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEDMITCHELL45-20",
                "side": "yes"
            },
            {
                "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEEMOBLEY4-10",
                "side": "yes"
            },
            {
                "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEJALLEN31-10",
                "side": "yes"
            },
            {
                "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                "market_ticker": "KXNBAPTS-26FEB22CLEOKC-CLEJHARDEN1-15",
                "side": "yes"
            },
            {
                "event_ticker": "KXNBAPTS-26FEB22CLEOKC",
                "market_ticker": "KXNBAPTS-26FEB22CLEOKC-OKCCHOLMGREN7-15",
                "side": "yes"
            },
            {
                "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                "market_ticker": "KXNBAREB-26FEB22CLEOKC-CLEDMITCHELL45-2",
                "side": "yes"
            },
            {
                "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                "market_ticker": "KXNBAREB-26FEB22CLEOKC-CLEJALLEN31-6",
                "side": "yes"
            },
            {
                "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                "market_ticker": "KXNBAREB-26FEB22CLEOKC-CLEJHARDEN1-2",
                "side": "yes"
            },
            {
                "event_ticker": "KXNBAREB-26FEB22CLEOKC",
                "market_ticker": "KXNBAREB-26FEB22CLEOKC-OKCIHARTENSTEIN55-6",
                "side": "yes"
            }
        ],
        "no_ask": 100,
        "no_ask_dollars": "1.0000",
        "no_bid": 0,
        "no_bid_dollars": "0.0000",
        "no_sub_title": "yes Donovan Mitchell: 20+,yes Evan Mobley: 10+,yes Jarrett Allen: 10+,yes James Harden: 15+,yes Chet Holmgren: 15+,yes Donovan Mitchell: 2+,yes Jarrett Allen: 6+,yes James Harden: 2+,yes Isaiah Hartenstein: 6+",
        "notional_value": 100,
        "notional_value_dollars": "1.0000",
        "open_interest": 0,
        "open_interest_fp": "0.00",
        "open_time": "2026-02-22T17:05:14.250049Z",
        "previous_price": 0,
        "previous_price_dollars": "0.0000",
        "previous_yes_ask": 0,
        "previous_yes_ask_dollars": "0.0000",
        "previous_yes_bid": 0,
        "previous_yes_bid_dollars": "0.0000",
        "price_level_structure": "deci_cent",
        "price_ranges": [
            {
                "end": "1.0000",
                "start": "0.0000",
                "step": "0.0010"
            }
        ],
        "response_price_units": "usd_cent",
        "result": "yes",
        "rules_primary": "",
        "rules_secondary": "",
        "settlement_timer_seconds": 5,
        "settlement_ts": "2026-02-22T20:58:55.338247Z",
        "settlement_value": 100,
        "settlement_value_dollars": "1.0000",
        "status": "finalized",
        "strike_type": "custom",
        "subtitle": "",
        "tick_size": 1,
        "ticker": "KXMVESPORTSMULTIGAMEEXTENDED-S2026B19A4DFE025-466537E0DD1",
        "title": "yes Donovan Mitchell: 20+,yes Evan Mobley: 10+,yes Jarrett Allen: 10+,yes James Harden: 15+,yes Chet Holmgren: 15+,yes Donovan Mitchell: 2+,yes Jarrett Allen: 6+,yes James Harden: 2+,yes Isaiah Hartenstein: 6+",
        "updated_time": "2026-02-22T20:58:55.394355Z",
        "volume": 0,
        "volume_24h": 0,
        "volume_24h_fp": "0.00",
        "volume_fp": "0.00",
        "yes_ask": 100,
        "yes_ask_dollars": "1.0000",
        "yes_bid": 0,
        "yes_bid_dollars": "0.0000",
        "yes_sub_title": "yes Donovan Mitchell: 20+,yes Evan Mobley: 10+,yes Jarrett Allen: 10+,yes James Harden: 15+,yes Chet Holmgren: 15+,yes Donovan Mitchell: 2+,yes Jarrett Allen: 6+,yes James Harden: 2+,yes Isaiah Hartenstein: 6+"
    }
}


# 1️⃣ ¿Un EVENT tiene múltiples MARKETS?

✅ **Sí.**

En Kalshi la jerarquía es:


Series
└── Event
└── Market(s)


Un **Event** agrupa múltiples **Markets** que representan posibles resultados mutuamente excluyentes o distintos rangos de un mismo evento.

---

## 📌 Ejemplo conceptual

Event:

PRESIDENT-2024


Markets dentro del Event:


PRESIDENT-2024-TRUMP
PRESIDENT-2024-BIDEN
PRESIDENT-2024-DESANTIS


Cada **Market** es un contrato binario independiente (YES/NO).

---

# 2️⃣ ¿Cómo se relacionan?

## 🔹 Market
- Es el instrumento negociable
- Tiene orderbook propio
- Tiene precio propio
- Se tradea individualmente

## 🔹 Event
- Agrupa markets relacionados
- Comparte metadata común (resolución, categoría, fecha)
- Permite entender el contexto competitivo

Relación:


1 Event → N Markets


---

# 3️⃣ ¿Para comparar usamos qué nivel?

Depende del caso:

### 📊 Comparar candidatos dentro de una misma elección
👉 Nivel **Event**

Porque quieres comparar:
- Trump vs Biden vs otro
- Todos pertenecen al mismo evento

---

### 📈 Comparar mercados individuales aislados
👉 Nivel **Market**

Ejemplo:
- SP500 > 5000
- BTC > 100k
- Inflación > 4%

Son independientes → se comparan como markets.

---

### 🎯 Regla práctica

| Caso | Nivel correcto |
|------|---------------|
| Competencia entre outcomes | Event |
| Instrumento individual | Market |
| Liquidez / orderbook | Market |
| Probabilidades agregadas | Event |

---

# 4️⃣ ¿Qué es una Series?

Una **Series** es un nivel superior que agrupa múltiples **Events relacionados estructuralmente**.


Series → Events → Markets


---

## 📌 Ejemplo conceptual

Series:

PRESIDENT-2024


Events dentro:


PRESIDENT-2024-WINNER
PRESIDENT-2024-POPULAR-VOTE
PRESIDENT-2024-ELECTORAL-COLLEGE


Cada Event contiene sus propios Markets.

---

## 🧠 ¿Qué representa una Series?

- Un tema macro
- Una estructura repetible
- Una familia de eventos
- Una colección bajo una misma lógica

---

# 5️⃣ Relación completa


Series
├── Event A
│ ├── Market 1
│ ├── Market 2
│ └── Market 3
│
└── Event B
├── Market 1
└── Market 2


---

# 6️⃣ Cuándo usar cada nivel en un comparador

## 🔹 Comparador tipo "Odds entre candidatos"
→ Agrupar por **Event**

## 🔹 Comparador tipo "Liquidez global por categoría"
→ Agrupar por **Series**

## 🔹 Comparador tipo "Mejor precio actual"
→ Nivel **Market**

---

# 7️⃣ Resumen estructural

| Nivel | Qué es | Contiene |
|-------|--------|----------|
| Series | Categoría macro | Events |
| Event | Evento específico | Markets |
| Market | Contrato negociable | YES/NO |

---

# 8️⃣ Insight importante

En Kalshi:

- Solo los **Markets** son negociables
- Los **Events** y **Series** son estructuras organizativas
- Cada Market es binario (YES/NO)
- La competencia entre candidatos se modela como múltiples markets dentro de un mismo Event

---
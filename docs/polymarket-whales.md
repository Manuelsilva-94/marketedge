Investigación 1.6: Whales y Holders
Objetivo: Para feature de "Smart Money Tracker"
Endpoints importantes:
bash# De tu lista:
GET /markets/{id}/top-holders
Preguntas:

¿Este endpoint existe y funciona?
¿Qué retorna exactamente?
¿Necesita autenticación?
¿Retorna addresses de wallets?
¿Incluye monto apostado por holder?

https://data-api.polymarket.com/holders?limit=20&minBalance=1&market=0xaf9d0e448129a9f657f851d49495ba4742055d80e0ef1166ba0ee81d4d594214

El endpoint existe y funciona
No necesita autenticacion. Necesita un condition id de un market o varios. La respuesta no parece mostrar a que market pertenece cada holder
Retorna esto:
[
    {
        "token": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
        "holders": [
            {
                "proxyWallet": "0xf9b71663d723d28fa455db659098e1dacde860a4",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "",
                "amount": 10265.02456,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "siick",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xbe944cdbbdd30216239544e80872695127567bb6",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Unaware-Hamster",
                "amount": 7526.95,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "meatrobot",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x5235578efe24555b0c98e7dc10a902b09089c04a",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Athletic-Screwup",
                "amount": 6655.989849,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "back-in-whack",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x1d0d81f55610df0adaaa0da37611f1f4556cef5f",
                "bio": "Lets go",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Tart-Samurai",
                "amount": 5332.234487,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "Aurik",
                "profileImage": "https://polymarket-upload.s3.us-east-2.amazonaws.com/profile-image-743465-6d31b09a-5b41-4f1b-a4fd-1d77765e2bf4.jpg",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x38e59b36aae31b164200d0cad7c3fe5e0ee795e7",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Our-Dough",
                "amount": 5197,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "cowcat",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x510904c9a58f5c5ad799a1b44947077564175e9c",
                "bio": "3353",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Raw-Cross",
                "amount": 3889.874609,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "Logan.",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x94e4639e9aef0eab61533ecafe74c5f15662534a",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Prize-Torte",
                "amount": 3173.810229,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "xlefgerx",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x2c41d0ca2b4b2344912eead711f28cd4dcff133e",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Daring-President",
                "amount": 3089.21,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "lineth",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x4200904bf9bb5c46d98d4348b42c009ecbdd2f52",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "",
                "amount": 2942.82,
                "displayUsernamePublic": false,
                "outcomeIndex": 0,
                "name": "",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xed7a01c98cd12e15c67bcd099ef0b7027007c24b",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Plump-Stumbling",
                "amount": 2748.476221,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "HamSamichez",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xbacd00c9080a82ded56f504ee8810af732b0ab35",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Dearest-Agenda",
                "amount": 2427.023688,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "ScottyNooo",
                "profileImage": "https://polymarket-upload.s3.us-east-2.amazonaws.com/profile-image-2861114-c1c15cef-e455-4932-9b26-66ad799b1a4a.webp",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x5542dff7f12457b8af47f0bcdf67e3d92e14a7e7",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Nutty-Console",
                "amount": 2373.517,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "loosygoose",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x48a4b86b526bee0c8c03854612e1ee76766fe3f3",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Sarcastic-Chipmunk",
                "amount": 2098.620578,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "0x48a4b86B526bee0c8C03854612e1EE76766FE3f3-1766167136303",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x3c512b6676a18810366498165538913ef0e4af7e",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Trained-Gauntlet",
                "amount": 1602.31405,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "DarnassusSquare",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xd9e6e87db38a4886e4002e59f4d49bd90da5819f",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Vengeful-Afternoon",
                "amount": 1431.892258,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "mrpink42069",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x72e1ac3695170d5c96d4a66823c7e97242df2b73",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Empty-Cucumber",
                "amount": 1429.799214,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "mph2000",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xae68f4df7589a0fe104deb5fd6d6747cbf9a2cef",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Lean-Shout",
                "amount": 1281.28,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "ergou",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x63d43bbb87f85af03b8f2f9e2fad7b54334fa2f1",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Vivid-Macrofauna",
                "amount": 1040.6427,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "wokerjoesleeper",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x9258f767247be9676ee83f1cbcd3726d178efb3d",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Sane-Phrase",
                "amount": 1034.991792,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "Catstacker",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x95f22da458e72ccbe1f2c564c93c0d6d903df167",
                "bio": "",
                "asset": "101676997363687199724245607342877036148401850938023978421879460310389391082353",
                "pseudonym": "Dense-Horizon",
                "amount": 1024.8975,
                "displayUsernamePublic": true,
                "outcomeIndex": 0,
                "name": "0x95F22dA458E72CcBE1f2C564C93c0d6d903df167-1767556433609",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            }
        ]
    },
    {
        "token": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
        "holders": [
            {
                "proxyWallet": "0xa5ef39c3d3e10d0b270233af41cac69796b12966",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "",
                "amount": 95061.952336,
                "displayUsernamePublic": false,
                "outcomeIndex": 1,
                "name": "",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x92669a96dab74e0017dd2bc40d2fda5071d87562",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Steep-Public",
                "amount": 4537.652293,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "0x92669a96dab74e0017dd2bC40D2FDa5071d87562-1721649370571",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xae43f317e8a6fabafc33eaa6934e4b4705348194",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Unsung-Surprise",
                "amount": 2250.670335,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "Gorlami2",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x4bbe10ba5b7f6df147c0dae17b46c44a6e562cf3",
                "bio": "Give war a chance",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Moral-Lab",
                "amount": 1261.45,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "How.Dare.You",
                "profileImage": "https://polymarket-upload.s3.us-east-2.amazonaws.com/profile-image-1746015-41deff2e-c5e1-47b9-86e9-4d36bda03566.png",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x84f820558e744c1debe52f499a919c115c3b0ff2",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Immaculate-Hassock",
                "amount": 1090.58,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "OneBadBet",
                "profileImage": "https://polymarket-upload.s3.us-east-2.amazonaws.com/tat7_d14a8b29-554f-478c-879b-00d567a33d5e_1738620118748.jpg",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x0a6d26d31b28fd5a84c301f8b27296612f3b1d0a",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Terrible-Ordinary",
                "amount": 810.925263,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "Bikesarethebest",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x0729a91138dba9addc310d39f57aad555371c50e",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Sweltering-Expectation",
                "amount": 400,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "0x0729A91138dbA9addc310D39F57aAd555371C50e-1771099126692",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x801debcb212ba242baa12b0c6e4abfb59868bf22",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "",
                "amount": 399.982773,
                "displayUsernamePublic": false,
                "outcomeIndex": 1,
                "name": "",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xdb885929139cac6471ee0bb6d3b8a3ff5b462371",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Lean-Instrumentalist",
                "amount": 333,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "lordan",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x3825180182703613f3619d4611890c5b655504e8",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "That-Macadamia",
                "amount": 328.26,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "WhoseHouseRamsHouse",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x8d0ddcfc041da00877a1dfa2ae7adeddbc214aff",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Mediocre-Description",
                "amount": 300,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "0x8d0DDCFc041da00877a1Dfa2aE7AdEDDbC214aFf-1765091968554",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xa42c71802f9fb7ba7922774c4784b6c744d55759",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Curly-Screening",
                "amount": 299.996912,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "OriKing",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x21f90e5ff30c12f52fbb2fb220aa268f22faed12",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Antique-Downfall",
                "amount": 295.986662,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "gandalf",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x56317f9b062cb4e002d3dfe3d6b26e65cd61a679",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Unhappy-Vein",
                "amount": 274.228725,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "crocodile",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x92eb1cd8de460e6f89115218acd8c35d58ba986a",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Luminous-Roadway",
                "amount": 262.626658,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "squiffs",
                "profileImage": "https://polymarket-upload.s3.us-east-2.amazonaws.com/profile-image-1297339-cb73eb15-29ae-41eb-a91f-db0fc935056b.png",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x218f912f8d88cc6ec06a5f812231d68602c77ef2",
                "bio": "Make Polymarket Fun Again",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Flippant-Spider",
                "amount": 241,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "PrimaryPartner",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x3314241c37a296e9aece7e7dfb5898652b4aa8c7",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Circular-Wifi",
                "amount": 206.838757,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "0x3314241c37A296e9AeCe7E7DFB5898652b4aa8c7-1767968276778",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0x9ecc458843337b450198b8a2af16d7f3ae836b37",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Glamorous-Peony",
                "amount": 200,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "defenseintern",
                "profileImage": "https://polymarket-upload.s3.us-east-2.amazonaws.com/profile-image-3257841-8a2601e1-aa11-43ee-8ab7-4fa70eeae5cf.jpg",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xd81fbc5c53593e4e2923a641ff2bc7e2d9866b75",
                "bio": "betmoar-72757",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Querulous-Oxford",
                "amount": 188.352015,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "LBZone",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            },
            {
                "proxyWallet": "0xeda045f91a24d199f78ef1f591fbbe6a5b517dff",
                "bio": "",
                "asset": "4153292802911610701832309484716814274802943278345248636922528170020319407796",
                "pseudonym": "Infatuated-Devastation",
                "amount": 161.15619,
                "displayUsernamePublic": true,
                "outcomeIndex": 1,
                "name": "rocky42018",
                "profileImage": "",
                "profileImageOptimized": "",
                "verified": false
            }
        ]
    }
]

Tambien existen estos endpoints:
Get user orders

Copy page

Retrieves open orders for the authenticated user. Returns paginated results. Builder-authenticated clients can also use this endpoint to retrieve orders attributed to their builder account.

GET

https://clob.polymarket.com/orders

Try it
Authorizations

polyApiKey & polyAddress & polySignature & polyPassphrase & polyTimestamp
polyApiKey & polyAddress & polySignature & polyPassphrase & polyTimestamp
​
POLY_API_KEY
stringheaderrequired
Your API key

​
POLY_ADDRESS
stringheaderrequired
Ethereum address associated with the API key

​
POLY_SIGNATURE
stringheaderrequired
HMAC signature of the request

​
POLY_PASSPHRASE
stringheaderrequired
API key passphrase

​
POLY_TIMESTAMP
stringheaderrequired
Unix timestamp of the request

Query Parameters
​
id
string
Order ID (hash) to filter by specific order

​
market
string
Market (condition ID) to filter orders

​
asset_id
string
Asset ID (token ID) to filter orders

​
next_cursor
string
Cursor for pagination (base64 encoded offset)

Response

200

application/json
Successfully retrieved orders

​
limit
integerrequired
Maximum number of results per page

Example:
100

​
next_cursor
stringrequired
Cursor for pagination (base64 encoded offset). Empty if no more results.

Example:
"MTAw"

​
count
integerrequired
Number of orders in this response

Example:
2

​
data
object[]required
Array of open orders

Get public profile by wallet address

Copy page

GET
/
public-profile

Try it
Query Parameters
​
address
stringrequired
The wallet address (proxy wallet or user address)

Response

200

application/json
Public profile information

​
createdAt
string<date-time> | null
ISO 8601 timestamp of when the profile was created

​
proxyWallet
string | null
The proxy wallet address

​
profileImage
string<uri> | null
URL to the profile image

​
displayUsernamePublic
boolean | null
Whether the username is displayed publicly

​
bio
string | null
Profile bio

​
pseudonym
string | null
Auto-generated pseudonym

​
name
string | null
User-chosen display name

​
users
object[] | null
Array of associated user objects

Show child attributes

​
xUsername
string | null
X (Twitter) username

​
verifiedBadge
boolean | null

Get current positions for a user

Copy page

GET
/
positions

Try it
Query Parameters
​
user
stringrequired
User address (required)
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
market
string[]
Comma-separated list of condition IDs. Mutually exclusive with eventId.

0x-prefixed 64-hex string

​
eventId
integer[]
Comma-separated list of event IDs. Mutually exclusive with market.

Required range: x >= 1
​
sizeThreshold
numberdefault:1
Required range: x >= 0
​
redeemable
booleandefault:false
​
mergeable
booleandefault:false
​
limit
integerdefault:100
Required range: 0 <= x <= 500
​
offset
integerdefault:0
Required range: 0 <= x <= 10000
​
sortBy
enum<string>default:TOKENS
Available options: CURRENT, INITIAL, TOKENS, CASHPNL, PERCENTPNL, TITLE, RESOLVING, PRICE, AVGPRICE 
​
sortDirection
enum<string>default:DESC
Available options: ASC, DESC 
​
title
string
Maximum string length: 100
Response

200

application/json
Success

​
proxyWallet
string
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
asset
string
​
conditionId
string
0x-prefixed 64-hex string

Example:
"0xdd22472e552920b8438158ea7238bfadfa4f736aa4cee91a6b86c39ead110917"

​
size
number
​
avgPrice
number
​
initialValue
number
​
currentValue
number
​
cashPnl
number
​
percentPnl
number
​
totalBought
number
​
realizedPnl
number
​
percentRealizedPnl
number
​
curPrice
number
​
redeemable
boolean
​
mergeable
boolean
​
title
string
​
slug
string
​
icon
string
​
eventSlug
string
​
outcome
string
​
outcomeIndex
integer
​
oppositeOutcome
string
​
oppositeAsset
string
​
endDate
string
​
negativeRisk
boolean

Get user activity

Copy page

GET
/
activity

Try it
Query Parameters
​
limit
integerdefault:100
Required range: 0 <= x <= 500
​
offset
integerdefault:0
Required range: 0 <= x <= 10000
​
user
stringrequired
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
market
string[]
Comma-separated list of condition IDs. Mutually exclusive with eventId.

0x-prefixed 64-hex string

​
eventId
integer[]
Comma-separated list of event IDs. Mutually exclusive with market.

Required range: x >= 1
​
type
enum<string>[]
Available options: TRADE, SPLIT, MERGE, REDEEM, REWARD, CONVERSION, MAKER_REBATE 
​
start
integer
Required range: x >= 0
​
end
integer
Required range: x >= 0
​
sortBy
enum<string>default:TIMESTAMP
Available options: TIMESTAMP, TOKENS, CASH 
​
sortDirection
enum<string>default:DESC
Available options: ASC, DESC 
​
side
enum<string>
Available options: BUY, SELL 
Response

200

application/json
Success

​
proxyWallet
string
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
timestamp
integer<int64>
​
conditionId
string
0x-prefixed 64-hex string

Example:
"0xdd22472e552920b8438158ea7238bfadfa4f736aa4cee91a6b86c39ead110917"

​
type
enum<string>
Available options: TRADE, SPLIT, MERGE, REDEEM, REWARD, CONVERSION, MAKER_REBATE 
​
size
number
​
usdcSize
number
​
transactionHash
string
​
price
number
​
asset
string
​
side
enum<string>
Available options: BUY, SELL 
​
outcomeIndex
integer
​
title
string
​
slug
string
​
icon
string
​
eventSlug
string
​
outcome
string
​
name
string
​
pseudonym
string
​
bio
string
​
profileImage
string
​
profileImageOptimized
string  

Get total value of a user's positions

Copy page

GET
/
value

Try it
Query Parameters
​
user
stringrequired
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
market
string[]
0x-prefixed 64-hex string

Response

200

application/json
Success

​
user
string
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
value
number

Get trades for a user or markets

Copy page

GET
/
trades

Try it
Query Parameters
​
limit
integerdefault:100
Required range: 0 <= x <= 10000
​
offset
integerdefault:0
Required range: 0 <= x <= 10000
​
takerOnly
booleandefault:true
​
filterType
enum<string>
Must be provided together with filterAmount.

Available options: CASH, TOKENS 
​
filterAmount
number
Must be provided together with filterType.

Required range: x >= 0
​
market
string[]
Comma-separated list of condition IDs. Mutually exclusive with eventId.

0x-prefixed 64-hex string

​
eventId
integer[]
Comma-separated list of event IDs. Mutually exclusive with market.

Required range: x >= 1
​
user
string
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
side
enum<string>
Available options: BUY, SELL 
Response

200

application/json
Success

​
proxyWallet
string
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
side
enum<string>
Available options: BUY, SELL 
​
asset
string
​
conditionId
string
0x-prefixed 64-hex string

Example:
"0xdd22472e552920b8438158ea7238bfadfa4f736aa4cee91a6b86c39ead110917"

​
size
number
​
price
number
​
timestamp
integer<int64>
​
title
string
​
slug
string
​
icon
string
​
eventSlug
string
​
outcome
string
​
outcomeIndex
integer
​
name
string
​
pseudonym
string
​
bio
string
​
profileImage
string
​
profileImageOptimized
string
​
transactionHash
string

Get trader leaderboard rankings

Copy page

GET
/
v1
/
leaderboard

Try it
Query Parameters
​
category
enum<string>default:OVERALL
Market category for the leaderboard

Available options: OVERALL, POLITICS, SPORTS, CRYPTO, CULTURE, MENTIONS, WEATHER, ECONOMICS, TECH, FINANCE 
​
timePeriod
enum<string>default:DAY
Time period for leaderboard results

Available options: DAY, WEEK, MONTH, ALL 
​
orderBy
enum<string>default:PNL
Leaderboard ordering criteria

Available options: PNL, VOL 
​
limit
integerdefault:25
Max number of leaderboard traders to return

Required range: 1 <= x <= 50
​
offset
integerdefault:0
Starting index for pagination

Required range: 0 <= x <= 1000
​
user
string
Limit leaderboard to a single user by address
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
userName
string
Limit leaderboard to a single username

Response

200

application/json
Success

​
rank
string
The rank position of the trader

​
proxyWallet
string
User Profile Address (0x-prefixed, 40 hex chars)

Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
userName
string
The trader's username

​
vol
number
Trading volume for this trader

​
pnl
number
Profit and loss for this trader

​
profileImage
string
URL to the trader's profile image

​
xUsername
string
The trader's X (Twitter) username

​
verifiedBadge
boolean
Whether the trader has a verified badge

## Top Holders Endpoint
- URL: [exacta]
- Auth required: [SI/NO]
- Response structure:
```json
{
  "holders": [
    {
      "address": "0x...",
      "shares": 1000,
      "value": 500,
      "side": "YES"
    }
  ]
}
```

## Para Smart Money Feature
Podemos:
- [X] Ver quién tiene posiciones grandes
- [X] Trackear cambios en holdings
- [ ] Ver trades individuales (si no está disponible)
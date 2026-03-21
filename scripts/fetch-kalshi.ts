import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Kalshi Auth (copy from kalshi-auth.ts)
class KalshiAuth {
  private apiKey: string;
  private privateKey: crypto.KeyObject;

  constructor() {
    this.apiKey = process.env.KALSHI_API_KEY!;

    const privateKeyPath = process.env.KALSHI_PRIVATE_KEY_PATH;
    let keyPem: string;

    if (privateKeyPath) {
      const fullPath = path.resolve(process.cwd(), privateKeyPath);
      const keyContent = fs.readFileSync(fullPath, 'utf8');
      keyPem = keyContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
    } else if (process.env.KALSHI_PRIVATE_KEY) {
      keyPem = process.env.KALSHI_PRIVATE_KEY.replace(/\\n/g, '\n').trim();
    } else {
      throw new Error(
        'KALSHI_PRIVATE_KEY or KALSHI_PRIVATE_KEY_PATH must be set'
      );
    }

    try {
      const isPkcs1 = keyPem.includes('BEGIN RSA PRIVATE KEY');
      this.privateKey = crypto.createPrivateKey({
        key: keyPem,
        format: 'pem',
        ...(isPkcs1 && { type: 'pkcs1' })
      });
    } catch (err) {
      throw new Error(
        `KALSHI_PRIVATE_KEY invalid: ${err instanceof Error ? err.message : err}`
      );
    }

    console.log('✅ Kalshi auth initialized');
  }

  generateSignature(method: string, apiPath: string): string {
    const timestamp = Date.now().toString();
    const message = timestamp + method + apiPath;

    const signature = crypto.sign('sha256', Buffer.from(message), {
      key: this.privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    });

    return signature.toString('base64');
  }

  getHeaders(method: string, apiPath: string): Record<string, string> {
    const timestamp = Date.now().toString();
    const signature = this.generateSignature(method, apiPath);

    return {
      'KALSHI-ACCESS-KEY': this.apiKey,
      'KALSHI-ACCESS-TIMESTAMP': timestamp,
      'KALSHI-ACCESS-SIGNATURE': signature,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }
}

interface KalshiMarket {
  ticker: string;
  event_ticker: string;
  title: string;
  subtitle?: string;
  yes_sub_title?: string;
  category: string;
  status: string;
  yes_bid?: number;
  yes_ask?: number;
  no_bid?: number;
  no_ask?: number;
  volume?: number;
  volume_24h?: number;
  liquidity?: number;
  open_interest?: number;
  close_time?: string;
}

interface KalshiEvent {
  event_ticker: string;
  event_slug?: string;
  series_ticker?: string;
  title?: string;
  sub_title?: string;
  category?: string;
  markets?: KalshiMarket[];
}

const SERIES_BY_CATEGORY: Record<string, string[]> = {
  // POLÍTICA (mercados electorales, gobierno, geopolítica)
  Politics: [
    'KXPRESNOMD',
    'KXSECTREASURY',
    'KXNEXTIRANLEADER',
    'KXUKRAINE',
    'KXSYRIA',
    'KXCLOSEHORMUZ',
    'KXIMPEACH',
    'KXTRUMPPUTIN',
    'KXGREENLAND',
    'KXDEBTCEILING',
    'KXBIRTHRIGHT',
    'KXABORTION',
    'KXSCHEDULEF',
    'KXDOGE',
    'KXDOGEDONE',
    'KXFED',
    'KXFEDEND',
    'KXFEDCHAIRNOM',
    'KXSENATE',
    'KXHOUSE',
    'KXEPSTEIN',
    'KXJFKFILES',
    'KXTARIFFS',
    'KXTARIFFSCANADA',
    'KXTARIFFSPRC',
    'KXTARIFFSEU',
    'KXTARIFFSALUMINUM',
    'KXTARIFFSSTEEL',
    'KXGLOBALTARIFFS',
    'KXNATO',
    'KXSANCTIONRUSSIA',
    'KXIRANMEET',
    'KXTRUMPPUTIN',
    'KXZELENSKYY',
    'KXZELENSKYYOUT',
    'KXNEXTCZECHPM',
    'KXFRENCHPM',
    'KXCANADAPM',
    'KXCANADAELECT',
    'KXAUSPM',
    'KXNORWAYPM',
    'KXNEXTUKPM',
    'KXNEWPOPE',
    'KXPOPEVISITNEXT'
  ],

  // ECONOMÍA (tasas, inflación, mercados, commodities)
  Economics: [
    'KXFED',
    'KXCPI',
    'KXGDPNOM',
    'KXGOLD',
    'KXOIL',
    'KXRETAIL',
    'KXDEFICIT',
    'KXJOBLESS',
    'KXPAYROLLS',
    'KXUNEMPLOYMENT',
    'KXRATEHIKE',
    'KXRATECUT',
    'KXRATECUTS',
    'KXDOTPLOT',
    'KXFEDMEET',
    'KXGAS',
    'KXGASMAX',
    'KXGASMIN',
    'KXOILW',
    'KXWHEAT',
    'KXHOUSING',
    'KXHOMEUSY',
    'KXHPI',
    'KXHOUSINGSTART',
    'KXBANKRUPTCY',
    'KXBANKRUPTS',
    'KXRECESSION',
    'KXRECSSNBER',
    'KXNGDP',
    'KXNGDPQ',
    'KXGDPYEAR',
    'KXCHINAUSGDP',
    'KXCPIYOY',
    'KXCPICORE',
    'KXCPIFOOD',
    'KXPCE',
    'KXPCECORE',
    'KXUSDEBT',
    'KXDEBTGROWTH',
    'KXMORTGAGERATE',
    'KXMORTGAGEDEF',
    'KXEGGS',
    'KXCOSTCOMEMBER',
    'KXCOSTCOHOTDOG'
  ],

  // CRYPTO (eventos, precios anuales, regulación)
  Crypto: [
    'KXBTCYEAR',
    'KXBTCATH',
    'KXBTCD',
    'KXBTCE',
    'KXBTCY',
    'KXBTC2025100',
    'KXBTC2026200',
    'KXBTC2026250',
    'KXBTCMAX100',
    'KXBTCMAX150',
    'KXBTCMAX125',
    'KXBTCDOM',
    'KXBTCRESERVE',
    'KXBTCRESERVECOUNTRY',
    'KXETH',
    'KXETHATH',
    'KXETHD',
    'KXETHY',
    'KXETHFLIP',
    'KXSOL',
    'KXSOLD',
    'KXSOL150',
    'KXSOLFLIPETH',
    'KXSOLANAATH',
    'KXXRP',
    'KXXRPD',
    'KXXRPATH',
    'KXRIPPLE',
    'KXRIPPLED',
    'KXDOGE',
    'KXDOGED',
    'KXDOGEMAXW',
    'KXDOGEMAXM',
    'KXDOGEMAXMON',
    'KXAVAX',
    'KXAVAXD',
    'KXLTC',
    'KXLTCD',
    'KXBNB15M',
    'KXCRYPTOREG',
    'KXCRYPTORESERVE',
    'KXCRYPTOCAPGAIN',
    'KXCRYPTOPAY',
    'KXCRYPTOSTRUCTURE',
    'KXCRYPTOEO',
    'KXSTABLECOIN',
    'KXBOASTABLE',
    'KXSEC',
    'KXDJTBTC',
    'KXDJTCHAIN',
    'KXPRCBTC',
    'KXELSALVADORBTC',
    'KXETHETF',
    'KXFDVRAINBOW',
    'KXHARDFORKBTC',
    'KXEIP4444',
    'KXNEWCOINCHAIN',
    'KXTOKENLAUNCH',
    'KXAIRDROPHYPE',
    'KXAIRDROPPUMPFUN'
  ],

  // DEPORTES - Fútbol europeo
  Soccer: [
    'KXMENWORLDCUP',
    'KXLALIGA',
    'KXPREMIERLEAGUE',
    'KXBUNDESLIGA',
    'KXSERIEA',
    'KXLIGUE1',
    'KXEURO',
    'KXUEL',
    'KXUEFACL',
    'KXUCL',
    'KXMASTERS',
    'KXUSOPEN',
    'KXF1',
    'KXBOXING',
    'KXNBA',
    'KXMLB',
    'KXNHL'
  ],

  // DEPORTES - US Sports y otros
  Sports: [
    'KXNBAMVP',
    'KXNBAROY',
    'KXNBACOY',
    'KXNBAFINMVP',
    'KXNBAFINALSMVP',
    'KXNBAEAST',
    'KXNBAWEST',
    'KXNBAPLAYOFF',
    'KXNBATRADE',
    'KXNBADRAFT1',
    'KXMLBALMVP',
    'KXMLBALROTY',
    'KXMLBNLMVP',
    'KXMLBWORLD',
    'KXMLBPLAYOFFS',
    'KXNHLMVP',
    'KXNHLHART',
    'KXNHLCALDER',
    'KXNHLNORRIS',
    'KXNHLPLAYOFF',
    'KXNFLMVP',
    'KXNFLDPOY',
    'KXNFLCOTY',
    'KXHEISMAN',
    'KXNFLDRAFT1ST',
    'KXSUPERBOWL',
    'KXTEAMSINSC',
    'KXNFLCOACH',
    'KXNFLHIRECOACH',
    'KXPGA',
    'KXPGATOP5',
    'KXPGATOP10',
    'KXPGATIGER',
    'KXPGAMAJORWIN',
    'KXMASTERS',
    'KXTHEOPEN',
    'KXGOLFMAJORS',
    'KXGRANDSLAM',
    'KXTENNISMAJORDJOKOVIC',
    'KXDJOKOVICRETIRE',
    'KXMESSIRETIRE',
    'KXKELCERETIRE',
    'KXLBJRETIRE',
    'KXARODGRETIRE',
    'KXBOXING',
    'KXBOXINGFIGHT',
    'KXBOXINGKNOCKOUT',
    'KXUFC',
    'KXUFCTITLE',
    'KXUFCFIGHT',
    'KXUFCHEAVYWEIGHTTITLE',
    'KXF1',
    'KXNASCAR',
    'KXNASCARCUPCHAMP',
    'KXINDY500',
    'KXBALLONDOR',
    'KXBALLONDORNATION',
    'KXWCROUND',
    'KXWCGAME',
    'KXATPGRANDSLAM',
    'KXATP1RANK',
    'KXGRANDSLAMSINNERALCARAZ',
    'KXTOURDEFRANCE',
    'KXRYDERCUP',
    'KXSIXNATIONS',
    'KXIPL',
    'KXWBCHEAVYWEIGHTTITLE',
    'KXWBCMVP',
    'KXMARATHON'
  ],

  // ENTRETENIMIENTO (Oscars, Grammys, series, películas)
  Entertainment: [
    'KXOSCARNOMPIC',
    'KXOSCARNOMDIR',
    'KXOSCARNOMACTO',
    'KXOSCARNOMACTR',
    'KXOSCARACTO',
    'KXOSCARACTR',
    'KXOSCARPIC',
    'KXOSCARDIR',
    'KXOSCARCOUNTBARBIE',
    'KXOSCARCOUNTOPPENHEIMER',
    'KXOSCARCOUNTBRUTALIST',
    'KXGRAMRAOTY',
    'KXGRAMAOTY',
    'KXGRAMROTY',
    'KXGRAMBMV',
    'KXGRAMBOP',
    'KXGRAMSOTY',
    'KXGRAMMYCOUNTSWIFT',
    'KXGRAMMYCOUNTBEYONCE',
    'KXGRAMMYCOUNTBAD',
    'KXGRAMMYCOUNTCHAPPELL',
    'KXEMMYDSERIES',
    'KXEMMYLSERIES',
    'KXEMMYCSERIES',
    'KXEMMYDACTO',
    'KXEMMYDACTR',
    'KXVMAVOTY',
    'KXVMAALBUM',
    'KXVMAPOP',
    'KXVMASOTY',
    'KXNETFLIXSUBS',
    'KXNETFLIXRANK',
    'KXNETFLIXRANKMOVIE',
    'KXDISNEYSUBS',
    'KXSPOTIFYARTIST',
    'KXSPOTIFYALBUMW',
    'KXSPOTIFYGNX',
    'KXTOPALBUMBYTAYLORSWIFT',
    'KXTOPALBUMKANYE',
    'KXTOPALBUMKENDRICK',
    'KXTOPALBUMCHAPPELL',
    'KXTOPALBUMBYBILLIE',
    'KXTOPALBUMBYEMINEM',
    'KXGTA6',
    'KXGTA6ONTIME',
    'KXSTEAMGOTY',
    'KXGAMEAWARDS',
    'KXGAMEAWARDSBP',
    'KXMARIOKART9',
    'KXSWITCH2',
    'KXPS6',
    'KXNOBELLIT',
    'KXNOBELPEACE',
    'KXNOBELMED',
    'KXNOBELCHEM',
    'KXNOBELPHYSICS',
    'KXNOBELPE',
    'KXNOBELECON',
    'KXCANNESGRANDPRIX',
    'KXCANNESPALMEDOR',
    'KXCANNESBESTACTOR',
    'KXEUROVISION',
    'KXEUROVISIONHOST',
    'KXLOLLA',
    'KXCOACHELLA',
    'KXTAYLORSWIFT',
    'KXENGAGEMENTSWIFTKELCE',
    'KXMARRIAGESWIFTKELCE',
    'KXSNL',
    'KXSNLHOST',
    'KXJAMESBOND',
    'KXBOND'
  ],

  // CIENCIA Y TECNOLOGÍA (AI, espacio, salud)
  Science: [
    'KXGPT5',
    'KXGPT6',
    'KXGPT45',
    'KXGPTCOST',
    'KXGPTPARAM',
    'KXCLAUDE4',
    'KXCLAUDE5',
    'KXTOPLLM',
    'KXTOPLLMCHANGE',
    'KXCHINATOPLLM',
    'KXGROK',
    'KXGROK3',
    'KXGROK4',
    'KXGEMINI3',
    'KXLLAMA5',
    'KXOAIAGI',
    'KXOAIPLATEAU',
    'KXOAISOCIAL',
    'KXOAIPROFIT',
    'KXOAIHARDWARE',
    'KXAIPAUSE',
    'KXAITURING',
    'KXAIOPEN',
    'KXAISI',
    'KXAILEGISLATION',
    'KXAISAFETY',
    'KXAISECURITY',
    'KXAISPIKE',
    'KXAIDEBATES',
    'KXSTARSHIP',
    'KXSTARSHIPLAUNCH',
    'KXSTARSHIPDOCK',
    'KXSTARSHIPSPACE',
    'KXSPACEXMARS',
    'KXSPACEXREUSE',
    'KXCOLONIZEMARS',
    'KXMARSFLAG',
    'KXARTEMISII',
    'KXNEWGLENN',
    'KXMOON',
    'KXMOONMAN',
    'KXNEURALINK',
    'KXNEURALINKCOUNT',
    'KXWAYMOCITY',
    'KXWAYMOCITIES',
    'KXROBOTAXI',
    'KXROBOTAXICA',
    'KXTESLAOPTIMUS',
    'KXOPTIMUS',
    'KXFDAAPPROVAL',
    'KXWEIGHTDRUGS',
    'KXFDASHORT',
    'KXOZEMPICSHORT',
    'KXQUANTUM',
    'KXFUSION',
    'KXREACTOR',
    'KXSUPERCON',
    'KXIPHONEPRICE',
    'KXIPHONE17',
    'KXIPHONEASSEMBLE',
    'KXAAPLPRICEFOLD'
  ],

  // CLIMA Y DESASTRES
  Climate: [
    'KXHURCMAJ',
    'KXHURCTOT',
    'KXTROPSTORM',
    'KXHURNYC',
    'KXHURMIA',
    'KXHURTB',
    'KXHURNOR',
    'KXHURSAV',
    'KXHURCHARL',
    'KXHURCAL',
    'KXHURPATHGENERAL',
    'KXHURPATHGENERALMAJOR',
    'KXEARTHQUAKE',
    'KXEARTHQUAKECALIFORNIA',
    'KXEARTHQUAKEJAPAN',
    'KXEARTHQUAKELA',
    'KXTSUNAMI',
    'KXKILAUEA',
    'KXSPURRERUPT',
    'KXERUPTSUPER',
    'KXGTEMP',
    'KXHOTYEAR',
    'KXWARMING',
    'KXCO2',
    'KXARCTICICEMIN',
    'KXSNOWS',
    'KXSNOWSTORM',
    'KXHEATWARNING',
    'KXAVGTEMP',
    'KXTEMPMON',
    'KXHIGHNY',
    'KXHIGHCHI',
    'KXHIGHMIA',
    'KXFEMA',
    'KXEMERGENCYNOLA',
    'KXEMERGENCYMIA',
    'KXEMERGENCYLA',
    'KXEVSHARE',
    'KXSOLAR',
    'KXERCOTX',
    'KXUSCLIMATE',
    'KXEUCLIMATE'
  ],

  // FINANZAS (índices, forex, commodities)
  Financials: [
    'KXINX',
    'KXINXM',
    'KXINXY',
    'KXINXW',
    'KXINXE',
    'KXINXI',
    'KXNASDAQ100',
    'KXNASDAQ100W',
    'KXNASDAQ100M',
    'KXNASDAQ100Y',
    'KXNASDAQ100Z',
    'KXNASDAQ100MAXY',
    'KXNASDAQ100MINY',
    'KXGOLD',
    'KXGOLDW',
    'KXGOLDMON',
    'KXGOLDPRICE',
    'KXWTI',
    'KXWTIW',
    'KXWTIH',
    'KXWTIMAX',
    'KXWTIMIN',
    'KXWTIE',
    'KXEURUSD',
    'KXEURUSDMAX',
    'KXEURUSDMIN',
    'KXEURUSDEOY',
    'KXEURUSDPARITY',
    'KXUSDJPY',
    'KXUSDJPYMAX',
    'KXUSDJPYMIN',
    'KXUSDJPYH',
    'KXUSDJPYE',
    'KXGBPUSD',
    'KXGBPUSDE',
    'KXGBPUSDH',
    'KXTNOTE',
    'KXTNOTEW',
    'KXTNOTED',
    'KXTREASURYMAX',
    'KXSILVERW',
    'KXSILVERMON',
    'KXCOPPERW',
    'KXCOPPERMON',
    'KXSTEELW',
    'KXSTEELMON',
    'KXBTCVSGOLD',
    'KXETHETF',
    'KXSTABLETOTAL'
  ],

  // ELECCIONES (mercados electorales específicos)
  Elections: [
    'KXNYCMAYOR',
    'KXMAMDANINYC',
    'KXNYCMAYORDSECOND',
    'KXNYCMAYOR2ND',
    'KXCANADAPM',
    'KXCANADAELECT',
    'KXCANADAPARTY',
    'KXCANLIBSEATS',
    'KXAUSPM',
    'KXAUSSEATALBANESE',
    'KXAUSSEATSLABOR',
    'KXGERMANPARTIES',
    'KXGERMANPARTYSEATS',
    'KXGERMANGOVT',
    'KXFRENCHPRES',
    'KXNORWAY25',
    'KXNORWAYPM',
    'KXJPNPM',
    'KXJAPANHOC',
    'KXJAPANLOWERHOUSEMAJORITY',
    'KXNXTCZECHPM',
    'KXCZECHPM',
    'KXROMANIATOP',
    'KXIRELANDPRES',
    'KXIRISH1ROUND'
  ],

  // SALUD
  Health: [
    'KXFLUV',
    'KXNEWFLU',
    'KXMPOXCASES',
    'KXPHEIC',
    'KXMEASLES',
    'KXH5N1',
    'KXH5N1CASES',
    'KXPERTUSSIS',
    'KXPOLIO',
    'KXNEWOUTBREAKPHEIC',
    'KXNEWOUTBREAKPH5N1',
    'KXNEWOUTBREAKPMPOX',
    'KXCASE7D',
    'KXCASE7DNY',
    'KXCASE7DFL',
    'KXCASE7DCA',
    'KXBOOSTER',
    'KXVACCINEW',
    'KXVAXXKID',
    'KXDOSE4',
    'KXLIFEEXP',
    'KXFERTILITYRATE',
    'KXWEIGHTDRUGS',
    'KXDRUGPRICEOZEMPIC',
    'KXDRUGPRICEINSULIN',
    'KXFDA',
    'KXFDATYPE1DIABETES'
  ],

  // MENCIONES (mentions de personas/empresas en TV/redes)
  Mentions: [
    'KXTRUMPMENTION',
    'KXELONMENTION',
    'KXZUCKMENTION',
    'KXJPOWMENTION',
    'KXALTMANMENTION',
    'KXMUSKCHARGE',
    'KXBIDENMENTION',
    'KXKAMALAMENTION',
    'KXEARNINGSMENTIONNVDA',
    'KXEARNINGSMENTIONAAPL',
    'KXEARNINGSMENTIONMSFT',
    'KXEARNINGSMENTIONTSLA',
    'KXEARNINGSMENTIONMETA',
    'KXEARNINGSMENTIONAMZN',
    'KXEARNINGSMENTIONPLTR',
    'KXEARNINGSMENTIONBLK',
    'KXEARNINGSMENTIONV',
    'KXEARNINGSMENTIONJPM',
    'KXEARNIGNSMENTIONJPM',
    'KXEARNINGSMENTIONKO',
    'KXEARNINGSMENTIONLLY',
    'KXEARNINGSMENTIONNFLX',
    'KXEARNINGSMENTIONSPOT'
  ],

  // COMPANIES (IPOs, CEOs, productos tech)
  Companies: [
    'KXIPOOPENAI',
    'KXIPOSTARLINK',
    'KXIPOKLARNA',
    'KXIPOSPACEX',
    'KXIPORIPPLING',
    'KXIPOGLEAN',
    'KXIPODISCORD',
    'KXIPOANDURIL',
    'KXSTRIPEIPO',
    'KXKRAKENBANKPUBLIC',
    'KXCEOMETA',
    'KXCEOMRNA',
    'KXCEOAMAZON',
    'KXOPENAICEO',
    'KXOPENAICEOCHANGE',
    'KXGOOGLECEOCHANGE',
    'KXMSFTCEO',
    'KXAAPLCEOCHANGE',
    'KXTESLACEOCHANGE',
    'KXTESLAPROD',
    'KXTESLACAR',
    'KXTESLAYL',
    'KXTESLADELIVERYBY',
    'KXTESLAGAS',
    'KXSPACEXSTARSHIP',
    'KXSPACEXORBIT',
    'KXSPACEXCOUNT',
    'KXNEURALINK',
    'KXROBOTAXI',
    'KXOPTIMUS',
    'KXTESLAOPTIMUS',
    'KXOAIBROWSER',
    'KXGPT5',
    'KXSORA',
    'KXOPENAIPROFIT',
    'KXOAIANTH',
    'KXNETFLIXSUBS',
    'KXSPOTIFYSUBS',
    'KXSPOTIFYMAU',
    'KXDISNEYSUBS',
    'KXTIKTOKBAN',
    'KXTIKTOKSELL',
    'KXTIKTOKEXTENSION',
    'KXACQANNOUNCECHROME',
    'KXGOOGLEBREAKUP',
    'KXGOOGLESHARE',
    'KXBOEING',
    'KXBOEINGCEOCHANGE',
    'KXMSTRBTCCOUNT',
    'KXPALANTIR',
    'KXSWITCH2',
    'KXPS6'
  ]
};

function buildKalshiQuestion(market: KalshiMarket, event: KalshiEvent): string {
  const eventTitle = event?.title?.trim() || '';
  const yesSubTitle = market.yes_sub_title?.trim() || '';
  const subtitle = market.subtitle?.trim() || '';
  const marketTitle = market.title?.trim() || '';

  // Caso 1: market.title es específico y diferente del event.title
  if (marketTitle && marketTitle !== eventTitle && marketTitle.length > 15) {
    const suffix = yesSubTitle || subtitle;
    return suffix ? `${marketTitle} — ${suffix}` : marketTitle;
  }

  // Caso 2: event.title + yes_sub_title (Sports, Mentions, la mayoría)
  if (eventTitle && yesSubTitle) {
    return `${eventTitle} — ${yesSubTitle}`;
  }

  // Caso 3: event.title + subtitle (Crypto pricing con threshold)
  if (eventTitle && subtitle) {
    return `${eventTitle} — ${subtitle}`;
  }

  // Caso 4: solo event.title
  if (eventTitle) return eventTitle;

  return marketTitle || market.ticker || 'Unknown market';
}

interface NormalizedMarket {
  platform: 'KALSHI';
  externalId: string;
  question: string;
  slug: string;
  description: string | null;
  category: string | null;
  tags: string[];
  volume24h: number;
  volumeTotal: number;
  liquidity: number;
  active: boolean;
  endDate: string | null;
  imageUrl: null;
  url: string;
  eventId: string;
  eventSlug: string | null;
  eventTitle: string | null;
  seriesId: string | null;
}

function normalizeMarket(
  market: KalshiMarket,
  event: KalshiEvent
): NormalizedMarket {
  return {
    platform: 'KALSHI',
    externalId: market.ticker,
    question: buildKalshiQuestion(market, event),
    slug: market.ticker.toLowerCase(),
    description: market.subtitle || event.sub_title || null,
    category: event.category || market.category || null,
    tags: [],
    volume24h: market.volume_24h ?? 0,
    volumeTotal: market.volume ?? 0,
    liquidity: market.liquidity ?? 0,
    active: market.status === 'active' || market.status === 'open',
    endDate: market.close_time || null,
    imageUrl: null,
    url: `https://kalshi.com/markets/${market.ticker}`,
    eventId: event.event_ticker,
    eventSlug: (event.event_slug ?? event.event_ticker)?.toLowerCase() ?? null,
    eventTitle: event.title || null,
    seriesId: event.series_ticker || null
  };
}

async function fetchSeriesMarkets(
  auth: KalshiAuth,
  seriesTicker: string,
  maxPerSeries = 200
): Promise<Array<{ market: KalshiMarket; event: KalshiEvent }>> {
  const baseUrl = 'https://api.elections.kalshi.com';
  const results: Array<{ market: KalshiMarket; event: KalshiEvent }> = [];

  // Try 1: events with series_ticker (si el API lo soporta)
  const eventsPath = '/trade-api/v2/events';
  const eventsParams = new URLSearchParams({
    series_ticker: seriesTicker,
    with_nested_markets: 'true',
    limit: '200',
  });
  const eventsUrl = `${baseUrl}${eventsPath}?${eventsParams}`;
  const eventsResponse = await fetch(eventsUrl, {
    headers: auth.getHeaders('GET', eventsPath)
  });

  if (eventsResponse.ok) {
    const data = await eventsResponse.json();
    for (const event of data.events || []) {
      for (const market of event.markets || []) {
        results.push({ market, event });
      }
    }
  }

  // Try 2: markets endpoint (sí events no soporta series_ticker o devuelve vacío)
  if (results.length === 0) {
    const marketsPath = '/trade-api/v2/markets';
    const marketsParams = new URLSearchParams({
      series_ticker: seriesTicker,
      limit: '200',
    });
    const marketsUrl = `${baseUrl}${marketsPath}?${marketsParams}`;
    const marketsResponse = await fetch(marketsUrl, {
      headers: auth.getHeaders('GET', marketsPath)
    });

    if (marketsResponse.ok) {
      const data = await marketsResponse.json();
      for (const market of data.markets || []) {
        const event: KalshiEvent = {
          event_ticker: market.event_ticker,
          series_ticker: seriesTicker,
          category: market.category
        };
        results.push({ market, event });
      }
    }
  }

  return results.slice(0, maxPerSeries);
}

async function fetchEventsByCursor(
  auth: KalshiAuth,
  cursor?: string
): Promise<{
  items: Array<{ market: KalshiMarket; event: KalshiEvent }>;
  nextCursor: string | undefined;
}> {
  const baseUrl = 'https://api.elections.kalshi.com';
  const eventsPath = '/trade-api/v2/events';
  const results: Array<{ market: KalshiMarket; event: KalshiEvent }> = [];

  const params = new URLSearchParams({
    with_nested_markets: 'true',
    limit: '200',
  });
  if (cursor) params.set('cursor', cursor);

  const url = `${baseUrl}${eventsPath}?${params}`;
  const headers = auth.getHeaders('GET', eventsPath);

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  for (const event of data.events || []) {
    for (const market of event.markets || []) {
      results.push({ market, event });
    }
  }

  return { items: results, nextCursor: data.cursor };
}

const MAX_PER_CATEGORY = 1500;
const MAX_PER_SERIES = 200;

async function fetchAllKalshiMarkets(): Promise<NormalizedMarket[]> {
  const auth = new KalshiAuth();
  const allMarkets: NormalizedMarket[] = [];
  const seen = new Set<string>();

  console.log('🔄 Fetching Kalshi markets by category...\n');

  for (const [category, seriesList] of Object.entries(SERIES_BY_CATEGORY)) {
    console.log(`📂 Category: ${category}`);
    let categoryCount = 0;

    for (const seriesTicker of seriesList) {
      if (categoryCount >= MAX_PER_CATEGORY) {
        console.log(
          `  ⚠️ ${category} limit reached (${MAX_PER_CATEGORY}), skipping rest`
        );
        break;
      }

      try {
        const rawPairs = await fetchSeriesMarkets(
          auth,
          seriesTicker,
          MAX_PER_SERIES
        );
        const uniquePairs = rawPairs.filter((p) => {
          if (seen.has(p.market.ticker)) return false;
          seen.add(p.market.ticker);
          return true;
        });
        const normalized = uniquePairs.map(({ market, event }) =>
          normalizeMarket(market, event)
        );

        if (normalized.length > 0) {
          allMarkets.push(...normalized);
          categoryCount += normalized.length;
          console.log(`  ✅ ${seriesTicker}: ${normalized.length} markets`);
        } else if (rawPairs.length === 0) {
          console.log(`  ⚠️ ${seriesTicker}: 0 markets`);
        }
        await new Promise((r) => setTimeout(r, 150));
      } catch (err) {
        console.log(
          `  ❌ ${seriesTicker}: ${err instanceof Error ? err.message : err}`
        );
      }
    }

    console.log(`  📊 ${category} total: ${categoryCount} markets\n`);
  }

  console.log(`✅ FETCH COMPLETE: ${allMarkets.length} total unique markets`);
  return allMarkets;
}

async function main() {
  const startTime = Date.now();
  const markets = await fetchAllKalshiMarkets();
  const duration = Math.round((Date.now() - startTime) / 1000);

  console.log(`   Duration: ${duration}s`);

  const samples = markets.slice(0, 5);
  console.log('\n[Kalshi] Sample questions:');
  samples.forEach((m, i) => console.log(`  ${i + 1}. "${m.question}"`));

  const outputPath = path.join(process.cwd(), 'data', 'kalshi-markets.json');
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(markets, null, 2));

  console.log(`\n💾 Saved to: ${outputPath}`);
  console.log(
    `📊 File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`
  );
}

main().catch(console.error);

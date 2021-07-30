const stakingRewardAddress = '0xd6b2D8f59Bf30cfE7009fB4fC00a7b13Ca836A2c';
const conStakingTokenAddress = '0x154a9f9cbd3449ad22fdae23044319d6ef2a1fab';
const mainAddress = '0x39Bea96e13453Ed52A734B6ACEeD4c41F57B2271';
const charAddress = '0xc6f252c2cdd4087e30608a35c022ce490b58179b';
const weapAddress = '0x7e091b0a220356b157131c831258a9c98ac8031a';
const oracleAddress = '0x1cbfa0ec28da66896946474b2a93856eb725fbba';
const defaultAddress = '0x0000000000000000000000000000000000000000';

let NODE = 'https://bsc-dataseed1.defibit.io/'
if (localStorage.getItem('node')){
    NODE = localStorage.getItem('node')
}

const web3 = new Web3(NODE);

// CONTRACTS

const conStakingReward = new web3.eth.Contract(IStakingRewards.abi, stakingRewardAddress);
const conStakingToken = new web3.eth.Contract(IERC20.abi, conStakingTokenAddress);
const conCryptoBlades = new web3.eth.Contract(CryptoBlades.abi, mainAddress);
const conCharacters = new web3.eth.Contract(Characters.abi, charAddress);
const conWeapons = new web3.eth.Contract(Weapons.abi, weapAddress);
const conOracle = new web3.eth.Contract(BasicPriceOracle.abi, oracleAddress);

const isAddress = address => web3.utils.isAddress(address);
const getBNBBalance = address => web3.eth.getBalance(address);

const getStakedBalance = address => conStakingToken.methods.balanceOf(address).call({ from: defaultAddress });
const getStakedRewards = address => conStakingReward.methods.balanceOf(address).call({ from: defaultAddress });
const getStakedTimeLeft = address => conStakingReward.methods.getStakeUnlockTimeLeft().call({ from: address });
const getAccountCharacters = address => conCryptoBlades.methods.getMyCharacters().call({ from: address });
const getAccountWeapons = address => conCryptoBlades.methods.getMyWeapons().call({ from: address });
const getAccountSkillReward = address => conCryptoBlades.methods.getTokenRewards().call({ from: address });
const getIngameSkill = address => conCryptoBlades.methods.inGameOnlyFunds(address).call({ from: address });
const getCharacterExp = charId => conCryptoBlades.methods.getXpRewards(`${charId}`).call({ from: defaultAddress });
const characterTargets = (charId, weapId) => conCryptoBlades.methods.getTargets(charId, weapId).call({ from: defaultAddress });
const getCharacterStamina = charId => conCharacters.methods.getStaminaPoints(`${charId}`).call({ from: defaultAddress });
const getCharacterData = charId => conCharacters.methods.get(`${charId}`).call({ from: defaultAddress });
const getWeaponData = weapId => conWeapons.methods.get(`${weapId}`).call({ from: defaultAddress });
const getOraclePrice = () => conOracle.methods.currentPrice().call({ from: defaultAddress });
const fetchFightGasOffset = async () => conCryptoBlades.methods.fightRewardGasOffset().call({ from: defaultAddress });
const fetchFightBaseline = async () => conCryptoBlades.methods.fightRewardBaseline().call({ from: defaultAddress });
const usdToSkill = async value => conCryptoBlades.methods.usdToSkill(value).call({ from: defaultAddress });
const decodeAbi = (types, data) => web3.eth.abi.decodeParameters(types, data);
const getPasLogs = options => web3.eth.abi.getPasLogs(options);
const getLatestBlock = async () =>  web3.eth.getBlock('latest')
const getPastEvents = async (event, fromBlock, toBlock, address, topics) =>  conCryptoBlades.getPastEvents(event, {fromBlock, toBlock, address, topics})
const getTokenGainForFight = async (power, multi) => conCryptoBlades.methods.getTokenGainForFight(power, multi)
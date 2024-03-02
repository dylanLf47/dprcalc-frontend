import { useEffect, useState } from 'react';
import './App.css';

let i = 0;

function LogIn({theLogIn, logInClick}) {
    const [userID, setUserID] = useState("")
    const [userIdHover, setUserIDHover] = useState(false)
    const [invalidInput, setInvalidInput] = useState(true)
    const update = () => {
        logInClick(theLogIn, userID)
    }
    useEffect(() => {
        if (!/^[\w ,.'-]{0,20}$/.test(userID)) {
            setInvalidInput(true)
        }
        else setInvalidInput(false)
    },[userID]);
    return (
        <div>
        <h1 style={{margin: 0}}>DLF's DPR Calculator</h1>
        <div className='logInBox'>
            <div><b>Enter Your User ID</b></div>
            <div><input type='text' id="userLogInInput" placeholder="User ID" className={!/^[\w ,.'-]{0,20}$/.test(userID) ? "errorBorder":""} value={userID} onChange={(e) => {setUserID(e.target.value)}} maxLength={20} onMouseEnter={() => setUserIDHover(true)} onMouseLeave={() => setUserIDHover(false)}></input></div>
            {userIdHover && <span className='inputPromptLogIn'>User ID must include alphabetical/numerical characters and/or symbols including ,.'-</span>}
            <span>&nbsp;</span>
            <button onClick={() => update()} disabled={invalidInput}>Log In</button>
        </div>
        </div>
    )
}

function Dice({update, remove, gwfIsChecked, eaIsChecked, saIsChecked}) {
    const [diceAmount, setDiceAmount] = useState('')
    const [diceNum, setDiceNum] = useState('4')
    const [showList, setShowList] = useState(false)
    const [gwfChecked, setGwfChecked] = useState(gwfIsChecked)
    const [eaChecked, setEaChecked] = useState(eaIsChecked)
    const [saChecked, setSaChecked] = useState(saIsChecked)
    const [diceAmountHover, setDiceAmountHover] = useState(false)
    const changeDieAmount = (e) => {
        e.preventDefault()
        setDiceAmount(e.target.value)
        update(e.target.value, diceNum, gwfChecked, eaChecked, saChecked)
    }
    const changeDieNum = (e) => {
        e.preventDefault()
        setDiceNum(e.target.value)
        update(diceAmount, e.target.value, gwfChecked, eaChecked, saChecked)
    }
    const switchGwf = (e) => {
        e.preventDefault()
        setGwfChecked(e.target.checked)
        update(diceAmount, diceNum, e.target.checked, eaChecked, saChecked)
    }
    const switchEa = (e) => {
        e.preventDefault()
        setEaChecked(e.target.checked)
        update(diceAmount, diceNum, gwfChecked, e.target.checked, saChecked)
    }
    const switchSa = (e) => {
        e.preventDefault()
        setSaChecked(e.target.checked)
        update(diceAmount, diceNum, gwfChecked, eaChecked, e.target.checked)
    }

    useEffect(() => {
        setGwfChecked(gwfIsChecked)
        update(diceAmount, diceNum, gwfIsChecked, eaChecked, saChecked)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[gwfIsChecked]);

    useEffect(() => {
        setEaChecked(eaIsChecked)
        update(diceAmount, diceNum, gwfChecked, eaIsChecked, saChecked)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[eaIsChecked]);

    useEffect(() => {
        setSaChecked(saIsChecked)
        update(diceAmount, diceNum, gwfChecked, eaChecked, saIsChecked)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[saIsChecked]);

    return (
        <span className="dice">
            <div className="dieNums">
                <input type="text" className={!/^\d{0,2}$/.test(diceAmount) ? "errorBorderDiceAmount":"diceAmount"} value={diceAmount} onChange={(e) => changeDieAmount(e)} onMouseEnter={() => setDiceAmountHover(true)} onMouseLeave={() => setDiceAmountHover(false)}></input>
                {diceAmountHover && <span className='inputPrompt'>Dice Amount must be a non-negative integer with up to 2 digits</span>}
                <b>d</b>
                <select value={diceNum} onChange={(e) => changeDieNum(e)}>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                </select>
                <button className="deleteDiceButton" onClick={() => remove()}>X</button>
            </div>
            <div className="multi-selector">
                <div className="select-field">
                    <input type="text" placeholder="Special Properties" className="input-selector" readOnly></input>
                    <span className="down-arrow" onClick={() => setShowList(!showList)}>▾</span>
                </div>

                {showList && <div className="list">
                    <label className="diceProperty">
                        <input type="checkbox" className="gwf" checked={gwfChecked} onChange={(e) => switchGwf(e)}></input>
                        Great Weapon Fighting
                    </label>
                    <label className="diceProperty">
                        <input type="checkbox" className="ea" checked={eaChecked} onChange={(e) => switchEa(e)}></input>
                        Elemental Adept
                    </label>
                    <label className="diceProperty">
                        <input type="checkbox" className="sa" checked={saChecked} onChange={(e) => switchSa(e)}></input>
                        Savage Attacker
                    </label>
                </div>}
            </div>
        </span>
      );
}

function Calc({theUserId, logOut}) {
    const [username, setUsername] = useState(theUserId)
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')

    const [attackMod,setAttackModifier] = useState('')
    const [critRange,setCritRange] = useState('20')
    const [numOfAttacks,setNumOfAttacks] = useState('')
    const [hasAdv,setHasAdv] = useState(false)

    const [standardDice, setStandardDice] = useState([])
    const [standardDiceData, setStandardDiceData] = useState([])
    const [standardDamageMod,setStandardDamageMod] = useState('')
    const clickAddStandardDice =()=>{
        i++
        var temp = [...standardDiceData, {key: i, dice_id: i, dice_amount: 0, die_num: 4, is_gwf: gwfChecked, is_ea: eaChecked, is_sa: saChecked, list: "standard"}]
        setStandardDiceData(temp)
        setStandardDice([...standardDice, <Dice key={i} id={i}/>])
        console.log(temp)
    }
    const clickDeleteStandardDice = (id)=>{
        const tempArray = standardDice.filter((dice) => dice.props.id !== id)
        setStandardDice(tempArray)
        const tempData = standardDiceData.filter((dice) => dice.dice_id !== id)
        setStandardDiceData(tempData)
    }

    const [firstHitDice, setFirstHitDice] = useState([])
    const [firstHitDiceData, setFirstHitDiceData] = useState([])
    const [firstHitDamageMod,setFirstHitDamageMod] = useState('')
    const clickAddFirstHitDice =()=>{
        i++
        var temp = [...firstHitDiceData, {key: i, dice_id: i, dice_amount: 0, die_num: 4, is_gwf: gwfChecked, is_ea: eaChecked, is_sa: saChecked, list: "first_hit"}]
        setFirstHitDiceData(temp)
        setFirstHitDice([...firstHitDice, <Dice key={i} id={i}/>])
    }
    const clickDeleteFirstHitDice = (id)=>{
        const tempArray = firstHitDice.filter((dice) => dice.props.id !== id)
        setFirstHitDice(tempArray)
        const tempData = firstHitDiceData.filter((dice) => dice.dice_id !== id)
        setFirstHitDiceData(tempData)
    }

    const [criticalDice, setCriticalDice] = useState([])
    const [criticalDiceData, setCriticalDiceData] = useState([])
    const [criticalDamageMod,setCriticalDamageMod] = useState('')
    const clickAddCriticalDice =()=>{
        i++
        var temp = [...criticalDiceData, {key: i, dice_id: i, dice_amount: 0, die_num: 4, is_gwf: gwfChecked, is_ea: eaChecked, is_sa: saChecked, list: "critical"}]
        setCriticalDiceData(temp)
        setCriticalDice([...criticalDice, <Dice key={i} id={i}/>])
    }
    const clickDeleteCriticalDice = (id)=>{
        const tempArray = criticalDice.filter((dice) => dice.props.id !== id)
        setCriticalDice(tempArray)
        const tempData = criticalDiceData.filter((dice) => dice.dice_id !== id)
        setCriticalDiceData(tempData)
    }

    const [gwfChecked, setGwfChecked] = useState(false)
    const [eaChecked, setEaChecked] = useState(false)
    const [saChecked, setSaChecked] = useState(false)

    const [gwmCheck,setGwmCheck] = useState(false)
    const [luckyCheck,setLuckyCheck] = useState(false)
    const [eAccCheck,setEAccCheck] = useState(false)
    const [crusherCheck,setCrusherCheck] = useState(false)

    const [piercerCheck, setPiercerCheck] = useState(false)
    const [piercerDie,setPiercerDie] = useState('4')
    const [piercerRerollWhen,setPiercerRerollWhen] = useState('')
    const [stalkersFlurryCheck, setStalkersFlurryCheck] = useState(false)
    const [grazeMod,setGrazeMod] = useState('')
    const [grazeCheck,setGrazeChecked] = useState(false)
    const [vexCheck, setVexCheck] = useState(false)


    //BONUS ACTION
    const [hasBonusAction, setHasBonusAction] = useState(false)

    const handleChange = () => { 
        setHasBonusAction(e => !e)
    }

    const [attackModifierBonus,setAttackModifierBonus] = useState('')
    const [numOfAttacksBonus,setNumOfAttacksBonus] = useState('')
    const [hasAdvBonus,setHasAdvBonus] = useState(false)

    const [standardDiceBonus, setStandardDiceBonus] = useState([])
    const [standardDiceBonusData, setStandardDiceBonusData] = useState([])
    const [standardDamageModBonus,setStandardDamageModBonus] = useState('')
    const clickAddStandardDiceBonus =()=>{
        i++
        var temp = [...standardDiceBonusData, {key: i, dice_id: i, dice_amount: 0, die_num: 4, is_gwf: gwfCheckedBonus, is_ea: eaCheckedBonus, is_sa: saCheckedBonus, list: "standard_bonus"}]
        setStandardDiceBonusData(temp)
        setStandardDiceBonus([...standardDiceBonus, <Dice key={i} id={i}/>])
    }
    const clickDeleteStandardDiceBonus = (id)=>{
        const tempArray = standardDiceBonus.filter((dice) => dice.props.id !== id)
        setStandardDiceBonus(tempArray)
        const tempData = standardDiceBonusData.filter((dice) => dice.dice_id !== id)
        console.log(tempData)
        setStandardDiceBonusData(tempData)
    }

    const [criticalDiceBonus, setCriticalDiceBonus] = useState([])
    const [criticalDiceBonusData, setCriticalDiceBonusData] = useState([])
    const [criticalDamageModBonus,setCriticalDamageModBonus] = useState('')
    const clickAddCriticalDiceBonus =()=>{
        i++
        var temp = [...criticalDiceBonusData, {key: i, dice_id: i, dice_amount: 0, die_num: 4, is_gwf: gwfCheckedBonus, is_ea: eaCheckedBonus, is_sa: saCheckedBonus, list: "critical_bonus"}]
        setCriticalDiceBonusData(temp)
        setCriticalDiceBonus([...criticalDiceBonus, <Dice key={i} id={i}/>])
    }
    const clickDeleteCriticalDiceBonus = (id)=>{
        const tempArray = criticalDiceBonus.filter((dice) => dice.props.id !== id)
        setCriticalDiceBonus(tempArray)
        const tempData = criticalDiceBonusData.filter((dice) => dice.dice_id !== id)
        setCriticalDiceBonusData(tempData)
    }

    const [gwfCheckedBonus, setGwfCheckedBonus] = useState(false)
    const [eaCheckedBonus, setEaCheckedBonus] = useState(false)
    const [saCheckedBonus, setSaCheckedBonus] = useState(false)
    const [crusherCheckBonus,setCrusherCheckBonus] = useState(false)

    const [piercerRerollWhenBonus,setPiercerRerollWhenBonus] = useState('')
    const [grazeModBonus,setGrazeModBonus] = useState('')
    const [piercerCheckBonus,setPiercerCheckBonus] = useState(false)
    const [piercerDieBonus,setPiercerDieBonus] = useState('4')
    const [stalkersFlurryCheckBonus, setStalkersFlurryCheckBonus] = useState(false)
    const [grazeCheckBonus,setGrazeCheckBonus] = useState(false)
    const [vexCheckBonus, setVexCheckBonus] = useState(false)

    const [invalidInputs, setInvalidInputs] = useState(false)
    
    const [minAC,setMinAC] = useState('')
    const [maxAC,setMaxAC] = useState('')

    const [nameHover, setNameHover] = useState(false)
    const [descHover, setDescHover] = useState(false)
    const [attackModHover, setAttackModHover] = useState(false)
    const [critRangeHover, setCritRangeHover] = useState(false)
    const [numOfAttacksHover, setNumOfAttacksHover] = useState(false)
    const [standardModHover, setStandardModHover] = useState(false)
    const [firstHitModHover, setFirstHitModHover] = useState(false)
    const [critModHover, setCritModHover] = useState(false)
    const [piercerRerollHover, setPiercerRerollHover] = useState(false)
    const [grazeModHover, setGrazeModHover] = useState(false)
    const [attackModBonusHover, setAttackModBonusHover] = useState(false)
    const [numOfAttacksBonusHover, setNumOfAttacksBonusHover] = useState(false)
    const [standardModBonusHover, setStandardModBonusHover] = useState(false)
    const [critModBonusHover, setCritModBonusHover] = useState(false)
    const [piercerRerollBonusHover, setPiercerRerollBonusHover] = useState(false)
    const [grazeModBonusHover, setGrazeModBonusHover] = useState(false)
    const [minAcHover, setMinAcHover] = useState(false)
    const [maxAcHover, setMaxAcHover] = useState(false)



    const [charactersList, setCharactersList] = useState([])
    const [listLength, setListLength] = useState(0)
    const [calculateList, setCalculateList] = useState([])
    const [showDataList, setShowDataList] = useState([])

    const [dprFieldArray, setDprFieldArray] = useState("")

    const [loadingData, setLoadingData] = useState(false)
    const [calculating, setCalculating] = useState(false)

    const updateGwfChecked = () => {
        for (let i = 0; i < standardDiceData.length; i++) {
            standardDiceData[i].is_gwf = !gwfChecked
        }
        for (let i = 0; i < firstHitDiceData.length; i++) {
            firstHitDiceData[i].is_gwf = !gwfChecked
        }
        for (let i = 0; i < criticalDiceData.length; i++) {
            criticalDiceData[i].is_gwf = !gwfChecked
        }
        setGwfChecked(!gwfChecked)
    }

    const updateEaChecked = () => {
        for (let i = 0; i < standardDiceData.length; i++) {
            standardDiceData[i].is_ea = !eaChecked
        }
        for (let i = 0; i < firstHitDiceData.length; i++) {
            firstHitDiceData[i].is_ea = !eaChecked
        }
        for (let i = 0; i < criticalDiceData.length; i++) {
            criticalDiceData[i].is_ea = !eaChecked
        }
        setEaChecked(!eaChecked)
    }

    const updateSaChecked = () => {
        for (let i = 0; i < standardDiceData.length; i++) {
            standardDiceData[i].is_sa = !saChecked
        }
        for (let i = 0; i < firstHitDiceData.length; i++) {
            firstHitDiceData[i].is_sa = !saChecked
        }
        for (let i = 0; i < criticalDiceData.length; i++) {
            criticalDiceData[i].is_sa = !saChecked
        }
        setSaChecked(!saChecked)
    }

    const updateGwfCheckedBonus = () => {
        for (let i = 0; i < standardDiceBonusData.length; i++) {
            standardDiceBonusData[i].is_gwf = !gwfCheckedBonus
        }
        for (let i = 0; i < criticalDiceBonusData.length; i++) {
            criticalDiceBonusData[i].is_gwf = !gwfCheckedBonus
        }
        setGwfCheckedBonus(!gwfCheckedBonus)
    }

    const updateEaCheckedBonus = () => {
        for (let i = 0; i < standardDiceBonusData.length; i++) {
            standardDiceBonusData[i].is_ea = !eaCheckedBonus
        }
        for (let i = 0; i < criticalDiceBonusData.length; i++) {
            criticalDiceBonusData[i].is_ea = !eaCheckedBonus
        }
        setEaCheckedBonus(!eaCheckedBonus)
    }

    const updateSaCheckedBonus = () => {
        for (let i = 0; i < standardDiceBonusData.length; i++) {
            standardDiceBonusData[i].is_sa = !saCheckedBonus
        }
        for (let i = 0; i < criticalDiceBonusData.length; i++) {
            criticalDiceBonusData[i].is_sa = !saCheckedBonus
        }
        setSaCheckedBonus(!saCheckedBonus)
    }

    const updateStandardDice = (id, theDiceAmount, theDiceNum, theGwf, theEa, theSa) => {
        let temp = JSON.parse(JSON.stringify(standardDiceData))
        temp.map((dice) => dice.dice_id === id ? [dice.dice_amount = theDiceAmount, dice.die_num = theDiceNum, dice.is_gwf = theGwf, dice.is_ea = theEa, dice.is_sa = theSa] : dice)
        updateDiceParam(theGwf, theEa, theSa)
        console.log(temp)
        setStandardDiceData(temp) 
    }

    const updateFirstHitDice = (id, theDiceAmount, theDiceNum, theGwf, theEa, theSa) => {
        let temp = JSON.parse(JSON.stringify(firstHitDiceData))
        temp.map((dice) => dice.dice_id === id ? [dice.dice_amount = theDiceAmount, dice.die_num = theDiceNum, dice.is_gwf = theGwf, dice.is_ea = theEa, dice.is_sa = theSa] : dice)
        updateDiceParam(theGwf, theEa, theSa)
        console.log(temp)
        setFirstHitDiceData(temp)
    }

    const updateCriticalDice = (id, theDiceAmount, theDiceNum, theGwf, theEa, theSa) => {
        let temp = JSON.parse(JSON.stringify(criticalDiceData))
        temp.map((dice) => dice.dice_id === id ? [dice.dice_amount = theDiceAmount, dice.die_num = theDiceNum, dice.is_gwf = theGwf, dice.is_ea = theEa, dice.is_sa = theSa] : dice)
        updateDiceParam(theGwf, theEa, theSa)
        console.log(temp)
        setCriticalDiceData(temp)
    }

    const updateStandardDiceBonus = (id, theDiceAmount, theDiceNum, theGwf, theEa, theSa) => {
        let temp = JSON.parse(JSON.stringify(standardDiceBonusData))
        temp.map((dice) => dice.dice_id === id ? [dice.dice_amount = theDiceAmount, dice.die_num = theDiceNum, dice.is_gwf = theGwf, dice.is_ea = theEa, dice.is_sa = theSa] : dice)
        updateDiceParamBonus(theGwf, theEa, theSa)
        console.log(temp)
        setStandardDiceBonusData(temp)
    }

    const updateCriticalDiceBonus = (id, theDiceAmount, theDiceNum, theGwf, theEa, theSa) => {
        let temp = JSON.parse(JSON.stringify(criticalDiceBonusData))
        temp.map((dice) => dice.dice_id === id ? [dice.dice_amount = theDiceAmount, dice.die_num = theDiceNum, dice.is_gwf = theGwf, dice.is_ea = theEa, dice.is_sa = theSa] : dice)
        updateDiceParamBonus(theGwf, theEa, theSa)
        console.log(temp)
        setCriticalDiceBonusData(temp)
    }

    const updateDiceParam = (theGwf, theEa, theSa) => {
        if (!theGwf) setGwfChecked(false)
        if (!theEa) setEaChecked(false)
        if (!theSa) setSaChecked(false)
    }

    const updateDiceParamBonus = (theGwf, theEa, theSa) => {
        if (!theGwf) setGwfCheckedBonus(false)
        if (!theEa) setEaCheckedBonus(false)
        if (!theSa) setSaCheckedBonus(false)
    }

    const addCharacter = (e) => {
        console.log(username)
        e.preventDefault()
        const player_character = {username, name, description, crit_range: critRange, attack_mod: attackMod, num_of_attacks: numOfAttacks, has_adv: hasAdv, standard_die_list: standardDiceData, standard_dam_mod: standardDamageMod, first_hit_die_list: firstHitDiceData, 
            first_hit_dam_mod: firstHitDamageMod, crit_die_list: criticalDiceData, crit_dam_mod: criticalDamageMod, gwm_check: gwmCheck, lucky_check: luckyCheck, elven_acc_check: eAccCheck, crusher_check: crusherCheck,
                piercer_check: piercerCheck, piercer_die: piercerDie, piercer_reroll: piercerRerollWhen, stalkers_flurry_check: stalkersFlurryCheck, graze_check: grazeCheck, graze_mod: grazeMod, vex_check: vexCheck, has_bonus_action: hasBonusAction, 
                attack_mod_bonus: attackModifierBonus, num_of_attacks_bonus: numOfAttacksBonus, has_adv_bonus: hasAdvBonus, standard_die_list_bonus: standardDiceBonusData, standard_dam_mod_bonus: standardDamageModBonus, 
                crit_die_list_bonus: criticalDiceBonusData, crit_dam_mod_bonus: criticalDamageModBonus, crusher_check_bonus: crusherCheckBonus, piercer_check_bonus: piercerCheckBonus, piercer_die_bonus: piercerDieBonus, piercer_reroll_bonus: piercerRerollWhenBonus, 
                stalkers_flurry_check_bonus: stalkersFlurryCheckBonus, graze_check_bonus: grazeCheckBonus, graze_mod_bonus: grazeModBonus, vex_check_bonus: vexCheckBonus}
        console.log(player_character)
        fetch("https://dlf-5e-dprcalc-backend.onrender.com/player_character/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(player_character)
        }).then(() => {
            "New Character Added"
            let tempLength = listLength + 1
            setListLength(tempLength)
        })
    }

    useEffect(() => {
        setLoadingData(true)
        fetch("https://dlf-5e-dprcalc-backend.onrender.com/player_character/get/"+username)
        .then(res=>res.json())
        .then(result => setCharactersList(result)).then(setLoadingData(false)).catch((error) => console.log("There are no characters currently registered under the User Id: " + username))
        return () => {
            console.log("Character Data Returned")
        }
    },[listLength, username]);

    /* useEffect(() => {
        fetch("https://dlf-5e-dprcalc-backend.onrender.com/player_character/getAll")
        .then(res=>res.json())
        .then(result => setCharactersList(result))
        return () => {
            console.log("Character Data Returned")
        }
    },[listLength]); */

    const deleteCharacter = (id) => {
        fetch("https://dlf-5e-dprcalc-backend.onrender.com/player_character/remove/"+id,{
            method:"DELETE",
            headers: {"Content-Type":"application/json"}
        }).then(() => {
            let tempCharacters = charactersList.filter(c => c.id !== id)
            setCharactersList(tempCharacters)
            let tempLength = listLength - 1
            setListLength(tempLength)

            let tempCalcList = calculateList.filter(c => c.id !== id)
            setCalculateList(tempCalcList)
        });
    }

    const deleteCharactersByUsername = (username) => {
        fetch("https://dlf-5e-dprcalc-backend.onrender.com/player_character/removeByUser/"+username,{
            method:"DELETE",
            headers: {"Content-Type":"application/json"}
        }).then(() => {
            let tempCharacters = charactersList.filter(c => c.username !== username)
            setCharactersList(tempCharacters)
            let tempLength = tempCharacters.length
            setListLength(tempLength)

            let tempCalcList = calculateList.filter(c => c.username !== username)
            setCalculateList(tempCalcList)
        });
    }

    const checkCharacter = (pc, checked) => {
        if (checked === true) {
            setCalculateList([...calculateList, pc])
        }
        else {
            setCalculateList(calculateList.filter(c => c.id !== pc.id))
        }
    }

    const calculate = async (pcList, minAc, maxAc) => {
        setCalculating(true)
        setDprFieldArray([]);
        let tempArray = Array(pcList.length + 1);
        tempArray[0] = Array(maxAC-minAC+1);
        tempArray[0][0] = "";
        for (let i = minAC; i <= maxAC; i++) {
            tempArray[0][i-minAC+1] = <b>{i}</b>;
        }

        for (let i = 0; i < pcList.length; i++) {
            tempArray[i+1] = Array(maxAC-minAC+1);
            tempArray[i+1][0] = <b>{pcList[i].name}</b>;
            try {
            for (let j = minAC; j <= maxAC; j++) {
                const res = await fetch("https://dlf-5e-dprcalc-backend.onrender.com/player_character/calc/" + pcList[i].id + "/" + j)
                const result = await res.json();
                tempArray[i+1][j-minAC+1] = result;
            }
            } catch {
                console.log("error")
            }
        }
        setCalculating(false)
        setDprFieldArray(tempArray)
    }

    const checkDiceAmounts = (list) => {
        for (let i = 0; i < list.length; i++) {
            if (!/^\d{0,2}$/.test(list[i].dice_amount)) {
                return true
            }
        }
        return false
    }

    useEffect(() => {
        if (!/^[A-Za-z ,.'-]{0,20}$/.test(name) || !/^[A-Za-z ,.'-]{0,30}$/.test(description) || !/^\d{0,2}$/.test(critRange) || !/^\d{0,2}$/.test(numOfAttacks)
        || !/^-?\d{0,2}(\.\d{1,2})?$/.test(attackMod) || !/^-?\d{0,2}(\.\d{1,2})?$/.test(standardDamageMod) || !/^-?\d{0,2}(\.\d{1,2})?$/.test(firstHitDamageMod)
        || !/^-?\d{0,2}(\.\d{1,2})?$/.test(criticalDamageMod) || !/^\d{0,2}$/.test(piercerRerollWhen) || !/^-?\d{0,2}(\.\d{1,2})?$/.test(grazeMod) 
        || !/^-?\d{0,2}(\.\d{1,2})?$/.test(attackModifierBonus) || !/^\d{0,2}$/.test(numOfAttacksBonus) || !/^-?\d{0,2}(\.\d{1,2})?$/.test(standardDamageModBonus)
        || !/^-?\d{0,2}(\.\d{1,2})?$/.test(criticalDamageModBonus) || !/^\d{0,2}$/.test(piercerRerollWhenBonus) || !/^-?\d{0,2}(\.\d{1,2})?$/.test(grazeModBonus)
        || checkDiceAmounts(standardDiceData) || checkDiceAmounts(firstHitDiceData) || checkDiceAmounts(criticalDiceData) || checkDiceAmounts(standardDiceBonusData)
        || checkDiceAmounts(criticalDiceBonusData)) {
            setInvalidInputs(true)
        }
        else setInvalidInputs(false)
    },[name, description, critRange, numOfAttacks, attackMod, standardDamageMod, firstHitDamageMod, criticalDamageMod, piercerRerollWhen, grazeMod, 
        attackModifierBonus, numOfAttacksBonus, standardDamageModBonus, criticalDamageModBonus, piercerRerollWhenBonus, grazeModBonus,
        standardDiceData, firstHitDiceData, criticalDiceData, standardDiceBonusData, criticalDiceBonusData]);

    return (
        <div>
            <h1 style={{margin: 0}}>DLF's DPR Calculator</h1>
            <button className="logOutButton" onClick={() => {setUsername(null); logOut()}}>Log Out</button>
            <div>
                <b>Name:</b>
                <input type="text" id="name" className={!/^[A-Za-z ,.'-]{0,20}$/.test(name) ? "errorBorder":""} value={name} onChange={(e) => {setName(e.target.value)}} maxLength={20} onMouseEnter={() => setNameHover(true)} onMouseLeave={() => setNameHover(false)}></input>
                {nameHover && <span className='inputPrompt'>Name must include alphabetical characters and/or symbols including ,.'-</span>}
                <span>&nbsp;</span>
                <b>Description:</b>
                <input type="text" id="description" className={!/^[A-Za-z ,.'-]{0,30}$/.test(description) ? "errorBorder":""} value={description} onChange={(e)=>setDescription(e.target.value)} maxLength={30} onMouseEnter={() => setDescHover(true)} onMouseLeave={() => setDescHover(false)}></input>
                {descHover && <span className='inputPrompt'>Description must include alphabetical characters and/or symbols including ,.'-</span>}
            </div>

            <div>
                <b>Attack Modifier:</b>
                <input type="text" id="attackModifier" className={!/^-?\d{0,2}(\.\d{1,2})?$/.test(attackMod) ? "errorBorderInput":"input"} value={attackMod} onChange={(e)=>setAttackModifier(e.target.value)} maxLength={6} onMouseEnter={() => setAttackModHover(true)} onMouseLeave={() => setAttackModHover(false)}></input>
                {attackModHover && <span className='inputPrompt'>Attack Modifier may be a positive or negative number. May have up to 2 digits and 2 decimal points</span>}
                <span>&nbsp;</span>
                <b>Critical Hit Range:</b>
                <input type="text" id="critRange" className={!/^\d{0,2}$/.test(critRange) ? "errorBorderInput":"input"} value={critRange} onChange={(e)=>setCritRange(e.target.value)} maxLength={2} onMouseEnter={() => setCritRangeHover(true)} onMouseLeave={() => setCritRangeHover(false)}></input>
                {critRangeHover && <span className='inputPrompt'>Critical Hit Range must be a non-negative integer with up to 2 digits</span>}
                <span>&nbsp;</span>
                <b>No. Of Attacks:</b>
                <input type="text" id="numOfAttacks" className={!/^\d{0,2}$/.test(numOfAttacks) ? "errorBorderInput":"input"} value={numOfAttacks} onChange={(e)=>setNumOfAttacks(e.target.value)} maxLength={2} onMouseEnter={() => setNumOfAttacksHover(true)} onMouseLeave={() => setNumOfAttacksHover(false)}></input>
                {numOfAttacksHover && <span className='inputPrompt'>No. Of Attacks must be a non-negative integer with up to 2 digits</span>}
                <span>&nbsp;</span>
                <input type="checkbox" id="advantageCheck" value={hasAdv} onChange={()=>setHasAdv(!hasAdv)}></input>
                <b>Advantage</b>
            </div>

            <span id="standardDiceList">
                <b>Standard Damage Dice:</b>
                <span id="addStandardDiceButton"><button onClick={() => clickAddStandardDice()}>+</button></span>

                {standardDice.map((dice) => <Dice update={(theDiceAmount, theDiceNum, theGwf, theEa, theSa) => updateStandardDice(dice.props.id, theDiceAmount, theDiceNum, theGwf, theEa, theSa)} remove={() => clickDeleteStandardDice(dice.props.id)} 
                gwfIsChecked={standardDiceData[standardDiceData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_gwf} eaIsChecked={standardDiceData[standardDiceData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_ea} saIsChecked={standardDiceData[standardDiceData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_sa} {...dice}/>)}

                <span name="dMod">
                    <b>+&nbsp;</b>
                    <input type="text" id="damageModifier" className={!/^-?\d{0,2}(\.\d{1,2})?$/.test(standardDamageMod) ? "errorBorderDiceMod":"diceMod"} placeholder="Modifier" value={standardDamageMod} onChange={(e)=>setStandardDamageMod(e.target.value)} maxLength={6} onMouseEnter={() => setStandardModHover(true)} onMouseLeave={() => setStandardModHover(false)}></input>
                    {standardModHover && <span className='inputPrompt'>Damage Modifier may be a positive or negative number. May have up to 2 digits and 2 decimal points</span>}
                </span>
            </span>

            <span id="firstHitDiceList">
                <b>First Hit Dice:</b>
                <span id="addFirstHitDiceButton"><button onClick={() => clickAddFirstHitDice()}>+</button></span>
                {firstHitDice.map((dice) => <Dice update={(theDiceAmount, theDiceNum, theGwf, theEa, theSa) => updateFirstHitDice(dice.props.id, theDiceAmount, theDiceNum, theGwf, theEa, theSa)} remove={() => clickDeleteFirstHitDice(dice.props.id)} 
                gwfIsChecked={firstHitDiceData[firstHitDiceData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_gwf} eaIsChecked={firstHitDiceData[firstHitDiceData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_ea} saIsChecked={firstHitDiceData[firstHitDiceData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_sa} {...dice}/>)}
                <span name="dMod">
                    <b>+</b>
                    <input type="text" id="damageModifierFirstHit" className={!/^-?\d{0,2}(\.\d{1,2})?$/.test(firstHitDamageMod) ? "errorBorderDiceMod":"diceMod"} placeholder="Modifier" value={firstHitDamageMod} onChange={(e)=>setFirstHitDamageMod(e.target.value)} maxLength={6} onMouseEnter={() => setFirstHitModHover(true)} onMouseLeave={() => setFirstHitModHover(false)}></input>
                    {firstHitModHover && <span className='inputPrompt'>Damage Modifier may be a positive or negative number. May have up to 2 digits and 2 decimal points</span>}
                </span>
            </span>

            <span id="criticalDiceList">
                <b>Critical Dice:</b>
                <span id="addCriticalDiceButton"><button onClick={() => clickAddCriticalDice()}>+</button></span>
                {criticalDice.map((dice) => <Dice update={(theDiceAmount, theDiceNum, theGwf, theEa, theSa) => updateCriticalDice(dice.props.id, theDiceAmount, theDiceNum, theGwf, theEa, theSa)} remove={() => clickDeleteCriticalDice(dice.props.id)} 
                gwfIsChecked={criticalDiceData[criticalDiceData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_gwf} eaIsChecked={criticalDiceData[criticalDiceData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_ea} saIsChecked={criticalDiceData[criticalDiceData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_sa} {...dice}/>)}
                <span name="dMod">
                <b>+</b>
                    <input type="text" id="damageModifierCritical" className={!/^-?\d{0,2}(\.\d{1,2})?$/.test(criticalDamageMod) ? "errorBorderDiceMod":"diceMod"} placeholder="Modifier" value={criticalDamageMod} onChange={(e)=>setCriticalDamageMod(e.target.value)} maxLength={6} onMouseEnter={() => setCritModHover(true)} onMouseLeave={() => setCritModHover(false)}></input>
                    {critModHover && <span className='inputPrompt'>Damage Modifier may be a positive or negative number. May have up to 2 digits and 2 decimal points</span>}
                </span>
            </span>

            <div>
                <input type="checkbox" id="gwfCheck" checked={gwfChecked} onChange={() => updateGwfChecked()}></input>
                <b>Great Weapon Fighting Style</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="gwmCheck" checked={gwmCheck} onChange={() => setGwmCheck(!gwmCheck)}></input>
                <b>Great Weapon Master Bonus Attack</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="eaCheck" checked={eaChecked} onChange={() => updateEaChecked()}></input>
                <b>Elemental Adept</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="saCheck" checked={saChecked} onChange={() => updateSaChecked()}></input>
                <b>Savage Attacker</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="luckyCheck" checked={luckyCheck} onChange={() => setLuckyCheck(!luckyCheck)}></input>
                <b>Lucky</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="eAccCheck" checked={eAccCheck} onChange={() => setEAccCheck(!eAccCheck)}></input>
                <b>Elven Accuracy</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="crusherCheck" checked={crusherCheck} onChange={() => setCrusherCheck(!crusherCheck)}></input>
                <b>Crusher</b>
            </div>

            <div>
                <input type="checkbox" id="piercerCheck" value={piercerCheck} onChange={() => setPiercerCheck(!piercerCheck)}></input>
                <b>Piercer</b>
                <span>&nbsp;</span>
                <select name="diceAmount" id="diceAmountPiercer" onChange={(e) => setPiercerDie(e.target.value)} disabled={!piercerCheck}>
                    <option value="4">Reroll d4</option>
                    <option value="6">Reroll d6</option>
                    <option value="8">Reroll d8</option>
                    <option value="10">Reroll d10</option>
                    <option value="12">Reroll d12</option>
                </select>
                <span>&nbsp;</span>
                <b>When &lt;=</b>
                <span>&nbsp;</span>
                <input type="text" id="piercerRerollWhen" className={!/^\d{0,2}$/.test(piercerRerollWhen) ? "errorBorderInput":"input"} value={piercerRerollWhen} onChange={(e)=>setPiercerRerollWhen(e.target.value)} disabled={!piercerCheck} maxLength={2} onMouseEnter={() => setPiercerRerollHover(true)} onMouseLeave={() => setPiercerRerollHover(false)}></input>
                {piercerRerollHover && <span className='inputPrompt'>Piercer Reroll Value must be a non-negative integer with up to 2 digits</span>}
                <span>&nbsp;</span>
                <input type="checkbox" id="stalkersFlurryCheck" value={stalkersFlurryCheck} onChange={() => setStalkersFlurryCheck(!stalkersFlurryCheck)}></input>
                <b>Stalker's Flurry</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="grazeCheck" value={grazeCheck} onChange={() => setGrazeChecked(!grazeCheck)}></input>
                <b>Graze</b>
                <span>&nbsp;</span>
                <b>Graze Ability Mod: =</b>
                <input type="text" id="grazeMod" className={!/^-?\d{0,2}(\.\d{1,2})?$/.test(grazeMod) ? "errorBorderInput":"input"} value={grazeMod} onChange={(e)=>setGrazeMod(e.target.value)} disabled={!grazeCheck} maxLength={6} onMouseEnter={() => setGrazeModHover(true)} onMouseLeave={() => setGrazeModHover(false)}></input>
                {grazeModHover && <span className='inputPrompt'>Graze Modifier may be a positive or negative number. May have up to 2 digits and 2 decimal points</span>}
                <span>&nbsp;</span>
                <input type="checkbox" id="vexCheck" value={vexCheck} onChange={() => setVexCheck(!vexCheck)}></input>
                <b>Vex</b>
            </div>

            <div>
                <input type="checkbox" id="bonusActionCheck" onChange={handleChange} checked={hasBonusAction}></input>
                <b>Bonus Action Check</b>
            </div>

            <div>
                <h3>Bonus Action Attacks</h3>
                <b>Attack Modifier:</b>
                <input type="text" id="attackModifierBonus" className={!/^-?\d{0,2}(\.\d{1,2})?$/.test(attackModifierBonus) ? "errorBorderInput":"input"} value={attackModifierBonus} onChange={(e)=>setAttackModifierBonus(e.target.value)} disabled={!hasBonusAction} maxLength={6} onMouseEnter={() => setAttackModBonusHover(true)} onMouseLeave={() => setAttackModBonusHover(false)}></input>
                {attackModBonusHover && <span className='inputPrompt'>Attack Modifier may be a positive or negative number. May have up to 2 digits and 2 decimal points</span>}
                <span>&nbsp;</span>
                <b>No. Of Attacks:</b>
                <input type="text" id="numOfAttacksBonus" className={!/^\d{0,2}$/.test(numOfAttacksBonus) ? "errorBorderInput":"input"} value={numOfAttacksBonus} onChange={(e)=>setNumOfAttacksBonus(e.target.value)} disabled={!hasBonusAction} maxLength={2} onMouseEnter={() => setNumOfAttacksBonusHover(true)} onMouseLeave={() => setNumOfAttacksBonusHover(false)}></input>
                {numOfAttacksBonusHover && <span className='inputPrompt'>No. Of Attacks must be a non-negative integer with up to 2 digits</span>}
                <span>&nbsp;</span>
                <input type="checkbox" id="advantageCheckBonus" value={hasAdvBonus} onChange={()=>setHasAdvBonus(!hasAdvBonus)} disabled={!hasBonusAction}></input>
                <b>Advantage</b>
            </div>

            <span id="standardDiceListBonus">
                <b>Standard Hit Dice:</b>
                <span id="addStandardDiceButtonBonus"><button onClick={() => clickAddStandardDiceBonus()} disabled={!hasBonusAction}>+</button></span>
                {standardDiceBonus.map((dice) => <Dice update={(theDiceAmount, theDiceNum, theGwf, theEa, theSa) => updateStandardDiceBonus(dice.props.id, theDiceAmount, theDiceNum, theGwf, theEa, theSa)} remove={() => clickDeleteStandardDiceBonus(dice.props.id)} 
                gwfIsChecked={standardDiceBonusData[standardDiceBonusData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_gwf} eaIsChecked={standardDiceBonusData[standardDiceBonusData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_ea} saIsChecked={standardDiceBonusData[standardDiceBonusData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_sa} {...dice}/>)}
                <span name="dMod">
                    <b>+</b>
                    <input type="text" id="damageModifierBonus" className={!/^-?\d{0,2}(\.\d{1,2})?$/.test(standardDamageModBonus) ? "errorBorderDiceMod":"diceMod"} placeholder="Modifier" value={standardDamageModBonus} onChange={(e)=>setStandardDamageModBonus(e.target.value)} disabled={!hasBonusAction} maxLength={6} onMouseEnter={() => setStandardModBonusHover(true)} onMouseLeave={() => setStandardModBonusHover(false)}></input>
                    {standardModBonusHover && <span className='inputPrompt'>Damage Modifier may be a positive or negative number. May have up to 2 digits and 2 decimal points</span>}
                </span>
            </span>

            <span id="criticalDiceListBonus">
                <b>Critical Dice:</b>
                <span id="addCriticalDiceButtonBonus"><button onClick={() => clickAddCriticalDiceBonus()} disabled={!hasBonusAction}>+</button></span>
                {criticalDiceBonus.map((dice) => <Dice update={(theDiceAmount, theDiceNum, theGwf, theEa, theSa) => updateCriticalDiceBonus(dice.props.id, theDiceAmount, theDiceNum, theGwf, theEa, theSa)} remove={() => clickDeleteCriticalDiceBonus(dice.props.id)} 
                gwfIsChecked={criticalDiceBonusData[criticalDiceBonusData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_gwf} eaIsChecked={criticalDiceBonusData[criticalDiceBonusData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_ea} saIsChecked={criticalDiceBonusData[criticalDiceBonusData.findIndex((sDice) => sDice.dice_id === dice.props.id)].is_sa} {...dice}/>)}
                <span name="dMod">
                    <b>+</b>
                    <input type="text" id="damageModifierCriticalBonus" className={!/^-?\d{0,2}(\.\d{1,2})?$/.test(criticalDamageModBonus) ? "errorBorderDiceMod":"diceMod"} placeholder="Modifier" value={criticalDamageModBonus} onChange={(e)=>setCriticalDamageModBonus(e.target.value)} disabled={!hasBonusAction} maxLength={6} onMouseEnter={() => setCritModBonusHover(true)} onMouseLeave={() => setCritModBonusHover(false)}></input>
                    {critModBonusHover && <span className='inputPrompt'>Damage Modifier may be a positive or negative number. May have up to 2 digits and 2 decimal points</span>}
                </span>
            </span>

            <div>
                <input type="checkbox" id="gwfCheckBonus" checked={gwfCheckedBonus} onChange={() => updateGwfCheckedBonus()} disabled={!hasBonusAction}></input>
                <b>Great Weapon Fighting Style</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="eaCheckBonus" checked={eaCheckedBonus} onChange={() => updateEaCheckedBonus()} disabled={!hasBonusAction}></input>
                <b>Elemental Adept</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="saCheckBonus" checked={saCheckedBonus} onChange={() => updateSaCheckedBonus()} disabled={!hasBonusAction}></input>
                <b>Savage Attacker</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="crusherCheckBonus" checked={crusherCheckBonus} onChange={() => setCrusherCheckBonus(!crusherCheckBonus)} disabled={!hasBonusAction}></input>
                <b>Crusher</b>
            </div>

            <div>
                <input type="checkbox" id="piercerCheckBonus" disabled={!hasBonusAction} checked={piercerCheckBonus} onChange={() => setPiercerCheckBonus(!piercerCheckBonus)}></input>
                <b>Piercer</b>
                <span>&nbsp;</span>
                <select name="diceAmount" id="diceAmountPiercerBonus" onChange={(e) => setPiercerDieBonus(e.target.value)} disabled={!(piercerCheckBonus && hasBonusAction)}>
                    <option value="4">Reroll d4</option>
                    <option value="6">Reroll d6</option>
                    <option value="8">Reroll d8</option>
                    <option value="10">Reroll d10</option>
                    <option value="12">Reroll d12</option>
                </select>
                <span>&nbsp;</span>
                <b>When &lt;=</b>
                <span>&nbsp;</span>
                <input type="text" id="piercerRerollWhenBonus" className={!/^\d{0,2}$/.test(piercerRerollWhenBonus) ? "errorBorderInput":"input"} value={piercerRerollWhenBonus} onChange={(e)=>setPiercerRerollWhenBonus(e.target.value)} disabled={!(piercerCheckBonus && hasBonusAction)} maxLength={2} onMouseEnter={() => setPiercerRerollBonusHover(true)} onMouseLeave={() => setPiercerRerollBonusHover(false)}></input>
                {piercerRerollBonusHover && <span className='inputPrompt'>Piercer Reroll Value must be a non-negative integer with up to 2 digits</span>}
                <span>&nbsp;</span>
                <input type="checkbox" id="stalkersFlurryCheckBonus" value={stalkersFlurryCheckBonus} onChange={() => setStalkersFlurryCheckBonus(!stalkersFlurryCheckBonus)} disabled={!hasBonusAction}></input>
                <b>Stalker's Flurry</b>
                <span>&nbsp;</span>
                <input type="checkbox" id="grazeCheckBonus" disabled={!hasBonusAction} checked={grazeCheckBonus} onChange={() => setGrazeCheckBonus(!grazeCheckBonus)}></input>
                <b>Graze</b>
                <span>&nbsp;</span>
                <b>Graze Ability Mod: =</b>
                <input type="text" id="grazeModBonus" className={!/^-?\d{0,2}(\.\d{1,2})?$/.test(grazeModBonus) ? "errorBorderInput":"input"} value={grazeModBonus} onChange={(e)=>setGrazeModBonus(e.target.value)} disabled={!(grazeCheckBonus && hasBonusAction)} maxLength={6} onMouseEnter={() => setGrazeModBonusHover(true)} onMouseLeave={() => setGrazeModBonusHover(false)}></input>
                {grazeModBonusHover && <span className='inputPrompt'>Graze Modifier may be a positive or negative number. May have up to 2 digits and 2 decimal points</span>}
                <span>&nbsp;</span>
                <input type="checkbox" id="vexCheckBonus" value={vexCheckBonus} onChange={() => setVexCheckBonus(!vexCheckBonus)} disabled={!hasBonusAction}></input>
                <b>Vex</b>
            </div>

            <div><button id="addCharacterButton" onClick={(e) => addCharacter(e)} disabled={invalidInputs}>Add Character</button></div>

            <div className='bottomHalf'>
            <div className='pcMap'>
                {/* <button onClick={() => checkAllCharacters()}>Check All</button> */}
                <div className='usernameList'><b>{username}'s Characters</b></div>
                <button className="deleteAll" onClick={() => deleteCharactersByUsername(username)} disabled={charactersList < 1}>Delete All</button>
                {loadingData && <b style={{fontSize: 20}}>Loading Data...</b>}
                {!loadingData && <div>{charactersList.map((pc) => (<div key={pc.id} className='pcRow'> 
                <div className='pcInfo'><div style={{fontSize: 35}}><b>{pc.name}</b><br/></div> <div style={{fontSize: 20}}>{pc.description}<br/></div>
                {!showDataList.includes(pc.id) && <span className="down-arrow" onClick={() => {setShowDataList([...showDataList, pc.id])}}>▾</span>}
                {showDataList.includes(pc.id) && <div className="down-arrow" onClick={() => {setShowDataList(showDataList.filter((data) => data !== pc.id))}}>▾<div style={{fontSize: 15}}>
                    <b>Attack Modifier:</b> {pc.attack_mod}<br/>
                    <b>Critical Hit Range:</b> {pc.crit_range}<br/>
                    <b>No. of Attacks:</b> {pc.num_of_attacks}<br/>
                    {pc.has_adv && <div>Advatange<br/></div>}
                    {pc.standard_die_list.length > 0 && <div><b>Standard Damage Dice:</b> {pc.standard_die_list.map((dice) => "{" + dice.dice_amount + "d" + dice.die_num + /* " GWF? " + dice.is_gwf + " EA? " + dice.is_ea + " SA? " + dice.is_sa + "}")}<br/></div>} */ (dice.is_gwf ? ", GWF" : "") + (dice.is_ea ? ", EA" : "") + (dice.is_sa ? ", SA" : "") + "}")}<br/></div>}
                    {pc.first_hit_die_list.length > 0 && <div><b>First Hit Dice:</b> {pc.first_hit_die_list.map((dice) => "{" + dice.dice_amount + "d" + dice.die_num + (dice.is_gwf ? ", GWF" : "") + (dice.is_ea ? ", EA" : "") + (dice.is_sa ? ", SA" : "") + "}")}<br/></div>}
                    {pc.crit_die_list.length > 0 && <div><b>Critical Hit Dice:</b> {pc.crit_die_list.map((dice) => "{" + dice.dice_amount + "d" + dice.die_num + (dice.is_gwf ? ", GWF" : "") + (dice.is_ea ? ", EA" : "") + (dice.is_sa ? ", SA" : "") + "}")}<br/></div>}
                    {pc.gwm_check && <div>Great Weapon Master<br/></div>}
                    {pc.lucky_check && <div>Lucky<br/></div>}
                    {pc.elven_acc_check && <div>elven_acc_check<br/></div>}
                    {pc.crusher_check && <div>Crusher<br/></div>}
                    {pc.piercer_check && <div>Piercer; Reroll d{pc.piercer_die} when rolled at or below {pc.piercer_reroll}<br/></div>}
                    {pc.stalkers_flurry_check && <div>Stalker's Flurry<br/></div>}
                    {pc.graze_check && <div><b>Graze:</b> {pc.graze_mod}<br/></div>}
                    {pc.vex_check && <div>Vex<br/></div>}
                    {pc.has_bonus_action &&
                    <div>
                    <br/>
                    <b>Bonus Action Stats</b><br/>
                    <b>Attack Modifier:</b> {pc.attack_mod_bonus}<br/>
                    <b>No. of Attacks:</b> {pc.num_of_attacks_bonus}<br/>
                    {pc.has_adv_bonus && <div>Advatange<br/></div>}
                    {pc.standard_die_list_bonus.length > 0 && <div><b>Standard Damage Dice:</b> {pc.standard_die_list_bonus.map((dice) => "{" + dice.dice_amount + "d" + dice.die_num + (dice.is_gwf ? ", GWF" : "") + (dice.is_ea ? ", EA" : "") + (dice.is_sa ? ", SA" : "") + "}")}<br/></div>}
                    {pc.crit_die_list_bonus.length > 0 && <div><b>Critical Hit Dice:</b> {pc.crit_die_list_bonus.map((dice) => "{" + dice.dice_amount + "d" + dice.die_num + (dice.is_gwf ? ", GWF" : "") + (dice.is_ea ? ", EA" : "") + (dice.is_sa ? ", SA" : "") + "}")}<br/></div>}
                    {pc.crusher_check_bonus && <div>Crusher<br/></div>}
                    {pc.piercer_check_bonus && <div>Piercer; Reroll d{pc.piercer_die_bonus} when rolled at or below {pc.piercer_reroll_bonus}<br/></div>}
                    {pc.stalkers_flurry_check_bonus && <div>Stalker's Flurry<br/></div>}
                    {pc.graze_check_bonus && <div><b>Graze:</b> {pc.graze_mod_bonus}<br/></div>}
                    {pc.vex_check_bonus && <div>Vex<br/></div>}  
                    </div>
                    }
                    </div></div>}
                </div>
                <input type='checkbox' className='calcCheck' onChange={(e) => checkCharacter(pc, e.target.checked)}></input> 
                <button className='deletePc' onClick={() => deleteCharacter(pc.id)}><b>X</b></button>
                </div>))}</div>}
            </div>

            <div className='calcDiv'>
                <span className="acInput">
                    <b>Minimum AC:</b>
                    <input type="text" id="minAC" className={!/^\d{0,2}$/.test(minAC) || Number(maxAC) < Number(minAC) ? "errorBorderInput":"input"} value={minAC} onChange={(e)=>setMinAC(e.target.value)} maxLength={2} onMouseEnter={() => setMinAcHover(true)} onMouseLeave={() => setMinAcHover(false)}></input>
                    {minAcHover && <span className='inputPrompt'>Minimum AC must be a non-negative integer with up to 2 digits, and must be less than or equal to Maximum AC</span>}
                    <span>&nbsp;</span>
                    <b>Maximum AC:</b> 
                    <input type="text" id="maxAC" className={!/^\d{0,2}$/.test(maxAC) || Number(maxAC) < Number(minAC) ? "errorBorderInput":"input"} value={maxAC} onChange={(e)=>setMaxAC(e.target.value)} maxLength={2} onMouseEnter={() => setMaxAcHover(true)} onMouseLeave={() => setMaxAcHover(false)}></input>
                    {maxAcHover && <span className='inputPrompt'>Maximum AC must be a non-negative integer with up to 2 digits, and must be greater than or equal to Minimum AC</span>}
                </span>
                <div><button id="calculateButton" onClick={() => calculate(calculateList, minAC, maxAC)} disabled={!/^\d{1,2}$/.test(minAC) || !/^\d{1,2}$/.test(maxAC) || Number(maxAC) < Number(minAC)}>Calculate</button></div>

                {/* <div className='dprField' dangerouslySetInnerHTML={{__html: dprText}}></div> */}
                <div className='dprField'>
                    {calculating && <b style={{fontSize: 20}}>Calculating...</b>}
                    {!calculating && <table>
                        <tbody>
                        {dprFieldArray.length > 1 && dprFieldArray.map((item, key) => {
                            return (
                                <tr key={key}>
                                    {item.map((element, elementKey) => <td key={elementKey}>{element}</td>)}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>}
                </div>
            </div>
            </div>
        </div>
    )

}

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState("")

    const logOutUser = () => {
        setLoggedIn(false)
    }

    if (loggedIn === false) {
        return (
            <div className="App">
                <LogIn theLogIn = {loggedIn} logInClick={(theLogIn, theUserId) => {setLoggedIn(!theLogIn); setCurrentUser(theUserId)}}/>
            </div>
            );
    }
    else {
        return (
        <div className="App">
            <Calc theUserId = {currentUser} logOut = {() => logOutUser()}/>
        </div>
        );
    }
  }

export default App;
import { useState } from 'react';
import './App.css';

let i = 0;

const Dice = ({remove, gwfIsChecked, eaIsChecked, saIsChecked}) => {
    const [diceAmount, setDiceAmount] = useState('')
    const [diceNum, setDiceNum] = useState('4')
    const [showList, setShowList] = useState(false)
    const [gwfChecked, setGwfChecked] = useState(gwfIsChecked)
    const [eaChecked, setEaChecked] = useState(eaIsChecked)
    const [saChecked, setSaChecked] = useState(saIsChecked)
    const changeDieAmount = (e) => {
        e.preventDefault()
        setDiceAmount(e.target.value)
    }
    const changeDieNum = (e) => {
        e.preventDefault()
        setDiceNum(e.target.value)
    }
    return (
        <span className="dice">
            <div className="dieNums">
                <input type="text" className="diceAmount" value={diceAmount} onChange={(e) => changeDieAmount(e)}></input>
                <b>d</b>
                <select className="diceNum" value={diceNum} onChange={(e) => changeDieNum(e)}>
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
                        <input type="checkbox" className="gwf" checked={gwfIsChecked || gwfChecked} onChange={() => setGwfChecked(!gwfChecked)}></input>
                        Great Weapon Fighting
                    </label>
                    <label className="diceProperty">
                        <input type="checkbox" className="ea" checked={eaIsChecked || eaChecked} onChange={() => setEaChecked(!eaChecked)}></input>
                        Elemental Adept
                    </label>
                    <label className="diceProperty">
                        <input type="checkbox" className="sa" checked={saIsChecked || saChecked} onChange={() => setSaChecked(!saChecked)}></input>
                        Savage Attacker
                    </label>
                </div>}
            </div>
        </span>
      );
}

/* const InfoInput = () => {
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    return (
    <div>
        <b>Name:</b>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
        <b>Description:</b>
        <input type="text" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
    </div>
    )
}

const AttackInfoInput = () => {
    const [attackModifier,setAttackModifier] = useState('')
    const [critRange,setCritRange] = useState('20')
    const [numOfAttacks,setNumOfAttacks] = useState('')
    return (
        <div>
        <b>Attack Modifier:</b>
        <input type="text" id="attackModifier" value={attackModifier} onChange={(e)=>setAttackModifier(e.target.value)}></input>
        <b>Critical Hit Range:</b>
        <input type="text" id="critRange" value={critRange} onChange={(e)=>setCritRange(e.target.value)}></input>
        <b>No. Of Attacks:</b>
        <input type="text" id="numOfAttacks" value={numOfAttacks} onChange={(e)=>setNumOfAttacks(e.target.value)}></input>
        <input type="checkbox" id="advantageCheck"></input>
        <b>Advantage</b>
    </div>
    )
}

const StandardDiceRow = ({gwfChecked, ea, sa}) => {
    const [standardDice, setStandardDice] = useState([])
    const [standardDamageMod,setStandardDamageMod] = useState('')
    const clickAddStandardDice =()=>{
        i++
        setStandardDice([...standardDice, <Dice key={i} id={i}/>])
    }
    const clickDeleteStandardDice = (id)=>{
        const tempArray = standardDice.filter((dice) => dice.props.id !== id)
        setStandardDice(tempArray)
    }
    return (
        <span id="standardDiceList">
        <b>Standard Hit Dice:</b>
        <span id="addStandardDiceButton"><button onClick={() => clickAddStandardDice()}>+</button></span>
        {standardDice.map((dice) => <Dice remove={() => clickDeleteStandardDice(dice.props.id)} {...dice}/>)}
        <span name="dMod">
        <b>+</b>
            <input type="text" id="damageModifier" placeholder="Damage Modifier" value={standardDamageMod} onChange={(e)=>setStandardDamageMod(e.target.value)}></input>
        </span>
        </span>
    )
}

const FirstHitDiceRow = () => {
    const [firstHitDice, setFirstHitDice] = useState([])
    const [firstHitDamageMod,setFirstHitDamageMod] = useState('')
    const clickAddFirstHitDice =()=>{
        i++
        setFirstHitDice([...firstHitDice, <Dice key={i} id={i}/>])
    }
    const clickDeleteFirstHitDice = (id)=>{
        const tempArray = firstHitDice.filter((dice) => dice.props.id !== id)
        setFirstHitDice(tempArray)
    }
    return (
        <span id="firstHitDiceList">
        <b>First Hit Dice:</b>
        <span id="addFirstHitDiceButton"><button onClick={() => clickAddFirstHitDice()}>+</button></span>
        {firstHitDice.map((dice) => <Dice remove={() => clickDeleteFirstHitDice(dice.props.id)} {...dice}/>)}
        <span name="dMod">
        <b>+</b>
            <input type="text" id="damageModifierFirstHit" placeholder="Damage Modifier" value={firstHitDamageMod} onChange={(e)=>setFirstHitDamageMod(e.target.value)}></input>
        </span>
        </span>
    )
}

const CriticalDiceRow = () => {
    const [criticalDice, setCriticalDice] = useState([])
    const [criticalDamageMod,setCriticalDamageMod] = useState('')
    const clickAddCriticalDice =()=>{
        i++
        setCriticalDice([...criticalDice, <Dice key={i} id={i}/>])
    }
    const clickDeleteCriticalDice = (id)=>{
        const tempArray = criticalDice.filter((dice) => dice.props.id !== id)
        setCriticalDice(tempArray)
    }
    return (
        <span id="criticalDiceList">
        <b>Critical Dice:</b>
        <span id="addCriticalDiceButton"><button onClick={() => clickAddCriticalDice()}>+</button></span>
        {criticalDice.map((dice) => <Dice remove={() => clickDeleteCriticalDice(dice.props.id)} {...dice}/>)}
        <span name="dMod">
        <b>+</b>
            <input type="text" id="damageModifierCritical" placeholder="Damage Modifier" value={criticalDamageMod} onChange={(e)=>setCriticalDamageMod(e.target.value)}></input>
        </span>
        </span>
    )
}

const SpecialProperties = ({gwfChecked, checkGwf}) => {
    console.log(gwfChecked)
    return (
        <div>
            <input type="checkbox" id="gwfCheck" value={gwfChecked} onChange={checkGwf}></input>
            <b>Great Weapon Fighting Style</b>
            <input type="checkbox" id="gwmCheck"></input>
            <b>Great Weapon Master Bonus Attack</b>
            <input type="checkbox" id="eaCheck"></input>
            <b>Elemental Adept</b>
            <input type="checkbox" id="saCheck"></input>
            <b>Savage Attacker</b>
            <input type="checkbox" id="luckyCheck"></input>
            <b>Lucky</b>
            <input type="checkbox" id="eAccCheck"></input>
            <b>Elven Accuracy</b>
            <input type="checkbox" id="crusherCheck"></input>
            <b>Crusher</b>
        </div>
    )
}

const SpecialProperties2 = () => {
    const [piercerChecked, setPiercerChecked] = useState(false)
    const [piercerRerollWhen,setPiercerRerollWhen] = useState('')
    const [grazeMod,setGrazeMod] = useState('')
    const [grazeCheck,setGrazeChecked] = useState(false)
    return (
        <div>
        <input type="checkbox" id="piercerCheck" value={piercerChecked} onChange={() => setPiercerChecked(!piercerChecked)}></input>
        <b>Piercer</b>
        <select name="diceAmount" id="diceAmountPiercer" disabled={!piercerChecked}>
            <option value="4">Reroll d4</option>
            <option value="6">Reroll d6</option>
            <option value="8">Reroll d8</option>
            <option value="10">Reroll d10</option>
            <option value="12">Reroll d12</option>
        </select>
        <b>When &lt;=</b>
        <input type="text" id="piercerRerollWhen" value={piercerRerollWhen} onChange={(e)=>setPiercerRerollWhen(e.target.value)} disabled={!piercerChecked}></input>
        <input type="checkbox" id="stalkersFlurryCheck"></input>
        <b>Stalker's Flurry</b>
        <input type="checkbox" id="grazeCheck" value={grazeCheck} onChange={() => setGrazeChecked(!grazeCheck)}></input>
        <b>Graze</b>
        <b>Graze Ability Mod: =</b>
        <input type="text" id="grazeMod" value={grazeMod} onChange={(e)=>setGrazeMod(e.target.value)} disabled={!grazeCheck}></input>
        <input type="checkbox" id="vexCheck"></input>
        <b>Vex</b>
    </div>
    )
}

const BonusAction = () => {
    const [componentsEnabled, setComponentsEnabled] = useState(false)

const BonusActionCheck = () => {
    //const [checked, setChecked] = useState(false)
    //const [bonusEnabled, setBonusEnabled] = useState(false)
    const handleChange = () => {
        //setChecked(e => !e)   
        setComponentsEnabled(e => !e)
        //console.log(checked)
    }
    return (
        <div>
        <input type="checkbox" id="bonusActionCheck" onChange={handleChange} checked={componentsEnabled}></input>
        <b>Bonus Action Check</b>
        </div>
    )
}

const AttackInfoInputBonus = () => {
    const [attackModifierBonus,setAttackModifierBonus] = useState('')
    const [numOfAttacksBonus,setNumOfAttacksBonus] = useState('')
    return (
    <div>
        <h3>Bonus Action Attacks</h3>
        <b>Attack Modifier:</b>
        <input type="text" id="attackModifierBonus" value={attackModifierBonus} onChange={(e)=>setAttackModifierBonus(e.target.value)} disabled={!componentsEnabled}></input>
        <b>No. Of Attacks:</b>
        <input type="text" id="numOfAttacksBonus" value={numOfAttacksBonus} onChange={(e)=>setNumOfAttacksBonus(e.target.value)} disabled={!componentsEnabled}></input>
        <input type="checkbox" id="advantageCheckBonus" disabled={!componentsEnabled}></input>
        <b>Advantage</b>
    </div>
    )
}

const StandardDiceRowBonus = () => {
    const [standardDiceBonus, setStandardDiceBonus] = useState([])
    const [standardDamageModBonus,setStandardDamageModBonus] = useState('')
    const clickAddStandardDiceBonus =()=>{
        i++
        setStandardDiceBonus([...standardDiceBonus, <Dice key={i} id={i}/>])
    }
    const clickDeleteStandardDiceBonus = (id)=>{
        const tempArray = standardDiceBonus.filter((dice) => dice.props.id !== id)
        setStandardDiceBonus(tempArray)
    }
    return (
        <span id="standardDiceListBonus">
        <b>Standard Hit Dice:</b>
        <span id="addStandardDiceButtonBonus"><button onClick={() => clickAddStandardDiceBonus()} disabled={!componentsEnabled}>+</button></span>
        {standardDiceBonus.map((dice) => <Dice remove={() => clickDeleteStandardDiceBonus(dice.props.id)} {...dice} disabled={!componentsEnabled}/>)}
        <span name="dMod">
        <b>+</b>
            <input type="text" id="damageModifierBonus" placeholder="Damage Modifier" value={standardDamageModBonus} onChange={(e)=>setStandardDamageModBonus(e.target.value)} disabled={!componentsEnabled}></input>
        </span>
        </span>
    )
}

const CriticalDiceRowBonus = () => {
    const [criticalDiceBonus, setCriticalDiceBonus] = useState([])
    const [criticalDamageModBonus,setCriticalDamageModBonus] = useState('')
    const clickAddCriticalDiceBonus =()=>{
        i++
        setCriticalDiceBonus([...criticalDiceBonus, <Dice key={i} id={i}/>])
    }
    const clickDeleteCriticalDiceBonus = (id)=>{
        const tempArray = criticalDiceBonus.filter((dice) => dice.props.id !== id)
        setCriticalDiceBonus(tempArray)
    }
    return (
        <span id="criticalDiceListBonus">
        <b>Critical Dice:</b>
        <span id="addCriticalDiceButtonBonus"><button onClick={() => clickAddCriticalDiceBonus()} disabled={!componentsEnabled}>+</button></span>
        {criticalDiceBonus.map((dice) => <Dice remove={() => clickDeleteCriticalDiceBonus(dice.props.id)} {...dice} disabled={!componentsEnabled}/>)}
        <span name="dMod">
        <b>+</b>
            <input type="text" id="damageModifierCriticalBonus" placeholder="Damage Modifier" value={criticalDamageModBonus} onChange={(e)=>setCriticalDamageModBonus(e.target.value)} disabled={!componentsEnabled}></input>
        </span>
        </span>
    )
}

const SpecialPropertiesBonus = () => {
    return (
        <div>
        <input type="checkbox" id="gwfCheckBonus" disabled={!componentsEnabled}></input>
        <b>Great Weapon Fighting Style</b>
        <input type="checkbox" id="eaCheckBonus" disabled={!componentsEnabled}></input>
        <b>Elemental Adept</b>
        <input type="checkbox" id="saCheckBonus" disabled={!componentsEnabled}></input>
        <b>Savage Attacker</b>
        <input type="checkbox" id="crusherCheckBonus" disabled={!componentsEnabled}></input>
        <b>Crusher</b>
        </div>
    )
}

const SpecialProperties2Bonus = () => {
    const [piercerRerollWhenBonus,setPiercerRerollWhenBonus] = useState('')
    const [grazeModBonus,setGrazeModBonus] = useState('')
    const [piercerChecked,setPiercerChecked] = useState(false)
    const [grazeChecked,setGrazeChecked] = useState(false)
    const handlePiercerChange = () => {
        setPiercerChecked(e => !e)

    }
    const handleGrazeChange = () => {
        setGrazeChecked(e => !e)

    }
    return (
        <div>
        <input type="checkbox" id="piercerCheckBonus" disabled={!componentsEnabled} checked={piercerChecked} onChange={handlePiercerChange}></input>
        <b>Piercer</b>
        <select name="diceAmount" id="diceAmountPiercerBonus" disabled={!piercerChecked}>
            <option value="4">Reroll d4</option>
            <option value="6">Reroll d6</option>
            <option value="8">Reroll d8</option>
            <option value="10">Reroll d10</option>
            <option value="12">Reroll d12</option>
        </select>
        <b>When &lt;=</b>
        <input type="text" id="piercerRerollWhenBonus" value={piercerRerollWhenBonus} onChange={(e)=>setPiercerRerollWhenBonus(e.target.value)} disabled={!piercerChecked}></input>
        <input type="checkbox" id="stalkersFlurryCheckBonus" disabled={!componentsEnabled}></input>
        <b>Stalker's Flurry</b>
        <input type="checkbox" id="grazeCheckBonus" disabled={!componentsEnabled} checked={grazeChecked} onChange={handleGrazeChange}></input>
        <b>Graze</b>
        <b>Graze Ability Mod: =</b>
        <input type="text" id="grazeModBonus" value={grazeModBonus} onChange={(e)=>setGrazeModBonus(e.target.value)} disabled={!grazeChecked}></input>
        <input type="checkbox" id="vexCheckBonus" disabled={!componentsEnabled}></input>
        <b>Vex</b>
        </div>
    )
}
return (
    <div className="App2">
        <BonusActionCheck />
        <AttackInfoInputBonus />
        <StandardDiceRowBonus />
        <CriticalDiceRowBonus />
        <SpecialPropertiesBonus />
        <SpecialProperties2Bonus />
      </div>
)
}

const AddCharacter = () => {
    return (
        <div>
        <span id="addToListButton"><button>Add Character</button></span>
        <div id="characterList"></div>
        </div>
    )
}

const CalculateValues = () => {
    const [minAC,setMinAC] = useState('')
    const [maxAC,setMaxAC] = useState('')
    return (
        <div>
            <span className="acInput">
            <b>Minimum AC:</b>
            <input type="text" id="minAC" value={minAC} onChange={(e)=>setMinAC(e.target.value)}></input>
            <b>Maximum AC:</b> 
            <input type="text" id="maxAC" value={maxAC} onChange={(e)=>setMaxAC(e.target.value)}></input>
        </span>
        <span id="calculateButton"><button>Calculate</button></span>
        <input type="text" id="dprField" readOnly></input>
        </div>
    )
} */

function Calc() {
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')

    const [attackModifier,setAttackModifier] = useState('')
    const [critRange,setCritRange] = useState('20')
    const [numOfAttacks,setNumOfAttacks] = useState('')

    const [standardDice, setStandardDice] = useState([])
    const [standardDamageMod,setStandardDamageMod] = useState('')
    const clickAddStandardDice =()=>{
        i++
        setStandardDice([...standardDice, <Dice key={i} id={i}/>])
    }
    const clickDeleteStandardDice = (id)=>{
        const tempArray = standardDice.filter((dice) => dice.props.id !== id)
        setStandardDice(tempArray)
    }

    const [firstHitDice, setFirstHitDice] = useState([])
    const [firstHitDamageMod,setFirstHitDamageMod] = useState('')
    const clickAddFirstHitDice =()=>{
        i++
        setFirstHitDice([...firstHitDice, <Dice key={i} id={i}/>])
    }
    const clickDeleteFirstHitDice = (id)=>{
        const tempArray = firstHitDice.filter((dice) => dice.props.id !== id)
        setFirstHitDice(tempArray)
    }

    const [criticalDice, setCriticalDice] = useState([])
    const [criticalDamageMod,setCriticalDamageMod] = useState('')
    const clickAddCriticalDice =()=>{
        i++
        setCriticalDice([...criticalDice, <Dice key={i} id={i}/>])
    }
    const clickDeleteCriticalDice = (id)=>{
        const tempArray = criticalDice.filter((dice) => dice.props.id !== id)
        setCriticalDice(tempArray)
    }

    const [gwfChecked, setGwfChecked] = useState(false)
    const [eaChecked, setEaChecked] = useState(false)
    const [saChecked, setSaChecked] = useState(false)

    const [piercerChecked, setPiercerChecked] = useState(false)
    const [piercerRerollWhen,setPiercerRerollWhen] = useState('')
    const [grazeMod,setGrazeMod] = useState('')
    const [grazeCheck,setGrazeChecked] = useState(false)



    //BONUS ACTION
    const [componentsEnabled, setComponentsEnabled] = useState(false)

    const handleChange = () => {
        //setChecked(e => !e)   
        setComponentsEnabled(e => !e)
        //console.log(checked)
    }

    const [attackModifierBonus,setAttackModifierBonus] = useState('')
    const [numOfAttacksBonus,setNumOfAttacksBonus] = useState('')

    const [standardDiceBonus, setStandardDiceBonus] = useState([])
    const [standardDamageModBonus,setStandardDamageModBonus] = useState('')
    const clickAddStandardDiceBonus =()=>{
        i++
        setStandardDiceBonus([...standardDiceBonus, <Dice key={i} id={i}/>])
    }
    const clickDeleteStandardDiceBonus = (id)=>{
        const tempArray = standardDiceBonus.filter((dice) => dice.props.id !== id)
        setStandardDiceBonus(tempArray)
    }

    const [criticalDiceBonus, setCriticalDiceBonus] = useState([])
    const [criticalDamageModBonus,setCriticalDamageModBonus] = useState('')
    const clickAddCriticalDiceBonus =()=>{
        i++
        setCriticalDiceBonus([...criticalDiceBonus, <Dice key={i} id={i}/>])
    }
    const clickDeleteCriticalDiceBonus = (id)=>{
        const tempArray = criticalDiceBonus.filter((dice) => dice.props.id !== id)
        setCriticalDiceBonus(tempArray)
    }

    const [gwfCheckedBonus, setGwfCheckedBonus] = useState(false)
    const [eaCheckedBonus, setEaCheckedBonus] = useState(false)
    const [saCheckedBonus, setSaCheckedBonus] = useState(false)

    const [piercerRerollWhenBonus,setPiercerRerollWhenBonus] = useState('')
    const [grazeModBonus,setGrazeModBonus] = useState('')
    const [piercerCheckedBonus,setPiercerCheckedBonus] = useState(false)
    const [grazeCheckedBonus,setGrazeCheckedBonus] = useState(false)
    
    const [minAC,setMinAC] = useState('')
    const [maxAC,setMaxAC] = useState('')

        let updatedList = standardDice.map((dice) => dice)
        //setStandardDice([...updatedList])
        console.log(updatedList)
    return (
        <div>
            <div>
                <b>Name:</b>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <b>Description:</b>
                <input type="text" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
            </div>

            <div>
                <b>Attack Modifier:</b>
                <input type="text" id="attackModifier" value={attackModifier} onChange={(e)=>setAttackModifier(e.target.value)}></input>
                <b>Critical Hit Range:</b>
                <input type="text" id="critRange" value={critRange} onChange={(e)=>setCritRange(e.target.value)}></input>
                <b>No. Of Attacks:</b>
                <input type="text" id="numOfAttacks" value={numOfAttacks} onChange={(e)=>setNumOfAttacks(e.target.value)}></input>
                <input type="checkbox" id="advantageCheck"></input>
                <b>Advantage</b>
            </div>

            <span id="standardDiceList">
                <b>Standard Hit Dice:</b>
                <span id="addStandardDiceButton"><button onClick={() => clickAddStandardDice()}>+</button></span>
                {standardDice.map((dice) => <Dice remove={() => clickDeleteStandardDice(dice.props.id)} gwfIsChecked={gwfChecked} eaIsChecked={eaChecked} saIsChecked={saChecked} {...dice}/>)}
                <span name="dMod">
                    <b>+</b>
                    <input type="text" id="damageModifier" placeholder="Damage Modifier" value={standardDamageMod} onChange={(e)=>setStandardDamageMod(e.target.value)}></input>
                </span>
            </span>

            <span id="firstHitDiceList">
                <b>First Hit Dice:</b>
                <span id="addFirstHitDiceButton"><button onClick={() => clickAddFirstHitDice()}>+</button></span>
                {firstHitDice.map((dice) => <Dice remove={() => clickDeleteFirstHitDice(dice.props.id)} gwfIsChecked={gwfChecked} eaIsChecked={eaChecked} saIsChecked={saChecked} {...dice}/>)}
                <span name="dMod">
                    <b>+</b>
                    <input type="text" id="damageModifierFirstHit" placeholder="Damage Modifier" value={firstHitDamageMod} onChange={(e)=>setFirstHitDamageMod(e.target.value)}></input>
                </span>
            </span>

            <span id="criticalDiceList">
                <b>Critical Dice:</b>
                <span id="addCriticalDiceButton"><button onClick={() => clickAddCriticalDice()}>+</button></span>
                {criticalDice.map((dice) => <Dice remove={() => clickDeleteCriticalDice(dice.props.id)} gwfIsChecked={gwfChecked} eaIsChecked={eaChecked} saIsChecked={saChecked} {...dice}/>)}
                <span name="dMod">
                <b>+</b>
                    <input type="text" id="damageModifierCritical" placeholder="Damage Modifier" value={criticalDamageMod} onChange={(e)=>setCriticalDamageMod(e.target.value)}></input>
                </span>
            </span>

            <div>
                <input type="checkbox" id="gwfCheck" checked={gwfChecked} onChange={() => {setGwfChecked(!gwfChecked)}}></input>
                <b>Great Weapon Fighting Style</b>
                <input type="checkbox" id="gwmCheck"></input>
                <b>Great Weapon Master Bonus Attack</b>
                <input type="checkbox" id="eaCheck" checked={eaChecked} onChange={() => setEaChecked(!eaChecked)}></input>
                <b>Elemental Adept</b>
                <input type="checkbox" id="saCheck" checked={saChecked} onChange={() => setSaChecked(!saChecked)}></input>
                <b>Savage Attacker</b>
                <input type="checkbox" id="luckyCheck"></input>
                <b>Lucky</b>
                <input type="checkbox" id="eAccCheck"></input>
                <b>Elven Accuracy</b>
                <input type="checkbox" id="crusherCheck"></input>
                <b>Crusher</b>
            </div>

            <div>
                <input type="checkbox" id="piercerCheck" value={piercerChecked} onChange={() => setPiercerChecked(!piercerChecked)}></input>
                <b>Piercer</b>
                <select name="diceAmount" id="diceAmountPiercer" disabled={!piercerChecked}>
                    <option value="4">Reroll d4</option>
                    <option value="6">Reroll d6</option>
                    <option value="8">Reroll d8</option>
                    <option value="10">Reroll d10</option>
                    <option value="12">Reroll d12</option>
                </select>
                <b>When &lt;=</b>
                <input type="text" id="piercerRerollWhen" value={piercerRerollWhen} onChange={(e)=>setPiercerRerollWhen(e.target.value)} disabled={!piercerChecked}></input>
                <input type="checkbox" id="stalkersFlurryCheck"></input>
                <b>Stalker's Flurry</b>
                <input type="checkbox" id="grazeCheck" value={grazeCheck} onChange={() => setGrazeChecked(!grazeCheck)}></input>
                <b>Graze</b>
                <b>Graze Ability Mod: =</b>
                <input type="text" id="grazeMod" value={grazeMod} onChange={(e)=>setGrazeMod(e.target.value)} disabled={!grazeCheck}></input>
                <input type="checkbox" id="vexCheck"></input>
                <b>Vex</b>
            </div>

            <div>
                <input type="checkbox" id="bonusActionCheck" onChange={handleChange} checked={componentsEnabled}></input>
                <b>Bonus Action Check</b>
            </div>

            <div>
                <h3>Bonus Action Attacks</h3>
                <b>Attack Modifier:</b>
                <input type="text" id="attackModifierBonus" value={attackModifierBonus} onChange={(e)=>setAttackModifierBonus(e.target.value)} disabled={!componentsEnabled}></input>
                <b>No. Of Attacks:</b>
                <input type="text" id="numOfAttacksBonus" value={numOfAttacksBonus} onChange={(e)=>setNumOfAttacksBonus(e.target.value)} disabled={!componentsEnabled}></input>
                <input type="checkbox" id="advantageCheckBonus" disabled={!componentsEnabled}></input>
                <b>Advantage</b>
            </div>

            <span id="standardDiceListBonus">
                <b>Standard Hit Dice:</b>
                <span id="addStandardDiceButtonBonus"><button onClick={() => clickAddStandardDiceBonus()} disabled={!componentsEnabled}>+</button></span>
                {standardDiceBonus.map((dice) => <Dice remove={() => clickDeleteStandardDiceBonus(dice.props.id)} gwfIsChecked={gwfCheckedBonus} eaIsChecked={eaCheckedBonus} saIsChecked={saCheckedBonus} {...dice} disabled={!componentsEnabled}/>)}
                <span name="dMod">
                    <b>+</b>
                    <input type="text" id="damageModifierBonus" placeholder="Damage Modifier" value={standardDamageModBonus} onChange={(e)=>setStandardDamageModBonus(e.target.value)} disabled={!componentsEnabled}></input>
                </span>
            </span>

            <span id="criticalDiceListBonus">
                <b>Critical Dice:</b>
                <span id="addCriticalDiceButtonBonus"><button onClick={() => clickAddCriticalDiceBonus()} disabled={!componentsEnabled}>+</button></span>
                {criticalDiceBonus.map((dice) => <Dice remove={() => clickDeleteCriticalDiceBonus(dice.props.id)} gwfIsChecked={gwfCheckedBonus} eaIsChecked={eaCheckedBonus} saIsChecked={saCheckedBonus} {...dice} disabled={!componentsEnabled}/>)}
                <span name="dMod">
                    <b>+</b>
                    <input type="text" id="damageModifierCriticalBonus" placeholder="Damage Modifier" value={criticalDamageModBonus} onChange={(e)=>setCriticalDamageModBonus(e.target.value)} disabled={!componentsEnabled}></input>
                </span>
            </span>

            <div>
                <input type="checkbox" id="gwfCheckBonus" checked={gwfCheckedBonus} onChange={() => setGwfCheckedBonus(!gwfCheckedBonus)} disabled={!componentsEnabled}></input>
                <b>Great Weapon Fighting Style</b>
                <input type="checkbox" id="eaCheckBonus" checked={eaCheckedBonus} onChange={() => setEaCheckedBonus(!eaCheckedBonus)} disabled={!componentsEnabled}></input>
                <b>Elemental Adept</b>
                <input type="checkbox" id="saCheckBonus" checked={saCheckedBonus} onChange={() => setSaCheckedBonus(!saCheckedBonus)} disabled={!componentsEnabled}></input>
                <b>Savage Attacker</b>
                <input type="checkbox" id="crusherCheckBonus" disabled={!componentsEnabled}></input>
                <b>Crusher</b>
            </div>

            <div>
                <input type="checkbox" id="piercerCheckBonus" disabled={!componentsEnabled} checked={piercerCheckedBonus} onChange={() => setPiercerCheckedBonus(!piercerCheckedBonus)}></input>
                <b>Piercer</b>
                <select name="diceAmount" id="diceAmountPiercerBonus" disabled={!piercerCheckedBonus}>
                    <option value="4">Reroll d4</option>
                    <option value="6">Reroll d6</option>
                    <option value="8">Reroll d8</option>
                    <option value="10">Reroll d10</option>
                    <option value="12">Reroll d12</option>
                </select>
                <b>When &lt;=</b>
                <input type="text" id="piercerRerollWhenBonus" value={piercerRerollWhenBonus} onChange={(e)=>setPiercerRerollWhenBonus(e.target.value)} disabled={!piercerCheckedBonus}></input>
                <input type="checkbox" id="stalkersFlurryCheckBonus" disabled={!componentsEnabled}></input>
                <b>Stalker's Flurry</b>
                <input type="checkbox" id="grazeCheckBonus" disabled={!componentsEnabled} checked={grazeCheckedBonus} onChange={() => setGrazeCheckedBonus(!grazeCheckedBonus)}></input>
                <b>Graze</b>
                <b>Graze Ability Mod: =</b>
                <input type="text" id="grazeModBonus" value={grazeModBonus} onChange={(e)=>setGrazeModBonus(e.target.value)} disabled={!grazeCheckedBonus}></input>
                <input type="checkbox" id="vexCheckBonus" disabled={!componentsEnabled}></input>
                <b>Vex</b>
            </div>

            <div>

            </div>

            <div>
                <span className="acInput">
                    <b>Minimum AC:</b>
                    <input type="text" id="minAC" value={minAC} onChange={(e)=>setMinAC(e.target.value)}></input>
                    <b>Maximum AC:</b> 
                    <input type="text" id="maxAC" value={maxAC} onChange={(e)=>setMaxAC(e.target.value)}></input>
                    <button id="calculateButton">Calculate</button>
                </span>

                <div><input type="text" id="dprField" readOnly></input></div>
            </div>
        </div>
    )

}

function App() {
    return (
      <div className="App">
        <Calc />
        {/* <InfoInput />
        <AttackInfoInput />
        <StandardDiceRow gwfIsChecked={gwfChecked} eaIsChecked={eaChecked} saIsChecked={saChecked}/>
        <FirstHitDiceRow />
        <CriticalDiceRow />
        <SpecialProperties gwfChecked={gwfChecked} checkGwf={() => setGwfChecked(!gwfChecked)}/>
        <SpecialProperties2 />
        <BonusAction />
        <AddCharacter />
        <CalculateValues /> */}
      </div>
    );
  }

export default App;

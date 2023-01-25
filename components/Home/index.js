import React, { useRef, useState } from "react";
import { PersonItems, PersonList, PageContainer, Work } from "./homeStyle";
import { persons } from "./personData";
import { TabButton } from "./homeStyle";


export default function Home() {
   
  const personCount = useRef(persons.length);
  //const personCount = useRef(persons.filter(pohlavi => pohlavi.includes('Z')).length);
  
  const filteredM = persons.filter(person => {
    return person.pohlavi === 'm';
  });
  const personCountM = useRef(filteredM.length);

  const filteredZ = persons.filter(person => {
    return person.pohlavi === 'z';
  });
  const personCountZ = useRef(filteredZ.length);
  //---------------------------------------------
  // DEFINOVANI OBJEKTU S DATABAZI PSU - START 
  //--------------------------------------------- 
  const [listOfPerson, setListOfPerson] = useState(persons);
  //---------------------------------------------
  // DEFINOVANI OBJEKTU S DATABAZI PSU - END 
  //--------------------------------------------- 

   
  
  const [shelterStorage, setShelterStorage] = useState({
		Metry: 0,
		Cas: 0
	});
	const [tempShelterStorage, setTempShelterStorage] = useState({
		Metry: "",
		Cas: ""
	});
  const dogsRequirment = {
    Metry: 1,
    Cas: 0.5
  };

  // const [pocetZamcu, setPocetZamcu] = useState({
	// 	Muzi: listOfPerson.filter(person => person.pohlavi=="M"),
	// 	Zeny: 0
	// });
  //------------------------------------- --------
  // MAZANI  PSA A AKTUALIZACE VYPISU PSU - START 
  //---------------------------------------------
  const handleDelete = (id) => {
    console.log(id)
    setListOfPerson(listOfPerson.filter(person => person.id != id));

    // vypocet start
     
    let MetryValue = shelterStorage.Metry;
    let CasValue = shelterStorage.Cas;
    let pocetMuzu = listOfPerson.filter(person => person.id != id && person.pohlavi == "m").length;
    let pocetZen = listOfPerson.filter(person => person.id != id && person.pohlavi == "z").length;

    let metrHodina = Math.round(MetryValue / CasValue)
    let praceMuzi = pocetMuzu
    let praceZeny = pocetZen * 0.5
    let praceMuziZeny = praceMuzi + praceZeny

    console.log('pocet muzu: ' + pocetMuzu)
    console.log('pocet zen: ' + pocetZen)
    console.log('pozadovane metry: ' + MetryValue)
    console.log('pozadovany cas: ' + CasValue)
    console.log('metru za hodinu: ' + metrHodina)
    console.log('praceMuzi: ' + praceMuzi)
    console.log('praceZeny: ' + praceZeny)
    console.log('praceMuziZeny: ' + praceMuziZeny)

    if (praceMuziZeny >= metrHodina) {
      console.log('Praci lze zadat')
      setHlaska('Naplánovat akci')
      changeColor("green")
    }
    else
    {
      console.log('Protuto praci mas malo zamestnancu')
      setHlaska('Protuto praci mas malo zamestnancu')
      changeColor("red")
    }
    // vypocet konec
  };
  //------------------------------------- --------
  // MAZANI  PSA A AKTUALIZACE VYPISU PSU - END 
  //---------------------------------------------

  //---------------------------------------------
  // NAHRANI NOVEHE OSOBY A AKTUALIZACE VYPISU  - START 
  //--------------------------------------------- 
  const [addPerson, setAddPerson] = useState({
    id: (personCount.current + 1),
    jmeno: "",
    prijmeni: "",
    pohlavi: ""
  });
  //---------------------------------------------
  // NAHRANI NOVEHE OSOBY A AKTUALIZACE VYPISU  - END 
  //--------------------------------------------- 

  const handleChange = (e) => {
    setAddPerson({ ...addPerson, [e.target.name]: e.target.value })
  };

  //!!!*****PUVODNI VERZE PRO UKLADANI BEZ VAZBY NA SKLAD
  const handleAdd = async (e) => {
    await setListOfPerson((listOfPerson) => {
      return [...listOfPerson, addPerson];
    });
    personCount.current++;
    await setAddPerson({
      id: (personCount.current + 1),
      jmeno: "",
      prijmeni: "",
      pohlavi: ""
    });
    

     // vypocet start
     
     let MetryValue = shelterStorage.Metry;
     let CasValue = shelterStorage.Cas;
     let pocetMuzu = [...listOfPerson, addPerson].filter(person => person.pohlavi == "m").length;
     let pocetZen = [...listOfPerson, addPerson].filter(person => person.pohlavi == "z").length;

     let metrHodina = Math.round(MetryValue / CasValue)
     let praceMuzi = pocetMuzu
     let praceZeny = pocetZen * 0.5
     let praceMuziZeny = praceMuzi + praceZeny

     console.log('pocet muzu: ' + pocetMuzu)
     console.log('pocet zen: ' + pocetZen)
     console.log('pozadovane metry: ' + MetryValue)
     console.log('pozadovany cas: ' + CasValue)
     console.log('metru za hodinu: ' + metrHodina)
     console.log('praceMuzi: ' + praceMuzi)
     console.log('praceZeny: ' + praceZeny)
     console.log('praceMuziZeny: ' + praceMuziZeny)

     if (praceMuziZeny >= metrHodina) {
       console.log('Praci lze zadat')
       setHlaska('Naplánovat akci')
       changeColor("green")
     }
     else
     {
       console.log('Protuto praci mas malo zamestnancu')
       setHlaska('Protuto praci mas malo zamestnancu')
       changeColor("red")
     }
     // vypocet konec
  }
  //---------------------------------------------
  // NAHRANI NOVEHE OSOBY A AKTUALIZACE VYPISU  - END 
  //--------------------------------------------- 



  //---------------------------------------------
  //PREPINANI MEZI STRANKY - START 
  //---------------------------------------------
  // prepinani mezi castmi appky, nastavena vychozi hodnota list-of-person
  const [activeTab, setActiveTab] = useState('list-of-person');

  // po kliknuti na tlacitko zmen hodnotu pomoci setActiveTab
  const switchTab = (newValue) => {
    const newActivTab = newValue;
    setActiveTab(newActivTab);
  }
  //---------------------------------------------
  //PREPINANI MEZI STRANKY - END 
  //---------------------------------------------

  //*************************************************** */
//*************************************************** */
// PRACE
//*************************************************** */
//*************************************************** */

//---------------------------------------------
// PLANOVANI PRACE - START 
//--------------------------------------------- 
  
  const [color, changeColor] = useState("transparent");
  const [hlaska, setHlaska] = useState("Naplánovat akci");

const handleStorage = (e) => {
  setTempShelterStorage({ ...tempShelterStorage, [e.target.name]: e.target.value });
   };

  const updateStorage = async () => {
    const storageValue = tempShelterStorage;
    let newStorageValue = {};
    // storageValue = {food: "", vaccine: "", pills: ""}
    const keys = Object.keys(storageValue);
    // keys = ['food', 'vaccine', 'pills']
    // key = keys[1]
    keys.map((key) => {
      // storageValue.vaccine
      if (parseInt(storageValue[key])) {
        // newStorageValue[key] = parseInt(shelterStorage[key]) + parseInt(storageValue[key]);
        newStorageValue[key] =  parseInt(storageValue[key]);
      } else {
        newStorageValue[key] = parseInt(shelterStorage[key]);
      }

      // presunuto do funkce
     // vypocet start
      let MetryValue = newStorageValue.Metry;
      let CasValue = newStorageValue.Cas;
      let pocetMuzu = listOfPerson.filter(person => person.pohlavi == "m").length;
      let pocetZen = listOfPerson.filter(person => person.pohlavi == "z").length;

      let metrHodina = Math.round(MetryValue / CasValue)
      let praceMuzi = pocetMuzu
      let praceZeny = pocetZen * 0.5
      let praceMuziZeny = praceMuzi + praceZeny

      console.log('pocet muzu: ' + pocetMuzu)
      console.log('pocet zen: ' + pocetZen)
      console.log('pozadovane metry: ' + MetryValue)
      console.log('pozadovany cas: ' + CasValue)
      console.log('metru za hodinu: ' + metrHodina)
      console.log('praceMuzi: ' + praceMuzi)
      console.log('praceZeny: ' + praceZeny)
      console.log('praceMuziZeny: ' + praceMuziZeny)

      if (praceMuziZeny >= metrHodina) {
        console.log('Praci lze zadat')
        setHlaska('Naplánovat akci')
        changeColor("green")
      }
      else
      {
        console.log('Protuto praci mas malo zamestnancu')
        setHlaska('Protuto praci mas malo zamestnancu')
        changeColor("red")
      }
      // vypocet konec
    })
    await setShelterStorage(newStorageValue);
    //await setTempShelterStorage({ Metry: "", Cas: "" });
    
  };

  const vypocet = async () => {
    let MetryValue = shelterStorage.Metry;
    let CasValue = shelterStorage.Cas;
    let pocetMuzu = listOfPerson.filter(person => person.pohlavi == "m").length;
    let pocetZen = listOfPerson.filter(person => person.pohlavi == "z").length;

    console.log('pocet muzu: ' + pocetMuzu)
    console.log('pocet zen: ' + pocetZen)
    console.log('pozadovane metry: ' + MetryValue)
    console.log('pozadovany cas: ' + CasValue)

  }
  function vypocet2() {
   
    let MetryValue = shelterStorage.Metry;
    let CasValue = shelterStorage.Cas;
    let pocetMuzu = listOfPerson.filter(person => person.pohlavi == "m").length;
    let pocetZen = listOfPerson.filter(person => person.pohlavi == "z").length;

    console.log('pocet muzu: ' + pocetMuzu)
    console.log('pocet zen: ' + pocetZen)
    console.log('pozadovane metry: ' + MetryValue)
    console.log('pozadovany cas: ' + CasValue)
 }
  //---------------------------------------------
// PLANOVANI PRACE - END 
//--------------------------------------------- 
  
  return (
    <PageContainer>
      <>
        <div>
          <TabButton name="list-of-person" activeTab={activeTab} onClick={(event) => { switchTab('list-of-person') }}>
            seznam zaměstnanců
          </TabButton>
          <TabButton name="plan-work" activeTab={activeTab} onClick={(event) => { switchTab('plan-work') }}>
            plánování práce
          </TabButton>
        </div>
      </>
      {(activeTab === 'list-of-person') &&
        <>
          <PersonList name="personList">
            {
              // to co bzlo definovano v dogs projizdime smzckou map
            listOfPerson.map((person) => (
                
                <PersonItems key={person.id} name={person.prijmeni}>
                  <button onClick={() => { handleDelete(person.id) }}>	X	</button>
                  {person.jmeno} {person.prijmeni} {person.pohlavi} 
                </PersonItems>
              ))
            }
          </PersonList>
        <div >
          <br/>
          jméno:&nbsp; 
            <input style={{width: '100px'}}
              onChange={handleChange}
              value={addPerson.jmeno}
              type="text"
              name="jmeno"
              
              className="inputClass"></input>

&nbsp; příjmení:&nbsp; 
            <input type="text" style={{width: '100px'}}
              onChange={handleChange}
              value={addPerson.prijmeni}
              name="prijmeni"
             
              className="inputClass"></input>
&nbsp; pohlaví:&nbsp; 
              <input type="text" style={{width: '20px'}}
              onChange={handleChange}
              value={addPerson.pohlavi}
              name="pohlavi"
              placeholder="m/z"
            className="inputClass"></input><br/>


            <br />

            <TabButton className="inputClass" onClick={handleAdd}>odeslat</TabButton>

          </div>
        </>
      }
      {(activeTab === 'plan-work') &&
        <Work>
        <b>Plánování výkopových prací</b><br/>
        
        Požadované metry: {shelterStorage.Metry}
        <br />
        Požadovaný čas: {shelterStorage.Cas},
        <br />
        Počet mužů: {listOfPerson.filter(person => person.pohlavi=="m").length}
        <br />
        Počet žen: {listOfPerson.filter(person => person.pohlavi=="z").length}
        <hr />
        Požadované metry: &nbsp;
        <input style={{width: '50px'}}
          name="Metry"
          value={tempShelterStorage.Metry}
					onChange={handleStorage}
          type="number" 
          
          className="inputClass" />
         
         &nbsp; Požadovaný čas: &nbsp;
        <input style={{width: '50px'}}
          name="Cas"
          value={tempShelterStorage.Cas}
					onChange={handleStorage}
          type="number" 
          
          className="inputClass"/>
        <br />
        <TabButton
							className="inputClass"
							onClick={updateStorage}
						>
							Zadat požadavky
        </TabButton>
        <hr/>
        <TabButton
          className="inputClassX"
          name="PlanovatAkci"
          style={{
            backgroundColor: color}}>
							{hlaska}
        </TabButton>
        <br/>
        
        </Work>
      }
    </PageContainer>
  );
}
